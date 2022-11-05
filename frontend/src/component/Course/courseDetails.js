import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourseDetails } from "../../actions/courseAction";
import { useParams } from "react-router-dom";
import "./courseDetails.css";

const CourseDetails = () => {
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
    dispatch(getCourseDetails(id));
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        <React.Fragment>
          <MetaData title={"Course Details"} />
          <table>
            <caption>{course? course.name:"Course Not Found"}</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Done</th>
                <th>Bookmark</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {course && course.tracks && course.tracks.map((track) => (
                <React.Fragment>
                  <tr>
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
                    <td>{track.bookmark ? "marked" : "not"}</td>
                    <td>{track.notes}</td>
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
