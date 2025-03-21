export default function SocialProof() {
  const logos = [
    { name: "Company 1", color: "bg-blue-100" },
    { name: "Company 2", color: "bg-green-100" },
    { name: "Company 3", color: "bg-purple-100" },
    { name: "Company 4", color: "bg-orange-100" },
    { name: "Company 5", color: "bg-pink-100" },
  ];

  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-xl font-medium tracking-tight md:text-2xl">
            Trusted by innovative teams worldwide
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo, i) => (
              <div
                key={i}
                className={`flex h-12 w-32 items-center justify-center rounded-lg ${logo.color} transition-opacity hover:opacity-80`}
              >
                <span className="text-sm font-medium text-gray-700">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
