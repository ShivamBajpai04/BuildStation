"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaggerChildren } from "@/components/effects/animated-components";
import { GradientText } from "@/components/effects/gradient-text";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does your AI matching technology work?",
      answer: "Our AI matching technology uses advanced machine learning algorithms to analyze skills, experience, and cultural fit factors to create optimal matches between candidates and opportunities. It continuously learns from successful placements to improve future matching accuracy."
    },
    {
      question: "Is my data secure on your platform?",
      answer: "Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We use industry-leading security practices and are compliant with GDPR, CCPA and other relevant regulations. Your information is never shared without explicit consent."
    },
    {
      question: "How long is the free trial period?",
      answer: "Our free trial lasts for 14 days, giving you full access to all features of the platform. No credit card is required to start, and you can cancel anytime during the trial without any charges."
    },
    {
      question: "Can I integrate with my existing HR systems?",
      answer: "Absolutely! Our platform provides robust API connections and pre-built integrations with most popular HR and ATS systems including Workday, SAP SuccessFactors, BambooHR, Greenhouse, and many others. Our team can also build custom integrations if needed."
    },
    {
      question: "What support options are available?",
      answer: "We offer 24/7 customer support through chat, email, and phone. Enterprise customers receive dedicated account management with personalized onboarding and training. Our knowledge base and video tutorials are available to all users regardless of plan level."
    }
  ];

  return (
    <div>
      <StaggerChildren
        className="space-y-12"
        direction="up"
      >
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked <GradientText text="Questions" gradient="from-[#52aaad] to-[#c89d4a]" />
          </h2>
          <p className="text-white/70 text-lg">
            Everything you need to know about our platform and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden divide-y divide-white/10">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-black/20 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors duration:200"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-white/70" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/70">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}

