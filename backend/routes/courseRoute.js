const express = require("express");
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetails,
  createTrack,
  getAllTracks,
  deleteTrack,
  getAllCoursesdata,
} = require("../controllers/courseController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/courses").get(isAuthenticatedUser,getAllCourses);
router.route("/coursesdata").get(getAllCoursesdata);
router.route("/course/new").post(isAuthenticatedUser, createCourse);
router
  .route("/course/:id")
  .put(isAuthenticatedUser, updateCourse)
  .delete(isAuthenticatedUser, deleteCourse)
  .get(isAuthenticatedUser,getCourseDetails);

router.route("/tracks").get(isAuthenticatedUser, getAllTracks);
router.route("/track/new").post(isAuthenticatedUser,createTrack);
router.route("/track/delete").get(isAuthenticatedUser,deleteTrack);

module.exports = router;
