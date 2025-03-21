import HeroSection from "@/components/hero-section";
import SocialProof from "@/components/social-proof";
import Features from "@/components/features";
import Solution from "@/components/solution";
import Stats from "@/components/stats";
import Benefits from "@/components/benefits";
import HowItWorks from "@/components/how-it-works";
import Integrations from "@/components/integrations";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import FAQ from "@/components/faq";
import CTV from "@/components/ctv";
import Footer from "@/components/footer";
import { ThemeEffect } from "@/components/theme-effect";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeEffect />
      <HeroSection />
      <SocialProof />
      <Features />
      <Solution />
      <Stats />
      <Benefits />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTV />
      <Footer />
    </main>
  );
}
