import express from "express";
import { getReviews, addReview, getReview } from "../controllers/review.js";
import { protect, authorize } from "../middleware/auth.js";
import { baseQuery } from "../middleware/baseQuery.js";
import Review from "../models/Review.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(authorize("user", "admin"));

router.route("/").get(baseQuery(Review), getReviews).post(addReview);
router.route("/:id").get(getReview);
export default router;
