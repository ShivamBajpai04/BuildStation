import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dl1sp4ygr',
  api_key: '674239954826731',
  api_secret: 'Szr0Tn0dfbEzwNnVYDRxpNfTzpY',
  secure: true
});

// Function to get company logo URL
export function getCompanyLogoUrl(companyName: string, size = 150) {
  // Sanitize company name for use in the URL
  const safeName = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `https://res.cloudinary.com/dl1sp4ygr/image/upload/c_scale,w_${size}/v1/companies/${safeName}`;
}

export default cloudinary;
