"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Helper function for useInView
function useInView(ref: React.RefObject<HTMLDivElement | null>, options: { once?: boolean; amount?: number }) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && options.once) {
          observer.unobserve(ref.current!);
        }
      },
      { threshold: options.amount || 0 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.amount, options.once]);

  return isInView;
}

interface FadeInWhenVisibleProps extends React.PropsWithChildren {
  threshold?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeInWhenVisible({
  children,
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  direction = "up",
}: FadeInWhenVisibleProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = {
    hidden: {
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps extends React.PropsWithChildren {
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  childrenDelay?: number;
  childrenDuration?: number;
}

export function StaggerChildren({
  children,
  className,
  delayChildren = 0.2,
  staggerChildren = 0.1,
  direction = "up",
  childrenDelay = 0,
  childrenDuration = 0.5,
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: childrenDuration,
        delay: childrenDelay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface FloatingProps extends React.PropsWithChildren {
  className?: string;
  duration?: number;
  y?: number;
  delay?: number;
}

export function Floating({
  children,
  className,
  duration = 3,
  y = 10,
  delay = 0,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-y/2, y/2, -y/2] }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
