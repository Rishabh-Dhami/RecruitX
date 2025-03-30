const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

// Define the "role" attribute in the user schema to distinguish between candidates and recruiters.

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    role: {
      type: String,
      required: true,
      enum: ["recruiter", "candidate", "admin"],
      default: "candidate",
      lowercase: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      throw new ApiError(400, "Error occur while saving password");
    }
  } else {
    return next();
  }
});

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id, fullname: this.fullname },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  this.refreshToken = refreshToken;
  return refreshToken;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, fullname: this.fullname, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }, // Adjust expiration as needed
  );
};

// Compare password for login
userSchema.methods.comparePassword = async function (plainTextPassword) {
  try {
    return await bcrypt.compare(plainTextPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
