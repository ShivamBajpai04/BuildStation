"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Zap, BarChart, Box, Search, BriefcaseIcon } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function from utils.ts
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Container component
type ContainerProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

function Container({
  className,
  children,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Grainy Texture Component
type GrainyTextureProps = {
  className?: string;
  opacity?: number;
  blend?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion";
  color?: string;
};

function GrainyTexture({
  className = "",
  opacity = 0.2,
  blend = "soft-light",
  color,
}: GrainyTextureProps) {
  return (
    <div
      className={cn("absolute inset-0 z-10 pointer-events-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: opacity,
        mixBlendMode: blend,
        backgroundColor: color || undefined,
      }}
    />
  );
}

// Animation Components
interface FadeInWhenVisibleProps extends React.PropsWithChildren {
  threshold?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

function FadeInWhenVisible({
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

function StaggerChildren({
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

function Floating({
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

// Particle Background Component
interface ParticleBackgroundProps {
  className?: string;
  quantity?: number;
  size?: number;
  minSpeed?: number;
  maxSpeed?: number;
  particleColor?: string;
  particleOpacity?: number;
  connectParticles?: boolean;
  lineColor?: string;
  lineOpacity?: number;
  responsive?: boolean;
  directionX?: "left" | "right" | "none";
  directionY?: "up" | "down" | "none";
  parallax?: boolean;
  parallaxFactor?: number;
  interactivity?: boolean;
  backgroundGradient?: string;
}

function ParticleBackground({
  className,
  quantity = 50,
  size = 3,
  minSpeed = 0.1,
  maxSpeed = 0.5,
  particleColor = "rgba(255, 255, 255, 0.8)",
  particleOpacity = 0.3,
  connectParticles = true,
  lineColor = "rgba(255, 255, 255, 0.5)",
  lineOpacity = 0.2,
  responsive = true,
  directionX = "none",
  directionY = "none",
  parallax = true,
  parallaxFactor = 0.5,
  interactivity = true,
  backgroundGradient,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    let particles: any[] = [];
    // eslint-disable-next-line prefer-const
    let mouse = { x: 0, y: 0, radius: 100 };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * size + 1;

        // Direction handling
        const speedMultiplierX = directionX === "none" ? 2 : 1;
        const speedMultiplierY = directionY === "none" ? 2 : 1;

        this.speedX = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speedMultiplierX * (directionX === "left" ? -1 : 1);
        this.speedY = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * speedMultiplierY * (directionY === "up" ? -1 : 1);

        this.color = particleColor;
      }

      update() {
        // Edge detection
        if (this.x < 0 || this.x > width) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > height) {
          this.speedY = -this.speedY;
        }

        // Mouse interactivity
        if (interactivity) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const interactFactor = (1 - Math.min(distance / mouse.radius, 1)) * 0.02;
            this.x -= dx * interactFactor;
            this.y -= dy * interactFactor;
          }
        }

        // Direction forces
        if (directionX !== "none") {
          this.x += this.speedX;
        } else {
          this.x += this.speedX * (Math.random() > 0.5 ? 1 : -1);
        }

        if (directionY !== "none") {
          this.y += this.speedY;
        } else {
          this.y += this.speedY * (Math.random() > 0.5 ? 1 : -1);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = particleOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < quantity; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticlePoints = () => {
      if (!ctx) return;
      const connectionLimit = 130;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionLimit) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = lineOpacity * (1 - distance / connectionLimit);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      if (connectParticles) {
        connectParticlePoints();
      }
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -200;
      mouse.y = -200;
    };

    // Handle window resize
    const resizeCanvas = () => {
      if (responsive && container) {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        init();
      }
    };

    if (interactivity) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    if (responsive) {
      window.addEventListener("resize", resizeCanvas);
    }

    return () => {
      if (interactivity) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (responsive) {
        window.removeEventListener("resize", resizeCanvas);
      }
    };
  }, [
    quantity,
    size,
    minSpeed,
    maxSpeed,
    particleColor,
    particleOpacity,
    connectParticles,
    lineColor,
    lineOpacity,
    responsive,
    directionX,
    directionY,
    parallax,
    parallaxFactor,
    interactivity,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {backgroundGradient && (
        <div
          className={`absolute inset-0 ${backgroundGradient}`}
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// Interactive Card Component
interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  backgroundGradient?: string;
  grainOpacity?: number;
  glowColor?: string;
  shadow?: boolean;
  rotationIntensity?: number;
  hoverScale?: number;
  border?: boolean;
  glowOnHover?: boolean;
  disableGrain?: boolean;
}

function InteractiveCard({
  children,
  className,
  backgroundGradient,
  grainOpacity = 0.2,
  glowColor = "rgba(82, 170, 173, 0.3)",
  shadow = true,
  rotationIntensity = 10,
  hoverScale = 1.02,
  border = true,
  glowOnHover = true,
  disableGrain = false,
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

        {/* Grain texture */}
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

// Animated Button Component
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

function AnimatedButton({
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

// Gradient Text Component
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

function GradientText({
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
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(82, 170, 173, 0.5), transparent 70%)`,
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

/**
 * StandaloneHeroSection Component - This is a self-contained hero section that can be copied and pasted into any React project.
 *
 * You will need to install these dependencies:
 * - framer-motion
 * - tailwind-merge
 * - clsx
 * - class-variance-authority
 * - @radix-ui/react-slot
 * - lucide-react
 * - next/image (if using Next.js, otherwise use a regular img tag)
 *
 * Add these Tailwind animations to your tailwind.config.js:
 *
 * ```js
 * theme: {
 *   extend: {
 *     animation: {
 *       'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
 *       'pulse-slow': 'pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)',
 *     },
 *     keyframes: {
 *       'text-shimmer': {
 *         '0%': { backgroundPosition: '0% 50%' },
 *         '100%': { backgroundPosition: '100% 50%' },
 *       },
 *     }
 *   }
 * }
 * ```
 */
export function StandaloneHeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const appContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!appContainerRef.current) return;

    const rect = appContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#121116]">
      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#3b82f618 1px, transparent 1px), linear-gradient(to right, #3b82f618 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Curved gradient overlay */}
      <div className="absolute inset-0 opacity-60 z-0 bg-gradient-to-tr from-[#121116]/0 via-purple-600/5 to-indigo-500/20" />

      {/* Particle background with cyan/purple color scheme */}
      <ParticleBackground
        className="absolute inset-0 z-0"
        quantity={60}
        particleColor="rgba(82, 170, 173, 0.5)"
        lineColor="rgba(171, 81, 55, 0.2)"
        minSpeed={0.05}
        maxSpeed={0.2}
        size={1.8}
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-8 md:mb-16">
          {/* Text content column */}
          <div className="w-full lg:w-1/2 space-y-6">
            <StaggerChildren
              className="space-y-6"
              staggerChildren={0.1}
              delayChildren={0.2}
            >
              <motion.div className="inline-flex items-center gap-2 px-3 py-1 mb-2
                rounded-full bg-[#ab5137]/10 border border-[#ab5137]/20 text-sm font-medium text-[#e2a89e]">
                <Sparkles className="h-3.5 w-3.5 text-[#e2a89e]" />
                <span>REVOLUTIONARY JOB PLATFORM</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  Transform Your
                </motion.h1>

                <div className="relative">
                  {/* Chrome text effect styled after Pixelbuddha */}
                  {mounted && (
                    <div className="relative">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold relative">
                        <GradientText 
                          text="Career Journey" 
                          gradient="from-[#3b82f6] to-[#c89d4a]" 
                          animate 
                          interactive 
                        />
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              <motion.p className="text-lg md:text-xl text-gray-300/90 max-w-2xl">
                Experience the future of job hunting with our AI-powered platform. Get instant matches, 
                verified credentials, and exclusive opportunities tailored to your skills and aspirations.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
                <AnimatedButton
                  size="lg"
                  variant="gradient"
                  gradient="from-[#3b82f6] via-[#4f46e5] to-[#6366f1]"
                  className="min-w-44 font-medium rounded-md"
                  shine
                  glowIntensity="medium"
                  animated
                  icon={<Zap className="h-4 w-4" />}
                >
                  Start Free Trial
                </AnimatedButton>

                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="min-w-44 font-medium bg-transparent text-white border-white/20 hover:bg-white/5"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Watch Demo
                </AnimatedButton>
              </div>
            </StaggerChildren>
          </div>

          {/* Visual/illustration column */}
          <div className="w-full lg:w-1/2">
            <FadeInWhenVisible
              className="relative"
              delay={0.5}
            >
              <Floating className="aspect-video" duration={6} y={15}>
                <InteractiveCard
                  className="rounded-lg border-[#3b82f6]/20 overflow-hidden"
                  backgroundGradient="bg-gradient-to-b from-[#1c1b1b] to-[#121116]"
                  shadow
                  rotationIntensity={5}
                  glowColor="rgba(82, 170, 173, 0.3)"
                  disableGrain={true}
                >
                  {/* Pixelbuddha-inspired grid and mockup display */}
                  <div
                    ref={appContainerRef}
                    className="aspect-video relative overflow-hidden p-1"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "radial-gradient(#3b82f630 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                      }}
                    />

                    {/* Spotlight effect */}
                    {isHovering && (
                      <div
                        className="absolute pointer-events-none w-[300px] h-[300px] opacity-30 mix-blend-soft-light"
                        style={{
                          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                          transform: `translate(${mousePosition.x - 150}px, ${mousePosition.y - 150}px)`,
                          transition: "transform 0.05s ease-out",
                        }}
                      />
                    )}

                    {/* Custom cursor effect */}
                    {isHovering && (
                      <div
                        className="absolute w-8 h-8 pointer-events-none z-50 mix-blend-difference"
                        style={{
                          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
                          transition: "transform 0.1s ease-out",
                        }}
                      >
                        <div className="w-full h-full border border-white rounded-full"></div>
                      </div>
                    )}

                    {/* Main app UI mockup - Job search interface */}
                    <div className="relative h-full rounded-md overflow-hidden border border-[#3b82f6]/20 bg-[#1c1b1b]">
                      {/* App header bar */}
                      <div className="h-10 bg-[#1c1b1b] border-b border-[#3b82f6]/20 flex items-center px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ab5137]/70"></div>
                          <div className="w-3 h-3 rounded-full bg-[#c89d4a]/70"></div>
                          <div className="w-3 h-3 rounded-full bg-[#3b82f6]/70"></div>
                        </div>
                        <div className="flex items-center mx-auto">
                          <BriefcaseIcon className="h-3.5 w-3.5 text-[#c89d4a] mr-1.5" />
                          <div className="text-xs text-gray-400 font-mono">BlockBlockJob</div>
                        </div>
                      </div>

                      {/* App content */}
                      <div className="p-4 h-[calc(100%-2.5rem)] grid grid-cols-12 gap-3">
                        {/* Sidebar - Search Filters */}
                        <div className="col-span-3 bg-black/20 rounded-md border border-white/5 p-3 flex flex-col gap-3">
                          <div className="h-7 bg-[#3b82f6]/10 rounded-md border border-white/5 flex items-center px-2">
                            <div className="w-3 h-3 rounded-sm bg-[#3b82f6]/70 mr-2"></div>
                            <div className="h-2 bg-white/20 rounded-sm w-full"></div>
                          </div>
                          <div className="text-xs text-white/50 mb-1 mt-1">Filters</div>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-1.5">
                              <div className="h-2 bg-white/20 rounded-sm w-16"></div>
                              <div className="h-6 bg-black/30 rounded-sm w-full border border-white/5"></div>
                            </div>
                          ))}
                          <div className="mt-auto">
                            <div className="h-8 bg-[#3b82f6]/20 rounded-md border border-[#3b82f6]/30 flex items-center justify-center">
                              <div className="h-2 w-16 bg-[#3b82f6]/70 rounded-sm"></div>
                            </div>
                          </div>
                        </div>

                        {/* Main content - Job Listings */}
                        <div className="col-span-9 flex flex-col gap-3">
                          {/* Search bar */}
                          <div className="h-10 flex gap-2">
                            <div className="flex-1 bg-black/30 rounded-md border border-white/10 flex items-center px-3">
                              <div className="h-2.5 bg-white/20 rounded-sm w-28"></div>
                            </div>
                            <div className="w-10 h-10 bg-[#3b82f6]/20 rounded-md border border-[#3b82f6]/30 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-sm bg-[#3b82f6]/70"></div>
                            </div>
                          </div>

                          {/* Job listings */}
                          <div className="flex-1 grid grid-cols-1 gap-3">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`rounded-md border border-white/5 ${
                                  i === 0 ? 'bg-[#3b82f6]/10 border-[#3b82f6]/20' : 'bg-black/20'
                                } p-3 flex flex-col gap-2`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-md bg-black/30 flex items-center justify-center">
                                      {i === 0 && <div className="w-4 h-4 rounded-sm bg-[#3b82f6]/70"></div>}
                                      {i === 1 && <div className="w-4 h-4 rounded-sm bg-[#c89d4a]/70"></div>}
                                      {i === 2 && <div className="w-4 h-4 rounded-sm bg-[#ab5137]/70"></div>}
                                    </div>
                                    <div>
                                      <div className="h-2.5 bg-white/40 rounded-sm w-32 mb-1.5"></div>
                                      <div className="h-2 bg-white/20 rounded-sm w-24"></div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="h-2.5 bg-white/20 rounded-sm w-16 mb-1"></div>
                                    <div className={`px-2 py-0.5 rounded-sm text-[6px] ${
                                      i === 0 ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                                      i === 1 ? 'bg-[#c89d4a]/20 text-[#c89d4a]' :
                                      'bg-white/10 text-white/60'
                                    }`}>
                                      {i === 0 ? 'Verified' : i === 1 ? 'Blockchain' : 'Remote'}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 mt-1">
                                  <div className="col-span-9">
                                    <div className="h-2 bg-white/20 rounded-sm w-full mb-1.5"></div>
                                    <div className="h-2 bg-white/20 rounded-sm w-full mb-1.5"></div>
                                    <div className="h-2 bg-white/20 rounded-sm w-4/5"></div>
                                  </div>
                                  <div className="col-span-3 flex items-end justify-end">
                                    <div className={`h-6 w-full rounded-sm ${
                                      i === 0 ? 'bg-[#3b82f6]/30 border-[#3b82f6]/40' :
                                      'bg-black/30 border-white/10'
                                    } border flex items-center justify-center`}>
                                      <div className="h-1.5 bg-white/40 rounded-sm w-12"></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-1.5 mt-1">
                                  {[...Array(3)].map((_, j) => (
                                    <div key={j} className="px-1.5 py-0.5 rounded-sm bg-black/30 border border-white/5">
                                      <div className="h-1.5 bg-white/30 rounded-sm w-8"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </Floating>

              {/* Insight cards floating over the UI */}
              <div className="absolute -bottom-10 -right-4 md:right-0 z-10">
                <InteractiveCard
                  className="w-56 md:w-64 rounded-md"
                  shadow
                  glowColor="rgba(82, 170, 173, 0.3)"
                  backgroundGradient="bg-gradient-to-br from-[#1c1b1b] to-[#121116]"
                  border={true}
                  rotationIntensity={8}
                >
                  <div className="flex items-start gap-3 p-3">
                    <div className="h-10 w-10 rounded bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
                      <Search className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Blockchain Verification</h3>
                      <p className="text-xs text-white/60 mt-1">Credential verification on-chain</p>
                    </div>
                  </div>
                </InteractiveCard>
              </div>

              <div className="absolute top-10 -left-4 md:-left-10 z-10 hidden md:block">
                <InteractiveCard
                  className="w-40 rounded-md"
                  shadow
                  glowColor="rgba(171, 81, 55, 0.3)"
                  backgroundGradient="bg-gradient-to-br from-[#1c1b1b] to-[#121116]"
                  border={true}
                  rotationIntensity={8}
                >
                  <div className="flex flex-col items-center gap-2 p-3">
                    <div className="h-8 w-8 rounded-full bg-[#ab5137]/20 border border-[#ab5137]/30 flex items-center justify-center">
                      <BarChart className="h-4 w-4 text-[#e2a89e]" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#e2a89e] font-medium">Job Success</p>
                      <p className="text-lg font-bold text-white mt-1">+400%</p>
                    </div>
                  </div>
                </InteractiveCard>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#3b82f6]/10 filter blur-[80px] opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#ab5137]/10 filter blur-[100px] opacity-50 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </Container>
    </section>
  );
}
