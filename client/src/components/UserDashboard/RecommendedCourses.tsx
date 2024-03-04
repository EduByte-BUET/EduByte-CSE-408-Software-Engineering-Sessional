import React, { useState  ,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";
import { useLocation, useNavigate } from "react-router-dom";
// Dummy data for courses
// const recommended_courses=[
//               {
//                 "course_id": 1,
//                 "course_name": "Data Science Fundamentals",
//                 "course_intro": "Explore the basics of data science and analytics."
//               },
//               {
//                 "course_id": 2,
//                 "course_name": "JavaScript for Beginners",
//                 "course_intro": "Learn the fundamentals of JavaScript programming."
//               },
//               {
//                 "course_id": 3,
//                 "course_name": "Python for Data Analysis",
//                 "course_intro": "Learn how to use Python for data analysis and visualization."
//               },
//               {
//                 "course_id": 4,
//                 "course_name": "Introduction to Machine Learning",
//                 "course_intro": "Discover the basics of machine learning and build your first models."
//               }
//             ]

const RecommendedCourses = () => {

  const [course, setCourse] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleStartCourse = async (course_id,course_title) => {
    console.log("start course");
    console.log(course_id+"   "+course_title);
    const gotoCourse = (course_id, course_title) => {
      console.log("clicked on go to course");
      navigate(`/courses/blocks`, {
        state: {
          course_id: course_id,
          course_title: course_title,
        },
      });
    };

   
      try {
        await api.post("/courses/register", { course_id: course_id });
        gotoCourse(course_id, course_title);
      } catch (err: any) {
        if (err.response.status === 401) {
          alert("Kindly login to start the course.");
          navigate("/signin");
        } else if (err.response.status === 409) {
          alert("You have already enrolled in this course.");
          gotoCourse(course_id, course_title);
        } else {
          console.error(err);
        }
      }
    
  };

 

  	const [recommended, setRecommendedCourses] = useState<any>([]);

    useEffect(() => {
      const fetchRecomData = async () => {
        try {
          const res = await api.get("/courses/recommended");
          console.log(" recommendation");
          console.log(res);
          setRecommendedCourses(res.data);
        } catch (err) {
          alert("Error occurred. Please try again later.");
        }
      };

      fetchRecomData();
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
          {recommended.map((course) => (
            <div
              className="card card-dash mb-3 shadow-sm"
              key={course.course_id}
            >
              <img
                src={course.thumbnail_url}
                className="card-img-top"
                alt="..."
              />
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
                <div
                  style={{ width: "60%" }}
                  onClick={() => handleStartCourse(course.course_id,course.course_title)}
                >
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

      {/* <div className="mt-auto bottom-links ">
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
      </div> */}
    </div>
  );
};

export default RecommendedCourses;
