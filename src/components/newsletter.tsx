"use client";

import React from "react";

export default function Newsletter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3 max-w-[600px]">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-2">
              Newsletter
            </span>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Stay Updated on New Job Opportunities
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Subscribe to our newsletter to receive weekly job listings tailored to your preferences
            </p>
          </div>
          
          <div className="w-full max-w-md space-y-4">
            <form className="flex space-x-2">
              <input
                className="flex h-11 w-full rounded-md border border-[#3b82f6]/20 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]/40 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email"
                type="email"
                required
              />
              <button
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#3b82f6] px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#3b82f6]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6] disabled:pointer-events-none disabled:opacity-50"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-muted-foreground/70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
