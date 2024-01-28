import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";

// Dummy data for courses
const  notifications = [
              {
                "notification_id": 1,
                "type": "announcement",
                "content": "New course available: Data Science Masterclass!",
                "link": "http://example.com/course/data-science-masterclass"
              },
              {
                "notification_id": 2,
                "type": "reminder",
                "content": "Atcoder Grand Contest 065 Announcement Contest",
                "link": "http://example.com/contest/atcoder-grand-contest-065"
              },
              {
                "notification_id": 3,
                "type": "update",
                "content": "Updated course content for JavaScript for Beginners",
                "link": "http://example.com/course/javascript-for-beginners"
              },
              {
                "notification_id": 4,
                "type": "event",
                "content": "Join us for our annual Hackathon!",
                "link": "http://example.com/event/hackathon"
              }
            ];

const UserNotification = () => {
  const [notifys] = useState(notifications);

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div
        className="courses-container"
        style={{ height: "640px", overflowY: "auto" }}
      >
        <div className="courses-list">
          {notifys.map((notify) => (
            <div className="card card-dash mb-3 shadow-sm" key={notify.notification_id}>
              <div className="">
                <h6 className="card-title">{notify.type}</h6>

                <p className="card-text" style={{ paddingLeft: "40px" }}>
                  {notify.content}
                </p>
                <p className="card-text" style={{ paddingLeft: "40px" }}>
                  {notify.link}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UserNotification;
