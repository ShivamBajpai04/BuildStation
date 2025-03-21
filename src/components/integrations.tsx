import React from "react";
// import Image from "next/image";

export default function Integrations() {
  const integrations = [
    { name: "LinkedIn", logo: "🔗" },
    { name: "Indeed", logo: "🔍" },
    { name: "Glassdoor", logo: "🚪" },
    { name: "Monster", logo: "👾" },
    { name: "AngelList", logo: "😇" },
    { name: "ZipRecruiter", logo: "🤐" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Seamless Integrations
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Our platform integrates with popular job sites and recruiting tools
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl">{integration.logo}</div>
                <h3 className="text-sm font-medium">{integration.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

