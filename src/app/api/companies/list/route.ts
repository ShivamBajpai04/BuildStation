import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();
    
    // Get all companies with just the necessary fields for job creation
    const companies = await Company.find({}, 'name _id location jobTypes');
    
    if (companies.length === 0) {
      return NextResponse.json(
        { error: "No companies found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      companies,
      message: "Use any of these company IDs when creating a job"
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
