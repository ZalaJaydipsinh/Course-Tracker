const Course = require("../models/courseModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    sucess: true,
    course,
  });
});

exports.getAllCourses = catchAsyncErrors(async (req, res) => {
  const courseCount = await Course.countDocuments();
  const apifeatures = new ApiFeatures(Course.find(), req.query).search();

  const courses = await apifeatures.query;

  res.status(200).json({ sucess: true, courses, courseCount });
});

exports.getCourseDetails = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found.", 404));
  }

  res.status(200).json({
    sucess: true,
    course,
  });
});

exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found.", 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    course,
  });
});

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorHandler("Course not found.", 404));
  }

  await course.remove();

  res.status(200).json({
    sucess: true,
    message: "Course Deleted Successfully",
  });
});
