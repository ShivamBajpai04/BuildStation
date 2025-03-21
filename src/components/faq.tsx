"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      question: "How does the AI automation work?",
      answer:
        "Our AI analyzes your workflows and identifies repetitive tasks that can be automated. It then creates custom automation scripts that integrate with your existing tools.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 7-day free trial with full access to all features. No credit card required to get started.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We use enterprise-grade encryption and follow strict security protocols. Your data is never shared with third parties and is stored in SOC 2 compliant data centers.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time with no questions asked. We'll prorate any unused portion of your billing period.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">FAQ</h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px]">
            Address potential concerns or objections with simple, clear answers.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border bg-card shadow-sm" onClick={() => toggleFAQ(i)}>
              <div className="flex cursor-pointer items-center justify-between p-4">
                <h3 className="font-medium">{faq.question}</h3>
                <button className="ml-2">
                  {openIndex === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              {openIndex === i && (
                <div className="border-t p-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

