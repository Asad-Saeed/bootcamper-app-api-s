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
// Include other resource routers
const courseRouter = courses;
const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// Best Practice

// router.route("/").get(getBootcamps)
// router.route("/").post(createBootcamp);
router.route("/").get(getBootcamps).post(createBootcamp);

// router.route("/:id").get(getBootcamp)
// router.route("/:id").put(updateBootcamp)
// router.route("/:id").delete(deleteBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// @desc Upload photo for bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
router.route("/:id/photo").put(uploadBootcampPhoto);

// Normal API Routes

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Show all bootcamps",
//     data: { name: "Asad Saeed" },
//   });
// });

// router.get("/:id", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: `Show bootcamp ${req.params.id}`,
//   });
// });

// router.post("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Create new bootcamps",
//   });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: `Update bootcamp ${req.params.id}`,
//   });
// });

// router.delete("/:id", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: `Delete bootcamps ${req.params.id}`,
//   });
// });

export default router;
