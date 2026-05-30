import { cn } from "@/lib/utils"

export function SplitShowcase({
  reverse = false,
  eyebrow,
  title,
  description,
  children,
  visual,
  className,
}: {
  reverse?: boolean
  eyebrow: string
  title: string
  description: string
  children?: React.ReactNode
  visual: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
        reverse && "lg:[&>*:first-child]:order-2",
        className
      )}
    >
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h3 className="section-title mt-4">{title}</h3>
        <p className="section-description mt-4">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
      <div className="min-w-0">{visual}</div>
    </div>
  )
}
