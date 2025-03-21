"use client";

import { useEffect, useState } from "react";

export function ThemeEffect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Apply initial dark theme for our specific design
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#0c0c10]" />
  );
}

