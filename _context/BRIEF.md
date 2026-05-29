# Commerce.js → Next.js Clone: Technical Brief

## TL;DR

[Commerce.js](https://github.com/commerce-js/commerce.js) is a provider-agnostic eCommerce toolkit built on Nuxt 4 / Vue 3. This repo (`next-commerce`) is a ground-up port of its reference storefront and supporting infrastructure to **Next.js 16 / React 19**, keeping the same Turborepo + pnpm monorepo shape. The upstream source is checked out at `_context/repo-clone` for side-by-side reference.

---

## The Source: Commerce.js

Commerce.js abstracts over eCommerce backends (Salla, Medusa, its own Neon Postgres engine) so you can swap platforms without rewriting application code. Four design pillars:

1. **Unified types** (`@commercejs/types`) — 20+ domain types (Product, Cart, Order, Customer, ...) shared across every adapter.
2. **Adapter pattern** — each platform implements `CommerceAdapter`, mapping its API to the unified types (`adapter-salla`, `adapter-medusa`).
3. **Pluggable providers** — payment, delivery, notification, analytics, and storage providers implement narrow interfaces and are hot-swappable.
4. **Orchestration engine** (`@commercejs/core`) — `createCommerce()` wires an adapter + providers + event bus + webhooks into a single entry point.

### Stack

| Layer | Choice |
|-------|--------|
| Framework | Nuxt 4.3 / Vue 3.5 |
| UI kit | `@nuxt/ui` 4.4 + Tailwind CSS 4 |
| Build | Turborepo + pnpm workspaces |
| Tests | Vitest |
| Runtime / Deploy | Nitro → Cloudflare Pages |
| Database (built-in platform) | Neon Postgres via Drizzle |
| Auth | `nuxt-auth-utils` |

---

## Source Layout

### Packages (published to npm as `@commercejs/*`)

| Package | Purpose |
|---------|---------|
| `types` | Unified data model |
| `core` | Orchestration engine (`createCommerce()`, event bus, webhooks) |
| `checkout` | Checkout state machine |
| `payment-tap` | Tap Payments provider (redirect-based, PCI-free) |
| `delivery-armada` | Armada last-mile delivery |
| `delivery-parcel` | Parcel delivery (OAuth2, multi-region) |
| `webhook-verifier` | Cryptographic webhook signature verification |
| `adapter-salla` | Salla platform adapter |
| `adapter-medusa` | Medusa V2 platform adapter |
| `platform` | Built-in commerce engine (Neon Postgres, Admin API, profiles) |
| `nuxt` | Nuxt module — composables, plugin, auto-generated REST API |
| `ui` | eCommerce UI components (Vue, built on Nuxt UI) |
| `notification-resend` | Resend email provider |
| `notification-smtp` | SMTP email provider |
| `analytics-ga` | Google Analytics 4 provider |
| `storage-s3` | S3-compatible storage (AWS, R2, Spaces, MinIO) |
| `cloud` | Cloud infrastructure orchestration |
| `cli` | CLI tool (deploy, init, env) |

### Apps (private)

| App | Description |
|-----|-------------|
| `storefront` | Reference storefront (Nuxt) — **primary port target** |
| `checkout` | Deployable checkout app with Tap card elements |
| `dashboard` | Cloud dashboard ([commercejs.cloud](https://commercejs.cloud)) |
| `docs` | Documentation site ([commerce.js.org](https://commerce.js.org)) |

---

## This Repo: The Next.js Clone

**Monorepo name:** `next-commerce`
**Package manager:** pnpm 10.33 + Turborepo 2.9
**Node requirement:** >= 20

### Current state

```
next-commerce/
├── apps/
│   └── web/              # Next.js 16.2.6 / React 19.2 — starter page only
├── packages/
│   └── ui/               # @workspace/ui — shadcn 4, Radix, Tailwind 4, CVA, Zod 4
├── _context/
│   └── repo-clone/       # Upstream Commerce.js source (read-only reference)
├── turbo.json
└── pnpm-workspace.yaml
```

`apps/web` contains the default "Project ready!" page. `@workspace/ui` provides shadcn primitives (Button, etc.) with Tailwind CSS 4 and Radix UI.

---

## Nuxt → Next.js Mapping

| Nuxt / Vue concept | Next.js / React equivalent |
|---------------------|----------------------------|
| `app/pages/*.vue` (file-based routing) | `app/**/page.tsx` (App Router) |
| `app/layouts/default.vue` | `app/layout.tsx` (root layout) |
| Vue SFC (`.vue` template + script + style) | React component (`.tsx`) |
| `@nuxt/ui` components | `@workspace/ui` (shadcn + Radix) |
| `@commercejs/ui` Vue components | New React components in `@workspace/ui` or `apps/web` |
| Nuxt composables (`useAsyncData`, `useFetch`) | React Server Components + `fetch` / Server Actions |
| `@commercejs/nuxt` module (auto REST API, plugin, composables) | `@workspace/commerce` package (server-side lib + Route Handlers) |
| Nitro `server/api/` routes | Next.js Route Handlers (`app/api/**/route.ts`) |
| `nuxt.config.ts` `routeRules` (SWR/ISR) | `export const revalidate` / `dynamicParams` / middleware |
| `nuxt.config.ts` `runtimeConfig` | `process.env` + `.env.local` |
| `nuxt-auth-utils` | TBD — NextAuth / WorkOS AuthKit / custom |
| Nitro preset `cloudflare-pages` | Vercel (default) or Cloudflare via `@opennextjs/cloudflare` |

---

## Scope: What to Port First

The reference storefront has 8 pages. These define the v1 surface:

| Source page (`_context/repo-clone/apps/storefront/app/pages/`) | Target route (`apps/web/app/`) |
|--------------------------------------------------------------|-------------------------------|
| `index.vue` | `page.tsx` (home) |
| `products.vue` + `products/index.vue` | `products/page.tsx` |
| `products/[slug].vue` | `products/[slug]/page.tsx` |
| `categories.vue` + `categories/[slug].vue` | `categories/page.tsx`, `categories/[slug]/page.tsx` |
| `cart.vue` | `cart/page.tsx` |
| `checkout.vue` | `checkout/page.tsx` |
| `order-confirmation.vue` | `order-confirmation/page.tsx` |

Shared pieces to port alongside:

- **Layout shell** — header, nav, footer, cart drawer (from `default.vue` + storefront components).
- **Product card / gallery** — from `@commercejs/ui` Vue components → React equivalents in `@workspace/ui`.
- **Search palette** — from `SearchPalette.vue`.
- **Commerce data layer** — a `@workspace/commerce` package (or inline server lib) wrapping `@commercejs/core` + `@commercejs/platform` for Server Component data fetching and Server Actions (cart mutations, checkout).

---

## Open Questions / Next Steps

1. **Data layer strategy** — Port `@commercejs/platform` (Neon Postgres + Drizzle) into this monorepo, or start with mock data / a simpler adapter? The `platform` package is self-contained but pulls in Drizzle migrations and a full Admin API.
2. **Payment flow** — Tap Payments uses a redirect-based flow. The `@commercejs/checkout` state machine is framework-agnostic and can be consumed directly, but the checkout app is Nuxt-specific.
3. **Auth** — The source uses `nuxt-auth-utils`. Pick an equivalent for Next.js (NextAuth, WorkOS AuthKit, Clerk, or custom middleware).
4. **UI component parity** — `@commercejs/ui` ships 33 Vue components across 13 domains (product, cart, checkout, auction, rental, etc.). Decide whether to port all of them upfront or build incrementally as pages require them.
5. **Deploy target** — Source targets Cloudflare Pages via Nitro. This repo defaults to Vercel. Confirm target and adjust caching / middleware strategy accordingly.
6. **Definition of "done" for v1** — Full storefront parity (all 8 pages + cart + checkout + payment), or a read-only product catalog first?
