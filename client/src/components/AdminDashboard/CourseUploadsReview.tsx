import React from "react";
import "../../css/dashboard.css";
import { useNavigate } from "react-router-dom";

function CourseUploadsReview(props:any) {

 const { courseUploadRequestData } = props;
    const navigate = useNavigate();
    
     const handleDetail = (course: any) => {
       navigate("/admin/dashboard/review_uploads/detail", {
         state: {
           course: course,
         },
       });
     };
  // Dummy data for pending courses
  const pcourses = [
    {
      pending_id: 1,
      creator_id: 101,
      course_id: 201,
      course_title: "Introduction to React",
      course_description:
        "Learn the basics of React, from components to state management.",
      block_id: 301,
      block_title: "React Basics",
      block_description: "Introduction to React components and JSX.",
      lecture_id: 401,
      lecture_title: "Understanding JSX",
      lecture_description:
        "Learn what JSX is and how to use it in React applications.",
      lesson_title: "JSX Deep Dive",
      lesson_description: "An in-depth look at JSX and its usage in React.",
      file_url: "https://example.com/intro-to-react.pdf",
    },
    {
      pending_id: 2,
      creator_id: 102,
      course_id: 202,
      course_title: "Advanced Node.js",
      course_description:
        "Dive deep into advanced concepts of Node.js and backend development.",
      block_id: 302,
      block_title: "Asynchronous Node.js",
      block_description: "Handling asynchronous operations in Node.js.",
      lecture_id: 402,
      lecture_title: "Promises and Async/Await",
      lecture_description: "Understanding asynchronous programming in Node.js.",
      lesson_title: "Error Handling",
      lesson_description:
        "Best practices for handling errors in asynchronous code.",
      file_url: "https://example.com/advanced-node.pdf",
    },
    // More dummy data as needed...
  ];

 

  return (
    <div className="col-md-8 col-lg-9">
      <div className="container" style={{ paddingTop: "20px" }}>
        <div className="container my-5 review-requests">
          <h2 className="text-center mb-4">Course Uploads Review</h2>
          <div className="table-responsive">
            <table className="table request-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Block Title</th>
                  <th scope="col">Lecture Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courseUploadRequestData.map((course: any) => (
                  <tr key={course.pending_id}>
                    <th scope="row">{course.pending_id}</th>
                    <td>{course.course_title}</td>
                    <td>{course.block_title}</td>
                    <td>{course.lecture_title}</td>
                    <td>{course.course_description}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDetail(course)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseUploadsReview;
