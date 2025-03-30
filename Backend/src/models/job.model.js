const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job title is required"],
      minlength: [3, "Job title must be at least 3 characters"],
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    employmentType: {
      type: String,
      trim: true,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: [0, "Salary cannot be negative"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Job description must be at least 10 characters"],
    },
    requirements: {
      type: [String], // Added to match JSON structure
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one requirement is needed",
      },
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    applicants: [
      {
        applicant: {
          type: mongoose.Types.ObjectId,
          ref: "Applicant",
        },
        status: {
          type: String,
          enum: ["active", "inactive", "shortlisted", "rejected"],
          default: "active",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
