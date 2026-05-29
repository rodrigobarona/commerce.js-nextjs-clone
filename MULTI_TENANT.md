# Multi-Tenant Platform

This repo runs as a white-label, multi-tenant commerce platform: one set of
deployments serves many merchant stores. Each store is an **organization**
(Better Auth org plugin), and all commerce data is isolated per organization by
**Postgres row-level security (RLS)**.

```
Better Auth org (tenant)
   └─ withTenant(orgId)  →  SET app.current_org_id  (per-request transaction)
        └─ Forced RLS filters every row by organization_id
```

- **Dashboard** (`apps/dashboard`) — merchants sign in, pick an active org, and
  manage their store. Every data call runs inside `withActiveOrg()`.
- **Storefront** (`apps/storefront`) — resolves the tenant from the request host
  and threads `tenantId` into every `@workspace/commerce` call.
- **Platform** (`packages/platform`) — owns the commerce schema, the
  `withTenant()` tenant scope, and `applyTenantIsolation()` (RLS).

## How tenant resolution works

| Surface | Source of tenant | Mechanism |
|---------|------------------|-----------|
| Dashboard | active org on the session (`session.activeOrganizationId`) | `withActiveOrg()` → `withTenant()` |
| Storefront | request host | `resolveTenantId()` → `tenantId` arg → `runScoped()` → `withTenant()` |

Storefront host resolution (`apps/storefront/lib/tenant.ts`):

1. Custom domain → `tenant_domain` table (verified rows).
2. `{slug}.{NEXT_PUBLIC_PLATFORM_DOMAIN}` subdomain → `organization.slug`.
3. Fallback → `DEFAULT_TENANT_ORG_ID` (the seeded demo store).

Catalog reads are cached **per tenant** (`products-<org>`, `categories-<org>`,
`store-<org>`), so caching never crosses tenants.

## Environment variables

Shared:

- `DATABASE_URL` — Neon Postgres (all apps share it).
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — Better Auth.
- `DEFAULT_TENANT_ORG_ID` — fallback tenant for the storefront (default `org_demo`).
- `NEXT_PUBLIC_PLATFORM_DOMAIN` — apex used for `{slug}.platform` subdomains.

Dashboard (custom domains via Vercel — optional in dev):

- `VERCEL_TOKEN`, `VERCEL_PROJECT_ID` (storefront project), `VERCEL_TEAM_ID`.

Commerce seed:

- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — initial platform admin.

## First-time setup

```bash
# 1. Install
pnpm install

# 2. Commerce schema + RLS + demo seed (tags data with DEMO_ORG_ID = "org_demo")
pnpm db:migrate           # runs migrateDrizzle -> applyTenantIsolation + seed

# 3. Auth + org + tenant_domain + integration_config tables
pnpm --filter dashboard db:push

# 4. Run
pnpm dev                  # storefront :3000, checkout :3100, dashboard :3002
```

`applyTenantIsolation()` (in `packages/platform/.../drizzle/migrate.ts`) adds an
`organization_id` column (defaulting to `current_setting('app.current_org_id')`)
to every tenant table, then `ENABLE` + `FORCE`s RLS with a `tenant_isolation`
policy. `store_info` and tenant tables use the session variable, so inserts must
run inside `withTenant()`.

## Onboarding a new merchant

1. Register in the dashboard → creates a user + first organization (the store).
2. The org id becomes the tenant key for all their commerce data.
3. Add a domain in **Domains** (subdomain is automatic; custom domains use the
   Vercel SDK + DNS verification, recorded in `tenant_domain`).
4. The storefront, served at that host, resolves to the org and shows the store.

## Verifying isolation (do this against a real DB)

1. Create two orgs (A and B) in the dashboard; add a product to each.
2. With `app.current_org_id = A`, confirm only A's product is visible:
   ```sql
   SELECT set_config('app.current_org_id', '<org A id>', false);
   SELECT id, name, organization_id FROM products;   -- only A's rows
   ```
3. Switch to B and confirm only B's rows return.
4. With no setting, RLS returns zero rows (writes are blocked too) — proof that
   any code path forgetting `withTenant()` fails closed rather than leaking.

## Per-tenant payments

Payment credentials configured in the dashboard (`integration_config`) flow
into the provider factory at runtime:

- `getPaymentProvider(id, config?)` builds a provider from a tenant's stored
  credentials, falling back to env vars per field.
- The storefront sends `tenantId` when creating a checkout session; the checkout
  host persists it on the session and rebuilds the provider with the tenant's
  credentials (and publishable key) on pay/confirm.
- Provider registry field keys (`lib/providers.ts`) match the provider
  constructor params, so stored config maps directly.

Webhook signature verification stays **platform-level** (single secret) for now
— per-tenant webhook routing is the natural next step.

## Package security audit (secure-by-design)

Every package was reviewed for cross-tenant leakage. Posture by package:

| Package | Touches tenant data? | Status |
|---------|----------------------|--------|
| `platform` | Yes — owns commerce schema | Isolated by forced RLS + `withTenant()` |
| `commerce` | Yes — wraps platform | Tenant threaded; per-tenant cache tags; per-tenant payments |
| `checkout-host` | Yes — checkout sessions | `tenantId` stored on session; provider rebuilt per tenant |
| `checkout` | Per-session state machine | New instance per session; no module-level mutable state |
| `payment-stripe` / `-easypay` / `-ifthenpay` | Credentials only | Stateless; config injected per tenant via the factory |
| `webhook-verifier` | Signature secrets | Platform-level (see follow-ups) |
| `storage-vercel-blob` / `storage-s3` | File uploads | **Not yet wired** — must namespace keys per tenant when wired |
| `types`, `ui`, `eslint-config`, `typescript-config` | No | Safe |
| `core` | Legacy engine | Not in the Next runtime path (not imported by apps) |

### Secure-by-design gaps to close

1. **Secrets at rest.** `integration_config.config` stores provider credentials
   as plaintext JSONB. They are never sent to the client, but should be
   encrypted at rest (app-level encryption or a secrets manager) before
   production.
2. **Storage key namespacing.** `getStorage()` is a process-wide, env-credential
   singleton and upload keys are caller-controlled (`directory/filename`). It is
   not wired into any app yet. When you add product-image uploads, namespace
   keys per tenant (e.g. `org/<orgId>/products/...`) and prefer
   `addRandomSuffix`/unguessable paths — otherwise tenants can collide or
   enumerate each other's public blobs.
3. **Per-tenant webhooks.** Provider webhooks verify against a single
   platform-level secret. Route them per tenant (e.g.
   `/api/webhooks/:provider/:org`) so each verifies with the merchant's secret.
4. **Unknown-host fallback.** `resolveTenantId()` falls back to
   `DEFAULT_TENANT_ORG_ID` for unmatched hosts (convenient in dev). In
   production, return 404/`notFound()` for unrecognized hosts instead of
   serving the demo store.

## Maintenance follow-ups

- **Notifications** (Resend/SMTP) have no runtime factory in the Next stack yet;
  when one is added, read credentials from `integration_config` the same way
  payments do.
- When adding a new tenant-owned table, add it to `TENANT_TABLES` in
  `packages/platform/src/database/drizzle/migrate.ts`; if its natural key repeats
  across tenants, include `organization_id` in the primary key (see `store_info`
  and `integrations`).
