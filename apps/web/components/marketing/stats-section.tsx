import { logoCloudPlaceholder, marketingStats } from "@/lib/site"

export function StatsSection() {
  return (
    <section className="marketing-section-muted">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <p className="text-center text-[13px] font-medium tracking-wide text-muted-foreground">
          {logoCloudPlaceholder.headline}
        </p>
        <dl className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {marketingStats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative text-center"
            >
              {index > 0 ? (
                <div
                  className="absolute -left-4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border/80 sm:block"
                  aria-hidden
                />
              ) : null}
              <dt className="text-[13px] text-muted-foreground">{stat.label}</dt>
              <dd className="marketing-stat-value mt-2">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
