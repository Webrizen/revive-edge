import React from "react";
import ExtraBentoInfo from "@/components/system/marketing-sections/extra-bento-info";
import FeaturesSection from "@/components/system/marketing-sections/features-section";
import HeroSection from "@/components/system/marketing-sections/hero-section";
import TestimonialsSection from "@/components/system/marketing-sections/testimonials-section";
import PricingSection from "@/components/system/marketing-sections/pricing-section";
import CtaSection from "@/components/system/marketing-sections/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ExtraBentoInfo />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
