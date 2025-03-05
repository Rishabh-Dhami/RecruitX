import mongoose, { Schema } from "mongoose";

const applicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar : {
      type : String,
      trim : true,
      required : true
    },
    resume: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

export const Applicant = mongoose.model("Applicant", applicantSchema);
