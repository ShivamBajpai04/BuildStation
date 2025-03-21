import { Zap, GitBranch, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Smart Automation",
      description:
        "Let our AI learn your workflow patterns and automate repetitive tasks with precision.",
      icon: Zap,
      color: "text-blue-500 bg-blue-100",
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools through our extensive API and pre-built integrations.",
      icon: GitBranch,
      color: "text-green-500 bg-green-100",
    },
    {
      title: "Advanced Analytics",
      description:
        "Get real-time insights and detailed reports to optimize your business performance.",
      icon: BarChart3,
      color: "text-purple-500 bg-purple-100",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Key Features
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Everything you need to streamline your workflow and boost
            productivity
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
