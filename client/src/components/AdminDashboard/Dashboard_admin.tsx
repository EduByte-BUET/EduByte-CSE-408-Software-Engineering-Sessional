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

import AdminNotification from "./AdminNotification";
import AdminProfile from "./AdminProfile";
import ContentCreatorsProfile from "./ContentCreatorsProfile";
const Dashboard_admin = () => {
  const { currentUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  //If user is not logged in, redirect to home page
  //   useEffect(() => {
  //     if (!currentUser) {
  //       console.log(
  //         "User is not logged in. Redirecting to home page..."
  //       );
  //       navigate("/signin");
  //       alert ("Please login first");
  //     }
  //   }, []);

  const [coursesData, setCoursesData] = React.useState<any>(null);

  const [notificationData, setNotificationData] = React.useState<any>(null);

  //  useEffect(() => {
  //     const handleMyCourses = async () => {
  //         try {
  //           const res = await dashboardapi.get("/courses");
  //           setCoursesData(res.data.coursesData);
  //         }
  //         catch (err) {
  //           console.log(err);
  //         }
  //     }

  //     handleMyCourses();
  //     }
  //   , []);

  useEffect(() => {
    const handleMyNotification = async () => {
      try {
        console.log(" 1 ");
        const res = await dashboardapi.get("/dashboard/admin/notifications");
        console.log("here is the admin");
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
        <AdminProfile />
        <Routes>
          {/* <Route path="/mycourses" element={<MyCourses coursesData={coursesData} />}  />*/}
          <Route path="/content_creators" element={<ContentCreatorsProfile />} />
          <Route
            path="/notifications"
            element={<AdminNotification notificationData={notificationData} />}
          />
          {/* <Route path="/savedposts" element={<MyCourses />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard_admin;
