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
        "grid gap-px overflow-hidden rounded-lg border border-border bg-border p-px",
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
        "min-h-[8rem] p-6 md:p-8",
        accent ? "geo-bento-cell-elevated" : "geo-bento-cell-default",
        className
      )}
    >
      {children}
    </div>
  )
}
