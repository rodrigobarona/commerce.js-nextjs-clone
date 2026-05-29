import { techStack } from "@/lib/site"

export function TechStackStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border border-border bg-card/60 px-5 py-3">
      {techStack.map((item, index) => (
        <div key={item} className="flex items-center">
          <span className="px-3 font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {item}
          </span>
          {index < techStack.length - 1 ? (
            <span className="h-3 w-px bg-border" aria-hidden />
          ) : null}
        </div>
      ))}
    </div>
  )
}
