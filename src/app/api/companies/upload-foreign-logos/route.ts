import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";
import cloudinary from "@/lib/cloudinary";
import axios from "axios";

// Map of foreign company names to real logo image URLs
const foreignCompanyLogoUrls: Record<string, string> = {
  "Google": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
  "Microsoft": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  "Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
  "Meta": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
  "Tesla": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png",
  "Netflix": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
  "Siemens": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/1200px-Siemens-logo.svg.png",
  "Samsung": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png",
  "Toyota": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png",
  "Sony": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sony_logo.svg/1200px-Sony_logo.svg.png",
  "LVMH": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/LVMH.svg/1200px-LVMH.svg.png",
  "BMW": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png",
  "Alibaba": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alibaba_Group_logo.svg/1200px-Alibaba_Group_logo.svg.png",
  "Unilever": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Unilever_logo.svg/1200px-Unilever_logo.svg.png"
};

export async function GET() {
  try {
    await connectDB();
    const startTime = Date.now();
    
    // Find only the foreign companies we just added
    const companyNames = Object.keys(foreignCompanyLogoUrls);
    const companies = await Company.find({ name: { $in: companyNames } });
    
    const results = [];
    
    // Process each company
    for (const company of companies) {
      // Get the logo URL for this company
      const logoUrl = foreignCompanyLogoUrls[company.name];
      
      if (!logoUrl) {
        results.push({
          company: company.name,
          status: 'skipped',
          reason: 'No logo URL found'
        });
        continue;
      }
      
      try {
        // Download the image
        const response = await axios.get(logoUrl, { 
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        const buffer = Buffer.from(response.data, 'binary');
        
        // Prepare image for upload
        const contentType = response.headers['content-type'] || 'image/png';
        const base64Image = `data:${contentType};base64,${buffer.toString('base64')}`;
        
        // Create safe name for Cloudinary
        const safeName = company.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        // Set public ID for Cloudinary
        const publicId = `companies/${safeName}`;
        
        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            base64Image,
            {
              public_id: publicId,
              overwrite: true,
              folder: '', // Root folder - publicId has folder built in
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
        });
        
        // Update company with Cloudinary URL
        const cloudinaryUrl = (uploadResponse as any).secure_url;
        await Company.findByIdAndUpdate(company._id, { logo: cloudinaryUrl });
        
        results.push({
          company: company.name,
          status: 'success',
          url: cloudinaryUrl
        });
      } catch (err) {
        console.error(`Error uploading logo for ${company.name}:`, err);
        results.push({
          company: company.name,
          status: 'error',
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    
    // Calculate time taken
    const timeInSeconds = (Date.now() - startTime) / 1000;
    
    return NextResponse.json({
      message: "Foreign company logo upload process completed",
      totalCompanies: companies.length,
      processed: results.length,
      timeInSeconds,
      results
    });
  } catch (error) {
    console.error("Error in logo upload process:", error);
    return NextResponse.json(
      { error: "Failed to upload logos", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
