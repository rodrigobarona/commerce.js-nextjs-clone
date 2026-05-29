import Image from "next/image"
import Link from "next/link"
import { Button } from "@prood/ui/components/button"
import { cn } from "@prood/ui/lib/utils"

export interface HeroBannerProps {
  title: string
  subtitle?: string
  imageUrl?: string
  align?: "start" | "center" | "end"
  overlay?: boolean
  height?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

const ALIGN: Record<NonNullable<HeroBannerProps["align"]>, string> = {
  start: "items-start text-left",
  center: "items-center text-center",
  end: "items-end text-right",
}

export function HeroBanner({
  title,
  subtitle,
  imageUrl,
  align = "center",
  overlay = true,
  height = "min-h-[420px]",
  primaryLabel,
  primaryHref = "#",
  secondaryLabel,
  secondaryHref = "#",
  className,
}: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative flex w-full overflow-hidden rounded-3xl bg-muted",
        height,
        className,
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      {overlay && imageUrl ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      ) : null}
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-3xl flex-col justify-center gap-4 p-10",
          ALIGN[align],
          imageUrl ? "text-white" : "text-foreground",
        )}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle ? <p className="max-w-xl text-lg opacity-90">{subtitle}</p> : null}
        <div className="flex gap-3">
          {primaryLabel ? (
            <Button asChild size="lg">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
          ) : null}
          {secondaryLabel ? (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
