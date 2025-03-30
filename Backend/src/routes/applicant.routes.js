const express = require("express");
const {
  authorizeRoles,
  verifyUser,
} = require("../middlewares/verifyUser.middleware.js");
const { applyForJob } = require("../controllers/applicant.controller.js");

const Router = express.Router();

Router.route("/:jobId/apply").post(
  verifyUser,
  authorizeRoles("candidate"),
  applyForJob,
);

module.exports = Router;
