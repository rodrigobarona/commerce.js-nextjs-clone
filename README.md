# next-commerce

A commerce-agnostic storefront built with **Next.js 16 / React 19**, ported from
the Commerce.js Nuxt reference storefront. Turborepo + pnpm monorepo, Node 24,
deployed on Vercel + Neon Postgres.

## Architecture

```
apps/
  web/                     # Marketing site (shadcn preset) — :3001
  storefront/              # Next.js 16 storefront (App Router) — :3000
  dashboard/               # Admin dashboard — :3002
  docs/                    # Fumadocs documentation — :3003
  checkout/                # Standalone checkout (Stripe / Easypay / Ifthenpay) — :3004
packages/
  commerce/                # @workspace/commerce — server-only data layer
  checkout-host/           # @workspace/checkout-host — session store (Upstash Redis)
  ui/                      # @workspace/ui — shadcn/Radix + 33 commerce components
  # vendored, framework-agnostic Commerce.js packages:
  types/ core/ checkout/ platform/ webhook-verifier/
  storage-s3/ storage-vercel-blob/
  payment-stripe/ payment-easypay/ payment-ifthenpay/
```

- **Data layer** (`@workspace/commerce`) wraps a pluggable `CommerceAdapter`.
  The built-in **platform** adapter (Neon Postgres + Drizzle) is the default and
  is swappable via `COMMERCE_ADAPTER` (medusa/salla seams included).
- **Payments** are gateway-agnostic (`PaymentProvider`): **Stripe** (embedded
  Payment Element) is the default; **Easypay** and **Ifthenpay** cover Portugal
  (Multibanco, MB WAY, card). Payment UI lives in `apps/checkout`.
- **Checkout** (`apps/checkout`) is a standalone Next.js app. The storefront
  places an order then redirects to the checkout app for payment via a
  `CheckoutSession` persisted in **Upstash Redis**. Supports web checkout
  sessions and payment links.
- **Storage** is pluggable via `STORAGE_PROVIDER`: **Vercel Blob** (default) or
  S3-compatible (**Cloudflare R2**, AWS, MinIO).
- **Auth** uses **Better Auth** on the same Neon database (Drizzle), behind a
  `getSession()` seam so WorkOS AuthKit / Clerk can be swapped via `AUTH_PROVIDER`.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL, keys, etc.
pnpm env:link                # symlink apps/*/.env.local -> root .env.local
pnpm db:setup                         # migrate + seed commerce, create auth tables
pnpm dev                              # starts all apps via Turbo
```

Dev ports: storefront `:3000`, web `:3001`, dashboard `:3002`, docs `:3003`, checkout `:3004`.

Requires Node >= 24 and pnpm 10.

## Scripts

- `pnpm dev` — run all apps (see dev ports above)
- `pnpm build` / `pnpm typecheck` / `pnpm lint` — Turbo pipelines
- `pnpm db:migrate` — migrate + seed the commerce (platform) schema
- `pnpm db:auth` — push the Better Auth schema
- `pnpm db:setup` — both of the above

## Deployment (Vercel)

Both apps deploy as separate Vercel projects sharing the same Neon database.

### Storefront

1. Provision **Neon Postgres** via the Vercel marketplace integration → sets `DATABASE_URL`.
2. Set the env vars from `.env.example` in the Vercel project.
3. Set `CHECKOUT_URL` to the production URL of the checkout project.
4. Run `pnpm db:setup` once (locally against the prod DB, or as a deploy step).
5. Deploy (`turbo build`). Catalog data uses Cache Components (`cacheComponents: true`)
   with `'use cache'` + `cacheTag`/`cacheLife` on `@workspace/commerce` catalog
   queries (SWR: home/store 3600s, products/categories 600s). Cart/checkout/
   account stay dynamic via cookies/session.

### Checkout

1. Share the same **Neon** `DATABASE_URL` (for order lookups).
2. Provision **Upstash Redis** via the Vercel marketplace → sets
   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
3. Set `CHECKOUT_API_SECRET` (same value on both projects).
4. Set `STOREFRONT_URL` to the production storefront URL.
5. Configure payment webhooks to the checkout domain:
   `/api/webhooks/{stripe,easypay,ifthenpay}`.
6. Deploy (`turbo build --filter=checkout`).

## Adding UI components

```bash
pnpm dlx shadcn@latest add <component> -c packages/ui
```

Commerce components live in `packages/ui/src/components/*` and are imported as
`@workspace/ui/components/<name>`.

## Roadmap

### Apps (vs upstream `_context/repo-clone/apps`)

| Upstream app                            | Status in this repo                                                         |
| --------------------------------------- | --------------------------------------------------------------------------- |
| **`storefront`**                        | **Ported** → `apps/storefront` (Next.js 16 / React 19)                      |
| **`hosted-checkout`**                   | **Ported** → `apps/checkout` (CheckoutSession + Upstash Redis)              |
| **`docs`**                              | **Ported** → `apps/docs` (Fumadocs MDX)                                     |
| **`landing-page`**                      | **Ported** → `apps/web` (marketing site, shadcn preset)                     |
| `dashboard`                             | Not ported — planned (commercejs.cloud admin)                               |
| `pitch-deck`, `cloud-*`                 | Not ported — static marketing sites                                         |

- CMS integration (Sanity / Payload) for marketing content — the data layer and
  page structure are designed to compose CMS content alongside commerce data.
- Full server-side card capture flows; admin dashboard.
