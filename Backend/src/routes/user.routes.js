const express = require("express");
const {
  editUserProfile,
  getUserprofile,
  refreshAccessToken,
  userLogin,
  userLogout,
  userSignUp,
} = require("../controllers/user.controller.js");
const { verifyUser } = require("../middlewares/verifyUser.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");

const Router = express.Router();

// route of user signup
Router.route("/signup").post(upload.single("avatar"), userSignUp);

// route of user login
Router.route("/login").post(userLogin);

// route of user logout
Router.route("/logout").get(verifyUser, userLogout);

// route of user profile
Router.route("/profile").get(verifyUser, getUserprofile);

Router.route("/profile/:userId").patch(
  verifyUser,
  upload.single("avatar"),
  editUserProfile,
);

// route of user verifing
Router.route("/refresh-accesstoken").get(verifyUser, refreshAccessToken);

module.exports = Router;
