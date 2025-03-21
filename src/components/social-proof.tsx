"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const brands = [
    { name: "Amazon", logo: "/logos/logo1.svg" },
    { name: "Microsoft", logo: "/logos/logo2.svg" },
    { name: "Google", logo: "/logos/logo3.svg" },
    { name: "Apple", logo: "/logos/logo4.svg" },
    { name: "Meta", logo: "/logos/logo5.svg" },
    { name: "Netflix", logo: "/logos/logo6.svg" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 bg-gray-900 relative"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#52aaad]/5 to-transparent opacity-60" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          className="text-center space-y-12"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white/80">
            Will be trusted by innovative companies worldwide
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {brands.map((brand) => (
              <motion.div 
                key={brand.name}
                className="flex flex-col items-center space-y-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-white/60 font-medium">{brand.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { SocialProof };
