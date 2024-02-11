import React, { useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "../../css/dashboard.css"
import UserProfile from "./UserProfile";
import dashboardapi from "../../api/GeneralAPI";

import MyCourses from "./MyCourses";
import RecommendedCourses from "./RecommendedCourses";
import UserNotification from "./UserNotification";
import RequestCourse from "./RequestCourse";
const Dashboard = () => {
  // const { currentUser } = React.useContext(UserContext);
  // const navigate = useNavigate();
  // // If user is not logged in, redirect to home page
  // useEffect(() => {
  //   if (!currentUser) {
  //     console.log(
  //       "User is not logged in. Redirecting to home page..."
  //     );
  //     navigate("/signin");
  //     alert ("Please login first");
  //   }
  // }, []);

  const [coursesData, setCoursesData] = React.useState<[any]>();
  const [recommendedCoursesData, setRecommendedCoursesData] = React.useState<any>(null);
  const [notificationData, setNotificationData] = React.useState<any>(null);

  useEffect(() => {
    const handleMyNotification = async () => {
      try {
        console.log(" 1 ");
        const res = await dashboardapi.get("/dashboard/user/notifications");
        console.log(res);
        setNotificationData(res.data.notificationData);
       
      } catch (err) {
        console.log(err);
      }
    };

    handleMyNotification();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <UserProfile />
        <Routes>
          <Route
            path="/mycourses"
            element={<MyCourses />}
          />
          <Route path="/recommendations" element={<RecommendedCourses />} />
          <Route
            path="/notifications"
            element={<UserNotification notificationData={notificationData} />}
          />
          <Route path="/savedposts" element={<MyCourses />} />
          <Route path="/request_course" element={<RequestCourse />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
