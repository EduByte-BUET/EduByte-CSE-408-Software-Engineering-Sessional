
import React, { useEffect, useState } from "react";
import {NavLink, Link } from "react-router-dom";
import "./dashboard.css"
import newimage from "../assets/hero-img.png"

const UserProfile = () => {
  const [activeLink, setActiveLink] = useState("/courses"); // Default active link

  // Function to set the active link and apply the 'active' class
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars">
      <div className="text-center py-4">
        <img src={newimage} alt="User" className="img-thumbnail" />
        <h3>Username</h3>
      </div>
      <nav className="nav flex-column">
        <Link
          to="/user/dashboard/mycourses"
          className={`nav-link dash-navlink ${
            activeLink === "/courses" ? "active" : ""
          }`}
          onClick={() => handleSetActiveLink("/courses")}
        >
          Courses
        </Link>
        <Link
          to="/user/dashboard/recommendations"
          className={`nav-link dash-navlink ${
            activeLink === "/recommendations" ? "active" : ""
          }`}
          onClick={() => handleSetActiveLink("/recommendations")}
        >
          Recommendations
        </Link>
        <Link
          to="/user/dashboard/notifications"
          className={`nav-link dash-navlink ${
            activeLink === "/notifications" ? "active" : ""
          }`}
          onClick={() => handleSetActiveLink("/notifications")}
        >
          Notifications
        </Link>
        <Link
          to="/user/dashboard/savedposts"
          className={`nav-link dash-navlink ${
            activeLink === "/savedposts" ? "active" : ""
          }`}
          onClick={() => handleSetActiveLink("/savedposts")}
        >
          Saved Posts
        </Link>
        <Link to="/" className="nav-link  home-navlink">
          Home
        </Link>
        <Link to="/logout" className="nav-link  logout-navlink">
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default UserProfile;
