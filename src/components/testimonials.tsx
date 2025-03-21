import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "This platform has transformed our workflow. We've saved 15 hours per week on repetitive tasks.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The automation capabilities are incredible. Our team productivity increased by 40% in just one month.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Lead",
      content: "Customer support is exceptional. Any questions we had were answered promptly and thoroughly.",
      rating: 5,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Testimonials</h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Highlight authentic stories with customer photos and measurable results.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-rose-100">
                  <div className="flex h-full w-full items-center justify-center text-rose-500 font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{testimonial.name}</h3>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex">
                {Array(testimonial.rating)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

