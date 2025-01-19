import Bootcamp from "../models/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      totalCount: bootcamps?.length,
      message: "Bootcamps fetched successfully",
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Bootcamp not found",
      // });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      message: `Bootcamp fetched successfully`,
      data: bootcamp,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: error.message,
    // });

    // next(
    //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // );

    next(error);
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
    next(error);
  }
};

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // whar does these option done
      runValidators: true,
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    return res.status(200).json({
      success: true,
      message: `Bootcamp updated successfully`,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    return res.status(200).json({
      success: true,
      message: `Bootcamp deleted successfully`,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};
