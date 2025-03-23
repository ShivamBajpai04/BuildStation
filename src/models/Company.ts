import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a company name"],
      trim: true,
    },
    logo: {
      type: String,
      default: "https://res.cloudinary.com/dl1sp4ygr/image/upload/v1/companies/default-company",
    },
    industry: {
      type: String,
      required: [true, "Please provide an industry"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    openPositions: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 100, // Change this to a higher value if you want ratings beyond 5
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Please provide a company description"],
    },
    jobTypes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
