import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

// Initial company data with Indian companies
const initialCompanies = [
  {
    name: "Infosys Technologies",
    industry: "Information Technology",
    location: "Bengaluru, Karnataka",
    openPositions: 12,
    rating: 4.2,
    featured: true,
    description: "Leading provider of IT services and consulting with global reach",
    jobTypes: ["Full-time", "Remote", "Internship"],
  },
  {
    name: "Tata Consultancy Services",
    industry: "Information Technology",
    location: "Mumbai, Maharashtra",
    openPositions: 15,
    rating: 4.3,
    featured: true,
    description: "India's largest IT services and consulting company with presence in multiple domains",
    jobTypes: ["Full-time", "Part-time", "Remote"],
  },
  {
    name: "Reliance Industries",
    industry: "Energy",
    location: "Mumbai, Maharashtra",
    openPositions: 8,
    rating: 4.5,
    featured: true,
    description: "India's largest private sector company with interests in petrochemicals, energy, telecom, and retail",
    jobTypes: ["Full-time", "On-site"],
  },
  {
    name: "Wipro Limited",
    industry: "Information Technology",
    location: "Bengaluru, Karnataka",
    openPositions: 9,
    rating: 4.0,
    featured: false,
    description: "Global IT consulting and system integration services company",
    jobTypes: ["Full-time", "Remote", "Contract"],
  },
  {
    name: "Zomato",
    industry: "Food Tech",
    location: "Gurugram, Haryana",
    openPositions: 7,
    rating: 4.4,
    featured: true,
    description: "India's leading food delivery platform and restaurant discovery service",
    jobTypes: ["Full-time", "Part-time", "Remote"],
  },
  {
    name: "Apollo Hospitals",
    industry: "Healthcare",
    location: "Chennai, Tamil Nadu",
    openPositions: 6,
    rating: 4.2,
    featured: false,
    description: "One of India's largest healthcare providers with multi-specialty hospitals across the country",
    jobTypes: ["Full-time", "Part-time", "On-site"],
  },
  {
    name: "Flipkart",
    industry: "E-commerce",
    location: "Bengaluru, Karnataka",
    openPositions: 10,
    rating: 4.6,
    featured: true,
    description: "India's leading e-commerce marketplace offering a wide range of products",
    jobTypes: ["Full-time", "Remote", "Internship"],
  },
  {
    name: "HDFC Bank",
    industry: "Banking",
    location: "Mumbai, Maharashtra",
    openPositions: 5,
    rating: 4.3,
    featured: false,
    description: "One of India's premier banking and financial services companies",
    jobTypes: ["Full-time", "Internship", "On-site"],
  },
  {
    name: "Bharti Airtel",
    industry: "Telecommunications",
    location: "New Delhi, Delhi",
    openPositions: 8,
    rating: 4.1,
    featured: false,
    description: "Leading telecommunications services provider with operations across Asia and Africa",
    jobTypes: ["Full-time", "Part-time", "On-site"],
  },
  {
    name: "Byju's",
    industry: "Education",
    location: "Bengaluru, Karnataka",
    openPositions: 11,
    rating: 4.5,
    featured: true,
    description: "India's largest ed-tech company providing innovative learning programs for students",
    jobTypes: ["Full-time", "Remote", "Contract"],
  },
  {
    name: "Mahindra & Mahindra",
    industry: "Automotive",
    location: "Mumbai, Maharashtra",
    openPositions: 6,
    rating: 4.2,
    featured: false,
    description: "Indian multinational automotive manufacturing corporation and flagship company of the Mahindra Group",
    jobTypes: ["Full-time", "Internship", "On-site"],
  },
  {
    name: "Ola Cabs",
    industry: "Transportation",
    location: "Bengaluru, Karnataka",
    openPositions: 9,
    rating: 4.0,
    featured: true,
    description: "India's largest mobility platform and one of the world's largest ride-hailing companies",
    jobTypes: ["Full-time", "Part-time", "Remote"],
  },
  {
    name: "Hindustan Unilever",
    industry: "Consumer Goods",
    location: "Mumbai, Maharashtra",
    openPositions: 4,
    rating: 4.7,
    featured: true,
    description: "India's largest fast-moving consumer goods company with diverse product portfolio",
    jobTypes: ["Full-time", "Internship", "On-site"],
  },
  {
    name: "Tech Mahindra",
    industry: "Information Technology",
    location: "Pune, Maharashtra",
    openPositions: 7,
    rating: 4.1,
    featured: false,
    description: "Provider of IT services and consulting to businesses across various industry segments",
    jobTypes: ["Full-time", "Remote", "Contract"],
  },
  {
    name: "Swiggy",
    industry: "Food Tech",
    location: "Bengaluru, Karnataka",
    openPositions: 8,
    rating: 4.4,
    featured: true,
    description: "India's leading on-demand delivery platform connecting consumers to restaurants",
    jobTypes: ["Full-time", "Part-time", "Remote"],
  },
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing companies
    await Company.deleteMany({});
    
    // Add Cloudinary logo URLs based on company names
    const companiesWithLogos = initialCompanies.map(company => ({
      ...company,
      // Create logo URL from Cloudinary or fallback to placeholder
      logo: `https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/${company.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim()}`
    }));
    
    // Insert new companies
    await Company.insertMany(companiesWithLogos);
    
    return NextResponse.json({
      message: "Database seeded successfully with Indian companies!",
      count: companiesWithLogos.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
