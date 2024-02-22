import React, { useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	useLocation,
} from "react-router-dom";
import "../../css/dashboard.css";

import api from "../../api/GeneralAPI";

import AdminNotification from "./AdminNotification";
import AdminProfile from "./AdminProfile";
import ContentCreatorsProfile from "./ContentCreatorsProfile";
import CCreatorDetail from "./CCreatorDetail";
import CourseRequestsReview from "./CourseRequestsReview";
import CourseUploadsReview from "./CourseUploadsReview";
import CourseUploadDetail from "./CourseUploadDetail";
import SiteStatistics from "./SiteStatistics";
import AllCourses from "./AllCourses";

const Dashboard_admin = () => {
	const [notificationData, setNotificationData] = React.useState<any>(null);
	const [courseUploadRequestData, setCourseUploadRequestData] = React.useState<any>(null);

	useEffect(() => {
		const handleMyNotification = async () => {
			try {
				console.log(" 1 ");
				const res = await api.get("/dashboard/admin/notifications");

				setNotificationData(res.data.notificationData);
			} catch (err:any) {
				console.log(err);
			}
		};

		handleMyNotification();
	}, []);

	useEffect(() => {
		const handleUploadRequestData = async () => {
			try {
				const res = await api.get("/dashboard/admin/review_upload");

				setCourseUploadRequestData(res.data.uploadData);
			} catch (err) {
				console.log(err);
			}
		};

		handleUploadRequestData();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<AdminProfile />
				<Routes>
					<Route
						path="/allcourses"
						element={<AllCourses />}
					/>
					<Route
						path="/content_creators"
						element={<ContentCreatorsProfile />}
					/>
					<Route path="/content_creators/info" element={<CCreatorDetail />} />
					<Route
						path="/notifications"
						element={<AdminNotification notificationData={notificationData} />}
					/>
					{/* <Route path="/savedposts" element={<MyCourses />} /> */}
					<Route path="/site_states" element={<SiteStatistics />} />

					<Route path="/review_requests" element={<CourseRequestsReview />} />
					<Route
						path="/review_uploads"
						element={
							<CourseUploadsReview
								courseUploadRequestData={courseUploadRequestData}
							/>
						}
					/>
					<Route
						path="/review_uploads/detail"
						element={<CourseUploadDetail />}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard_admin;
