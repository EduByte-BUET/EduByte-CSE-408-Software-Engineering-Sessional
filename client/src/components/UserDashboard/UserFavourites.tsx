import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";

// Dummy data for courses

const UserFavourites = () => {
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/user/fav");
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching favourite courses:", error);

        // Handle the error in a way that makes sense for your application
        if (error.response) {
          // The request was made, but the server responded with a status code
          console.error(
            "Server responded with status code:",
            error.response.status
          );
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div
        className="courses-container"
        style={{ height: "560px", overflowY: "auto" }}
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
                  <h5 className="card-dash-title">{course.course_title}</h5>
                  <p style={{ alignContent: "start", paddingTop: "50px" }}>
                    {course.description}
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
        <button className="btn blue-button">
          <Link
            to="/user/dashboard/request_course"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            Request New Course <i className="bi bi-arrow-down"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UserFavourites;
