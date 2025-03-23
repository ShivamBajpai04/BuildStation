"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="font-bold text-xl md:text-2xl">BlockBlockJob</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >Home</Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >How It Works</Link>
            <Link
              href="/our-team"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >Our Team</Link>
            <SignedIn>
              <Link
                href="/mainpage"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >Main Page</Link>
            </SignedIn>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Log in</Link>
              </Button>
            </div>
            <div>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
