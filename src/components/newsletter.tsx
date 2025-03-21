"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl rounded-lg bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center text-center space-y-4 mb-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Stay Updated
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[800px]">
              Subscribe to our newsletter to get the latest updates and news. We
              won&apos;t spam you.
            </p>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center space-y-4 py-4">
              <CheckCircle className="h-16 w-16 text-primary" />
              <h3 className="text-xl font-medium">
                Thank you for subscribing!
              </h3>
              <p className="text-muted-foreground">
                You&apos;ll receive our next newsletter in your inbox.
              </p>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Subscribe another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive text-center">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
