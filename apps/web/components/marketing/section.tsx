import { cn } from "@/lib/utils"

export function SectionShell({
  id,
  className,
  children,
  variant = "default",
}: {
  id?: string
  className?: string
  children: React.ReactNode
  variant?: "default" | "muted" | "glow"
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-16",
        variant === "muted" && "border-y border-border/50 bg-muted/15",
        variant === "glow" && "overflow-hidden",
        className
      )}
    >
      {variant === "glow" ? (
        <>
          <div className="marketing-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative">{children}</div>
        </>
      ) : (
        children
      )}
    </section>
  )
}

export function SectionContainer({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 py-24 md:py-32", className)}>
      {children}
    </div>
  )
}

export function SectionHeader({
  align = "left",
  eyebrow,
  title,
  description,
  className,
}: {
  align?: "left" | "center"
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {description ? (
        <p className="section-description mt-4">{description}</p>
      ) : null}
    </div>
  )
}

export function MarketingCard({
  className,
  children,
  hover = false,
}: {
  className?: string
  children: React.ReactNode
  hover?: boolean
}) {
  return (
    <article
      className={cn(
        "surface-card rounded-2xl p-6 md:p-8",
        hover && "surface-card-hover transition-[border-color,background-color,box-shadow] duration-300",
        className
      )}
    >
      {children}
    </article>
  )
}
