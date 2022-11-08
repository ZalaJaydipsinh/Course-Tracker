import React, { useEffect, useState } from "react";
import "./NewTrack.css";
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
import { useNavigate } from "react-router-dom";
import { clearErrors, createCourse } from "../../actions/courseAction.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const NewTrack = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newTrack);

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleChangeCompleted = (event) => {
    setCompleted(event.target.checked);
  };
  const handleChangeBookmarked = (event) => {
    setBookmarked(event.target.checked);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Track added Successfully");
      history("/");
      dispatch({ type: CREATE_TRACK_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("notes", note);
    myForm.set("url", url);
    myForm.set("totalHours", totalHours);
    myForm.set("totalMinutes", totalMinutes);
    myForm.set("done", completed);
    myForm.set("bookmark", bookmarked);

    dispatch(createCourse(myForm));
  };

  return (
    <div className="track">
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              New Track Details
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
                    placeholder="Enter track Name"
                    fullWidth
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

                <Grid item xs={12}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Add Track
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewTrack;
