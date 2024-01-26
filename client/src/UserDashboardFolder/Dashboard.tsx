import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./dashboard.css"
import UserProfile from "./UserProfile";

import MyCourses from "./MyCourses";
const Dashboard = () => {
  

  return (
   
      <div className="container-fluid ">
        <div className="row min-vh-100">
            
          
            <UserProfile />
           
          
           
            <Routes>
              <Route path="/mycourses" element={<MyCourses />} />
              <Route path="/recommendations" element={<MyCourses />} />
              <Route path="/notifications" element={<MyCourses />} />
              <Route path="/savedposts" element={<MyCourses />} />
            </Routes>
         
          </div>
        </div>
     
   
  );
};

export default Dashboard;
