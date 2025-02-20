import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import User from "../models/User.js";
import { baseQuery } from "../middleware/baseQuery.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

// Protect routes
router.use(protect);
// Authorize admin to access this route
router.use(authorize("admin"));

router.route("/").get(baseQuery(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
export default router;
