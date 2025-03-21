import { Button } from "@/components/ui/button"

export default function CTV() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl rounded-lg bg-yellow-50 p-8 text-center shadow-lg">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Call-To-Value (CTV)</h2>
          <p className="mb-6 text-muted-foreground md:text-xl">
            Combine actionable steps with compelling reasons to convert. Start your 7-day free trial today and see how
            our AI can transform your workflow.
          </p>
          <Button size="lg" className="px-8">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  )
}

