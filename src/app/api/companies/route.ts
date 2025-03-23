import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    
    // Extract query parameters
    const searchTerm = searchParams.get("search") || "";
    const industry = searchParams.getAll("industry");
    const location = searchParams.getAll("location");
    const jobType = searchParams.getAll("jobType");
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const featured = searchParams.get("featured") === "true";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    
    // Build query
    let query: any = {};
    
    // Search term
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { industry: { $regex: searchTerm, $options: "i" } },
      ];
    }
    
    // Industry filter
    if (industry.length > 0) {
      query.industry = { $in: industry };
    }
    
    // Location filter
    if (location.length > 0) {
      query.location = { $in: location };
    }
    
    // Job type filter
    if (jobType.length > 0) {
      query.jobTypes = { $in: jobType };
    }
    
    // Rating filter
    if (minRating > 0) {
      query.rating = { $gte: minRating };
    }
    
    // Featured filter
    if (featured) {
      query.featured = true;
    }
    
    // Count total matching documents for pagination
    const total = await Company.countDocuments(query);
    
    // Execute query with sorting and pagination
    const companies = await Company.find(query)
      .sort({ openPositions: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      companies,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

// New endpoint to add a company
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Get company data from request body
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.industry || !data.location || !data.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate rating is within range 0-5
    if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 0 and 5" },
        { status: 400 }
      );
    }
    
    // Create new company with validated data
    const newCompany = await Company.create({
      name: data.name,
      logo: data.logo || "/placeholder.svg?height=100&width=100",
      industry: data.industry,
      location: data.location,
      openPositions: data.openPositions || 0,
      rating: data.rating !== undefined ? Math.min(Math.max(data.rating, 0), 5) : 0, // Ensure rating is between 0-5
      featured: data.featured || false,
      description: data.description,
      jobTypes: data.jobTypes || [],
    });
    
    return NextResponse.json(
      { message: "Company added successfully", company: newCompany },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding company:", error);
    // Return more specific error information to help with debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to add company", details: errorMessage },
      { status: 500 }
    );
  }
}
