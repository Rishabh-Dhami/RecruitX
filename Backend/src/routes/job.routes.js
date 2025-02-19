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
} from "../controllers/job.controller.js";

const Router = express.Router();

Router.route("/")
  .get(verifyUser, authorizeRoles("recruiter", "candidate", "admin"), getJobs)
  .post(verifyUser, authorizeRoles("recruiter"), createJobs);

Router.route("/:jobId")
  .delete(verifyUser, authorizeRoles("recruiter", "admin"), delelteJob)
  .patch(verifyUser, authorizeRoles("recruiter"), updateJob)
  .get(verifyUser, getJob);
export { Router as jobRouter };
