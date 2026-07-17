import { HeroSection } from "@/components/sections/hero-section";
import { TrustedPlatformsSection } from "@/components/sections/trusted-platforms-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { WhyMacroTrackSection } from "@/components/sections/why-macrotrack-section";
import { ProductPreviewSection } from "@/components/sections/product-preview-section";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { LiveCounterSection } from "@/components/sections/live-counter-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedPlatformsSection />
      <FeaturesSection />
      <WhyMacroTrackSection />
      <ProductPreviewSection />
      <WaitlistSection />
      <LiveCounterSection />
      <FounderSection />
      <FaqSection />
    </>
  );
}
