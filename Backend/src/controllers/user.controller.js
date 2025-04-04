const User = require("../models/user.model.js");
const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../utils/cloudinary.js");

const generateAccessTokenAndRefreshToken = async (user_id) => {
  if (!user_id) {
    throw new ApiError(400, "User_id is required!");
  }
  const user = await User.findById(user_id);

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  if (!refreshToken || !accessToken) {
    throw new ApiError(500, "Error occurred while generating tokens");
  }

  return {
    refreshToken,
    accessToken,
  };
};

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const userSignUp = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, confirmPassword, role } = req.body;

  if (!fullname || !email || !password || !confirmPassword || !role) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Confirm password must equal to password");
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new ApiError(409, "User already exist!");
  }

  const cloudinaryResult = await uploadToCloudinary(req.file.path);

  if (!cloudinaryResult || !cloudinaryResult.secure_url) {
    throw new ApiError(500, "Failed to upload avatar to Cloudinary");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    role,
    avatar: cloudinaryResult?.secure_url,
  });

  if (!user) {
    throw new ApiError(500, "Error occurred while signing up the user");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const registerUser = await User.findById(user._id);

  if (!registerUser) {
    throw new ApiError(500, "Error occurred while signing up the user");
  }

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(201, "User signed up successfully!", {
        user: registerUser,
        refreshToken,
        accessToken,
      }),
    );
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  const loggedInUser = await User.findById(user._id);

  if (!loggedInUser) {
    throw new ApiError(500, "Error occurred while logging the user");
  }

  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(loggedInUser?._id);

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully!", {
        user: loggedInUser,
        refreshToken,
        accessToken,
      }),
    );
});

const userLogout = asyncHandler(async (req, res, next) => {
  const { id } = req?.user;

  if (!id) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { refreshToken: null },
    { new: true },
  );

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logout successfully!", user));
});

const getUserprofile = asyncHandler(async (req, res, next) => {
  const { id } = req?.user;

  if (!id) {
    throw new ApiError(401, "Unauthorized Request!");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully!", user));
});

const editUserProfile = asyncHandler(async (req, res, next) => {
  const { fullname, email } = req.body;
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "userId is required to edit profile");
  }

  if (!fullname || !email) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!req.file || !req.file.path) {
    throw new ApiError(400, "Avatar is required");
  }

  let cloudinaryResult;
  try {
    cloudinaryResult = await uploadToCloudinary(req.file.path);

    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.fullname = fullname;
  user.email = email;
  user.avatar = cloudinaryResult.secure_url;

  await user.save();

  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  res.status(200).json(
    new ApiResponse(200, "Profile Edited Successfully!", {
      user,
      refreshToken,
      accessToken,
    }),
  );
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    const { refreshToken, accessToken } =
      await generateAccessTokenAndRefreshToken(user?._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "AccessToken refreshed succesfully", {
          user,
          refreshToken,
          accessToken,
        }),
      );
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userSignUp,
  userLogin,
  userLogout,
  getUserprofile,
  refreshAccessToken,
  editUserProfile,
};
