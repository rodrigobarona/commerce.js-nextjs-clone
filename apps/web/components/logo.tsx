import { cn } from "@/lib/utils"

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative flex size-8 items-center justify-center rounded-[10px] bg-foreground text-background shadow-[0_0_0_1px_oklch(from_var(--foreground)_l_c_h_/_12%)_inset,0_1px_2px_oklch(from_var(--background)_l_c_h_/_50%)]"
        aria-hidden
      >
        <span className="font-mono text-[13px] font-semibold tracking-[-0.06em]">P</span>
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brand ring-2 ring-background" />
      </span>
      {showWordmark ? (
        <span className="text-[15px] font-semibold tracking-[-0.03em]">Prood</span>
      ) : null}
    </span>
  )
}
