import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();
    
    // Get all companies to create sample jobs for each
    const companies = await Company.find({});
    
    if (companies.length === 0) {
      return NextResponse.json(
        { error: "No companies found to create jobs for" },
        { status: 404 }
      );
    }
    
    const jobsData = [];
    const jobTitles = [
      "Software Engineer", 
      "Product Manager", 
      "UX Designer", 
      "Data Scientist", 
      "Marketing Specialist",
      "Full Stack Developer",
      "DevOps Engineer",
      "QA Engineer",
      "AI Researcher",
      "Project Manager"
    ];
    
    const jobDescriptions = [
      "Develop and maintain software applications using cutting-edge technologies.",
      "Lead product development from conception to launch, working with cross-functional teams.",
      "Create intuitive user experiences and interfaces for our digital products.",
      "Analyze large datasets to extract valuable insights and drive business decisions.",
      "Develop and execute marketing strategies to increase brand awareness and drive customer acquisition."
    ];
    
    const locations = [
      "Remote",
      "San Francisco, CA",
      "New York, NY",
      "Austin, TX",
      "Seattle, WA",
      "London, UK",
      "Berlin, Germany",
      "Tokyo, Japan",
      "Singapore",
      "Toronto, Canada"
    ];
    
    // For each company, create 1-3 random jobs
    for (const company of companies) {
      const numJobs = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numJobs; i++) {
        const randomTitleIndex = Math.floor(Math.random() * jobTitles.length);
        const randomDescIndex = Math.floor(Math.random() * jobDescriptions.length);
        const randomLocationIndex = Math.floor(Math.random() * locations.length);
        const randomJobTypeIndex = Math.floor(Math.random() * company.jobTypes.length);
        
        const job = {
          companyId: company._id,
          title: jobTitles[randomTitleIndex],
          description: jobDescriptions[randomDescIndex],
          location: locations[randomLocationIndex],
          jobType: company.jobTypes[randomJobTypeIndex] || "Full-time",
          requirements: [
            "Bachelor's degree in relevant field",
            "3+ years of experience",
            "Strong communication skills",
            "Ability to work in a team"
          ],
          salary: `$${Math.floor(Math.random() * 50) + 70}K - $${Math.floor(Math.random() * 50) + 120}K`,
          applicationDeadline: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          isActive: true
        };
        
        jobsData.push(job);
      }
      
      // Update company's openPositions count
      await Company.findByIdAndUpdate(
        company._id,
        { openPositions: numJobs }
      );
    }
    
    // Insert all the jobs
    await Job.insertMany(jobsData);
    
    return NextResponse.json({
      message: "Database seeded successfully with job postings!",
      count: jobsData.length
    });
  } catch (error) {
    console.error("Error seeding jobs:", error);
    return NextResponse.json(
      { error: "Failed to seed jobs" },
      { status: 500 }
    );
  }
}
