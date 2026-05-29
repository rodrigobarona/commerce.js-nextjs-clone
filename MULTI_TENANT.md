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

## Known follow-ups

- Per-tenant integration credentials (Stripe/Resend/etc.) are stored in
  `integration_config` but the runtime payment/notification providers still read
  env vars. Wire the stored config into the provider factories to go fully
  per-tenant.
- `store_info` / `integrations` use the session-variable default; ensure any new
  tenant tables are added to `TENANT_TABLES` in `migrate.ts`.
