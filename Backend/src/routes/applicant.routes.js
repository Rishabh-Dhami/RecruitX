import express from "express";
import { authorizeRoles, verifyUser } from "../middlewares/verifyUser.middleware.js";
import { applyForJob } from "../controllers/applicant.controller.js";



const Router = express.Router();

Router.route('/:jobId/apply')
    .post(
        verifyUser,
        authorizeRoles("candidate"),
        applyForJob
    );

export { Router as applicantRouter };
