"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="font-bold text-xl md:text-2xl">
            BlockBlockJob
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="/our-team"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Our Team
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
              Log in
            </Link>
            <Link href="/sign-up" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">
              Sign up
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
