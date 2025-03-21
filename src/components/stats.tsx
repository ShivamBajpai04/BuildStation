"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Stats() {
  const stats = [
    { value: "10K+", label: "Job Listings", icon: "📝" },
    { value: "5K+", label: "NFTs Minted", icon: "🏆" },
    { value: "1K+", label: "Companies", icon: "🏢" },
    { value: "50K+", label: "Job Seekers", icon: "👥" }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-8 text-center"
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
                Our Impact
              </span>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Our Platform Impact
              </h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                Join thousands of users who have found their dream jobs and companies that have hired top talent through our platform
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 w-full mt-8">
            {stats.map((stat, index) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCounter({ value, label, icon, delay = 0 }:{value:string,label:string,icon:ReactNode,delay:number}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center justify-center space-y-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <motion.div 
        className="text-4xl font-bold text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        {value}
      </motion.div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </motion.div>
  );
}

