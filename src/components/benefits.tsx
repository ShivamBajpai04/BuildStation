import { Shield, Clock, Target, TrendingUp } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Save Time",
      description: "Reduce manual work by 80% with our automation tools",
      icon: Clock,
      color: "text-blue-500 bg-blue-100",
    },
    {
      title: "Increase Accuracy",
      description: "Eliminate human error with AI-powered verification",
      icon: Target,
      color: "text-green-500 bg-green-100",
    },
    {
      title: "Boost Productivity",
      description: "Complete more tasks in less time with smart workflows",
      icon: TrendingUp,
      color: "text-purple-500 bg-purple-100",
    },
    {
      title: "Reduce Costs",
      description: "Lower operational expenses by automating routine tasks",
      icon: Shield,
      color: "text-orange-500 bg-orange-100",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Benefits
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-[800px]">
            Features tell, but benefits sell. Here&apos;s how our solution
            transforms your business.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-3 rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${benefit.color}`}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold sm:text-xl">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
