const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

const router = express.Router();
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

module.exports = router;
