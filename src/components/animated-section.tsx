"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FadeInWhenVisible } from "@/components/effects/animated-components";

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  ...props
}: AnimatedSectionProps) {
  return (
    <FadeInWhenVisible
      className={cn(className)}
      direction={direction}
      delay={delay}
      duration={duration}
      threshold={threshold}
      once={once}
      {...props}
    >
      {children}
    </FadeInWhenVisible>
  );
}
