"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Solution() {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {
      id: "tab1",
      label: "Automation",
      content:
        "Streamline your workflow with intelligent automation tools that learn from your patterns.",
      image: "/placeholder.svg?height=450&width=800",
    },
    {
      id: "tab2",
      label: "Analytics",
      content:
        "Get deep insights into your business performance with advanced analytics and reporting.",
      image: "/placeholder.svg?height=450&width=800",
    },
    {
      id: "tab3",
      label: "Integration",
      content:
        "Connect seamlessly with your favorite tools and services through our extensive API.",
      image: "/placeholder.svg?height=450&width=800",
    },
    {
      id: "tab4",
      label: "Security",
      content:
        "Enterprise-grade security with end-to-end encryption and advanced access controls.",
      image: "/placeholder.svg?height=450&width=800",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Solution
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-[800px]">
            Discover how our platform can transform your business operations
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 sm:flex-none min-w-[120px]"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-card p-2 sm:p-4 shadow-lg">
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={tabs.find((tab) => tab.id === activeTab)?.image || ""}
                alt={`${
                  tabs.find((tab) => tab.id === activeTab)?.label
                } preview`}
                width={800}
                height={450}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="mt-4 text-center text-muted-foreground text-sm sm:text-base px-2">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
