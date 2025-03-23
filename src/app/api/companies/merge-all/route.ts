import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

// This endpoint will fetch all companies (both Indian and foreign) from the database
// and ensure all logos are properly set up

export async function GET() {
  try {
    await connectDB();
    
    // Get all companies
    const companies = await Company.find({});
    
    // Process each company to ensure logos are formatted correctly
    const updates = [];
    
    for (const company of companies) {
      // Check if logo exists and format it properly if needed
      if (!company.logo || company.logo.includes('placehold.co')) {
        // Create a safe name for Cloudinary
        const safeName = company.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        // Update with Cloudinary URL
        const cloudinaryUrl = `https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/${safeName}`;
        
        // Update the company record
        await Company.findByIdAndUpdate(company._id, { logo: cloudinaryUrl });
        
        updates.push({
          company: company.name,
          status: 'updated',
          oldLogo: company.logo,
          newLogo: cloudinaryUrl
        });
      }
    }
    
    return NextResponse.json({
      message: "Companies processed successfully",
      totalCompanies: companies.length,
      updated: updates.length,
      updates
    });
  } catch (error) {
    console.error("Error processing companies:", error);
    return NextResponse.json(
      { error: "Failed to process companies", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
