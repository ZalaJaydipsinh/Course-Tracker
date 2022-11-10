import React, { useEffect, useState } from "react";
import "./UpdateCourse.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_COURSE_RESET } from "../../constants/courseConstants";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  updateCourse,
  getCourseDetails,
} from "../../actions/courseAction.js";

const UpdateCourse = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  let { id } = useParams();

  const {
    loading: CourseDetailsLoading,
    course,
    error: CourseDetailsError,
  } = useSelector((state) => state.courseDetails);

  const { error, isUpdated, loading } = useSelector((state) => state.course);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalTracks, setTotalTracks] = useState(0);
  const [doneTracks, setDoneTracks] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [doneHours, setDoneHours] = useState(0);
  const [doneMinutes, setDoneMinutes] = useState(0);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Course updated Successfully");
      history("/");
      dispatch({ type: UPDATE_COURSE_RESET });
    }
    dispatch(getCourseDetails(id));
  }, [dispatch, alert, error, history, isUpdated]);

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("totalTracks", totalTracks);
    myForm.set("doneTracks", doneTracks);
    myForm.set("totalHours", totalHours);
    myForm.set("totalMinutes", totalMinutes);
    myForm.set("doneHours", doneHours);
    myForm.set("doneMinutes", doneMinutes);

    dispatch(updateCourse(myForm));
  };

  return (
    <>
      {loading ? (
        <h1>UpdateCourse waiting ... ... ...</h1>
      ) : (
        <div>
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
              <Typography gutterBottom variant="h4">
                  {course && course.name}
                </Typography>
                <Typography gutterBottom variant="h6">
                  Update Course Details
                </Typography>

                <form
                  onSubmit={createCourseSubmitHandler}
                  encType="multipart/form-data"
                >
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        label="Name"
                        variant="outlined"
                        placeholder="Enter course Name"
                        fullWidth
                        value={course && course.name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        multiline
                        rows={4}
                        placeholder="Enter course Description"
                        variant="outlined"
                        value={course && course.description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="Total Tracks"
                        label="Total Tracks"
                        variant="outlined"
                        value={course && course.totalTracks}
                        onChange={(e) => setTotalTracks(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="Done Tracks"
                        label="Completed Tracks"
                        variant="outlined"
                        value={course && course.doneTracks}
                        onChange={(e) => {
                          if (parseInt(e.target.value) > parseInt(totalTracks))
                            return;

                          return setDoneTracks(e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} className="para">
                      Total Duration
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="HH"
                        label="Hours"
                        variant="outlined"
                        value={course && course.totalDuration.hours}
                        onChange={(e) => setTotalHours(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="MM"
                        label="Minutes"
                        variant="outlined"
                        value={course && course.totalDuration.minutes}
                        onChange={(e) => setTotalMinutes(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} className="para">
                      Done Duration
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="HH"
                        label="Hours"
                        variant="outlined"
                        value={course && course.doneDuration.hours}
                        onChange={(e) => setDoneHours(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="MM"
                        label="Minutes"
                        variant="outlined"
                        value={course && course.doneDuration.minutes}
                        onChange={(e) => setDoneMinutes(e.target.value)}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        fullWidth
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
      )}
    </>
  );
};

export default UpdateCourse;
