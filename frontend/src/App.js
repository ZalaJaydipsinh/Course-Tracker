import "./App.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import Appbar from "./component/layout/Appbar";
import CourseDetails from "./component/Course/courseDetails.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appbar />}>
            <Route index element={<Home />} />
            <Route path="course/:id" element={<CourseDetails />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
