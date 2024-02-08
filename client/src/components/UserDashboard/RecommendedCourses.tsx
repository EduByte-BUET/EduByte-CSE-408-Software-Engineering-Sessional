import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";
import newimage from "../../assets/hero-img.png";

// Dummy data for courses
const recommended_courses=[
              {
                "course_id": 1,
                "course_name": "Data Science Fundamentals",
                "course_intro": "Explore the basics of data science and analytics."
              },
              {
                "course_id": 2,
                "course_name": "JavaScript for Beginners",
                "course_intro": "Learn the fundamentals of JavaScript programming."
              },
              {
                "course_id": 3,
                "course_name": "Python for Data Analysis",
                "course_intro": "Learn how to use Python for data analysis and visualization."
              },
              {
                "course_id": 4,
                "course_name": "Introduction to Machine Learning",
                "course_intro": "Discover the basics of machine learning and build your first models."
              }
            ]

const RecommendedCourses = () => {
  const [courses] = useState(recommended_courses);

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div
        className="courses-container"
        style={{ height: "540px", overflowY: "auto" }}
      >
        <div className="courses-list">
          {courses.map((course) => (
            <div
              className="card card-dash mb-3 shadow-sm"
              key={course.course_id}
            >
              <img src={newimage} className="card-img-top" alt="..." />
              <div
                className="card-body"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  className="container"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h5 className="card-dash-title">{course.course_name}</h5>
                  <p style={{ alignContent: "start", paddingTop: "50px" }}>
                    {course.course_intro}
                  </p>
                </div>
                <div style={{ width: "60%" }}>
                  <a
                    href="#"
                    className="btn blue-button"
                    style={{ padding: "0.75rem 2rem" }}
                  >
                    Add Course
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto bottom-links ">
        <button className="btn blue-button">
          <Link
            to="/courses"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Show More Courses <i className="bi bi-arrow-down"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default RecommendedCourses;
