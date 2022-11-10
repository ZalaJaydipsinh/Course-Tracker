import React, { useEffect, useState } from "react";
import "./UpdateTrack.css";
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
import { CREATE_TRACK_RESET } from "../../constants/courseConstants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearErrors,
  getTrackDetails,
  deleteTrack,
} from "../../actions/courseAction.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const UpdateTrack = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newTrack);

  const [courseId, setCourseId] = useState(
    location ? location.state.courseId : ""
  );
  const [trackId, setTrackId] = useState(
    location ? location.state.trackId : ""
  );
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const {
    loading: TrackDetailsLoading,
    track,
    error: TrackDetailsError,
  } = useSelector((state) => state.trackDetails);

  const handleChangeCompleted = (event) => {
    setCompleted(event.target.checked);
  };
  const handleChangeBookmarked = (event) => {
    setBookmarked(event.target.checked);
  };
  const deleteThisTrack = ()=>{
    dispatch(deleteTrack(courseId,trackId));
    history(`/course/${courseId}`);
  }
  useEffect(() => {
    if (
      (track &&
        Object.keys(track).length === 0 &&
        Object.getPrototypeOf(track) === Object.prototype) ||
      !track
    ) {
      dispatch(getTrackDetails(courseId, trackId));
    }else{
        setName(track.name);
        setNote(track.note);
        setUrl(track.url);
        setTotalHours(track.totalHours);
        setTotalMinutes(track.totalMinutes);
        setCompleted(track.done);
        setBookmarked(track.bookmark);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Track added Successfully");
      history(`/course/${courseId}`);
      dispatch({ type: CREATE_TRACK_RESET });
    }
  }, [dispatch, alert, error, history, success, track]);

  const createTrackSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    setCourseId(location.state.courseId);
    myForm.set("name", name);
    myForm.set("notes", note);
    myForm.set("url", url);
    myForm.set("hours", totalHours);
    myForm.set("minutes", totalMinutes);
    myForm.set("done", completed ? "1" : "");
    myForm.set("bookmark", bookmarked ? "1" : "");
    myForm.set("courseId", courseId);

    // dispatch(createTrack(myForm));
  };

  return (
    <>
      {TrackDetailsLoading ? (
        <h1>UpdateTrack waiting... ... ..</h1>
      ) : (
        <div className="track">
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h4"></Typography>
                <Typography gutterBottom variant="h6">
                  Update Track Details
                </Typography>

                <form
                  onSubmit={createTrackSubmitHandler}
                  encType="multipart/form-data"
                >
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        label="Name"
                        variant="outlined"
                        placeholder="Enter track Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Note"
                        multiline
                        rows={4}
                        placeholder="Enter track Note"
                        variant="outlined"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="url"
                        placeholder="URL for the Track"
                        label="URL"
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                        value={totalHours}

                        onChange={(e) => setTotalHours(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        placeholder="MM"
                        value={totalMinutes}
                        label="Minutes"
                        variant="outlined"
                        onChange={(e) => setTotalMinutes(e.target.value)}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={completed}
                            onChange={handleChangeCompleted}
                          />
                        }
                        label="Completed"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bookmarked}
                            onChange={handleChangeBookmarked}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                          />
                        }
                        label="Bookmarked"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        size="large"
                        type="submit"
                        variant="outlined"
                        fullWidth
                      >
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="large"
                        color="error"
                        variant="outlined"
                        fullWidth
                        onClick={deleteThisTrack}
                      >
                        delete
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

export default UpdateTrack;
