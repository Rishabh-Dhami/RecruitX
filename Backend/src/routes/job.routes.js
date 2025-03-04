import express from "express";
import {
  authorizeRoles,
  verifyUser,
} from "../middlewares/verifyUser.middleware.js";
import {
  delelteJob,
  updateJob,
  createJobs,
  getJobs,
  getJob,
  getOwnerCreatedJobs,
  getJobApplicants,
} from "../controllers/job.controller.js";

const Router = express.Router();

Router.route("/")
  .get(verifyUser, authorizeRoles("recruiter", "candidate", "admin"), getJobs)
  .post(verifyUser, authorizeRoles("recruiter"), createJobs);

Router.route("/:jobId")
  .delete(verifyUser, authorizeRoles("recruiter", "admin"), delelteJob)
  .patch(verifyUser, authorizeRoles("recruiter"), updateJob)
  .get(verifyUser, getJob);


Router.route("/:jobId/applicants")
.get(verifyUser, authorizeRoles("recruiter"), getJobApplicants);  


Router.route("/owner/:ownerId")
.get(verifyUser, authorizeRoles("recruiter"), getOwnerCreatedJobs);
export { Router as jobRouter };
