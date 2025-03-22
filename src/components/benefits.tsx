"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Benefits() {
  const benefits = [
    {
      title: "NFT Rewards",
      description: "Earn valuable NFTs for being the first to post about a job opening.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
        </svg>
      )
    },
    {
      title: "Time Saving",
      description: "No more sifting through duplicate job listings - every posting is unique.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      title: "Company Verification",
      description: "Easily identify verified companies with official postings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      title: "Smart Matching",
      description: "Our algorithm matches your skills with the most relevant job opportunities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
      )
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Removed background color to let EnhancedSection handle it */}
      
      {/* Decorative blurred circles that match the Enhanced section colors */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#3b82f6]/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#3b82f6]/10 rounded-full filter blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-2">
                Benefits
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Benefits for All Users
              </h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                Our platform offers unique advantages for both job seekers and companies
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-12 w-full mt-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.div 
                key={benefit.title} 
                className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                variants={item}
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
