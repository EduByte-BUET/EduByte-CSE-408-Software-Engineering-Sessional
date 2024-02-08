import React, { useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../../css/dashboard.css";

import dashboardapi from "../../api/GeneralAPI";

function CourseRequestsReview() {
  console.log("coure review request");
  const courseRequests = [
    // Example course requests
    {
      id: 1,
      user_id: 101,
      topic: "Introduction to Python",
      description:
        "A comprehensive beginner course covering the basics of Python programming.",
      requestDate: "2023-02-15",
      status: "Pending",
    },
    {
      id: 2,
      user_id: 102,
      topic: "Advanced JavaScript",
      description:
        "An advanced course focused on modern JavaScript frameworks and libraries.",
      requestDate: "2023-02-14",
      status: "Pending",
    },
    // Add more requests as needed
  ];
  //const [courseRequests, setCourseRequests] = useState([]);

  const handleApprove = (id: any) => {
    // Implement logic to approve request
    console.log(`Approve request with ID: ${id}`);
  };

  const handleRemove = (id: any) => {
    // Implement logic to remove request
    console.log(`Remove request with ID: ${id}`);
  };

  return (
    <div className="col-md-8 col-lg-9">
      <div className="container">
        <div className="container " style={{ paddingTop: "20px"}}>
          <div className="container my-5 review-requests">
            <h2 className="text-center mb-4">Course Requests Review</h2>
            <div className="table-responsive">
              <table className="table request-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Topic</th>
                    <th scope="col" style={{ width: "30%" }}>
                      Description
                    </th>
                    <th scope="col">Request Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseRequests.map((request, index) => (
                    <tr key={request.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{request.user_id}</td>
                      <td>{request.topic}</td>
                      <td>{request.description}</td>
                      <td>{request.requestDate}</td>
                      <td>{request.status}</td>
                      <td >
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger my-2"
                          onClick={() => handleRemove(request.id)}
                        >
                          Remove
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
    </div>
  );
}

export default CourseRequestsReview;
