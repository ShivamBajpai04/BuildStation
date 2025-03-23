import React from "react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I will be successful in my career if this platform will become successful.",
      author: "Shivam Mahajan",
      role: "Developer at BlockBlockJob",
      avatar: "/avatars/sm.jpg"
    },
    {
      quote: "The platform is easy to use and provides a great user experience because I made it.",
      author: "Shivam Bajpai",
      role: "Developer at BlockBlockJob",
      avatar: "/avatars/sb.jpg"
    },
    {
      quote: "The platform is also feature packed because I made it.",
      author: "Shivanshu",
      role: "Developer at BlockBlockJob",
      avatar: "/avatars/s.jpg"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Developers Say
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Please use us to make your career successful.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="text-xl">&quot;</div>
                <p className="text-gray-500 dark:text-gray-400">{testimonial.quote}</p>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative h-12 w-12 rounded-full bg-gray-200">
                    <Image src={testimonial.avatar} alt={testimonial.author} fill className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{testimonial.author}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

