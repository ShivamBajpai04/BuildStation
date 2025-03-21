"use client"

import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I earn NFTs for job postings?",
      answer: "You earn an NFT when you're the first person to post about a specific job opening. Our system verifies the uniqueness of the posting before minting the NFT to your account."
    },
    {
      question: "Can companies post jobs directly?",
      answer: "Yes, companies can create an account and post their job openings directly on our platform. They can also verify their company profile for added credibility."
    },
    {
      question: "How does the platform prevent duplicate job postings?",
      answer: "We use advanced algorithms to detect similarities between job postings. If a job has already been posted, the system will identify it and prevent duplicates."
    },
    {
      question: "Are the NFTs valuable?",
      answer: "Yes, our NFTs have utility within our platform and can be used for premium features. They may also appreciate in value as our platform grows."
    },
    {
      question: "Is it free to use the platform?",
      answer: "Basic job searching and posting is free. We offer premium features for job seekers and companies that require a subscription."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Find answers to common questions about our job platform
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 md:gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border p-4">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

