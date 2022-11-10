import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourseDetails } from "../../actions/courseAction";
import { useParams } from "react-router-dom";
import "./courseDetails.css";
import CourseSpeedDial from "./CourseSpeedDial";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TRACK_DETAILS_RESET } from "../../constants/courseConstants";
const CourseDetails = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();
  const { loading, course, error } = useSelector(
    (state) => state.courseDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({ type: TRACK_DETAILS_RESET });

    dispatch(getCourseDetails(id));
  }, [dispatch]);

  function goToUpdateTrack(tid) {
    // console.log(id, tid);
    history("/track/update", {
      state: { courseId: id, trackId: tid },
    });
  }

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <React.Fragment>
          <MetaData title={"Course Details"} />
          <CourseSpeedDial courseId={id} courseName={course.name} />
          <table>
            <caption>{course ? course.name : "Course Not Found"}</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Done</th>
                <th>Bookmark</th>
                <th>Notes</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {course &&
                course.tracks &&
                course.tracks.map((track) => (
                  <React.Fragment>
                    <tr key={track._id}>
                      <td>
                        {" "}
                        {track.name} <br />
                        {track.totalDuration.hours > 0
                          ? `H: ${track.totalDuration.hours}`
                          : ""}
                        {track.totalDuration.minutes > 0
                          ? `M: ${track.totalDuration.minutes}`
                          : ""}
                      </td>
                      <td>{track.done ? "Completed" : "not"}</td>
                      <td>
                        {track.bookmark ? "marked" : "not"} {track.url}
                      </td>
                      <td>{track.notes} </td>
                      <td>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            goToUpdateTrack(track._id);
                          }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CourseDetails;
