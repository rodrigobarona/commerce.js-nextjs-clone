import { logoCloudPlaceholder, marketingStats } from "@/lib/site"

export function StatsSection() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <p className="text-center text-[13px] font-medium text-muted-foreground">
          {logoCloudPlaceholder.headline}
        </p>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {marketingStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-[13px] text-muted-foreground">{stat.label}</dt>
              <dd className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
