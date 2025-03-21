import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Sales | AI SaaS",
  description: "Get in touch with our sales team",
};

export default function ContactPage() {
  return (
    <main className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Let&apos;s Connect
          </h1>
          <p className="text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Inc."
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your needs..."
                className="w-full p-2 border rounded-md"
              />
            </div>
            <Button className="w-full">Submit Request</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
