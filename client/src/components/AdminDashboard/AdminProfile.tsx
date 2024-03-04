import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";
import { UserContext } from "../UserContext/UserContext";

const AdminProfile = () => {
	const [activeLink, setActiveLink] = useState(""); // Default active link
	const currentUser = React.useContext(UserContext);

	// Function to set the active link and apply the 'active' class
	const handleSetActiveLink = (link: any) => {
		setActiveLink(link);
	};

	// Getting the current user from the context
	const { setCurrentUser } = React.useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await api.get("/user/signin/logout");

			currentUser.setCurrentUser(null);
			window.localStorage.removeItem("currentUser");
			navigate("/home");
			setCurrentUser(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAllCourses = () => {
		handleSetActiveLink("/allcourses");
	};

	const handleContentCreator = () => {
		handleSetActiveLink("/content_creator");
	};

	const handleNotifications = () => {
		handleSetActiveLink("/notifications");
	};

	const handleSiteStats = () => {
		handleSetActiveLink("/site_states");
	};

	return (
		<div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars">
			<div className="text-center py-4">
				<img src={newimage} alt="User" className="img-thumbnail" />
				<h3>{currentUser.currentUser}</h3>
			</div>
			<nav
				className="nav flex-column"
				style={{ width: "87%", margin: "10px auto" }}
			>
				<Link
					to="/admin/dashboard/allcourses"
					className={`nav-link dash-navlink ${
						activeLink === "/allcourses" ? "active" : ""
					}`}
					onClick={handleAllCourses}
				>
					Courses
				</Link>
				<Link
					to="/admin/dashboard/content_creators"
					className={`nav-link dash-navlink ${
						activeLink === "/content_creator" ? "active" : ""
					}`}
					onClick={handleContentCreator}
				>
					Content Creators
				</Link>

				<Link
					to="/admin/dashboard/site_states"
					className={`nav-link dash-navlink ${
						activeLink === "/site_states" ? "active" : ""
					}`}
					onClick={handleSiteStats}
				>
					Site Stats
				</Link>
				<Link
					to="/admin/dashboard/notifications"
					className={`nav-link dash-navlink ${
						activeLink === "/notifications" ? "active" : ""
					}`}
					onClick={handleNotifications}
				>
					Notifications
				</Link>
			</nav>
			<button className="btn blue-button m-3" onClick={() => navigate("/home")}>
				<i className="bi bi-house"></i> Home
			</button>
			<button className="btn blue-button m-3" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default AdminProfile;
