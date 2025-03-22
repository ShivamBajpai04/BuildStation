"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animate?: boolean;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  interactive?: boolean;
  intensity?: number;
}

export function GradientText({
  text,
  className,
  gradient = "from-indigo-600 via-purple-600 to-pink-600",
  animate = false,
  duration = 8,
  delay = 0,
  as: Component = "span",
  interactive = false,
  intensity = 10,
}: GradientTextProps) {
  const [time, setTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // For interactive mode
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Mouse position transforms for 3D effect
  const xTransform = useTransform(
    xSpring,
    [-0.5, 0.5],
    [-intensity, intensity]
  );
  const yTransform = useTransform(
    ySpring,
    [-0.5, 0.5],
    [intensity, -intensity]
  );

  // Handle mouse move for interactive mode
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);

    setMousePosition({
      x: normalizedX * 100 + 50,
      y: normalizedY * 100 + 50,
    });
  };

  // Animation timer for moving gradient
  useEffect(() => {
    setIsMounted(true);

    if (!animate) return;

    const interval = setInterval(() => {
      setTime((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [animate]);

  const baseTextClasses = "font-bold";
  const gradientClasses = animate
    ? `bg-gradient-to-r ${gradient} bg-[length:300%_300%] animate-text-shimmer`
    : `bg-gradient-to-r ${gradient}`;

  if (!isMounted) {
    return (
      <Component
        className={cn(baseTextClasses, "text-transparent bg-clip-text", gradientClasses, className)}
      >
        {text}
      </Component>
    );
  }

  return (
    <motion.div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {interactive && isHovered && (
        <div
          className="absolute inset-0 -z-10 opacity-70 blur-xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.5), transparent 70%)`,
          }}
        />
      )}
      <motion.div
        style={{
          rotateX: interactive ? yTransform : 0,
          rotateY: interactive ? xTransform : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <Component
          className={cn(
            baseTextClasses,
            "text-transparent bg-clip-text",
            gradientClasses,
            className
          )}
          style={{
            backgroundPosition: animate ? `${time}% 50%` : undefined,
          }}
        >
          {text}
        </Component>
      </motion.div>
    </motion.div>
  );
}
