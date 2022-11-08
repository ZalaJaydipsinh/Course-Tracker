const Course = require("../models/courseModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create course by user
exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    description,
    totalTracks,
    doneTracks,
    totalHours,
    totalMinutes,
    doneHours,
    doneMinutes,
    tracks,
  } = req.body;

  const course = await Course.create({
    name,
    description,
    totalTracks,
    doneTracks,
    totalDuration:{
      hours: totalHours,
      minutes: totalMinutes
    },
    doneDuration:{
      hours: doneHours,
      minutes: doneMinutes
    },
    tracks,
    user: req.user._id,
    createdAt: Date.now()
  });

  res.status(201).json({
    sucess: true,
    course,
  });
});

//get all courses of a user
exports.getAllCourses = catchAsyncErrors(async (req, res) => {
  // const courseCount = await Course.countDocuments();
  const apifeatures = new ApiFeatures(Course.find(), req.query,req.user._id).search();

  const courses = await apifeatures.query;

  res.status(200).json({ sucess: true, courses, courseCount:courses.length });
});

//get all courses of the site
exports.getAllCoursesdata = catchAsyncErrors(async (req, res,next) => {
  // return next(new ErrorHandler("Testing erros...",400));
  // const courseCount = await Course.countDocuments();
  // const apifeatures = new ApiFeatures(Course.find(), req.query,req.user._id).search();
  const courseCount = await Course.countDocuments();

  const courses = await Course.find();

  res.status(200).json({ sucess: true, courses, courseCount });
});

exports.getCourseDetails = catchAsyncErrors(async (req, res, next) => {
  const courseDetails = await Course.findById(req.params.id);

  if (!courseDetails) {
    return next(new ErrorHandler("Course not found.", 404));
  }

  res.status(200).json({
    sucess: true,
    courseDetails,
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

//Create a new Track or update existing
exports.createTrack = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    done,
    bookmark,
    notes,
    url,
    hours,
    minutes,
    courseId,
    trackId,
  } = req.body;

  const newTrack = {
    name,
    done: Boolean(done),
    bookmark: Boolean(bookmark),
    notes,
    url,
    totalDuration: {
      hours: Number(hours),
      minutes: Number(minutes),
    },
  };

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  if (trackId) {
    course.tracks.forEach((track) => {
      if (track._id.toString() === trackId) {
        if (track.done) {
          course.subtractDoneDuration(
            track.totalDuration.hours,
            track.totalDuration.minutes
          );
        }
        if (Boolean(done)) {
          course.addDoneDuration(hours, minutes);
        }
        course.subtractTotalDuration(
          track.totalDuration.hours,
          track.totalDuration.minutes
        );
        course.addTotalDuration(hours, minutes);

        track.name = name;
        track.done = done;
        track.bookmark = bookmark;
        track.notes = notes;
        track.url = url;
        track.totalDuration.hours = hours;
        track.totalDuration.minutes = minutes;
      }
    });
  } else {
    course.tracks.push(newTrack);
    course.totalTracks = course.tracks.length;
    course.addTotalDuration(hours, minutes);
  }

  await course.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get all tracks for particular course
exports.getAllTracks = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    tracks: course.tracks,
  });
});

//Delete a track
exports.deleteTrack = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.courseId);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const tracks = course.tracks.filter(
    (track) => track._id.toString() !== req.query.id.toString()
  );

  let totalTracks = tracks.length;
  let doneTracks = 0;
  let tH = 0,
    tM = 0;
  let dH = 0,
    dM = 0;
  tracks.forEach((track) => {
    if (track.done) {
      doneTracks++;
      dH += track.totalDuration.hours;
      dM += track.totalDuration.minutes;
    }
    tH += track.totalDuration.hours;
    tM += track.totalDuration.minutes;
  });

  tH += parseInt(tM / 60);
  dH += parseInt(dM / 60);

  tM = tM % 60;
  dM = dM % 60;

  await Course.findByIdAndUpdate(
    req.query.courseId,
    {
      tracks,
      totalDuration: {
        hours: tH,
        minutes: tM,
      },
      doneDuration: {
        hours: dH,
        minutes: dM,
      },
      totalTracks,
      doneTracks,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
