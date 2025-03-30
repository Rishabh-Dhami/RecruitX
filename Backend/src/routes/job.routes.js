const express = require("express");
const {
  delelteJob,
  updateJob,
  createJobs,
  getJobs,
  getJob,
  getJobApplicants,
} = require("../controllers/job.controller.js");

const {
  authorizeRoles,
  verifyUser,
} = require("../middlewares/verifyUser.middleware.js");

const {
  getOwnerCreatedJobs,
  updateCandidateStatus,
  getApplicantAppliedJobs,
} = require("../controllers/job.controller.js");

const Router = express.Router();

Router.route("/")
  .get(verifyUser, authorizeRoles("recruiter", "candidate", "admin"), getJobs)
  .post(verifyUser, authorizeRoles("recruiter"), createJobs);

Router.route("/:jobId")
  .delete(verifyUser, authorizeRoles("recruiter", "admin"), delelteJob)
  .patch(verifyUser, authorizeRoles("recruiter"), updateJob)
  .get(verifyUser, getJob);

Router.route("/:jobId/applicants").get(
  verifyUser,
  authorizeRoles("recruiter"),
  getJobApplicants,
);

Router.route("/recruiter/:ownerId").get(
  verifyUser,
  authorizeRoles("recruiter"),
  getOwnerCreatedJobs,
);

Router.route("/:jobId/applicants/:applicantId").patch(
  verifyUser,
  authorizeRoles("recruiter"),
  updateCandidateStatus,
);

Router.route("/candidate/:applicantEmail").get(
  verifyUser,
  authorizeRoles("candidate"),
  getApplicantAppliedJobs,
);

// Router.route("/:jobId/candidate/:userEmail")
// .get(verifyUser, authorizeRoles("candidate"), getAppliedJobDetails);

module.exports = Router;
