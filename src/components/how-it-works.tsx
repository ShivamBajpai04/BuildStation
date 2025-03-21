import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description: "Sign up for a free account to start exploring or posting job opportunities."
    },
    {
      number: 2,
      title: "Post or Search",
      description: "Post a job opening or search for jobs using our powerful filtering system."
    },
    {
      number: 3,
      title: "Earn NFTs",
      description: "Be the first to post about a job opening and earn a unique NFT as a reward."
    },
    {
      number: 4,
      title: "Connect and Apply",
      description: "Apply directly to job postings or connect with companies who posted openings."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How Our Platform Works
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              A simple process to find or post job opportunities and earn rewards
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

