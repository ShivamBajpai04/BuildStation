"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GrainyTexture } from "./grainy-texture";

type AnimatedButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "shine"
  | "glow";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: AnimatedButtonVariant;
  size?: "sm" | "md" | "lg" | "xl";
  shine?: boolean;
  gradient?: string;
  animateOnHover?: boolean;
  glowIntensity?: "low" | "medium" | "high";
  grainy?: boolean;
  grainOpacity?: number;
  fullWidth?: boolean;
  loading?: boolean;
  animated?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  shine = true,
  gradient = "from-indigo-600 via-purple-600 to-pink-600",
  animateOnHover = true,
  glowIntensity = "medium",
  grainy = true,
  grainOpacity = 0.1,
  fullWidth = false,
  loading = false,
  animated = true,
  icon,
  iconPosition = "left",
  ...props
}: AnimatedButtonProps) {
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-2.5 px-6 text-lg",
    xl: "py-3 px-8 text-xl",
  };

  // Variant classes
  const variantClasses: Record<AnimatedButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    gradient: `bg-gradient-to-r ${gradient} text-white`,
    shine: "relative overflow-hidden bg-black text-white",
    glow: "bg-primary text-white transition-all transform",
  };

  // Glow intensity
  const glowShadow = {
    low: "shadow-[0_0_10px_rgba(82,170,173,0.5)]",
    medium: "shadow-[0_0_20px_rgba(82,170,173,0.6)]",
    high: "shadow-[0_0_30px_rgba(82,170,173,0.7)]",
  };

  // Client-side effect
  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = cn(
    "relative rounded-md font-medium transition-all overflow-hidden",
    sizeClasses[size],
    variantClasses[variant],
    variant === "glow" && hover && glowShadow[glowIntensity],
    fullWidth && "w-full",
    loading && "opacity-80 cursor-not-allowed",
    className
  );

  const handleHoverStart = () => setHover(true);
  const handleHoverEnd = () => setHover(false);

  if (!mounted) {
    return (
      <button
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <Button
      className={buttonClasses}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      {...props}
    >
      {/* Grain effect */}
      {grainy && <GrainyTexture opacity={grainOpacity} />}

      {/* Shine effect */}
      {shine && variant === "shine" && hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: 0, duration: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <div className="mr-1.5 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
        ) : (
          icon && iconPosition === "left" && <span>{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </div>
    </Button>
  );
}
