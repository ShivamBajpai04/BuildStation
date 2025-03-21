export default function Stats() {
  const stats = [
    { value: "93%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "100+", label: "Integrations" },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-8 text-center shadow"
            >
              <div className="text-4xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

