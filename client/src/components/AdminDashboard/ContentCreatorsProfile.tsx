import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import api from "../../api/GeneralAPI";
import newimage from "../../assets/hero-img.png";
import { useNavigate } from "react-router-dom";

const ContentCreatorsProfile = () => {
  console.log("/admin/content_creators GET");
  const [profiles, setCCData] = React.useState<any>([]);

  useEffect(() => {
    const handleCC = async () => {
      try {
        const res = await api.get("/dashboard/admin/content_creators");

        setCCData(res.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    handleCC();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
      </div>
      <div className="container" style={{ height: "640px", overflowY: "auto" }}>
        <div className="container py-5">
          <div className="row justify-content-between">
            {profiles.map((profile, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                <div className="content-creator-card">
                  <div className="d-flex flex-column align-items-center text-center p-4">
                    <img
                      src={newimage}
                      alt={profile.name}
                      className="content-creator-avatar mb-3"
                    />
                    <h4 className="mb-0">{profile.fullname}</h4>
                    <p className="text-muted">@{profile.username}</p>
                    <p className="mb-1"></p>
                    <p>
                      <span className="content-creator-courses">
                        {profile.total_course} Courses
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="content-creator-students">
                        {profile.total_enrolled.toLocaleString()} Students
                      </span>
                    </p>
                    <p>
                      I start my development and digital career studying digital
                      design
                    </p>

                    <p className="text-muted">
                      Email: {profile.email}
                    </p>

                    {/* <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/admin/dashboard/content_creators/info')}>
                      View Details
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorsProfile;
