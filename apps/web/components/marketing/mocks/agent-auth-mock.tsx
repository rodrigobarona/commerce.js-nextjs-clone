import { MockChrome } from "@/components/marketing/mocks/mock-chrome"

export function AgentAuthMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Agent Auth" url="dashboard.prood.app/settings/api-keys" className={className}>
      <p className="sr-only">Example Agent Auth capability approval</p>
      <div className="space-y-3 p-4" aria-hidden>
        <div className="rounded-lg border border-border bg-muted/20 p-3">
          <p className="text-[12px] font-medium">Inventory assistant</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Requested: catalog:write, orders:read</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-brand px-2 py-1 text-[10px] font-medium text-brand-foreground">
              Approve
            </span>
            <span className="rounded-md border border-border px-2 py-1 text-[10px]">Deny</span>
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-border px-3 py-2 text-[11px] text-muted-foreground">
          Mutations require merchant approval
        </div>
      </div>
    </MockChrome>
  )
}
