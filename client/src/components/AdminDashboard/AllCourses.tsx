import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import AdminProfile from "./AdminProfile";
import newimage from "../../assets/hero-img.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
//import api from "../../api/Dashboard";

// Dummy data for courses
// let coursesData = [
//   {
//     course_id: 1,
//     course_title: "Introduction to Web Development",
//     total_blocks: 8,
//     total_lectures: 20,
//     total_lessons: 15,
//     total_quizzes: 5,
//     total_enrolled: 500,
//     description:
//       "Learn the basics of web development including HTML, CSS, and JavaScript.",
//     is_live: true,
//     difficulty_level: "beginner",
//     thumbnail_url: "https://example.com/thumbnails/intro_web_dev.jpg",
//     estimated_duration: 240, // 4 hours
//     tags: ["web development", "HTML", "CSS", "JavaScript"],
//     created_at: "2024-02-08T12:00:00Z",
//     updated_at: "2024-02-08T12:00:00Z",
//     category: "Programming",
//   },
//   {
//     course_id: 2,
//     course_title: "Advanced React Development",
//     total_blocks: 12,
//     total_lectures: 30,
//     total_lessons: 25,
//     total_quizzes: 10,
//     total_enrolled: 300,
//     description:
//       "Take your React skills to the next level with advanced concepts and techniques.",
//     is_live: false,
//     difficulty_level: "advanced",
//     thumbnail_url: "https://example.com/thumbnails/advanced_react.jpg",
//     estimated_duration: 360, // 6 hours
//     tags: ["React", "advanced", "frontend"],
//     created_at: "2024-02-07T12:00:00Z",
//     updated_at: "2024-02-07T12:00:00Z",
//     category: "Programming",
//   },
//   {
//     course_id: 3,
//     course_title: "Advanced React Development",
//     total_blocks: 12,
//     total_lectures: 30,
//     total_lessons: 25,
//     total_quizzes: 10,
//     total_enrolled: 300,
//     description:
//       "Take your React skills to the next level with advanced concepts and techniques.",
//     is_live: false,
//     difficulty_level: "advanced",
//     thumbnail_url: "https://example.com/thumbnails/advanced_react.jpg",
//     estimated_duration: 360, // 6 hours
//     tags: ["React", "advanced", "frontend"],
//     created_at: "2024-02-07T12:00:00Z",
//     updated_at: "2024-02-07T12:00:00Z",
//     category: "Programming",
//   },
//   {
//     course_id: 4,
//     course_title: "Advanced React Development",
//     total_blocks: 12,
//     total_lectures: 30,
//     total_lessons: 25,
//     total_quizzes: 10,
//     total_enrolled: 300,
//     description:
//       "Take your React skills to the next level with advanced concepts and techniques.",
//     is_live: false,
//     difficulty_level: "advanced",
//     thumbnail_url: "https://example.com/thumbnails/advanced_react.jpg",
//     estimated_duration: 360, // 6 hours
//     tags: ["React", "advanced", "frontend"],
//     created_at: "2024-02-07T12:00:00Z",
//     updated_at: "2024-02-07T12:00:00Z",
//     category: "Programming",
//   },
// ];

const AllCourses = (props:any) => {
  const { coursesData } = props;
    const navigate = useNavigate();

     const handleClick = (course:any) => {
      
       navigate("/courses/detail", {
         state: {
           course_id: course.course_id,
           course_title: course.course_title,
         },
       });
     };

  return (
    <div className="col-md-8 col-lg-9">
      <Container>
        <div className=" justify-content-between align-items-center py-3"></div>
        <div
          className="courses-container"
          style={{ height: "590px", overflowY: "auto" }}
        >
          <div className="container my-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {coursesData.map((course: any) => (
                <div className="col" key={course.course_id}>
                  <div className="card admin-allcourses-card h-100 shadow">
                    <img
                      src={course.thumbnail_url}
                      className="card-img-top admin-allcourses-img"
                      alt={course.course_title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title admin-allcourses-title"
                        style={{ height: "48px" }}
                      >
                        {/* Fixed height for title */}
                        {course.course_title}
                      </h5>
                      <p className="card-text admin-allcourses-text">
                        {/* Fixed height and scroll for description */}
                        {course.description}
                      </p>
                      <ul className="list-group list-group-flush ">
                        {/* Pushed to bottom with mt-auto */}
                        <li className="list-group-item">
                          Difficulty: {course.difficulty_level}
                        </li>
                        <li className="list-group-item">
                          Enrolled: {course.total_enrolled}
                        </li>
                        <li className="list-group-item">
                          Duration: {course.estimated_duration / 60} Hours
                        </li>
                      </ul>
                    </div>
                    <div className="">
                      <button
                        className="btn blue-button mb-3"
                        onClick={() => handleClick(course)}
                      >
                        <Link
                          to="#"
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          Detail <i className=""></i>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto bottom-links ">
          <button className="btn blue-button">
            <Link
              to="/admin/dashboard/review_requests"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Review Course Requests <i className="bi bi-arrow-right"></i>
            </Link>
          </button>
          <button className="btn blue-button">
            <Link
              to="/admin/dashboard/review_uploads"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Review Course Uploads <i className="bi bi-arrow-right"></i>
            </Link>
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AllCourses;
