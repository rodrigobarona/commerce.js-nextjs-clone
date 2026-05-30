import { cn } from "@/lib/utils"

export function MockChrome({
  title,
  url,
  className,
  children,
}: {
  title?: string
  url?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("marketing-panel overflow-hidden", className)}>
      <div className="marketing-mock-chrome">
        <span className="marketing-mock-dot marketing-mock-dot-red" aria-hidden />
        <span className="marketing-mock-dot marketing-mock-dot-yellow" aria-hidden />
        <span className="marketing-mock-dot marketing-mock-dot-green" aria-hidden />
        <span className="ml-1 truncate font-mono text-[11px] tracking-wide text-muted-foreground">
          {url ?? title ?? "Prood"}
        </span>
      </div>
      {children}
    </div>
  )
}

export function MockFrame({
  featured = false,
  className,
  children,
}: {
  featured?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "marketing-mock-frame rounded-lg",
        featured && "marketing-mock-frame-featured",
        className
      )}
    >
      {children}
    </div>
  )
}
