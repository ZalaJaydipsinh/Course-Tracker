import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourse } from "../../actions/courseAction";
import CourseCard from "../Course/courseCard";
import { alertClasses } from "@mui/material";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, courses, courseCount, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCourse());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Course Tracker"} />
      {loading?(<h1>waiting... ... ...</h1>):(
       courses.map((course)=>(
        <CourseCard key={course._id} course={course} />
       ))
      )}
    </>
  );
};

export default Home;
