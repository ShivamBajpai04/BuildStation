"use client";

import React, { useEffect, useRef } from "react";

export default function GrainEffect() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grainElement = grainRef.current;
    if (!grainElement) return;

    let x = 0;
    let y = 0;

    const animate = () => {
      x += 0.05;
      y += 0.05;
      
      // Move grain in a subtle way
      grainElement.style.backgroundPosition = `${x}px ${y}px`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={grainRef}
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "150px",
      }}
      aria-hidden="true"
    />
  );
}
