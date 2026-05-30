# Plan entitlement enforcement

Runtime limits from `@prood/billing` are enforced at the insertion points below. All organizations default to `plan_id = 'free'` until Stripe billing ships.

## Insertion points

| Entitlement | Check | Location |
| --- | --- | --- |
| `maxProducts` | Count products before insert | `apps/api/app/v1/admin/products/route.ts` |
| `maxOrdersPerMonth` | Count orders in UTC calendar month before place-order | `apps/api/app/v1/carts/[id]/place-order/route.ts` |
| `maxTeamSeats` | Count members + pending invitations before invite | `apps/dashboard/app/(dashboard)/team/actions.ts` |
| `maxCustomDomains` | Count domains before add | `apps/dashboard/app/(dashboard)/domains/actions.ts` |
| `maxStores` | Count orgs user owns or agency portfolio | Org creation + agency switcher (future) |
| `agentAuthEnabled` | Block agent JWT when disabled | `apps/api/lib/resolve-caller.ts` |
| `apiWriteEnabled` | Restrict API keys with `admin` scope on Free | `apps/api/lib/resolve-caller.ts` |
| `removeBranding` | Storefront/dashboard theme flag | Storefront layout when Prood branding is added |
| `customAdminDomain` (planned) | Block admin white-label domain setup on Free/Grow | Dashboard domains UI — Scale / Agency only |

## Reading plan from database

```ts
import { getEntitlements, type PlanId } from "@prood/billing"
// organization.planId from auth schema (default 'free')
const limits = getEntitlements(organization.planId as PlanId)
```

Shared helpers: `apps/api/lib/enforcement.ts`, `packages/commerce/src/enforcement.ts` (`assertLimit`, `assertFeature`).

## Stripe (future)

- `organization.stripe_customer_id` / `stripe_subscription_id` populated on checkout success webhook.
- `plan_status`: `trialing` during 14-day trial, `past_due` on failed payment, `canceled` on churn.
- Map Stripe Price IDs to `PlanId` in env or `packages/billing` config when implementing Checkout.

## Status

| Layer | Status |
| --- | --- |
| `@prood/billing` entitlements | Done |
| `organization.plan_id` columns | Done (schema) |
| Runtime enforcement | Done (limits above) |
| Stripe Billing | Not started |
