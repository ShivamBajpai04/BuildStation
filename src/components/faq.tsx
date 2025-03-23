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
      question: "How does your blockchain-powered job platform work?",
      answer: "Our platform leverages blockchain technology to create a secure and transparent job marketplace. Employers can mint job opportunities as NFTs, which verifiably showcase the position details and requirements. Job seekers can browser and apply to these blockchain-verified job listings, ensuring authenticity and reducing fraud in the hiring process. Also any user can also list any good job on our platform and anyone can apply to it."
    },
    {
      question: "What are NFT job listings and how do they benefit employers?",
      answer: "NFT job listings are blockchain-verified digital certificates that represent your job opportunities. Unlike traditional job postings, these listings cannot be falsified and provide instant verification to candidates. As an employer, your job listings gain visibility and credibility, and you maintain full ownership of your recruitment process on the blockchain."
    },
    {
      question: "How secure is my data on the blockchain?",
      answer: "Extremely secure. Our platform utilizes advanced cryptographic techniques to protect your data on the blockchain. While your job listings are publicly accessible for visibility purposes, sensitive company information remains encrypted and controlled by you. You decide exactly what information to share with potential candidates, and all transactions are secured by smart contracts."
    },
    {
      question: "What fees are associated with minting job NFTs?",
      answer: "Employers pay a small fee in cryptocurrency to mint job positions, with premium placement options available. Basic job NFT minting includes standard templates, with premium templates and enhanced visibility services available for a nominal fee. All transactions use our native token, which helps reduce gas fees and provides additional platform benefits to active users."
    },
    {
      question: "Do I need technical blockchain knowledge to use the platform?",
      answer: "Not at all! We've designed our platform to be user-friendly for everyone, regardless of technical expertise. Our intuitive interface handles all the blockchain complexity behind the scenes. You can easily create a wallet, mint job NFTs, and interact with candidates using familiar web interfaces without needing to understand the underlying blockchain technology."
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
            Frequently Asked <GradientText text="Questions" gradient="from-[#3b82f6] via-[#c89d4a] to-[#ab5137]" animate interactive />
          </h2>
          <p className="text-white/70 text-lg">
            Everything you need to know about our blockchain-powered NFT job platform.
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

