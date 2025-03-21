"use client";

import { StaggerChildren } from "@/components/effects/animated-components";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SocialProof() {
  const brands = [
    { name: "CompanyOne", logo: "/logos/logo1.svg" },
    { name: "CompanyTwo", logo: "/logos/logo2.svg" },
    { name: "CompanyThree", logo: "/logos/logo3.svg" },
    { name: "CompanyFour", logo: "/logos/logo4.svg" },
    { name: "CompanyFive", logo: "/logos/logo5.svg" },
    { name: "CompanySix", logo: "/logos/logo6.svg" },
  ];

  return (
    <div className="py-8 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#52aaad]/5 to-transparent opacity-60" />
      
      <StaggerChildren
        className="text-center space-y-8"
        delayChildren={0.1}
        staggerChildren={0.05}
        direction="up"
      >
        <h2 className="text-xl md:text-2xl font-medium text-white/80">
          Trusted by innovative companies worldwide
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="w-32 h-12 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-md flex items-center justify-center px-4">
                {/*
                  Note: These are placeholder logos. 
                  In a real implementation, you would use actual logo images with proper paths.
                */}
                <div className="text-white/70 font-medium">{brand.name}</div>
              </div>
            </div>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}
