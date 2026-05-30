import { eq } from "drizzle-orm"

import {
  defaultPlanId,
  getEntitlements,
  getPlan,
  isValidPlanId,
  type PlanId,
} from "@prood/billing"

import { getActiveOrganizationId } from "./auth"
import { authDb } from "./auth/db"
import { organization } from "./auth/schema"

export type OrganizationPlanSnapshot = {
  organizationId: string
  planId: PlanId
  planStatus: string
  planName: string
}

export async function getActiveOrganizationPlan(): Promise<OrganizationPlanSnapshot | null> {
  const orgId = await getActiveOrganizationId()
  if (!orgId) return null

  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {
      organizationId: orgId,
      planId: defaultPlanId,
      planStatus: "active",
      planName: getPlan(defaultPlanId).name,
    }
  }

  const [row] = await authDb
    .select({
      planId: organization.planId,
      planStatus: organization.planStatus,
    })
    .from(organization)
    .where(eq(organization.id, orgId))
    .limit(1)

  const planId = row && isValidPlanId(row.planId) ? row.planId : defaultPlanId

  return {
    organizationId: orgId,
    planId,
    planStatus: row?.planStatus ?? "active",
    planName: getPlan(planId).name,
  }
}

export function getPlanLimitsSummary(planId: PlanId): string[] {
  const e = getEntitlements(planId)
  const lines: string[] = []
  if (e.maxProducts !== null) lines.push(`${e.maxProducts} products`)
  else lines.push("Unlimited products")
  if (e.maxOrdersPerMonth !== null) lines.push(`${e.maxOrdersPerMonth} orders/mo`)
  else lines.push("Unlimited orders/mo")
  if (e.maxCustomDomains !== null) lines.push(`${e.maxCustomDomains} custom domain(s)`)
  else lines.push("Unlimited custom domains")
  if (e.maxTeamSeats !== null) lines.push(`${e.maxTeamSeats} team seat(s)`)
  else lines.push("Unlimited team seats")
  if (e.agentAuthEnabled) lines.push("Agent Auth included")
  return lines
}
