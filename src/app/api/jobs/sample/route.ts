import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    // Get company ID from query params if available, otherwise use the first company
    let companyId = searchParams.get('companyId');
    let company;
    
    if (companyId) {
      company = await Company.findById(companyId);
      if (!company) {
        return NextResponse.json(
          { error: "Company not found with provided ID" },
          { status: 404 }
        );
      }
    } else {
      // Get the first company if no ID is provided
      company = await Company.findOne({});
      if (!company) {
        return NextResponse.json(
          { error: "No companies found in the database" },
          { status: 404 }
        );
      }
      companyId = company._id;
    }
    
    // Create a sample job payload
    const sampleJob = {
      companyId: companyId,
      title: "Software Engineer",
      description: "We are looking for a talented software engineer to join our team. You will be responsible for developing new features, maintaining existing code, and collaborating with cross-functional teams.",
      location: company.location || "Remote",
      jobType: company.jobTypes[0] || "Full-time",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Proficiency in JavaScript, TypeScript, and React",
        "Experience with Node.js and Express",
        "Strong problem-solving skills"
      ],
      salary: "$120K - $150K",
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    };
    
    return NextResponse.json({
      sampleJob,
      message: "Use this sample payload to create a job. Make sure to use a valid companyId.",
      endpoints: {
        createJob: `/api/jobs (POST)`,
        createJobForCompany: `/api/companies/${companyId}/jobs (POST)`
      }
    });
  } catch (error) {
    console.error("Error generating sample job:", error);
    return NextResponse.json(
      { error: "Failed to generate sample job" },
      { status: 500 }
    );
  }
}
