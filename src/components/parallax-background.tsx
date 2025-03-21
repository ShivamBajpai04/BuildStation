"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  className?: string;
  intensity?: number;
  children?: React.ReactNode;
}

export default function ParallaxBackground({
  className = "",
  intensity = 0.2,
  children,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${intensity * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-70" />
        <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-10" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
