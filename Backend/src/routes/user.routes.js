import express from "express";
import {
  editUserProfile,
  getUserprofile,
  refreshAccessToken,
  userLogin,
  userLogout,
  userSignUp,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const Router = express.Router();

// route of user signup
Router.route("/signup").post(upload.single('avatar'),userSignUp);

// route of user login
Router.route("/login").post(userLogin);

// route of user logout
Router.route("/logout").get(verifyUser, userLogout);

// route of user profile
Router.route("/profile")
.get(verifyUser, getUserprofile);

Router.route("/profile/:userId")
.patch(verifyUser,upload.single('avatar'), editUserProfile);

// route of user verifing
Router.route("/refresh-accesstoken").get(verifyUser, refreshAccessToken);

export { Router as userRouter };
