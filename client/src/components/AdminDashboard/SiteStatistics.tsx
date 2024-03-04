import React, { useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../../css/dashboard.css";
import api from "../../api/GeneralAPI";
import dashboardapi from "../../api/GeneralAPI";

function SiteStatistics() {

  
  const [stattts] = React.useState({
    userStats: {
      totalUsers: 1024,
      totalCreators: 60,
      totalAdmin: 50,
    },
    courseStats: {
      totalCourses: 150,
      totalCategories: 10,
      totalEnrollments: 3200,
    },
   
    contentStats: {
      totalBlocks: 400,
      totalLectures: 850,
      totalLessons: 1200,
      totalQuizzes: 300,
    },
  });



  const [stats, setStats] = React.useState<any>({});
 

  useEffect(() => {
    const handleSiteStats = async () => {
      try {
        
        const res = await api.get("/dashboard/admin/site_stats");

        setStats(res.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    handleSiteStats();
  }, []);


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

                  {Object.entries(details as Record<string,unknown>).map(([key, value], i) => (
                    <div key={i} className="stat-detail">
                      <h6>{key.replace(/([A-Z])/g, " $1")}:</h6>
                      <p>
                        {typeof value === "object"&&value!=null
                          ? Object.entries(value as Record<string,unknown>)
                              .map(([level, count]) => `${level}: ${count}`)
                              .join(", ")
                          : String(value).toLocaleString()}
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
