import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();
    
    // Get all companies
    const companies = await Company.find({});
    
    // Extract unique filter options
    const industries = Array.from(new Set(companies.map(company => company.industry)));
    const locations = Array.from(new Set(companies.map(company => company.location)));
    const jobTypes = Array.from(new Set(companies.flatMap(company => company.jobTypes)));
    
    return NextResponse.json({
      industries,
      locations,
      jobTypes,
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
