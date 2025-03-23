"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building, Lock, Mail, CheckCircle } from "lucide-react";
import { GrainyTexture } from "@/components/effects/grainy-texture";
import { useRouter } from "next/navigation";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate API call with a delay
    setTimeout(() => {
      setLoading(false);
      
      // Simple validation - any email ending with company.com
      if (email.trim() === "") {
        setError("Please enter an email");
        return;
      }
      
      if (password.trim() === "") {
        setError("Please enter a password");
        return;
      }
      
      // Success animation
      setShowSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        router.push("/company/add");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#121116] flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#3b82f618 1px, transparent 1px), linear-gradient(to right, #3b82f618 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 opacity-60 z-0 bg-gradient-to-tr from-[#121116]/0 via-purple-600/5 to-indigo-500/20" />
      <GrainyTexture opacity={0.2} blend="soft-light" />
      
      {/* Back button */}
      <div className="sticky top-0 z-50 bg-[#121116]/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/mainpage" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to Companies</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {showSuccess ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="h-8 w-8 text-green-500" />
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">Login Successful!</h2>
              <p className="text-gray-300 mb-6">Redirecting you to add your company...</p>
              <div className="inline-block h-1.5 w-32 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>
          ) : (
            <div className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 mb-4">
                  <Building className="h-6 w-6 text-[#3b82f6]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Company Login</h2>
                <p className="text-gray-400 mt-2">Sign in to add or manage your company</p>
              </div>
              
              {error && (
                <div className="mb-6 p-3 bg-red-900/30 border border-red-700/50 rounded text-sm text-red-200">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@company.com"
                      className="block w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Your password"
                      className="block w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 text-white bg-gradient-to-r from-[#3b82f6] to-[#6366f1] rounded-md hover:from-[#3b82f6]/90 hover:to-[#6366f1]/90 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50 transition-colors"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                
                <div className="text-center text-gray-400 text-sm">
                  <p>Don&apos;t have an account? <Link href="#" className="text-[#3b82f6] hover:underline">Register</Link></p>
                  <p className="mt-1 text-xs text-gray-500">* Any email/password will work for this demo</p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
