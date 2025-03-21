"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

type GlowButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  glowColor?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      glowColor = "rgba(var(--color-primary-rgb), 0.7)",
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const [isHovering, setIsHovering] = useState(false);

    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline:
        "border border-foreground/10 bg-background/50 backdrop-blur-md hover:bg-foreground/5",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </span>
        {isHovering && (
          <motion.span
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: `0 0 25px 3px ${glowColor}`,
            }}
          />
        )}
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
