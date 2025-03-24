"use client";

import { AnimatedButton } from "@/components/effects/animated-button";
import { Floating, StaggerChildren } from "@/components/effects/animated-components";
import { InteractiveCard } from "@/components/effects/interactive-card";
import { GradientText } from "@/components/effects/gradient-text";
import { ArrowRight, Zap } from "lucide-react";

export default function CTV() {
  return (
    <div className="relative">
      <InteractiveCard
        className="rounded-2xl overflow-hidden border-white/10"
        backgroundGradient="bg-gradient-to-b from-[#0c0c10] to-[#121116]"
        glowColor="rgba(82, 170, 173, 0.15)"
        grainOpacity={0.14} // Consistent grain opacity
        rotationIntensity={2}
        hoverScale={1.01}
      >
        <div className="p-8 md:p-12 lg:p-16">
          <StaggerChildren
            className="max-w-4xl mx-auto text-center space-y-10"
            direction="up"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Begin Your <GradientText text="Journey" gradient="from-[#3b82f6] via-[#c89d4a] to-[#ab5137]" animate />
                <br />Today
              </h2>
              
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Experience the future of work. Our platform is ready to transform your workflow with AI-powered solutions.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-5 justify-center">
              <AnimatedButton
                size="lg"
                variant="gradient"
                gradient="from-[#3b82f6] to-[#3b82f6]"
                className="rounded-md text-white px-8"
                shine
                glowIntensity="medium"
                grainy={true}
                grainOpacity={0.08} // Subtle grain on button
                icon={<Zap className="h-5 w-5" />}
              >
                Search/Post Jobs
              </AnimatedButton>

              <AnimatedButton
                size="lg"
                variant="outline"
                className="rounded-md text-white border-white/20 bg-white/5 hover:bg-white/10"
                grainy={false} // No grain on this button for contrast
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                See Demo
              </AnimatedButton>
            </div>

            <p className="text-sm text-white/50 max-w-lg mx-auto">
              No credit card required. 14-day free trial. Cancel anytime.
            </p>
          </StaggerChildren>
        </div>

        {/* Decorative elements */}
        <Floating
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#3b82f6]/10 filter blur-[80px]"
          duration={7}
          y={15}
        />
        <Floating
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#ab5137]/10 filter blur-[100px]"
          duration={9}
          y={20}
          delay={1}
        />
      </InteractiveCard>
    </div>
  );
}

