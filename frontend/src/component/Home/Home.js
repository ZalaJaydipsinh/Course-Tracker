import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { clearErrors, getCourse } from "../../actions/courseAction";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./courseCard";
import { useAlert } from "react-alert";
import { alertClasses } from "@mui/material";

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, courses, coursesCount } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getCourse());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={"Course Tracker"} />
      <h1>Helo from home</h1>
    </>
  );
};

export default Home;
