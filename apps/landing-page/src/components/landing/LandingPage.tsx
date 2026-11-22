import { AiSection } from "@/components/landing/AiSection";
import { CollabSection } from "@/components/landing/CollabSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Hero } from "@/components/landing/Hero";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TemplatesSection } from "@/components/landing/TemplatesSection";

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturesGrid />
        <CollabSection />
        <AiSection />
        <TemplatesSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
