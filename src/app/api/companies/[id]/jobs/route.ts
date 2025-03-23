import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import Company from "@/models/Company";

// GET all jobs for a specific company
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Fix: Properly await the entire params object before using it
    const params = await context.params;
    const id = params.id;
    const { searchParams } = new URL(req.url);
    
    // Verify that the company exists
    const companyExists = await Company.findById(id);
    if (!companyExists) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }
    
    // Create filter for the specific company
    const filter: any = { companyId: id };
    
    // Filter by job type if provided
    if (searchParams.has('jobType')) {
      filter.jobType = searchParams.get('jobType');
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
      .sort({ createdAt: -1 });
    
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
    console.error("Error fetching company jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch company jobs" },
      { status: 500 }
    );
  }
}

// POST - Create a new job for a specific company
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Fix: Properly await the entire params object before using it
    const params = await context.params;
    const id = params.id;
    const body = await req.json();
    
    // Verify that the company exists
    const companyExists = await Company.findById(id);
    if (!companyExists) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }
    
    // Validate required fields
    const { title, description, location, jobType } = body;
    
    if (!title || !description || !location || !jobType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create the job with the company ID from the URL
    const newJob = await Job.create({
      ...body,
      companyId: id
    });
    
    // Update the company's openPositions count
    await Company.findByIdAndUpdate(
      id,
      { $inc: { openPositions: 1 } }
    );
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job for company:", error);
    return NextResponse.json(
      { error: "Failed to create job for company" },
      { status: 500 }
    );
  }
}
