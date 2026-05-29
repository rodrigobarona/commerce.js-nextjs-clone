import Link from "next/link"

import { PlaceholderPage } from "@/components/placeholder-page"

const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3001"

export const metadata = { title: "Billing" }

export default function BillingPage() {
  return (
    <PlaceholderPage
      title="Billing"
      description="Manage your platform subscription and payment method."
    >
      <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-4 text-sm text-muted-foreground">
        <p>
          You are on the <strong className="text-foreground">Free</strong> plan. Subscription billing
          is coming soon.
        </p>
        <p className="mt-2">
          <Link
            href={`${webUrl}/pricing`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View plans and pricing
          </Link>
        </p>
      </div>
    </PlaceholderPage>
  )
}
