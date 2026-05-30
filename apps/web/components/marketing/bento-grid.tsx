import { cn } from "@/lib/utils"

/** Gap-px grid with neutral dividers (Speakeasy / Neon surface layering). */
export function BentoGrid({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "grid gap-3 overflow-hidden rounded-2xl md:gap-px md:rounded-xl md:border md:border-border/80 md:bg-border/60 md:p-px",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCell({
  className,
  children,
  accent = false,
}: {
  className?: string
  children: React.ReactNode
  /** Slightly elevated graphite surface — not a color wash */
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        "min-h-[8rem] rounded-xl border border-border/70 bg-card p-6 shadow-sm md:rounded-none md:border-0 md:shadow-none md:p-8",
        accent ? "geo-bento-cell-elevated ring-1 ring-brand/15 md:ring-0" : "geo-bento-cell-default",
        className
      )}
    >
      {children}
    </div>
  )
}
