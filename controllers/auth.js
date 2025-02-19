import User from "../models/User.js";
import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import crypto from "crypto";

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Remove try-catch since asyncHandler handles it
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 201, "User registered successfully", res);
});

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  // Check if user exists
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, "User logged in successfully", res);
});

// @desc POST /api/v1/auth/forgotpassword
// @route POST /api/v1/auth/forgotpassword
// @access Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  // Set expire time
  const resetExpire = Date.now() + 10 * 60 * 1000;

  // Create reset password token
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password reset token sent to email",
    data: user,
  });
});

//@desc Get current logged in user
//@route GET /api/v1/auth/me
//@access Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, message, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
  });
};
