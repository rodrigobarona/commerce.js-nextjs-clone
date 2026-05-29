import { AudiencesSection } from "@/components/marketing/audiences-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { HeroSection } from "@/components/marketing/hero-section"
import { PlatformSection } from "@/components/marketing/platform-section"
import { PrinciplesSection } from "@/components/marketing/principles-section"
import { ProblemSection } from "@/components/marketing/problem-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <PrinciplesSection />
        <PlatformSection />
        <AudiencesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
