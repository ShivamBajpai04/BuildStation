import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Company from "@/models/Company";
import cloudinary from "@/lib/cloudinary";
import axios from "axios";

// Map of company names to real logo image URLs
const companyLogoUrls: Record<string, string> = {
  "Infosys Technologies": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
  "Tata Consultancy Services": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1200px-Tata_Consultancy_Services_Logo.svg.png",
  "Reliance Industries": "https://companieslogo.com/img/orig/RELIANCE.NS-7b913e37.png",
  "Wipro Limited": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png",
  "Zomato": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/800px-Zomato_logo.png",
  "Apollo Hospitals": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7G0iKC2HWoB23UZgMQBwnzKcAj4w43WLI-A&usqp=CAU",
  "Flipkart": "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
  "HDFC Bank": "https://companieslogo.com/img/orig/HDB-bb6241fe.png",
  "Bharti Airtel": "https://companieslogo.com/img/orig/BHARTIARTL.NS-8c9721a7.png",
  "Byju's": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Byju%27s_logo.png/800px-Byju%27s_logo.png",
  "Mahindra & Mahindra": "https://companieslogo.com/img/orig/M&M.NS-8b9c2678.png",
  "Ola Cabs": "https://companieslogo.com/img/orig/OLACABS.BO-f81af388.png",
  "Hindustan Unilever": "https://companieslogo.com/img/orig/HINDUNILVR.NS-40d8e7da.png",
  "Tech Mahindra": "https://companieslogo.com/img/orig/TECHM.NS-2d83e0eb.png",
  "Swiggy": "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png"
};

export async function GET() {
  try {
    await connectDB();
    const startTime = Date.now();
    
    // Get all companies
    const companies = await Company.find({});
    const results = [];
    
    // Process each company
    for (const company of companies) {
      // Check if this company has a logo URL in our map
      const logoUrl = companyLogoUrls[company.name];
      
      if (!logoUrl) {
        results.push({
          company: company.name,
          status: 'skipped',
          reason: 'No logo URL found'
        });
        continue;
      }
      
      try {
        // Download the image first
        const response = await axios.get(logoUrl, { 
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        const buffer = Buffer.from(response.data, 'binary');
        
        // Create base64 image for upload
        const contentType = response.headers['content-type'] || 'image/png';
        const base64Image = `data:${contentType};base64,${buffer.toString('base64')}`;
        
        // Sanitize company name for Cloudinary
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
        
        // Get Cloudinary URL and update company in database
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
      message: "Logo upload process completed",
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
