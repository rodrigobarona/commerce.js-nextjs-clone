import { MockChrome } from "@/components/marketing/mocks/mock-chrome"
import { mockIntegrations } from "@/lib/marketing-mocks"
import { cn } from "@/lib/utils"

export function IntegrationsMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Integrations" url="dashboard.prood.app/integrations" className={className}>
      <p className="sr-only">Example payment integrations per store</p>
      <ul className="divide-y divide-border/60 p-1" aria-hidden>
        {mockIntegrations.map((item) => (
          <li key={item.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-[13px] font-medium">{item.name}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                item.status === "Connected"
                  ? "bg-brand/10 text-brand"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </MockChrome>
  )
}
