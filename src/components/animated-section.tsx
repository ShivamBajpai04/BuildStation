"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
  triggerOnce = true,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        threshold: threshold,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [triggerOnce, threshold]);

  // Define animation variables based on direction
  const getAnimationProps = () => {
    const distance = 50;
    
    switch (direction) {
      case "up":
        return { y: [distance, 0], opacity: [0, 1] };
      case "down":
        return { y: [-distance, 0], opacity: [0, 1] };
      case "left":
        return { x: [distance, 0], opacity: [0, 1] };
      case "right":
        return { x: [-distance, 0], opacity: [0, 1] };
      default:
        return { y: [distance, 0], opacity: [0, 1] };
    }
  };

  return (
    <div ref={sectionRef} className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? getAnimationProps() : { opacity: 0 }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
