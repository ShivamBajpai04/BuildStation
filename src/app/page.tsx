// import HeroSection from "@/components/hero-section";
import SocialProof from "@/components/social-proof";
// import Features from "@/components/features";
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
import GrainEffect from "@/components/grain-effect";
import { Suspense, lazy } from "react";
import AnimatedSection from "@/components/animated-section";
import ParallaxBackground from "@/components/parallax-background";

// Lazy load some components for better performance
const LazyHeroSection = lazy(() => import("@/components/hero-section"));
const LazyFeatures = lazy(() => import("@/components/features"));

export default function Home() {
  return (
    <>
      {/* Background effects */}
      <ThemeEffect />
      <GrainEffect />
      
      {/* Main content with smooth scrolling */}
      <main className="relative min-h-screen overflow-hidden scroll-smooth" id="top">
        {/* Hero section with full viewport height */}
        <section className="relative z-10">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LazyHeroSection />
          </Suspense>
        </section>
        
        {/* Social proof with subtle entrance animation */}
        <ParallaxBackground intensity={0.1} className="py-12 md:py-16 relative z-10">
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SocialProof />
          </AnimatedSection>
        </ParallaxBackground>
        
        {/* Features section with increased spacing */}
        <section className="relative z-10 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" direction="up">
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading features...</div>}>
              <LazyFeatures />
            </Suspense>
          </AnimatedSection>
        </section>
        
        {/* Solution section with contrasting background */}
        <ParallaxBackground className="relative z-10 py-20 md:py-32" intensity={0.15}>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8" direction="right">
            <Solution />
          </AnimatedSection>
        </ParallaxBackground>
        
        {/* Stats with visual impact */}
        <section className="relative z-10 py-16 md:py-24 bg-gradient-to-r from-background/30 via-background/0 to-background/30">
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8" direction="up" threshold={0.2}>
            <Stats />
          </AnimatedSection>
        </section>
        
        {/* Benefits with improved spacing */}
        <ParallaxBackground className="relative z-10 py-20 md:py-28" intensity={0.2}>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" direction="left">
            <Benefits />
          </AnimatedSection>
        </ParallaxBackground>
        
        {/* How it works with proper spacing */}
        <section className="relative z-10 py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8" direction="up" threshold={0.15}>
            <HowItWorks />
          </AnimatedSection>
        </section>
        
        {/* Integrations with visual contrast */}
        <ParallaxBackground className="relative z-10 py-16 md:py-24" intensity={0.1}>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8" direction="right">
            <Integrations />
          </AnimatedSection>
        </ParallaxBackground>
        
        {/* Testimonials with enhanced focus */}
        <section className="relative z-10 py-20 md:py-32">
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" direction="up" threshold={0.2}>
            <Testimonials />
          </AnimatedSection>
        </section>
        
        {/* Newsletter with prominent display */}
        <ParallaxBackground className="relative z-10 py-16 md:py-24" intensity={0.15}>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl" direction="up">
            <Newsletter />
          </AnimatedSection>
        </ParallaxBackground>
        
        {/* FAQ with clear section differentiation */}
        <section className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-background/0 to-background/20">
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl" direction="up" threshold={0.1}>
            <FAQ />
          </AnimatedSection>
        </section>
        
        {/* CTV (Call to Value) with high visibility */}
        <ParallaxBackground className="relative z-10 py-24 md:py-32" intensity={0.25}>
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8" direction="up" delay={0.1}>
            <CTV />
          </AnimatedSection>
        </ParallaxBackground>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
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
