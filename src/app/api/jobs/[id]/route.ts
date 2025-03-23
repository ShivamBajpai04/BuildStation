import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import Company from "@/models/Company";

// GET a specific job by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Fix: Properly await the entire params object
    const params = await context.params;
    const id = params.id;
    
    const job = await Job.findById(id).populate('companyId', 'name logo industry location rating description');
    
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// PUT - Update a job
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Fix: Properly await the entire params object
    const params = await context.params;
    const id = params.id;
    const body = await req.json();
    
    // Find existing job
    const existingJob = await Job.findById(id);
    if (!existingJob) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Fix: Properly await the entire params object
    const params = await context.params;
    const id = params.id;
    
    // Find the job to get the company ID before deletion
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }
    
    // Store the company ID to update its open positions count
    const companyId = job.companyId;
    
    // Delete the job
    await Job.findByIdAndDelete(id);
    
    // Decrease the company's openPositions count
    await Company.findByIdAndUpdate(
      companyId,
      { $inc: { openPositions: -1 } }
    );
    
    return NextResponse.json(
      { message: "Job deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
