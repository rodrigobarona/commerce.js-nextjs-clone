import { valueStripItems } from "@/lib/site"

export function ValueStripSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3 md:py-14">
        {valueStripItems.map((item) => (
          <div key={item.title}>
            <h3 className="text-[15px] font-semibold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
