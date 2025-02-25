import express from "express";
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
} from "../controllers/bootcamps.js";
import courses from "./courses.js";
import Bootcamp from "../models/Bootcamp.js";
import { baseQuery } from "../middleware/baseQuery.js";
import { protect, authorize } from "../middleware/auth.js";
import review from "./review.js";

// Include other resource routers
const courseRouter = courses;
const reviewRouter = review;
const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

// Best Practice

// router.route("/").get(getBootcamps)
// router.route("/").post(createBootcamp);
router
  .route("/")
  .get(baseQuery(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

// router.route("/:id").get(getBootcamp)
// router.route("/:id").put(updateBootcamp)
// router.route("/:id").delete(deleteBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// @desc Upload photo for bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), uploadBootcampPhoto);

export default router;
