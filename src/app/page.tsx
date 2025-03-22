import { SocialProof } from "@/components/social-proof";
import Solution from "@/components/solution";
import Stats from "@/components/stats";
import Benefits from "@/components/benefits";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import FAQ from "@/components/faq";
import CTV from "@/components/ctv";
import Footer from "@/components/footer";
import { ThemeEffect } from "@/components/theme-effect";
import GrainEffect from "@/components/grain-effect";
import { Suspense, lazy } from "react";
import { EnhancedSection } from "@/components/enhanced-layout";
import { GrainyTexture } from "@/components/effects/grainy-texture";

const LazyHeroSection = lazy(() => import("@/components/hero-section").then(module => ({ default: module.StandaloneHeroSection })));
const LazyFeatures = lazy(() => import("@/components/features").then(module => ({ default: module.default })));

export default function Home() {
  return (
    <>
      {/* Global background effects - using a more subtle grain */}
      <ThemeEffect />
      <GrainEffect />
      <GrainyTexture opacity={0.15} blend="soft-light" />
      
      {/* Main content with smooth scrolling */}
      <main className="relative min-h-screen overflow-hidden scroll-smooth" id="top">
        {/* Hero section with full viewport height */}
        <section className="relative z-10">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LazyHeroSection />
          </Suspense>
        </section>
        
        {/* Social proof with subtle entrance animation - cyan tinted grain */}
        <EnhancedSection 
          className="py-12 md:py-16"
          withParticles={true}
          particleColor="rgba(82, 170, 173, 0.3)"
          lineColor="rgba(171, 81, 55, 0.15)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 to-indigo-500/10"
          grainColor="rgba(82, 170, 173, 0.03)" // Cyan tint to grain
          grainOpacity={0.12}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SocialProof />
          </div>
        </EnhancedSection>
        
        {/* Features section with increased spacing - purple tinted grain */}
        <EnhancedSection 
          className="py-16 md:py-24"
          withGrain={true}
          grainOpacity={0.18}
          grainColor="rgba(125, 99, 205, 0.03)" // Purple tint to grain
          backgroundGradient="bg-gradient-to-b from-[#121116]/0 via-purple-600/5 to-[#121116]/0"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading features...</div>}>
              <LazyFeatures />
            </Suspense>
          </div>
        </EnhancedSection>
        
        {/* Solution section with contrasting background - rust tinted grain */}
        <EnhancedSection 
          className="py-20 md:py-32"
          withParticles={true}
          particleColor="rgba(171, 81, 55, 0.3)"
          lineColor="rgba(82, 170, 173, 0.15)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#ab5137]/5 to-[#121116]/0"
          grainColor="rgba(171, 81, 55, 0.03)" // Rust tint to grain
          grainOpacity={0.15}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Solution />
          </div>
        </EnhancedSection>
        
        {/* Stats with visual impact - neutral grain */}
        <EnhancedSection 
          className="py-16 md:py-24"
          withGrain={true}
          backgroundGradient="bg-gradient-to-r from-[#121116]/20 via-background/0 to-[#121116]/20"
          grainOpacity={0.1}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Stats />
          </div>
        </EnhancedSection>
        
        {/* Benefits with improved spacing - blue tinted grain */}
        <EnhancedSection 
          className="py-20 md:py-28"
          withParticles={true}
          particleColor="rgba(82, 170, 173, 0.4)"
          lineColor="rgba(171, 81, 55, 0.2)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/5 to-[#121116]/0"
          grainColor="rgba(59, 130, 246, 0.03)" // Blue tint to grain
          grainOpacity={0.15}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Benefits />
          </div>
        </EnhancedSection>
        
        {/* How it works with proper spacing - gold tinted grain */}
        <EnhancedSection 
          className="py-24 md:py-32"
          withGrain={true}
          grainOpacity={0.14}
          grainColor="rgba(200, 157, 74, 0.03)" // Gold tint to grain
          backgroundGradient="bg-gradient-to-b from-[#121116]/0 via-[#c89d4a]/5 to-[#121116]/0"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HowItWorks />
          </div>
        </EnhancedSection>
        

        
        {/* Testimonials with enhanced focus - blue tinted grain */}
        <EnhancedSection 
          className="py-20 md:py-32"
          withGrain={true}
          grainOpacity={0.12}
          grainColor="rgba(59, 130, 246, 0.03)" // Blue tint to grain
          backgroundGradient="bg-gradient-to-b from-[#121116]/0 via-[#3b82f6]/10 to-[#121116]/0"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Testimonials />
          </div>
        </EnhancedSection>
        
        {/* Newsletter with prominent display - rust tinted grain */}
        <EnhancedSection 
          className="py-16 md:py-24"
          withParticles={true}
          particleColor="rgba(171, 81, 55, 0.3)"
          lineColor="rgba(82, 170, 173, 0.2)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#ab5137]/5 to-[#121116]/0"
          grainColor="rgba(171, 81, 55, 0.03)" // Rust tint to grain
          grainOpacity={0.12}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Newsletter />
          </div>
        </EnhancedSection>
        
        {/* FAQ with clear section differentiation - subtle neutral grain */}
        <EnhancedSection 
          className="py-20 md:py-28"
          withGrain={true}
          grainOpacity={0.1}
          backgroundGradient="bg-gradient-to-b from-[#121116]/0 to-[#121116]/20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <FAQ />
          </div>
        </EnhancedSection>
        
        {/* CTV (Call to Value) with high visibility - mixed cyan and gold grain */}
        <EnhancedSection 
          className="py-24 md:py-32"
          withParticles={true}
          particleColor="rgba(82, 170, 173, 0.4)"
          lineColor="rgba(200, 157, 74, 0.2)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/10 to-[#121116]/0"
          grainColor="rgba(136, 160, 166, 0.03)" // Mixed cyan-gold tint
          grainOpacity={0.14}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CTV />
          </div>
        </EnhancedSection>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-background/80 backdrop-blur-md">
        <EnhancedSection 
          className="py-12"
          withParticles={true}
          particleColor="rgba(82, 170, 173, 0.3)"
          lineColor="rgba(171, 81, 55, 0.15)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/5 to-[#121116]/10"
          grainColor="rgba(82, 170, 173, 0.03)"
          grainOpacity={0.12}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </EnhancedSection>
      </footer>
      
      {/* Enhanced scroll to top button with glow effect */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="#top" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 text-white shadow-lg hover:bg-primary transition-all duration-300 backdrop-blur-sm hover:shadow-primary/30 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </a>
      </div>
    </>
  );
}
