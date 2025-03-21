"use client";

import { GrainyTexture } from "@/components/effects/grainy-texture";

export default function GrainEffect() {
  return (
    <GrainyTexture 
      className="fixed inset-0 z-50 pointer-events-none"
      opacity={0.2} // Reduced from 0.3
      blend="soft-light"
    />
  );
}
