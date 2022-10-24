import "./App.css";
import Header from "./component/layout/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactNavbar } from "overlay-navbar";


function App() {
  return (
      <Router>
        <ReactNavbar />
      </Router>
  );
}

export default App;
