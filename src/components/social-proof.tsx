import React from "react";
// import Image from "next/image";

export default function SocialProof() {
  const companies = [
    { name: "Google", logo: "/logos/google.svg" },
    { name: "Microsoft", logo: "/logos/microsoft.svg" },
    { name: "Amazon", logo: "/logos/amazon.svg" },
    { name: "Apple", logo: "/logos/apple.svg" },
    { name: "Meta", logo: "/logos/meta.svg" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Trusted by Top Companies
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Join thousands of companies and job seekers who use our platform daily
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company) => (
              <div key={company.name} className="flex items-center justify-center">
                <div className="h-12 w-auto grayscale transition-all hover:grayscale-0">
                  {company.name}
                  {/* Uncomment when you have actual logos */}
                  {/* <Image src={company.logo} alt={company.name} width={120} height={48} /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
