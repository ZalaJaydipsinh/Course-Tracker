import axios from "axios";

import {
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

export const getCourse = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_COURSE_REQUEST,
    });

    const { data } = await axios.get("/api/v1/coursesdata");
    dispatch({
      type: ALL_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/course/${id}`);
    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.courseDetails,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
