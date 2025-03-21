import React from "react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I found my dream job within a week of using this platform. The NFT I earned was a nice bonus too!",
      author: "Sarah Johnson",
      role: "Software Developer",
      avatar: "/avatars/sarah.jpg"
    },
    {
      quote: "As a recruiter, this platform has saved me countless hours by eliminating duplicate job postings.",
      author: "David Chen",
      role: "HR Manager at TechCorp",
      avatar: "/avatars/david.jpg"
    },
    {
      quote: "The verification system gives me confidence that I'm applying to legitimate job openings.",
      author: "Michael Smith",
      role: "UX Designer",
      avatar: "/avatars/michael.jpg"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Users Say
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Hear from job seekers and companies who use our platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="text-xl">"</div>
                <p className="text-gray-500 dark:text-gray-400">{testimonial.quote}</p>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative h-12 w-12 rounded-full bg-gray-200">
                    {/* <Image src={testimonial.avatar} alt={testimonial.author} fill className="rounded-full" /> */}
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

