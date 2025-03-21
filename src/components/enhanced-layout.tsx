"use client";

import React from "react";
import { ParticleBackground } from "@/components/effects/particle-background";
import { GrainyTexture } from "@/components/effects/grainy-texture";
import { cn } from "@/lib/utils";

interface EnhancedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  withParticles?: boolean;
  particleColor?: string;
  lineColor?: string;
  withGrain?: boolean;
  grainOpacity?: number;
  grainColor?: string; // Added grainColor property
  backgroundGradient?: string;
  className?: string;
}

export function EnhancedSection({
  children,
  withParticles = false,
  particleColor = "rgba(82, 170, 173, 0.5)",
  lineColor = "rgba(171, 81, 55, 0.2)",
  withGrain = true,
  grainOpacity = 0.15,
  grainColor, // Color for grain
  backgroundGradient,
  className,
  ...rest
}: EnhancedSectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)} {...rest}>
      {/* Optional background gradient */}
      {backgroundGradient && (
        <div className={`absolute inset-0 ${backgroundGradient} opacity-60`} />
      )}

      {/* Optional grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#52aaad18 1px, transparent 1px), linear-gradient(to right, #52aaad18 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Optional particle background */}
      {withParticles && (
        <ParticleBackground
          particleColor={particleColor}
          lineColor={lineColor}
          quantity={40}
          minSpeed={0.05}
          maxSpeed={0.15}
          size={1.5}
        />
      )}

      {/* Optional grain texture */}
      {withGrain && <GrainyTexture opacity={grainOpacity} color={grainColor} />}

      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#52aaad]/10 filter blur-[80px] opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#ab5137]/10 filter blur-[100px] opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
