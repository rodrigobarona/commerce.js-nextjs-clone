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
        <span className="marketing-mock-dot" aria-hidden />
        <span className="marketing-mock-dot" aria-hidden />
        <span className="marketing-mock-dot" aria-hidden />
        <span className="ml-2 truncate font-mono text-[11px] tracking-wide text-muted-foreground">
          {url ?? title ?? "Prood"}
        </span>
      </div>
      {children}
    </div>
  )
}
