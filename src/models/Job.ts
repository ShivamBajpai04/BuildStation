import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: false,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Remote", "Hybrid", "On-site", "Internship", "Engineering", "Creative", "Technical", "Research", "Marketing", "Business Development", "Supply Chain", "Manufacturing", "Design", "Fashion", "Retail", "Product Development", "Gaming"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
