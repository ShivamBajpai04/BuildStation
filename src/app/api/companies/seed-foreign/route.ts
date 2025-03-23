import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

// Foreign company data with Cloudinary-hosted logos
const foreignCompanies = [
  {
    name: "Google",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/google",
    industry: "Technology",
    location: "Mountain View, California",
    openPositions: 34,
    rating: 4.8,
    featured: true,
    description: "Leading global technology company specializing in internet-related services and products including search, cloud computing, software, and hardware.",
    jobTypes: ["Full-time", "Remote", "Internship", "Contract"],
  },
  {
    name: "Microsoft",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/microsoft",
    industry: "Technology",
    location: "Redmond, Washington",
    openPositions: 28,
    rating: 4.7,
    featured: true,
    description: "Multinational technology corporation that produces computer software, consumer electronics, personal computers, and related services.",
    jobTypes: ["Full-time", "Remote", "Hybrid", "Part-time"],
  },
  {
    name: "Amazon",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/amazon",
    industry: "E-commerce",
    location: "Seattle, Washington",
    openPositions: 42,
    rating: 4.5,
    featured: true,
    description: "Multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    jobTypes: ["Full-time", "On-site", "Remote", "Contract"],
  },
  {
    name: "Apple",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/apple",
    industry: "Technology",
    location: "Cupertino, California",
    openPositions: 26,
    rating: 4.9,
    featured: true,
    description: "Technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    jobTypes: ["Full-time", "Hybrid", "Internship"],
  },
  {
    name: "Meta",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/meta",
    industry: "Technology",
    location: "Menlo Park, California",
    openPositions: 31,
    rating: 4.6,
    featured: true,
    description: "Multinational technology conglomerate focused on social media, metaverse and other technologies.",
    jobTypes: ["Full-time", "Remote", "Internship", "Contract"],
  },
  {
    name: "Tesla",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/tesla",
    industry: "Automotive",
    location: "Austin, Texas",
    openPositions: 23,
    rating: 4.4,
    featured: true,
    description: "American electric vehicle and clean energy company that designs and manufactures electric cars, battery energy storage and solar products.",
    jobTypes: ["Full-time", "On-site", "Engineering"],
  },
  {
    name: "Netflix",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/netflix",
    industry: "Entertainment",
    location: "Los Gatos, California",
    openPositions: 15,
    rating: 4.7,
    featured: true,
    description: "Subscription streaming service and production company offering a library of films and television series through distribution deals and its own productions.",
    jobTypes: ["Full-time", "Remote", "Creative"],
  },
  {
    name: "Siemens",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/siemens",
    industry: "Industrial Manufacturing",
    location: "Munich, Germany",
    openPositions: 19,
    rating: 4.3,
    featured: false,
    description: "Global technology company focused on industry, infrastructure, transport, and healthcare through innovation and technological excellence.",
    jobTypes: ["Full-time", "On-site", "Engineering", "Technical"],
  },
  {
    name: "Samsung",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/samsung",
    industry: "Technology",
    location: "Seoul, South Korea",
    openPositions: 27,
    rating: 4.4,
    featured: true,
    description: "Multinational electronics company that produces a wide range of consumer and industrial electronic equipment and products.",
    jobTypes: ["Full-time", "Research", "Product Development"],
  },
  {
    name: "Toyota",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/toyota",
    industry: "Automotive",
    location: "Toyota City, Japan",
    openPositions: 14,
    rating: 4.5,
    featured: false,
    description: "Multinational automotive manufacturer known for pioneering hybrid electric vehicle technology and manufacturing reliable vehicles.",
    jobTypes: ["Full-time", "Engineering", "Manufacturing"],
  },
  {
    name: "Sony",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/sony",
    industry: "Technology",
    location: "Tokyo, Japan",
    openPositions: 16,
    rating: 4.3,
    featured: false,
    description: "Multinational conglomerate corporation known for electronics, gaming, entertainment and financial services.",
    jobTypes: ["Full-time", "Creative", "Technology", "Gaming"],
  },
  {
    name: "LVMH",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/lvmh",
    industry: "Luxury Goods",
    location: "Paris, France",
    openPositions: 8,
    rating: 4.6,
    featured: false,
    description: "Multinational corporation and conglomerate specializing in luxury goods, controlling around 75 distinguished brands.",
    jobTypes: ["Full-time", "Fashion", "Retail", "Design"],
  },
  {
    name: "BMW",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/bmw",
    industry: "Automotive",
    location: "Munich, Germany",
    openPositions: 11,
    rating: 4.5,
    featured: false,
    description: "Multinational manufacturer of luxury vehicles and motorcycles known for quality engineering and innovation.",
    jobTypes: ["Full-time", "Engineering", "Design", "Manufacturing"],
  },
  {
    name: "Alibaba",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/alibaba",
    industry: "E-commerce",
    location: "Hangzhou, China",
    openPositions: 22,
    rating: 4.2,
    featured: false,
    description: "Multinational technology company specializing in e-commerce, retail, Internet, and technology.",
    jobTypes: ["Full-time", "Technology", "Business Development"],
  },
  {
    name: "Unilever",
    logo: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/unilever",
    industry: "Consumer Goods",
    location: "London, United Kingdom",
    openPositions: 13,
    rating: 4.4,
    featured: false,
    description: "Multinational consumer goods company that produces food, condiments, ice cream, wellbeing vitamins, minerals and supplements, and personal care products.",
    jobTypes: ["Full-time", "Marketing", "Research", "Supply Chain"],
  },
];

export async function GET() {
  try {
    await connectDB();
    
    // Insert foreign companies without deleting existing ones
    await Company.insertMany(foreignCompanies);
    
    return NextResponse.json({
      message: "Database populated successfully with foreign companies!",
      count: foreignCompanies.length,
    });
  } catch (error) {
    console.error("Error adding foreign companies:", error);
    return NextResponse.json(
      { error: "Failed to add foreign companies" },
      { status: 500 }
    );
  }
}
