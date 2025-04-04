const Job = require("../models/job.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const mongoose = require("mongoose");
const Applicant = require("../models/applicant.model.js");

const getJobs = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 6, sort = "-createdAt", ...filters } = req.query;

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 6;
  const skip = (pageNumber - 1) * limitNumber;

  const jobs = await Job.find(filters)
    .sort(sort) // Sort by default: newest jobs first
    .skip(skip)
    .limit(limitNumber)
    .select("-__v") // Exclude __v field
    .lean(); // Convert to plain JS objects for performance

  const totalJobs = await Job.countDocuments();

  return res.status(200).json(
    new ApiResponse(200, "All jobs fetched successfully", {
      totalJobs,
      totalPages: Math.ceil(totalJobs / limitNumber),
      currentPage: pageNumber,
      jobs,
    }),
  );
});

const createJobs = asyncHandler(async (req, res, next) => {
  const {
    jobTitle,
    employmentType,
    location,
    salary,
    description,
    companyName,
    requirements,
  } = req.body;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized: Please log in to post a job");
  }

  if (req.user.role !== "recruiter") {
    throw new ApiError(403, "Forbidden: Only recruiters can post jobs");
  }

  if (
    !jobTitle ||
    !employmentType ||
    !location ||
    !salary ||
    !description ||
    !companyName ||
    !requirements ||
    !Array.isArray(requirements) ||
    requirements.length === 0
  ) {
    throw new ApiError(
      400,
      "All fields, including at least one requirement, are required",
    );
  }

  const createJob = new Job({
    jobTitle,
    employmentType,
    location,
    salary,
    companyName,
    description,
    requirements,
    owner: req.user.id,
  });

  const jobs = await createJob.save();

  if (!jobs) {
    throw new ApiError(500, "Error occurred while creating job");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Job created successfully!", jobs));
});

const delelteJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, "JobId is required to delete job");
  }

  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Ensure user is authenticated
  if (!req.user) {
    throw new ApiError(401, "Unauthorized: Please log in");
  }

  // Recruiters can delete only their own jobs
  if (req.user.role === "recruiter" && req.user.id !== job.owner.toString()) {
    throw new ApiError(403, "Forbidden: You can only delete your own job");
  }

  // Admins can delete any job
  if (req.user.role === "admin" || req.user.id === job.owner.toString()) {
    await job.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, "Job deleted successfully!"));
  }

  throw new ApiError(403, "Forbidden: You are not allowed to delete this job");
});

const updateJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, "JobId is required to update job");
  }

  const {
    jobTitle,
    employmentType,
    location,
    salary,
    description,
    companyName,
    requirements,
  } = req.body;

  if (req.user.role !== "recruiter") {
    throw new ApiError(403, "Forbidden: Only recruiters can post jobs");
  }

  if (
    !jobTitle ||
    !employmentType ||
    !location ||
    !salary ||
    !companyName ||
    !description ||
    !requirements ||
    !Array.isArray(requirements) ||
    requirements.length === 0
  ) {
    throw new ApiError(
      400,
      "All fields, including at least one requirement, are required",
    );
  }

  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (!req.user) {
    throw new ApiError(401, "Unauthorized: Please log in");
  }

  if (req.user.role !== "recruiter" && req.user.id !== job.owner.toString()) {
    throw new ApiError(403, "Forbidden: You can only update your own job");
  }

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    {
      $set: {
        jobTitle,
        employmentType,
        location,
        salary,
        description,
        companyName,
        requirements,
      },
    },
    { new: true, runValidators: true },
  );

  if (!updatedJob) {
    throw new ApiError(400, "Error occur while updating job");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Job updated successfully!", updatedJob));
});

const getJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid or missing JobId.");
  }

  if (!req.user) {
    throw new ApiError(401, "Unauthorized request!");
  }

  const job = await Job.findById(jobId)
    .populate("owner", "name email")
    .populate("applicants.applicant", "name email role");

  if (!job) {
    throw new ApiError(404, "Job not found!");
  }

  const totalJobs = job.applicants.length;

  return res.status(200).json(
    new ApiResponse(200, "Job fetched successfully!", {
      job,
      totalJobs,
    }),
  );
});

const getOwnerCreatedJobs = asyncHandler(async (req, res, next) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    throw new ApiError(400, "Owner id is required!");
  }

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    throw new ApiError(400, "Invalid Owner ID format!");
  }

  const ownersJobs = await Job.find({ owner: ownerId }).lean();

  if (!ownersJobs) {
    throw new ApiError(401, "Owner not found!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "jobs fetched successfully!", ownersJobs));
});

const getJobApplicants = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, "JobId is required to fetch applicants");
  }

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new ApiError(400, "Invalid Job Id Format!");
  }

  const job = await Job.findOne({ _id: jobId }).populate({
    path: "applicants.applicant",
  });

  if (!job) {
    throw new ApiError(400, "Job not found!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Applicants fetched successfully!", job.applicants),
    );
});

const updateCandidateStatus = asyncHandler(async (req, res, next) => {
  const { jobId, applicantId } = req.params;
  const { status } = req.body;

  const validStatuses = ["active", "inactive", "shortlisted", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value.");
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found.");
  }

  const applicant = job.applicants.find(
    (app) => app._id.toString() === applicantId,
  );
  if (!applicant) {
    throw new ApiError(404, "Candidate not found in this job.");
  }

  applicant.status = status;
  await job.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, "Candidate status updated successfully.", applicant),
    );
});

const getApplicantAppliedJobs = asyncHandler(async (req, res, next) => {
  const { applicantEmail } = req.params;

  if (!applicantEmail) {
    throw new ApiError(400, "Email is required to fetched jobs!");
  }

  const applicant = await Applicant.findOne({ email: applicantEmail })
    .select("_id")
    .lean();

  if (!applicant) {
    throw new ApiError(404, "Applicant is not found!");
  }

  const jobs = await Job.aggregate([
    { $match: { "applicants.applicant": applicant._id } },
    { $unwind: "$applicants" },
    { $match: { "applicants.applicant": applicant._id } },
    {
      $project: {
        _id: 1,
        jobTitle: 1,
        employmentType: 1,
        location: 1,
        salary: 1,
        applicantStatus: "$applicants.status",
        appliedAt: "$applicants.appliedAt",
      },
    },
    { $sort: { appliedAt: -1 } },
  ]);

  if (!jobs) {
    throw new ApiError(404, "Jobs are not found!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Applicant applied jobs fetched successfully!",
        jobs,
      ),
    );
});



module.exports = {
  getJobs,
  createJobs,
  delelteJob,
  updateJob,
  getJob,
  getOwnerCreatedJobs,
  getJobApplicants,
  updateCandidateStatus,
  getApplicantAppliedJobs,
};
