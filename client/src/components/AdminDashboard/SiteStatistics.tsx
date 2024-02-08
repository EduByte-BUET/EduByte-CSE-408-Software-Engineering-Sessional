import React, { useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../../css/dashboard.css";

import dashboardapi from "../../api/GeneralAPI";

function SiteStatistics() {
  const [stats] = React.useState({
    userStats: {
      totalUsers: 1024,
      newUsersThisMonth: 98,
      activeCreators: 60,
    },
    courseStats: {
      totalCourses: 150,
      activeCourses: 120,
      recentCourses: 8,
      coursesByDifficulty: {
        beginner: 50,
        intermediate: 70,
        advanced: 30,
      },
    },
    engagementStats: {
      totalEnrollments: 3200,
      totalLessons: 1200,
      totalQuizzes: 300,
    },
    contentStats: {
      totalCreators: 85,
      totalBlocks: 400,
      totalLectures: 850,
    },
    requestStats: {
      totalRequests: 45,
      pendingRequests: 12,
    },
  });

  return (
    <div className="col-md-8 col-lg-9">
      <div className="container">
        <div className="container " style={{ paddingTop: "0px" }}>
          <div className="site-statistics">
            {/* <h2 className="text-center">Site Statistics</h2> */}
            <div className="statistics-grid">
              {Object.entries(stats).map(([category, details], idx) => (
                <div key={idx} className="stat-category">
                  <h3>{category.replace(/([A-Z])/g, " $1")}</h3>

                  {Object.entries(details).map(([key, value], i) => (
                    <div key={i} className="stat-detail">
                      <h6>{key.replace(/([A-Z])/g, " $1")}:</h6>
                      <p>
                        {typeof value === "object"
                          ? Object.entries(value)
                              .map(([level, count]) => `${level}: ${count}`)
                              .join(", ")
                          : value}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteStatistics;
