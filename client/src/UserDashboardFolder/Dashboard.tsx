import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./dashboard.css"
import UserProfile from "./UserProfile";

import MyCourses from "./MyCourses";
import RecommendedCourses from "./RecommendedCourses";
import UserNotification from "./UserNotification";
const Dashboard = () => {
  

  return (
    <div className="container">
      <div className="row">
        {/* min-vh-100 */}
        <UserProfile />
        <Routes>
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/recommendations" element={<RecommendedCourses />} />
          <Route path="/notifications" element={<UserNotification />} />
          <Route path="/savedposts" element={<MyCourses />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
