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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
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
    <div ref={ref} className="w-full">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center space-y-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-medium text-white/80"
        >
          Will be trusted by innovative companies worldwide
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <motion.div 
              key={brand.name}
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 transition-all duration-300 border border-white/5 hover:border-white/10 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-400/10 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
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
  );
}

export { SocialProof };