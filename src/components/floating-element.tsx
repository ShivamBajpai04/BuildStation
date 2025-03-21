"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  amount?: number;
  delay?: number;
}

export default function FloatingElement({
  children,
  className = "",
  speed = 3,
  amount = 10,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amount, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
