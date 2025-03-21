import Image from "next/image";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Iridescence = dynamic(() => import("./Iridescence/Iridescence"), {
  loading: () => (
    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-primary/10 to-accent/10" />
  ),
});

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Suspense
          fallback={
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-primary/10 to-accent/10" />
          }
        >
          <Iridescence
            color={[1, 1, 1]}
            mouseReact={true}
            amplitude={0.1}
            speed={1.0}
          />
        </Suspense>
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-[800px] mx-auto">
              <span className="text-primary">Automate Your Workflow</span>{" "}
              <span className="text-foreground">Eliminate Manual Tasks</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-base text-muted-foreground sm:text-lg md:text-xl">
              Our AI platform saves teams 20+ hours per week on repetitive
              tasks, streamlining your workflow and boosting productivity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Start Free Trial • 7 Days
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              See Live Demo
            </Button>
          </div>
        </div>
        <div className="mt-12 md:mt-16 lg:mt-20">
          <div className="mx-auto max-w-4xl rounded-lg border bg-card p-2 sm:p-4 shadow-lg">
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=450&width=800"
                alt="Product demo"
                width={800}
                height={450}
                className="h-full w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
