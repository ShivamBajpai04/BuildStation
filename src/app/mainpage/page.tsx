"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Briefcase, MapPin, Clock, ArrowUpDown, Building } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GrainyTexture } from "@/components/effects/grainy-texture";

// Company type definition
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
};

// Pagination type
type Pagination = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

// Filter types for our job search
type FilterOptions = {
  industry: string[];
  jobType: string[];
  location: string[];
  minRating: number;
  featured: boolean;
};

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    industry: [],
    jobType: [],
    location: [],
    minRating: 0,
    featured: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 12,
    pages: 0,
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Available filter options
  const [industries, setIndustries] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);

  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/companies/filter-options');
        if (!response.ok) {
          throw new Error('Failed to fetch filter options');
        }
        const data = await response.json();
        setIndustries(data.industries);
        setLocations(data.locations);
        setJobTypes(data.jobTypes);
      } catch (err) {
        console.error('Error fetching filter options:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch companies from API with applied filters
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Build query string with all active filters
        const params = new URLSearchParams();
        
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        filters.industry.forEach(industry => {
          params.append('industry', industry);
        });
        
        filters.location.forEach(location => {
          params.append('location', location);
        });
        
        filters.jobType.forEach(type => {
          params.append('jobType', type);
        });
        
        if (filters.minRating > 0) {
          params.append('minRating', filters.minRating.toString());
        }
        
        if (filters.featured) {
          params.append('featured', 'true');
        }
        
        params.append('sortOrder', sortOrder);
        params.append('page', pagination.page.toString());
        params.append('limit', pagination.limit.toString());
        
        const response = await fetch(`/api/companies?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        
        const data = await response.json();
        setCompanies(data.companies);
        setPagination(data.pagination);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Use a small delay to avoid too many calls when multiple filters change
    const timeoutId = setTimeout(() => {
      fetchCompanies();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters, sortOrder, pagination.page, pagination.limit]);

  // Toggle a filter value
  const toggleFilter = (type: keyof FilterOptions, value: string | boolean | number) => {
    setFilters(prev => {
      if (type === "minRating") {
        return { ...prev, [type]: value as number };
      }
      if (type === "featured") {
        return { ...prev, [type]: value as boolean };
      }
      
      const array = prev[type as "industry" | "jobType" | "location"] as string[];
      if (array.includes(value as string)) {
        return {
          ...prev,
          [type]: array.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [type]: [...array, value as string]
        };
      }
    });
    
    // Reset to page 1 when changing filters
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle sort toggle
  const toggleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    // Reset to page 1 when changing sort
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle page change
  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
    
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const { page, pages } = pagination;
    if (pages <= 5) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }
    
    if (page <= 3) {
      return [1, 2, 3, 4, 5, '...', pages];
    }
    
    if (page >= pages - 2) {
      return [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];
    }
    
    return [1, '...', page - 1, page, page + 1, '...', pages];
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex justify-between items-start">
          <motion.div>
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Dream Company
            </motion.h1>
            <motion.p 
              className="text-gray-300 max-w-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore top companies hiring now. Discover opportunities that match your skills and career aspirations.
            </motion.p>
          </motion.div>
          
          {/* Company Registration Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/company/register">
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white rounded-md hover:shadow-lg hover:from-[#3b82f6]/90 hover:to-[#6366f1]/90 transition-all duration-300">
                <Building className="h-4 w-4" />
                <span>Are you a company?</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Search and filter section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-md bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                placeholder="Search companies, positions, or keywords..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 when searching
                }}
              />
            </div>
            
            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-700"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            {/* Sort toggle button */}
            <button
              onClick={toggleSort}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-700"
            >
              <ArrowUpDown className="h-5 w-5 mr-2" />
              Sort: {sortOrder === "desc" ? "Most" : "Least"} Positions
            </button>
          </div>
          
          {/* Filter panels */}
          {showFilters && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 rounded-md bg-gray-900/50 border border-gray-700 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Industry filter */}
              <div>
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-1.5" />
                  Industry
                </h3>
                <div className="space-y-1.5">
                  {industries.map(industry => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded text-[#3b82f6] h-4 w-4 bg-gray-800 border-gray-600"
                        checked={filters.industry.includes(industry)}
                        onChange={() => toggleFilter("industry", industry)}
                      />
                      <span className="ml-2 text-sm text-gray-300">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Job type filter */}
              <div>
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-1.5" />
                  Job Type
                </h3>
                <div className="space-y-1.5">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded text-[#3b82f6] h-4 w-4 bg-gray-800 border-gray-600"
                        checked={filters.jobType.includes(type)}
                        onChange={() => toggleFilter("jobType", type)}
                      />
                      <span className="ml-2 text-sm text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Location filter */}
              <div>
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  Location
                </h3>
                <div className="space-y-1.5">
                  {locations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded text-[#3b82f6] h-4 w-4 bg-gray-800 border-gray-600"
                        checked={filters.location.includes(location)}
                        onChange={() => toggleFilter("location", location)}
                      />
                      <span className="ml-2 text-sm text-gray-300">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Other filters */}
              <div>
                <h3 className="font-medium text-white mb-2">Additional Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1.5">Minimum Rating</label>
                    <select
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      value={filters.minRating}
                      onChange={(e) => toggleFilter("minRating", Number(e.target.value))}
                    >
                      <option value="0">Any Rating</option>
                      <option value="3">3+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox rounded text-[#3b82f6] h-4 w-4 bg-gray-800 border-gray-600"
                      checked={filters.featured}
                      onChange={() => toggleFilter("featured", !filters.featured)}
                    />
                    <span className="ml-2 text-sm text-gray-300">Featured Companies Only</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Error message */}
        {error && (
          <div className="text-center p-4 mb-6 bg-red-900/50 border border-red-700 rounded-md">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-400">Loading companies...</p>
          </div>
        ) : (
          <>
            {/* Results counter */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-400">
                Showing <span className="text-white font-medium">{companies.length}</span> of <span className="text-white font-medium">{pagination.total}</span> companies
              </div>
            </div>
            
            {/* Companies grid */}
            {companies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companies.map((company, index) => (
                  <motion.div
                    key={company._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={`/company/${company._id}`} className="block h-full">
                      <div className={`h-full rounded-lg overflow-hidden border ${company.featured ? 'border-[#3b82f6]/50' : 'border-gray-700'} bg-gradient-to-b from-gray-900 to-gray-800 hover:transform hover:scale-[1.02] transition-all duration-200 shadow-lg`}>
                        {company.featured && (
                          <div className="bg-[#3b82f6] px-3 py-1 text-xs font-semibold text-white absolute right-4 top-4 rounded-full">
                            Featured
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 mr-3 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                              {/* Company logo */}
                              {company.logo ? (
                                <Image 
                                  src={company.logo} 
                                  alt={company.name}
                                  width={48}
                                  height={48}
                                  className="object-contain"
                                  onError={(e) => {
                                    // When image fails to load, fall back to the Building icon
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      const icon = parent.querySelector('.fallback-icon');
                                      if (icon) icon.setAttribute('style', 'display: block');
                                    }
                                  }}
                                />
                              ) : (
                                <Building className="h-6 w-6 text-gray-300" />
                              )}
                              <Building 
                                className="h-6 w-6 text-gray-300 fallback-icon" 
                                style={{ display: "none" }} 
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                              <p className="text-gray-400 text-sm">{company.industry}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-4">{company.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-400 text-sm">
                              <MapPin className="h-4 w-4 mr-1.5" />
                              {company.location}
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Briefcase className="h-4 w-4 mr-1.5" />
                              <span className="text-[#3b82f6] font-medium">{company.openPositions}</span> open positions
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {company.jobTypes.slice(0, 3).map(type => (
                              <span key={type} className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                                {type}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-gray-400">{company.rating}</span>
                            </div>
                            <button className="text-[#3b82f6] hover:text-[#3b82f6]/80 text-sm font-medium">
                              View Jobs
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No companies found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find more companies.
                </p>
              </div>
            )}
            
            {/* Pagination - Updated to be functional */}
            {companies.length > 0 && pagination.pages > 1 && (
              <div className="mt-10 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={() => changePage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1 rounded-md ${
                      pagination.page === 1 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  {getPageNumbers().map((pageNum, index) => (
                    <button 
                      key={index} 
                      onClick={() => typeof pageNum === 'number' ? changePage(pageNum) : null}
                      className={`px-3 py-1 rounded-md ${
                        pageNum === pagination.page 
                          ? 'bg-[#3b82f6] text-white' 
                          : pageNum === '...' 
                            ? 'bg-transparent text-gray-400 cursor-default hover:bg-transparent'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                      disabled={pageNum === '...'}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => changePage(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className={`px-3 py-1 rounded-md ${
                      pagination.page === pagination.pages 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
