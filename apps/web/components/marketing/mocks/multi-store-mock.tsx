import { MockChrome } from "@/components/marketing/mocks/mock-chrome"

const stores = [
  { name: "Acme Retail", slug: "acme-retail" },
  { name: "Northwind Studio", slug: "northwind" },
  { name: "Harbor Goods", slug: "harbor-goods" },
] as const

export function MultiStoreMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Stores" url="dashboard.prood.app" className={className}>
      <p className="sr-only">Example agency view with multiple client stores</p>
      <ul className="divide-y divide-border/60" aria-hidden>
        {stores.map((store, i) => (
          <li
            key={store.slug}
            className={i === 0 ? "flex items-center justify-between bg-muted/20 px-4 py-3" : "flex items-center justify-between px-4 py-3"}
          >
            <div>
              <p className="text-[13px] font-medium">{store.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {store.slug}.prood.app
              </p>
            </div>
            {i === 0 ? (
              <span className="text-[10px] font-medium text-brand">Active</span>
            ) : null}
          </li>
        ))}
      </ul>
    </MockChrome>
  )
}
