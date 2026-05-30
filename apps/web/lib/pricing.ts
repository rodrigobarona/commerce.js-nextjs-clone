/**
 * Marketing pricing surface — re-exports from @prood/billing (single source of truth).
 */
export type { PlanId, PlanId as PricingTierId, BillingInterval } from "@prood/billing"
export {
  annualBillingDiscountPercent,
  getFreeMarketingTier,
  getMarketingTier,
  getPaidMarketingTiers,
  getPricingFeatureGroupLabel,
  getTierHighlights,
  planDefinitions,
  planIds,
  pricingFaqs,
  pricingFeatureRows,
  pricingTrustPoints,
  type MarketingTier,
  type PricingFeatureGroup,
  type PricingFeatureRow,
} from "@prood/billing"
