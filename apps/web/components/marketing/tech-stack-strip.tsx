import { techStack } from "@/lib/site"

export function TechStackStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-2">
      {techStack.map((item, index) => (
        <div key={item} className="flex items-center">
          <span className="px-4 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground/70 uppercase">
            {item}
          </span>
          {index < techStack.length - 1 ? (
            <span
              className="hidden h-3 w-px bg-border/80 sm:block"
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
