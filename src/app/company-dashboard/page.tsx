"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building, 
  ArrowLeft, 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  FileText, 
  Star, 
  CheckCircle, 
  Loader2 
} from "lucide-react";
import { GrainyTexture } from "@/components/effects/grainy-texture";

// Form data type
type CompanyFormData = {
  name: string;
  industry: string;
  location: string;
  description: string;
  email: string;
  website?: string;
  logo?: string;
  jobTypes: string[];
};

// Available job types
const availableJobTypes = [
  "Full-time",
  "Part-time",
  "Remote",
  "On-site",
  "Hybrid",
  "Contract",
  "Internship",
  "Engineering",
  "Creative",
  "Technology",
  "Management"
];

export default function CompanyDashboardPage() {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "",
    industry: "",
    location: "",
    description: "",
    email: "",
    website: "",
    jobTypes: []
  });

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle job type selection
  const toggleJobType = (type: string) => {
    setFormData(prev => {
      if (prev.jobTypes.includes(type)) {
        return {
          ...prev,
          jobTypes: prev.jobTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          jobTypes: [...prev.jobTypes, type]
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.industry || !formData.location || !formData.description || !formData.email) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    
    if (formData.jobTypes.length === 0) {
      setSubmitError("Please select at least one job type.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          openPositions: 0,
          rating: 0,
          featured: false
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register company');
      }
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error registering company:', error);
      setSubmitError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121116] relative">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#3b82f618 1px, transparent 1px), linear-gradient(to right, #3b82f618 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 opacity-60 z-0 bg-gradient-to-tr from-[#121116]/0 via-purple-600/5 to-indigo-500/20" />
      <GrainyTexture opacity={0.2} blend="soft-light" />

      {/* Header with back link */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/mainpage" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to Companies</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 pt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {submitSuccess ? (
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
              <h2 className="text-xl font-bold text-white mb-2">Company Registered Successfully!</h2>
              <p className="text-gray-300 mb-6">Your company has been registered and will be reviewed by our team.</p>
              <Link href="/mainpage">
                <button className="px-6 py-3 bg-[#3b82f6] text-white rounded-md hover:bg-[#3b82f6]/90 transition-colors">
                  Browse Companies
                </button>
              </Link>
            </motion.div>
          ) : showRegisterForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Register Your Company</h2>
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-1">
                      Industry <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="e.g. Technology, Healthcare"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                      Location <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="City, Country"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="contact@company.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                      Website (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="https://yourcompany.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">
                      Logo URL (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="logo"
                        name="logo"
                        value={formData.logo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        placeholder="https://yourcompany.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Company Description <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                      placeholder="Briefly describe your company, mission, and values..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Job Types <span className="text-red-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableJobTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleJobType(type)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                          formData.jobTypes.includes(type)
                            ? 'bg-[#3b82f6] text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {formData.jobTypes.length > 0 && (
                    <p className="mt-2 text-sm text-gray-400">
                      Selected: {formData.jobTypes.join(', ')}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegisterForm(false)}
                    className="px-4 py-2 mr-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white rounded-md hover:shadow-lg hover:from-[#3b82f6]/90 hover:to-[#6366f1]/90 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Register Company"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center mb-6">
                <Building className="h-10 w-10 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Company Dashboard</h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                Register your company to showcase job opportunities, engage with potential candidates, and build your employer brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowRegisterForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white rounded-md hover:shadow-lg hover:from-[#3b82f6]/90 hover:to-[#6366f1]/90 transition-all duration-300"
                >
                  Register a New Company
                </button>
                <Link href="/mainpage">
                  <button className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
                    Browse Companies
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
