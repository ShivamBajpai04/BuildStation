export default function HowItWorks() {
  const steps = [
    {
      title: "Step 1: Sign Up",
      description: "Create your account in less than 2 minutes",
    },
    {
      title: "Step 2: Connect",
      description: "Integrate with your existing tools and workflows",
    },
    {
      title: "Step 3: Automate",
      description: "Set up your first automation and watch it work",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works?</h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Simplify the process into 3 easy steps. This will improve understanding.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-medium">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              <div className="ml-10">
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

