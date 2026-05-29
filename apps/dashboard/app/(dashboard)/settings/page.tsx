import type { StoreSettings } from "@workspace/commerce"
import {
  SettingsForm,
  type SettingsFormValues,
} from "@/components/store/settings-form"
import { withActiveOrg } from "@/lib/admin"

export const metadata = { title: "Settings" }

const EMPTY: SettingsFormValues = {
  name: "",
  description: "",
  contactEmail: "",
  contactPhone: "",
  currency: "EUR",
  locale: "en",
  timezone: "UTC",
  address: "",
}

function toFormValues(settings: StoreSettings): SettingsFormValues {
  return {
    name: settings.name ?? "",
    description: settings.description ?? "",
    contactEmail: settings.contactEmail ?? "",
    contactPhone: settings.contactPhone ?? "",
    currency: settings.currency ?? "EUR",
    locale: settings.locale ?? "en",
    timezone: settings.timezone ?? "UTC",
    address: settings.address ?? "",
  }
}

export default async function SettingsPage() {
  let initial = EMPTY
  try {
    const settings = await withActiveOrg((admin) => admin.getStoreSettings())
    initial = toFormValues(settings)
  } catch {
    /* DB unavailable — render empty form */
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-xl font-medium">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your store details and preferences.
        </p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  )
}
