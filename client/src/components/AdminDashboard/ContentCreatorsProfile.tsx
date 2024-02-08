import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
const ContentCreatorsProfile = () => {
  const profiles = [
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    {
      name: "Jenny Wilson",
      role: "Front-end Developer, Designer",
      rating: 4.5,
      courses: 42,
      students: 110124,
      bio: "I start my development and digital career studying digital design...",
      avatar: "/path/to/avatar.jpg", // Replace with actual path
    },
    // ... add more profiles as needed
  ];

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div
        className="courses-container"
        style={{ height: "640px", overflowY: "auto" }}
      >
        <div className="container py-5">
          <div className="row justify-content-between">
            {profiles.map((profile, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="content-creator-card">
                  <div className="d-flex flex-column align-items-center text-center p-4">
                    <img
                      src={newimage}
                      alt={profile.name}
                      className="content-creator-avatar mb-3"
                    />
                    <h4 className="mb-0">{profile.name}</h4>
                    <p className="text-muted">{profile.role}</p>
                    <p className="mb-1">
                      <span className="content-creator-rating">
                        {profile.rating}{" "}
                        <i className="bi bi-star-fill text-warning"></i>
                      </span>{" "}
                      Instructor Rating
                    </p>
                    <p>
                      <span className="content-creator-courses">
                        {profile.courses} Courses
                      </span>{" "}
                      ·
                      <span className="content-creator-students">
                        {profile.students.toLocaleString()} Students
                      </span>
                    </p>
                    <p>{profile.bio}</p>
                    <button className="btn btn-outline-primary btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorsProfile;
