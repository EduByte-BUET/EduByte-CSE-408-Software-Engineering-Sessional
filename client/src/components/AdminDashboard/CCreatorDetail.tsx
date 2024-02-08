import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
const CCDetail = () => {
  const admindata = {
    fullName: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    profilePicture: "https://example.com/path/to/profile-picture.jpg",
    biography:
      "John Doe has over 10 years of experience in web development and e-learning. He specializes in creating engaging, interactive courses for web development.",
    contactInfo: {
      phone: "123-456-7890",
      alternateEmail: "john.alternate@example.com",
    },
    coursesCreated: [
      {
        title: "Introduction to Web Development",
        description:
          "This course covers the basics of HTML, CSS, and JavaScript.",
        category: "Web Development",
      },
      {
        title: "Advanced JavaScript",
        description:
          "Dive deep into JavaScript with topics like closures, prototypes, and promises.",
        category: "Web Development",
      },
    ],
    totalStudentsEnrolled: 1500,
    popularCourses: [
      {
        title: "Introduction to Web Development",
        enrolled: 1000,
      },
      {
        title: "Advanced JavaScript",
        enrolled: 500,
      },
    ],
    ratingsAndReviews: {
      averageRating: 4.5,
      highlightedReviews: [
        {
          content:
            "This course gave me a solid understanding of web development basics. Highly recommended!",
          author: "Jane Doe",
        },
        {
          content:
            "John's course on Advanced JavaScript took my skills to the next level.",
          author: "Emily Smith",
        },
      ],
    },
    studentProgress:
      "On average, students complete 75% of course content, with a high engagement rate in interactive quizzes.",
    contentCreatorScore: 9.2,
  };

  return (
    <div className="col-md-8 col-lg-9">
     
      <div className="container" >
        <div className="container ccreator-profile" style={{paddingTop: '70px'}}>
          <div className="row mb-5">
            {/* Profile Information Section */}
            <div className="col-lg-5 mb-4">
              <div className="card border-0 shadow">
                <img src={newimage} className="card-img-top" alt="Profile" />
                <div className="card-body text-center">
                  <h3 className="card-title mb-0">{admindata.fullName}</h3>
                  <div className="card-text text-muted">
                    @{admindata.username}
                  </div>
                  <p className="mt-3">{admindata.biography}</p>
                  <div className="d-flex flex-column align-items-center">
                    <a
                      href={`mailto:${admindata.email}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      <i className="bi bi-envelope-fill me-1"></i> Email
                    </a>
                    {admindata.contactInfo.phone && (
                      <div className="mt-2">
                        <strong>
                          <i className="bi bi-telephone-fill me-1"></i> Phone:
                        </strong>{" "}
                        {admindata.contactInfo.phone}
                      </div>
                    )}
                    {admindata.contactInfo.alternateEmail && (
                      <div>
                        <strong>
                          <i className="bi bi-envelope-fill me-1"></i> Alt
                          Email:
                        </strong>{" "}
                        {admindata.contactInfo.alternateEmail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Creation and Management Section */}
            <div className="col-lg-7">
              <h2 className="mb-4">Courses & Contributions</h2>
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h4>Courses Created</h4>
                  <div className="list-group mb-4">
                    {admindata.coursesCreated.map((course, index) => (
                      <a
                        key={index}
                        href="#"
                        className="list-group-item list-group-item-action"
                      >
                        <h5 className="mb-1">{course.title}</h5>
                        <p className="mb-1">{course.description}</p>
                        <small>Category: {course.category}</small>
                      </a>
                    ))}
                  </div>
                  <h5>
                    Total Students Enrolled:{" "}
                    <span className="text-primary">
                      {admindata.totalStudentsEnrolled}
                    </span>
                  </h5>

                  <h4 className="mt-4">Popular Courses</h4>
                  <ul className="list-unstyled">
                    {admindata.popularCourses.map((course, index) => (
                      <li key={index} className="mb-2">
                        <span className="fw-bold">{course.title}</span> -{" "}
                        {course.enrolled} students
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCDetail;
