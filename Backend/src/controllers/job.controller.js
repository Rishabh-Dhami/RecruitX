import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const getJobs = asyncHandler(async(req, res, next) => {

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

    return res.status(200)
    .json(new ApiResponse(
        200,
        "All jobs fetched successfully",{
            totalJobs,
            totalPages: Math.ceil(totalJobs / limitNumber),
            currentPage: pageNumber,
            jobs,
        }
    ))
});

const createJobs = asyncHandler(async(req, res, next) => {
    const {jobTitle,  employmentType, location, salary, description, companyName} = req.body;

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
        !companyName 
    ) {
        throw new ApiError(400, "All fields are required ");
    }
    

    const createJob = new Job({
        jobTitle,
        employmentType,
        location,
        salary,
        companyName,
        description,
        owner: req.user.id,
    });

     
    const jobs = await createJob.save();

    if(!jobs){
        throw new ApiError(500, "Error occurred while creating job");
    }

    return res.status(201).json(new ApiResponse(
        201,
        "Job created successfully!",
        jobs
    ))
});

const delelteJob = asyncHandler(async(req, res, next) =>{
    const {jobId} = req.params; 

    if(!jobId){
        throw new ApiError(400, "JobId is required to delete job");
    }

    const job = await Job.findById(jobId);

    if(!job){
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
        return res.status(200).json(
            new ApiResponse(200, "Job deleted successfully!")
        );
    }

    throw new ApiError(403, "Forbidden: You are not allowed to delete this job");
});

const updateJob = asyncHandler(async(req, res, next) => {
    const {jobId} = req.params;

    if(!jobId){
        throw new ApiError(400, "JobId is required to update job");
    }

    const {jobTitle,  employmentType, location, salary, description, companyName} = req.body;

    if(!jobTitle || !employmentType || !location || !salary || !description || !companyName){
        throw new ApiError(400, "All fields are required!");
    }

    const job = await Job.findById(jobId);

    if(!job){
        throw new ApiError(404, "Job not found");
    }

    if(!req.user){
        throw new ApiError(401, "Unauthorized: Please log in")
    };

    if(req.user.role !== "recruiter" && req.user.id !== job.owner.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own job");
    }


    
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {$set : {jobTitle,  employmentType, location, salary, description, companyName}},
            {new : true , runValidators : true});

            if(!updatedJob){
                throw new ApiError(400, "Error occur while updating job");
            }

            return res.status(200).json(new ApiResponse(
                200,
                "Job updated successfully!",
                updatedJob
            ))

});


const getJob = asyncHandler(async(req, res, next) => {
    const {jobId} = req.params;

    if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
        throw new ApiError(400, "Invalid or missing JobId.");
    }


    if(!req.user){
        throw new ApiError(401, "Unauthorized request!");
    }

    const job = await Job.findById(jobId)
    .populate("owner", "name email")
    .populate("applicants.applicant", "name email role");

    const totalJobs = job.applicants.length;
    
    if(!job){
        throw new ApiError(404, "Job not found!");
    }

    return res.status(200)
    .json(new ApiResponse(
        200,
        "Job fetched successfully!",
        {
            job,
            totalJobs
        }
    ));
});

export {
    getJobs,
    createJobs,
    delelteJob,
    updateJob, 
    getJob
}