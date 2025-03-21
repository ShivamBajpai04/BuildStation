"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect } from "react"

export function ThemeEffect() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [setTheme])

  return null
}

