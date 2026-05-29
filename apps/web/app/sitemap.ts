import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

const routes = ["/", "/pricing", "/agencies", "/integrations", "/ai", "/privacy", "/terms"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "")

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }))
}
