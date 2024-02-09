import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/notification.css";
import UserProfile from "./UserProfile";


const RequestCourse = () => {
  const [showModal, setShowModal] = useState(false);
     const [formState, setFormState] = useState({
       gmail: "",
       topicName: "",
       reason: "",
       startDate: "",
       courseDuration: "",
       difficultyLevel: "",
       previousKnowledge: "",
       learningObjectives: "",
       additionalComments: "",
     });

     const handleChange = (event:any) => {
       const { name, value } = event.target;
       setFormState((prevState) => ({ ...prevState, [name]: value }));
     };

     const handleSubmit = (event:any) => {
       event.preventDefault();
       // In a real application, you would send this data to a server
       console.log(formState);
       //  alert("Course request submitted. We will get back to you soon!");
       setShowModal(true);
       const timer = setTimeout(() => {
         setFormState({
           gmail: "",
           topicName: "",
           reason: "",
           startDate: "",
           courseDuration: "",
           difficultyLevel: "",
           previousKnowledge: "",
           learningObjectives: "",
           additionalComments: "",
         });
         clearTimeout(timer);
       }, 500); 
     };
return (
  <div className="col-md-8 col-lg-9">
    <div className="container" style={{ paddingTop: "30px" }}>
      <div className="request-course-container">
        <h2>Request a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row request-form-row">
            <label htmlFor="gmail">Gmail Address</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={formState.gmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row request-form-row">
            <label htmlFor="topicName">Topic Name</label>
            <input
              type="text"
              id="topicName"
              name="topicName"
              value={formState.topicName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row request-form-row">
            <label htmlFor="reason">Reason for Request</label>
            <textarea
              id="reason"
              name="reason"
              value={formState.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Add additional fields following the same structure */}

          <button className="btn blue-button " type="submit">
            Submit Request
          </button>
        </form>
      </div>

      <div
        className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "15px" }}>
            <div
              className="modal-header"
              style={{ borderBottom: "none", borderTop: "none" }}
            >
              <h5 className="modal-title " style={{ fontSize: "20px" }}>
                Thank You!
              </h5>
              <button
                type="button"
                className="btn-close request-btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "16px" }}>
                Your course request has been submitted successfully. We will get
                back to you soon!
              </p>
            </div>
            <div
              className="modal-footer"
              style={{ borderBottom: "none", borderTop: "none" }}
            >
              <button
                type="button"
                className="btn btn-primary request-btn-primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for modal (optional) */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ opacity: "0.5" }}
        ></div>
      )}
    </div>
  </div>
);
};

export default RequestCourse;
