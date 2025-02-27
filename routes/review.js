import express from "express";
import {
  getReviews,
  addReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/review.js";
import { protect, authorize } from "../middleware/auth.js";
import { baseQuery } from "../middleware/baseQuery.js";
import Review from "../models/Review.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(baseQuery(Review), getReviews)
  .post(protect, authorize("user", "admin"), addReview);
router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);
export default router;
