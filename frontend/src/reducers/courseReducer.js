import {
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

export const courseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return {
        loading: true,
        courses: [],
      };
    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courseCount: action.payload.courseCount,
        courses: action.payload.courses,
      };
    case ALL_COURSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};