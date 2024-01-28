import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";
import newimage from "../../assets/hero-img.png";
import { Container } from "react-bootstrap";

// Dummy data for courses
const coursesData = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    lecturesCompleted: 12,
    totalLectures: 30,
    testsCompleted: 3,
    totalTests: 8,
    averageScore: 72,
  },
  // ... More courses data
];

const MyCourses = () => {
  const [courses] = useState(coursesData);

  return (
    <div className="col-md-8 col-lg-9">
      <Container>
        <div className=" justify-content-between align-items-center py-3">
          {/* Add SortBy and SearchBar components */}
        </div>
        <div
          className="courses-container"
          style={{ height: "540px", overflowY: "auto" }}
        >
          <div className="courses-list">
            {courses.map((course) => (
              <div className="card card-dash mb-3 shadow-sm" key={course.id}>
                <img src={newimage} className="card-img-top" alt="..." />
                <div className="card-body card-body-dash">
                  <h5 className="card-title">{course.title}</h5>
                  <div className="text-part">
                    <p className="card-text">
                      Lectures completed: {course.lecturesCompleted}/
                      {course.totalLectures}
                    </p>
                    <p className="card-text">
                      Tests completed: {course.testsCompleted}/
                      {course.totalTests}
                    </p>
                    <p className="card-text">
                      Average score: {course.averageScore}%
                    </p>
                    <a
                      href="#"
                      className="btn blue-button"
                      style={{ padding: "0.75rem 2rem" }}
                    >
                      Details
                    </a>
                  </div>
                  <div className="progress-bar"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto bottom-links ">
          <button className="btn blue-button">
            <Link
              to="/addCourse"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Add Course <i className="bi bi-arrow-right"></i>
            </Link>
          </button>
          <button className="btn blue-button">
            <Link
              to="/reqCourse"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Request Course <i className="bi bi-arrow-right"></i>
            </Link>
          </button>
        </div>
      </Container>
    </div>
  );
};

export default MyCourses;
