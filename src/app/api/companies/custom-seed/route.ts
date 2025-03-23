import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";
import fs from 'fs';
import path from 'path';

// This is an example of how you could create a custom seed operation
// that would handle custom company logos if you have them
export async function GET() {
  try {
    await connectDB();
    
    // Clear existing companies
    await Company.deleteMany({});
    
    // Indian company data without logos first
    const indianCompanies = [
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
      // ... other companies from the previous data
    ];
    
    // Prepare logos directory
    const publicDir = path.join(process.cwd(), 'public');
    const logosDir = path.join(publicDir, 'company-logos', 'indian');
    
    // Ensure directories exist
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
    }
    
    // For each company, either find an existing logo or use a default
    const companiesWithLogos = indianCompanies.map(company => {
      // Convert company name to a file-friendly name
      const logoFileName = company.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Check if logo exists
      const logoPath = `/company-logos/indian/${logoFileName}.png`;
      const fullLogoPath = path.join(publicDir, logoPath.substring(1));
      
      // If logo doesn't exist, use default
      if (!fs.existsSync(fullLogoPath)) {
        return {
          ...company,
          logo: `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(company.name)}`,
        };
      }
      
      return {
        ...company,
        logo: logoPath,
      };
    });
    
    // Insert companies with logo paths
    await Company.insertMany(companiesWithLogos);
    
    return NextResponse.json({
      message: "Database seeded successfully with Indian companies!",
      count: indianCompanies.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
