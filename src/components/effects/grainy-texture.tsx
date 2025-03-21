"use client";

import { cn } from "@/lib/utils";

type GrainyTextureProps = {
  className?: string;
  opacity?: number;
  blend?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion";
  color?: string;
};

export function GrainyTexture({
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
