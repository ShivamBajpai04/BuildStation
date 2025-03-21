"use client";

import { StaggerChildren } from "@/components/effects/animated-components";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/effects/interactive-card";
import { GradientText } from "@/components/effects/gradient-text";

export default function Stats() {
  const stats = [
    {
      value: "97%",
      label: "Customer Satisfaction",
      description: "Across all platforms",
      icon: "⭐",
      color: "#52aaad",
    },
    {
      value: "24/7",
      label: "Support Response",
      description: "Available worldwide",
      icon: "🌎",
      color: "#c89d4a",
    },
    {
      value: "10x",
      label: "Faster Results",
      description: "Than traditional methods",
      icon: "⚡",
      color: "#ab5137",
    },
    {
      value: "500+",
      label: "Enterprise Clients",
      description: "Across all industries",
      icon: "🏢",
      color: "#52aaad",
    },
  ];

  return (
    <div className="py-12">
      <StaggerChildren
        className="text-center space-y-12"
        delayChildren={0.2}
      >
        <div className="space-y-4 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Delivering Real <GradientText text="Results" gradient="from-[#52aaad] to-[#c89d4a]" animate interactive />
          </h2>
          <p className="text-white/70 text-lg">
            Our platform is designed to provide measurable outcomes that transform your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {stats.map((stat, index) => (
            <InteractiveCard
              key={index}
              className="rounded-xl p-6 bg-[#0c0c10]/60 backdrop-blur-sm"
              glowColor={`${stat.color}30`}
              grainOpacity={0}
              
              border={false} // Disable the default border
              shadow
              rotationIntensity={5}
              backgroundGradient={`bg-gradient-to-br from-[${stat.color}]/5 to-transparent`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2"
                  style={{ 
                    backgroundColor: `${stat.color}15`,
                    boxShadow: `0 0 20px ${stat.color}20`,
                    border: `1px solid ${stat.color}30`
                  }}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="font-medium text-white/90">{stat.label}</div>
                <p className="text-sm text-white/70">{stat.description}</p>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}

