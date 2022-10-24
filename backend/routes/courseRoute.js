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
} = require("../controllers/courseController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/courses").get(getAllCourses);
router.route("/course/new").post(isAuthenticatedUser, createCourse);
router
  .route("/course/:id")
  .put(isAuthenticatedUser, updateCourse)
  .delete(isAuthenticatedUser, deleteCourse)
  .get(getCourseDetails);

router.route("/tracks").get(isAuthenticatedUser, getAllTracks);
router.route("/track/delete").get(isAuthenticatedUser,deleteTrack);

module.exports = router;
