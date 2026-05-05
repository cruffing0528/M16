import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
// import EmployeeList from "./EmployeeList.jsx";
import Page from "./Page.jsx";

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(
  <Router>
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  </Router>
);

