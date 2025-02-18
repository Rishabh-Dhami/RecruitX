import axios from "axios";
import FormData from "form-data";
import { Applicant } from "../models/applicant.model.js";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const applyForJob = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;
    const { jobId } = req.params;


    if (!jobId) throw new ApiError(400, "Job ID is required for applying.");
    if (!name || !email) throw new ApiError(400, "Name and email are required.");
    if (!req.file) throw new ApiError(400, "Resume upload is required.");

    const job = await Job.findById(jobId);
    if (!job) throw new ApiError(404, "Job not found.");

    // 🔹 Upload to Filestack
    let resumeUrl;
    try {
        const formData = new FormData();
        formData.append("fileUpload", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const response = await axios.post(
            `https://www.filestackapi.com/api/store/S3?key=${process.env.FILESTACK_API_KEY}`,
            formData,
            { headers: formData.getHeaders() }
        );


        if (!response.data || !response.data.url) {
            throw new ApiError(500, "Filestack upload failed, no URL returned.");
        }

        resumeUrl = response.data.url; 
    } catch (error) {
        console.error("❌ Filestack Upload Error:", error.message);
        throw new ApiError(500, "Resume upload failed.");
    }

    

    let applicant = await Applicant.findOne({ email });

    if (!applicant) {
        // Create new applicant
        applicant = await Applicant.create({ name, email, resume: resumeUrl });
    } else {
        // Update resume URL if reapplying
        applicant.resume = resumeUrl;
        await applicant.save();
    }

    // Prevent duplicate applications
    const alreadyApplied = job.applicants.some(
        (app) => app.applicant.toString() === applicant._id.toString()
    );
    if (alreadyApplied) throw new ApiError(400, "You have already applied for this job.");

    job.applicants.push({ applicant: applicant._id, status: "active" });
    await job.save();

    return res.status(200).json(
        new ApiResponse(200, "Application submitted successfully!", {
            applicant,
            resumeUrl, // ✅ Return file URL for frontend
        })
    );
});


export { applyForJob };
