"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Star, ArrowLeft, Building, ExternalLink, Share2, BookmarkPlus, Users, Clock, Zap, Award } from "lucide-react";
import { GrainyTexture } from "@/components/effects/grainy-texture";

// Company type
type Company = {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  openPositions: number;
  rating: number;
  featured: boolean;
  description: string;
  jobTypes: string[];
  createdAt?: string;
  updatedAt?: string;
};

// Job type
type Job = {
  _id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: string;
  requirements: string[];
  applicationDeadline?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function CompanyDetailsPage() {
  // Get the id parameter using useParams hook
  const params = useParams();
  const companyId = params.id as string;
  
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'reviews'>('overview');

  // Fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/companies/${companyId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`Failed to fetch company details (${response.status})`);
        }
        
        const data = await response.json();
        setCompany(data);
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  // Fetch jobs for the company
  useEffect(() => {
    const fetchCompanyJobs = async () => {
      if (!companyId) return;
      
      setIsLoadingJobs(true);
      setJobsError(null);
      
      try {
        const response = await fetch(`/api/companies/${companyId}/jobs`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch company jobs (${response.status})`);
        }
        
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error('Error fetching company jobs:', err);
        setJobsError(err instanceof Error ? err.message : 'Failed to load job listings');
      } finally {
        setIsLoadingJobs(false);
      }
    };
    
    fetchCompanyJobs();
  }, [companyId]);
  
  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate days ago
  const daysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  // Function to get department from job title
  const getDepartmentFromTitle = (title: string): string => {
    const departments = {
      'Software': 'Engineering',
      'Developer': 'Engineering',
      'Engineer': 'Engineering',
      'DevOps': 'Engineering',
      'QA': 'Engineering',
      'Product': 'Product',
      'UX': 'Design',
      'UI': 'Design',
      'Designer': 'Design',
      'Data': 'Data Science',
      'Marketing': 'Marketing',
      'Sales': 'Sales',
      'Customer': 'Customer Support',
      'Support': 'Customer Support',
      'HR': 'HR',
      'Human': 'HR',
      'Finance': 'Finance',
      'Legal': 'Legal',
      'Operations': 'Operations',
      'Manager': 'Management',
      'Director': 'Management',
      'Project': 'Project Management',
    };

    for (const [keyword, department] of Object.entries(departments)) {
      if (title.includes(keyword)) {
        return department;
      }
    }
    
    return 'General';
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

      {/* Main content */}
      <div className="relative z-10">
        {isLoading ? (
          <div className="container mx-auto px-4 py-24 flex items-center justify-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-400 ml-3">Loading company details...</p>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-24 text-center">
            <div className="p-6 bg-red-900/30 border border-red-800 rounded-lg max-w-xl mx-auto">
              <h2 className="text-xl font-medium text-white mb-2">Error Loading Company</h2>
              <p className="text-red-200 mb-4">{error}</p>
              <Link href="/mainpage">
                <button className="bg-white text-red-900 px-4 py-2 rounded-md hover:bg-red-100 transition-colors">
                  Return to Companies
                </button>
              </Link>
            </div>
          </div>
        ) : company ? (
          <>
            {/* Back button - sticky at the top */}
            <div className="sticky top-0 z-50 bg-[#121116]/80 backdrop-blur-sm border-b border-white/10">
              <div className="container mx-auto px-4 py-3 flex items-center">
                <Link href="/mainpage" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="text-sm">Back to Companies</span>
                </Link>
              </div>
            </div>
            
            {/* Company header section */}
            <div className="container mx-auto px-4 pt-8 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Company logo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700">
                  {company.logo ? (
                    <Image 
                      src={company.logo} 
                      alt={company.name}
                      width={96}
                      height={96}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Building className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                
                {/* Company basic info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{company.name}</h1>
                    {company.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30">
                        <Award className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1.5 text-gray-400" />
                      {company.industry}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      {company.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span className="text-[#3b82f6]">{company.openPositions}</span> open positions
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(company.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <span className="ml-1.5">{company.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {company.jobTypes.map(type => (
                      <span key={type} className="inline-block px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-md border border-gray-700">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  <button className="flex items-center justify-center px-4 py-2 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-md transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-700 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-700 transition-colors">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
            
            {/* Navigation tabs */}
            <div className="border-b border-gray-800">
              <div className="container mx-auto px-4">
                <nav className="flex overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'overview' 
                        ? 'border-[#3b82f6] text-[#3b82f6]' 
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'jobs' 
                        ? 'border-[#3b82f6] text-[#3b82f6]' 
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Jobs ({jobs.length || company.openPositions})
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                      activeTab === 'reviews' 
                        ? 'border-[#3b82f6] text-[#3b82f6]' 
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Reviews
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="container mx-auto px-4 py-8">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main content area */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* About section */}
                    <section>
                      <h2 className="text-xl font-semibold text-white mb-4">About {company.name}</h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed mb-4">{company.description}</p>
                        <p className="text-gray-300 leading-relaxed">
                          {company.name} is a leading player in the {company.industry} industry, committed 
                          to innovation and excellence. With a strong presence in {company.location} and beyond, 
                          we're constantly pushing boundaries and creating opportunities for talented individuals
                          to contribute to our growth story.
                        </p>
                      </div>
                    </section>
                    
                    {/* Featured positions */}
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Featured Positions</h2>
                        <button 
                          onClick={() => setActiveTab('jobs')}
                          className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80"
                        >
                          View all positions
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {isLoadingJobs ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="inline-block animate-spin h-6 w-6 border-3 border-[#3b82f6] border-t-transparent rounded-full mr-3"></div>
                            <p className="text-gray-400">Loading job listings...</p>
                          </div>
                        ) : jobsError ? (
                          <div className="p-6 bg-red-900/20 border border-red-800/30 rounded-lg">
                            <p className="text-red-200 text-center">{jobsError}</p>
                          </div>
                        ) : jobs.length === 0 ? (
                          <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                            <p className="text-gray-400">No job listings available at the moment.</p>
                          </div>
                        ) : (
                          jobs.slice(0, 3).map(job => (
                            <motion.div 
                              key={job._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                            >
                              <h3 className="font-medium text-white mb-2">{job.title}</h3>
                              <div className="flex flex-wrap gap-y-2 text-sm text-gray-400 mb-3">
                                <div className="flex items-center mr-4">
                                  <Building className="h-4 w-4 mr-1.5" />
                                  {getDepartmentFromTitle(job.title)}
                                </div>
                                <div className="flex items-center mr-4">
                                  <MapPin className="h-4 w-4 mr-1.5" />
                                  {job.location}
                                </div>
                                <div className="flex items-center mr-4">
                                  <Clock className="h-4 w-4 mr-1.5" />
                                  {job.jobType}
                                </div>
                                {job.applicationDeadline && (
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1.5" />
                                    Deadline: {formatDate(job.applicationDeadline)}
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="text-sm font-medium text-[#3b82f6]">{job.salary}</div>
                                <div className="text-xs text-gray-500">Posted {daysAgo(job.createdAt)}</div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </section>
                    
                    {/* Why join us section */}
                    <section>
                      <h2 className="text-xl font-semibold text-white mb-4">Why Join {company.name}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mr-3">
                              <Zap className="h-5 w-5 text-[#3b82f6]" />
                            </div>
                            <h3 className="font-medium text-white">Growth Opportunities</h3>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Continuous learning and development paths to help you grow professionally.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mr-3">
                              <Users className="h-5 w-5 text-[#3b82f6]" />
                            </div>
                            <h3 className="font-medium text-white">Collaborative Culture</h3>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Work with talented teams in a supportive and innovative environment.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mr-3">
                              <Award className="h-5 w-5 text-[#3b82f6]" />
                            </div>
                            <h3 className="font-medium text-white">Competitive Benefits</h3>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Comprehensive benefits package including healthcare, wellness programs, and more.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mr-3">
                              <Briefcase className="h-5 w-5 text-[#3b82f6]" />
                            </div>
                            <h3 className="font-medium text-white">Impactful Work</h3>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Make a real difference with work that matters and impacts millions.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Company stats */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-white mb-4">Company Stats</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Industry</span>
                          <span className="text-white font-medium">{company.industry}</span>
                        </div>
                        <div className="border-t border-gray-800 pt-4 flex justify-between">
                          <span className="text-gray-400">Company Size</span>
                          <span className="text-white font-medium">1000-5000 employees</span>
                        </div>
                        <div className="border-t border-gray-800 pt-4 flex justify-between">
                          <span className="text-gray-400">Founded</span>
                          <span className="text-white font-medium">2004</span>
                        </div>
                        <div className="border-t border-gray-800 pt-4 flex justify-between">
                          <span className="text-gray-400">Average Rating</span>
                          <span className="text-white font-medium flex items-center">
                            {company.rating.toFixed(1)}
                            <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                          </span>
                        </div>
                        <div className="border-t border-gray-800 pt-4 flex justify-between">
                          <span className="text-gray-400">Open Positions</span>
                          <span className="text-[#3b82f6] font-medium">{jobs.length || company.openPositions}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Company info */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-white mb-4">Company Info</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="block text-gray-400 mb-1">Headquarters</span>
                          <span className="text-white">{company.location}</span>
                        </div>
                        <div>
                          <span className="block text-gray-400 mb-1">Website</span>
                          <a href="#" className="text-[#3b82f6] hover:underline flex items-center">
                            {company.name.toLowerCase().replace(/\s+/g, '')}.com
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </a>
                        </div>
                        <div>
                          <span className="block text-gray-400 mb-1">Listed Since</span>
                          <span className="text-white">{formatDate(company.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Similar companies */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-white mb-4">Similar Companies</h3>
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <Link href={`/company/${i}`} key={i} className="flex items-center gap-3 hover:bg-gray-800/50 p-2 rounded-md transition-colors">
                            <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">Similar {company.industry} Company {i}</h4>
                              <p className="text-gray-400 text-sm">{company.location}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white">All Open Positions ({jobs.length || company.openPositions})</h2>
                    
                    {/* Job search and filter - simplified for demo */}
                    <div className="flex gap-3">
                      <div className="relative flex-grow">
                        <input 
                          type="text"
                          placeholder="Search job positions..." 
                          className="w-full pl-3 pr-3 py-2 bg-gray-900/70 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                        />
                      </div>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700">
                        Filter
                      </button>
                    </div>
                  </div>
                  
                  {/* Job listings */}
                  <div className="space-y-4">
                    {isLoadingJobs ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="inline-block animate-spin h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full mr-3"></div>
                        <p className="text-gray-400">Loading job listings...</p>
                      </div>
                    ) : jobsError ? (
                      <div className="p-8 bg-red-900/20 border border-red-800/30 rounded-lg text-center">
                        <p className="text-red-200">{jobsError}</p>
                        <button
                          onClick={() => window.location.reload()}
                          className="mt-4 px-4 py-2 bg-red-800/30 hover:bg-red-700/30 text-white rounded-md border border-red-700/30"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : jobs.length === 0 ? (
                      <div className="p-8 bg-gray-800/30 border border-gray-700 rounded-lg text-center">
                        <p className="text-gray-400 mb-4">No job listings available at the moment.</p>
                        <p className="text-gray-500">Check back later for new opportunities.</p>
                      </div>
                    ) : (
                      jobs.map(job => (
                        <motion.div 
                          key={job._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-5 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-white mb-1">{job.title}</h3>
                              <div className="text-sm text-gray-400">{getDepartmentFromTitle(job.title)}</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-block px-2.5 py-1 bg-[#3b82f6]/20 text-[#3b82f6] text-xs rounded-md border border-[#3b82f6]/30">
                                {job.jobType}
                              </span>
                              {job.applicationDeadline && (
                                <span className="inline-block px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700">
                                  Deadline: {formatDate(job.applicationDeadline)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-y-2 text-sm text-gray-400 mb-4">
                            <div className="flex items-center mr-6">
                              <MapPin className="h-4 w-4 mr-1.5" />
                              {job.location}
                            </div>
                            <div className="flex items-center mr-6">
                              <Clock className="h-4 w-4 mr-1.5" />
                              Posted {daysAgo(job.createdAt)}
                            </div>
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 mr-1.5 text-[#3b82f6]" />
                              {job.salary}
                            </div>
                          </div>
                          
                          <div className="text-gray-300 text-sm mb-4">
                            <p>{job.description}</p>
                          </div>
                          
                          {job.requirements && job.requirements.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-white font-medium mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside pl-2 text-sm text-gray-400 space-y-1">
                                {job.requirements.map((requirement, index) => (
                                  <li key={index}>{requirement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="text-gray-400 text-xs">
                              Job ID: {job._id}
                            </div>
                            <button className="px-4 py-2 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-md whitespace-nowrap">
                              Apply Now
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-white">Employee Reviews</h2>
                    <button className="px-4 py-2 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-md">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-1">{company.rating.toFixed(1)}</div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(company.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">Based on 245 reviews</div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-400 w-24">5 stars</div>
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <div className="text-sm text-gray-400 w-10">65%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-400 w-24">4 stars</div>
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <div className="text-sm text-gray-400 w-10">20%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-400 w-24">3 stars</div>
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                          <div className="text-sm text-gray-400 w-10">10%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-400 w-24">2 stars</div>
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "3%" }}></div>
                          </div>
                          <div className="text-sm text-gray-400 w-10">3%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-400 w-24">1 star</div>
                          <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "2%" }}></div>
                          </div>
                          <div className="text-sm text-gray-400 w-10">2%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample reviews */}
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-medium text-white">Great place to work and grow!</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`h-4 w-4 ${j < 5-i % 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400 mb-3">
                          <div>Former Employee</div>
                          <div>{company.location}</div>
                          <div>{formatDate(`2023-${(i*3 % 12) + 1}-${(i*7 % 28) + 1}`)}</div>
                        </div>
                        <div className="text-gray-300 mb-4">
                          <p>
                            {i === 1 ? (
                              "Great working environment with lots of learning opportunities. Management is supportive and the team is fantastic. Work-life balance could be improved during project deadlines."
                            ) : i === 2 ? (
                              "Amazing culture and leadership that truly values employees. The benefits are top-notch and there's plenty of room for growth. Highly recommend working here!"
                            ) : (
                              "Challenging work that keeps you engaged. The company invests in your professional development and offers competitive compensation. The only downside is sometimes projects can get stressful."
                            )}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-300">
                            <span className="font-medium text-green-400">Pros: </span> 
                            {i === 1 ? "Good culture" : i === 2 ? "Great benefits" : "Learning opportunities"}
                          </div>
                          <div className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-300">
                            <span className="font-medium text-red-400">Cons: </span> 
                            {i === 1 ? "Work pressure" : i === 2 ? "Location" : "Long hours sometimes"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
