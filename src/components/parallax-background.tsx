"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  reverse?: boolean;
  containerClassName?: string;
}

export default function ParallaxBackground({
  children,
  className,
  intensity = 0.1,
  reverse = false,
  containerClassName,
  ...props
}: ParallaxBackgroundProps) {
  const { scrollY } = useScroll();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  // Update element position and screen height on mount and resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onResize = () => {
      setElementTop(element.offsetTop);
      setClientHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  const direction = reverse ? -1 : 1;
  
  // Calculate y offset based on scroll position
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [`${-intensity * 100 * direction}%`, `${intensity * 100 * direction}%`]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", containerClassName)} {...props}>
      <motion.div 
        className={cn("h-full w-full", className)}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
