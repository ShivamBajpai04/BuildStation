"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTV() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-black dark:to-black border-t border-b border-primary/10 dark:border-border">
      <div className="container">
        <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">
            Ready to revolutionize your workflow?
          </h2>
          <p className="max-w-[600px] md:text-xl mt-4 text-muted-foreground dark:text-gray-400">
            Join thousands of users finding their dream jobs and earning NFTs for job postings
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
              Start Your Free Trial
            </Button>
            <Link
              href="/learn-more"
              className="inline-flex h-10 items-center justify-center rounded-md border border-primary bg-transparent px-8 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:border-white dark:text-white dark:hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

