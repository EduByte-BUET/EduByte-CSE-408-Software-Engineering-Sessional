import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";

import MyCourses from "./MyCourses";
import RecommendedCourses from "./RecommendedCourses";
import UserNotification from "./UserNotification";
import RequestCourse from "./RequestCourse";
import Popup from "../Popup";
import UserAuth from "../UserAuth";
import SavedPosts from "./SavedPosts";
import MyPosts from "./MyPosts";
import { useEffect, useState } from "react";

import api from "../../api/GeneralAPI";
const Dashboard = () => {
	const [authFailed, setAuthFailed] = useState<boolean>(false);

	useEffect(() => {
		const auth = async () => {
			const loggedIn = await UserAuth();
			if (!loggedIn) {
				setAuthFailed(true);
			}
		}

		auth();
	});

	return (
		<div className="container">
			{authFailed && <Popup description="Unauthorized" toggle={setAuthFailed} />}

			<div className="row">
				<UserProfile />
				<Routes>
					<Route path="/mycourses" element={<MyCourses />} />
					<Route path="/recommendations" element={<RecommendedCourses />} />
					<Route
						path="/notifications"
						element={<UserNotification />}
					/>
					<Route path="/savedposts" element={<SavedPosts />} />
					<Route path="/myposts" element={<MyPosts />} />
					<Route path="/request_course" element={<RequestCourse />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
