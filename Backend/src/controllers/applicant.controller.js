import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const applyForJob = asyncHandler(async(req, res, next) => {
    const {name, email, resume} = req.body;
    const {jobId} = req.params;


    if(!jobId){
        throw new ApiError(400, "Job Id is required for applying");
    }

    if(!name || !email){
        throw new ApiError(400, "All field are required");
    }


    const job = await Job.findById(jobId);

    if(!job){
        throw new ApiError(404, "Job not found!");
    }

    if (!req.file) {
        return res.status(400).json({ error: "Resume upload is required." });
    }

    const resumeUrl = req.file.path;

    // Check if the applicant already exists
    let applicant = await Applicant.findOne({ email });

    if (!applicant) {
        // Create new applicant
        applicant = await Applicant.create({ name, email, resume: resumeUrl });
    }

    // Check if applicant has already applied for this job
    const alreadyApplied =  job.applicants.some(
        (app) => app.applicant.toString() === applicant._id.toString()
    );

    if (alreadyApplied) {
        throw new ApiError(400, "You have already applied for this job.");
    }

    // Add applicant to job's applicants array
    job.applicants.push({ applicant: applicant._id, status: "active" });
    await job.save();
    
    
    return res.status(200)
    .json(new ApiResponse(
        200,
        "Application applied successfully!",
        applicant
    ))
})


export {
    applyForJob
}