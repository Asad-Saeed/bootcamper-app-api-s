import express from "express";
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.js";
import Course from "../models/Course.js";
import { baseQuery } from "../middleware/baseQuery.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    baseQuery(Course, { path: "bootcamp", select: "name description" }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

export default router;
