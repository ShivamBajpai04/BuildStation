"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Solution() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Grainy texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/images/grain.svg')] bg-repeat"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-2">
                Our Solution
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                The Problem We Solve
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Job seekers waste hours sifting through duplicate listings and outdated postings. Companies struggle to find the right channels to post their openings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Our Solution</h3>
              <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
                We&apos;ve created a platform that ensures job postings are unique and up-to-date, eliminating redundancy and saving time for both job seekers and companies. Plus, we incentivize early job posting with NFT rewards.
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Unique job listings save time</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>NFT rewards for early job posters</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Streamlined hiring process for companies</span>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[400px] w-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg">
              <Image 
                src="/images/solution-illustration.svg" 
                alt="Solution Illustration" 
                fill 
                className="object-contain p-6"
              />
              
              {/* Animated elements */}
              <motion.div 
                className="absolute top-10 right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 left-10 bg-primary text-white rounded-lg shadow-lg p-3"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
