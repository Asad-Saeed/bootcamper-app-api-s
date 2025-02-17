import User from "../models/User.js"; // Add .js extension
import asyncHandler from "../middleware/async.js"; // Add .js extension

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

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
    token,
  });
});
