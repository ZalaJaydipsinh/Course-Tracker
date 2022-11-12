import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourse } from "../../actions/courseAction";
import CourseCard from "../Course/courseCard";
import { alertClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Home = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  // const value = queryString.parse(window.location.search);
  const [keyword, setKeyword] = useState("");

  const { loading, courses, courseCount, error } = useSelector(
    (state) => state.courses
  );
  const { loading: userLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (!userLoading && !isAuthenticated) {
      history("/login");
    }
    // console.log("keyword page....", value.keyword);

    dispatch(getCourse());
  }, [dispatch, userLoading, isAuthenticated]);

  const searchHandle = () => {
    dispatch(getCourse(keyword));
  };

  return (
    <>
    <div className="searchDiv">
      <TextField
          size="small"
          value={keyword}
          onInput={(e) => setKeyword(e.target.value)}
          variant="filled"
        />
      <Button className="searchBtn" variant="outlined" color="success" sx={{marginLeft:"1rem"}} onClick={searchHandle} >Search</Button>
      </div>
      <MetaData title={"Course Tracker"} />
      {loading ? (
        <h1>waiting... ... ...</h1>
      ) : (
        courses &&
        courses.map((course) => <CourseCard key={course._id} course={course} />)
      )}
    </>
  );
};

export default Home;
