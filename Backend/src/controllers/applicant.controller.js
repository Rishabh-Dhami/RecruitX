const Job = require("../models/job.model.js");
const Applicant = require("../models/applicant.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const {
  extractTextFromPDF,
  extractTextFromDocx,
  downloadFile,
} = require("../utils/extractResumeText.js");
const { evaluateResumeWithGroq } = require("../utils/resumeScorer.js");

const applyForJob = asyncHandler(async (req, res, next) => {
  const { name, email, resume, avatar } = req.body;
  const { jobId } = req.params;

  if (!jobId) throw new ApiError(400, "Job ID is required for applying.");
  if (!name || !email || !avatar)
    throw new ApiError(400, "Name and email are required.");
  if (!resume) throw new ApiError(400, "Resume URL is required.");

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found.");

  let extractedText = "";

  try {
    extractedText = await extractTextFromPDF(resume);
  } catch (error) {
    throw new ApiError(500, "Failed to extract text from resume.");
  }

  const score = await evaluateResumeWithGroq(extractedText, job.description, job.requirements);
  if (score < 80) {
    throw new ApiError(
      400,
      `Your resume score is ${score}. Improve it and try again.`,
    );
  }

  let applicant = await Applicant.findOne({ email });

  if (!applicant) {
    applicant = await Applicant.create({ name, email, resume, avatar, score });
  } else {
    applicant.resume = resume;
    applicant.score = score;
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

module.exports = { applyForJob };
