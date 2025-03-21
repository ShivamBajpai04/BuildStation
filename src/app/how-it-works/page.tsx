import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | AI SaaS",
  description: "Learn how our AI platform works and transforms your workflow",
};

export default function HowItWorksPage() {
  return (
    <main className="container flex min-h-[calc(100vh-4rem)] flex-col py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch our demo to see how our AI platform transforms your workflow
            in minutes.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border shadow-lg">
          <div className="aspect-video w-full bg-muted">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/placeholder.svg?height=600&width=800"
            >
              <source src="/demo-placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="space-y-12 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 p-3">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account and choose the plan that fits your team&apos;s
                needs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 p-3">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold">Connect Your Data</h3>
              <p className="text-muted-foreground">
                Integrate with your existing tools through our simple API
                connections.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 p-3">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold">Automate & Scale</h3>
              <p className="text-muted-foreground">
                Let our AI learn from your workflow and automate repetitive
                tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
