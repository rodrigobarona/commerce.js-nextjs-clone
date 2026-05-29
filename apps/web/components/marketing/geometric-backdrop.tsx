import { cn } from "@/lib/utils"

type GeometricBackdropProps = {
  className?: string
  /** Faint line grid in addition to dots */
  lines?: boolean
}

/** Subtle dot field (neon.tech-style), not heavy blueprint grids. */
export function GeometricBackdrop({ className, lines = false }: GeometricBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-0 geo-grid-dots" />
      {lines ? <div className="absolute inset-0 geo-grid-lines" /> : null}
    </div>
  )
}
