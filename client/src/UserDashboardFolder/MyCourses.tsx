import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {NavLink, Link } from "react-router-dom";
import "./dashboard.css";
import UserProfile from "./UserProfile";

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
  }
  // ... More courses data
];

const MyCourses = () => {
  const [courses] = useState(coursesData);

  return (
    <div className="col-md-9 col-lg-10">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div className="courses-container" >
        <div className="courses-list" style={{height: '520px', overflowY: "auto"}}>
          {courses.map((course) => (
            <div className="card mb-3 shadow-sm" key={course.id}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">
                  Lectures completed: {course.lecturesCompleted}/
                  {course.totalLectures}
                </p>
                <p className="card-text">
                  Tests completed: {course.testsCompleted}/{course.totalTests}
                </p>
                <p className="card-text">
                  Average score: {course.averageScore}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto bottom-links">
        <Link className="nav-link dash-navlink" to="/add-course">
          Add Course
        </Link>
        <Link className="nav-link dash-navlink" to="/request-course">
          Request a Course
        </Link>
      </div>
    </div>
  );
};

export default MyCourses;
