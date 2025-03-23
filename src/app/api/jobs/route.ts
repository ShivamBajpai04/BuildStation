import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import Company from "@/models/Company";

// GET all jobs with optional filtering
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    // Create filter object based on search parameters
    const filter: any = {};
    
    // Filter by company ID if provided
    if (searchParams.has('companyId')) {
      filter.companyId = searchParams.get('companyId');
    }
    
    // Filter by job type if provided
    if (searchParams.has('jobType')) {
      filter.jobType = searchParams.get('jobType');
    }
    
    // Filter by location if provided
    if (searchParams.has('location')) {
      filter.location = { $regex: searchParams.get('location'), $options: 'i' };
    }
    
    // Filter by active status
    if (searchParams.has('isActive')) {
      filter.isActive = searchParams.get('isActive') === 'true';
    }
    
    // Get jobs with pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const jobs = await Job.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('companyId', 'name logo');
    
    const total = await Job.countDocuments(filter);
    
    return NextResponse.json({
      jobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create a new job
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    // Validate required fields
    const { companyId, title, description, location, jobType } = body;
    
    if (!companyId || !title || !description || !location || !jobType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Verify that the company exists
    const companyExists = await Company.findById(companyId);
    if (!companyExists) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }
    
    // Create the job
    const newJob = await Job.create(body);
    
    // Update the company's openPositions count
    await Company.findByIdAndUpdate(
      companyId,
      { $inc: { openPositions: 1 } }
    );
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
