"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticleBackgroundProps {
  className?: string;
  quantity?: number;
  size?: number;
  minSpeed?: number;
  maxSpeed?: number;
  particleColor?: string;
  lineColor?: string;
  particleOpacity?: number;
  lineOpacity?: number;
  responsive?: boolean;
  directionX?: "left" | "right" | "none";
  directionY?: "up" | "down" | "none";
  interactivity?: boolean;
  backgroundGradient?: string;
  connectParticles?: boolean;
}

export function ParticleBackground({
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
