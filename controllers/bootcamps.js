import Bootcamp from "../models/Bootcamp.js";

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      message: "Bootcamps fetched successfully",
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: "Bootcamp not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Bootcamp fetched successfully`,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      message: `Bootcamp created Successfully`,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: "Bootcamp not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Bootcamp updated successfully`,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
export const deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp ${req.params.id}`,
  });
};
