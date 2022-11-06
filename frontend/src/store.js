import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { courseReducer, courseDetailsReducer } from "./reducers/courseReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  courses: courseReducer,
  courseDetails: courseDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
