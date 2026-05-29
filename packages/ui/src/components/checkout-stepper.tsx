import { CheckIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@prood/ui/lib/utils"

export interface CheckoutStep {
  id: string
  title: string
  description?: string
}

export interface CheckoutStepperProps {
  steps: CheckoutStep[]
  /** Index of the current (active) step. */
  current: number
  className?: string
}

export function CheckoutStepper({ steps, current, className }: CheckoutStepperProps) {
  return (
    <ol className={cn("flex items-center gap-2", className)}>
      {steps.map((step, i) => {
        const completed = i < current
        const active = i === current
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                data-active={active}
                data-completed={completed}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  completed && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !completed && !active && "border-border text-muted-foreground",
                )}
              >
                {completed ? <CheckIcon /> : i + 1}
              </span>
              <div className="hidden flex-col sm:flex">
                <span
                  className={cn(
                    "text-sm font-medium",
                    active || completed ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                {step.description ? (
                  <span className="text-muted-foreground text-xs">{step.description}</span>
                ) : null}
              </div>
            </div>
            {i < steps.length - 1 ? (
              <div
                className={cn(
                  "h-px flex-1",
                  i < current ? "bg-primary" : "bg-border",
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
