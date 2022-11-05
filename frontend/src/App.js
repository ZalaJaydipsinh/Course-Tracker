import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import Appbar from "./component/layout/Appbar";
import CourseDetails from "./component/Course/courseDetails.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import UserOptions from "./component/layout/Header/UserOptions";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

function App() {

  const {isAuthenticated, user} = useSelector(state => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
    {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route path="/" element={<Appbar />}>
            <Route index element={<Home />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="Login/" element={<LoginSignUp />} />

          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
