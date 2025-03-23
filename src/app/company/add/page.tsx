"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building, MapPin, Briefcase, Star, Plus, Minus, Check, ArrowRight, UploadCloud, AlertCircle } from "lucide-react";
import { GrainyTexture } from "@/components/effects/grainy-texture";

// Job type options
const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Hybrid",
  "Contract",
  "Internship",
  "On-site",
  "Freelance",
  "Temporary",
  "Volunteer"
];

// Industry options
const INDUSTRIES = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Transportation",
  "Food Tech",
  "Energy",
  "Telecommunications",
  "Consumer Goods",
  "Retail",
  "Automotive",
  "Entertainment",
  "Hospitality"
];

export default function AddCompanyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    openPositions: 1,
    rating: 4.0,
    featured: false,
    description: "",
    jobTypes: ["Full-time"]
  });
  
  // Preview image for company logo
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Update form field handler
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Add or remove job type
  const toggleJobType = (type: string) => {
    if (formData.jobTypes.includes(type)) {
      updateField('jobTypes', formData.jobTypes.filter(t => t !== type));
    } else {
      updateField('jobTypes', [...formData.jobTypes, type]);
    }
  };
  
  // Handle file upload for logo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Navigation between steps
  const nextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.name || !formData.industry || !formData.location) {
        setError("Please fill in all required fields");
        return;
      }
    } else if (currentStep === 2) {
      // Validate step 2
      if (!formData.description) {
        setError("Company description is required");
        return;
      }
      if (formData.jobTypes.length === 0) {
        setError("Please select at least one job type");
        return;
      }
    }
    
    setError(null);
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Submit form
  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add company');
      }
      
      // Success!
      setSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        router.push('/mainpage');
      }, 3000);
    } catch (err) {
      console.error('Error adding company:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121116]">
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
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Add Your Company</h1>
              <p className="text-gray-400">Showcase your company to thousands of potential candidates</p>
            </motion.div>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === step 
                        ? "bg-[#3b82f6] text-white"
                        : currentStep > step
                          ? "bg-green-500 text-white"
                          : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <div className="text-xs mt-2 text-gray-400">
                    {step === 1 ? "Basic Info" : step === 2 ? "Details" : "Review"}
                  </div>
                </div>
              ))}
              <div className="absolute left-0 right-0 flex justify-center -z-10">
                <div className="w-72 h-0.5 bg-gray-800 absolute top-5"></div>
              </div>
            </div>
          </div>
          
          {/* Form container */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-6 md:p-8"
          >
            {/* Error message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-900/30 border border-red-700/50 rounded-md flex items-center"
              >
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}
            
            {/* Success message */}
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Company Added Successfully!</h2>
                <p className="text-gray-300 mb-6">Your company has been added to our platform.</p>
                <div className="flex justify-center">
                  <Link href="/mainpage">
                    <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#3b82f6]/90 transition-colors">
                      Go to Companies
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Company Basic Information</h2>
                    
                    <div className="space-y-6">
                      {/* Company name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Company Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <Building className="h-5 w-5" />
                          </div>
                          <input
                            id="name"
                            type="text"
                            placeholder="e.g. Acme Corporation"
                            className="block w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Industry */}
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Industry <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="industry"
                          className="block w-full pl-4 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                          value={formData.industry}
                          onChange={(e) => updateField("industry", e.target.value)}
                        >
                          <option value="" disabled>Select an industry</option>
                          {INDUSTRIES.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Location */}
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Location <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <input
                            id="location"
                            type="text"
                            placeholder="e.g. Bengaluru, Karnataka"
                            className="block w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                            value={formData.location}
                            onChange={(e) => updateField("location", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Open Positions */}
                      <div>
                        <label htmlFor="openPositions" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Number of Open Positions
                        </label>
                        <div className="relative flex items-center">
                          <button
                            type="button"
                            className="absolute left-0 ml-3 flex items-center justify-center h-7 w-7 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
                            onClick={() => formData.openPositions > 1 && updateField("openPositions", formData.openPositions - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            id="openPositions"
                            type="number"
                            min="1"
                            step="1"
                            className="block w-full pl-14 pr-14 py-2.5 text-center bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                            value={formData.openPositions}
                            onChange={(e) => updateField("openPositions", Math.max(1, parseInt(e.target.value) || 1))}
                          />
                          <button
                            type="button"
                            className="absolute right-0 mr-3 flex items-center justify-center h-7 w-7 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
                            onClick={() => updateField("openPositions", formData.openPositions + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Company Logo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Company Logo
                        </label>
                        <div
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md hover:border-gray-500 transition-colors cursor-pointer bg-gray-800/30"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <div className="space-y-1 text-center">
                            {previewImage ? (
                              <div className="mx-auto h-20 w-20 flex items-center justify-center">
                                <img src={previewImage} alt="Preview" className="h-full w-full object-contain rounded-md" />
                              </div>
                            ) : (
                              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-gray-700">
                                <UploadCloud className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <div className="flex text-sm text-gray-400">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#3b82f6] hover:text-[#3b82f6]/80 focus-within:outline-none"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileUpload} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Details */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Company Details</h2>
                    
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          placeholder="Tell potential candidates about your company"
                          className="block w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                          value={formData.description}
                          onChange={(e) => updateField("description", e.target.value)}
                        ></textarea>
                        <p className="mt-1 text-xs text-gray-500">
                          Brief overview of your company, mission, and culture
                        </p>
                      </div>
                      
                      {/* Rating */}
                      <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Company Rating
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            id="rating"
                            min="1"
                            max="5"
                            step="0.1"
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]"
                            value={formData.rating}
                            onChange={(e) => updateField("rating", parseFloat(e.target.value))}
                          />
                          <div className="ml-3 flex items-center text-gray-300">
                            <span className="font-semibold">{formData.rating.toFixed(1)}</span>
                            <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Featured */}
                      <div className="flex items-center">
                        <input
                          id="featured"
                          type="checkbox"
                          className="w-4 h-4 text-[#3b82f6] bg-gray-700 border-gray-600 rounded focus:ring-[#3b82f6] focus:ring-offset-gray-800"
                          checked={formData.featured}
                          onChange={(e) => updateField("featured", e.target.checked)}
                        />
                        <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                          Feature this company (appears with highlight)
                        </label>
                      </div>
                      
                      {/* Job Types */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Job Types Available <span className="text-red-400">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {JOB_TYPES.map(type => (
                            <button
                              key={type}
                              type="button"
                              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                                formData.jobTypes.includes(type)
                                  ? 'bg-[#3b82f6]/30 text-[#3b82f6] border border-[#3b82f6]/50'
                                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                              }`}
                              onClick={() => toggleJobType(type)}
                            >
                              {formData.jobTypes.includes(type) && (
                                <Check className="mr-1 h-3.5 w-3.5" />
                              )}
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Review Your Information</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-5">
                        <h3 className="text-lg font-medium text-white mb-4">Company Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Company Name</p>
                            <p className="text-white">{formData.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Industry</p>
                            <p className="text-white">{formData.industry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Location</p>
                            <p className="text-white">{formData.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Open Positions</p>
                            <p className="text-[#3b82f6] font-medium">{formData.openPositions}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Rating</p>
                            <div className="flex items-center">
                              <span className="text-white">{formData.rating.toFixed(1)}</span>
                              <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Featured</p>
                            <p className="text-white">{formData.featured ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-5">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Description</p>
                          <p className="text-white">{formData.description}</p>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Job Types</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.jobTypes.map(type => (
                              <span 
                                key={type}
                                className="inline-block px-2.5 py-1 bg-gray-900 text-gray-300 text-xs rounded-md border border-gray-700"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      className="flex items-center px-5 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#3b82f6]/90"
                      onClick={nextStep}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center px-5 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#3b82f6]/90 disabled:opacity-70 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Company
                          <Check className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
