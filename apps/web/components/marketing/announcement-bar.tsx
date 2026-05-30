import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { siteAnnouncement } from "@/lib/site"

export function AnnouncementBar() {
  if (!siteAnnouncement) return null

  return (
    <div className="border-b border-border/60 bg-muted/40">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2.5 text-center text-[13px] text-muted-foreground">
        <span>{siteAnnouncement.message}</span>
        {siteAnnouncement.href ? (
          <Link
            href={siteAnnouncement.href}
            className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            {siteAnnouncement.linkLabel ?? "Learn more"}
            <ArrowRightIcon className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>
    </div>
  )
}
