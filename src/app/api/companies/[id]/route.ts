import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Fix: Properly await the params object before accessing its properties
    const { id } = await Promise.resolve(params);
    
    const company = await Company.findById(id);
    
    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}
