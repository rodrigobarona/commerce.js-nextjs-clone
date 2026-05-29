import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const alt = siteConfig.tagline
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d1520 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#6b9fff",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            lineHeight: 1.5,
            color: "rgba(250, 250, 250, 0.72)",
            maxWidth: 820,
          }}
        >
          Launch on yourname.prood.app · Modern dashboard · Payments & AI-ready APIs
        </div>
      </div>
    ),
    { ...size }
  )
}
