import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const applyForJob = asyncHandler(async (req, res, next) => {
  const { name, email, resume, avatar } = req.body; 
  const { jobId } = req.params;

  if (!jobId) throw new ApiError(400, "Job ID is required for applying.");
  if (!name || !email || !avatar) throw new ApiError(400, "Name and email are required.");
  if (!resume) throw new ApiError(400, "Resume URL is required."); 

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found.");

  let applicant = await Applicant.findOne({ email });

  if (!applicant) {
    applicant = await Applicant.create({ name, email, resume, avatar });
  } else {
    applicant.resume = resume;
    await applicant.save();
  }

  const alreadyApplied = job.applicants.some(
    (app) => app.applicant.toString() === applicant._id.toString(),
  );
  if (alreadyApplied)
    throw new ApiError(400, "You have already applied for this job.");

  job.applicants.push({ applicant: applicant._id, status: "active" });
  await job.save();

  return res.status(200).json(
    new ApiResponse(200, "Application submitted successfully!", {
      applicant,
      resume,
    }),
  );
});

export { applyForJob };
