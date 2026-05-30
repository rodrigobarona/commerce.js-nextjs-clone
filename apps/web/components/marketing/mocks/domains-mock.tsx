import { CheckIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr"

import { MockChrome } from "@/components/marketing/mocks/mock-chrome"
import { mockCustomDomain, mockSubdomain } from "@/lib/marketing-mocks"

export function DomainsMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Domains" url="dashboard.prood.app/domains" className={className}>
      <p className="sr-only">Example domain settings with subdomain and verified custom domain</p>
      <ul className="divide-y divide-border/60" aria-hidden>
        <li className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <GlobeIcon className="size-4 shrink-0 text-brand" weight="duotone" />
            <div className="min-w-0">
              <p className="truncate font-mono text-[12px]">{mockSubdomain}</p>
              <p className="text-[11px] text-muted-foreground">Subdomain · included</p>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-medium text-brand">Live</span>
        </li>
        <li className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <CheckIcon className="size-4 shrink-0 text-brand" weight="bold" />
            <div className="min-w-0">
              <p className="truncate font-mono text-[12px]">{mockCustomDomain}</p>
              <p className="text-[11px] text-muted-foreground">Custom domain · verified</p>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-medium text-brand">SSL</span>
        </li>
      </ul>
    </MockChrome>
  )
}
