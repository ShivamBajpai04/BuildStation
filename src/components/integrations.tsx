import Image from "next/image"

export default function Integrations() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Integrations</h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Show seamless integration with tools your users love.
          </p>
        </div>
        <div className="mx-auto max-w-4xl rounded-lg border bg-card p-4 shadow-lg">
          <div className="aspect-video overflow-hidden rounded-lg bg-blue-100">
            <Image
              src="/placeholder.svg?height=450&width=800"
              alt="Integrations showcase"
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

