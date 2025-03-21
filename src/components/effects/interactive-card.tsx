"use client";

import React, { useRef, useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { GrainyTexture } from "./grainy-texture";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  backgroundGradient?: string;
  grainOpacity?: number;
  disableGrain?: boolean; // Added disableGrain property
  glowColor?: string;
  shadow?: boolean;
  rotationIntensity?: number;
  hoverScale?: number;
  border?: boolean;
  glowOnHover?: boolean;
}

export function InteractiveCard({
  children,
  className,
  backgroundGradient,
  grainOpacity = 0.2,
  disableGrain = false, // Default is to show grain
  glowColor = "rgba(82, 170, 173, 0.3)",
  shadow = true,
  rotationIntensity = 10,
  hoverScale = 1.02,
  border = true,
  glowOnHover = true,
  ...props
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [reflectionStyle, setReflectionStyle] = useState({});

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Limit rotation to a certain degree and update transform CSS
  const updateTransform = React.useCallback((xValue: number, yValue: number) => {
    if (isMobile) return;

    const intensity = rotationIntensity;
    const rotateX = yValue * -intensity;
    const rotateY = xValue * intensity;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    if (glowOnHover && isHovered) {
      setReflectionStyle({
        background: `radial-gradient(circle at ${(xValue + 0.5) * 100}% ${(yValue + 0.5) * 100}%, ${glowColor} 0%, transparent 60%)`,
        opacity: 0.8,
        mixBlendMode: 'plus-lighter',
      });
    }
  }, [isMobile, rotationIntensity, glowOnHover, isHovered, glowColor]);

  // Update transform on spring changes
  useEffect(() => {
    const unsubscribeX = xSpring.on("change", (latestX) => {
      updateTransform(latestX, ySpring.get());
    });

    const unsubscribeY = ySpring.on("change", (latestY) => {
      updateTransform(xSpring.get(), latestY);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [xSpring, ySpring, updateTransform]);

  // Track mouse movement
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card (normalize from -0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  }

  // Reset card position when mouse leaves
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden",
        border && "border border-white/10 dark:border-white/5",
        shadow && "shadow-xl",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
      {...props}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: transform,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background */}
        {backgroundGradient && (
          <div
            className={`absolute inset-0 ${backgroundGradient}`}
          />
        )}

        {/* Grain texture - only if not disabled */}
        {!disableGrain && <GrainyTexture opacity={grainOpacity} blend="soft-light" />}

        {/* Light reflection effect */}
        {isHovered && glowOnHover && (
          <div
            className="absolute inset-0 w-full h-full"
            style={reflectionStyle as React.CSSProperties}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
