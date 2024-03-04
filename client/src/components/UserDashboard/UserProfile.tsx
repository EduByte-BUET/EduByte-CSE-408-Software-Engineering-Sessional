import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";
import { UserContext } from "../UserContext/UserContext";

const UserProfile = () => {
	const currentUser = React.useContext(UserContext);

	// Getting the current user from the context
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await api.get("/user/signin/logout");

			currentUser.setCurrentUser(null);
			window.localStorage.removeItem("currentUser");
			navigate("/home");
		} catch (err) {
			console.error(err);
		}
	};

	const handleMyCourses = () => {
		navigate("/user/dashboard/mycourses");
	};

	const handleRecommendations = () => {
		navigate("/user/dashboard/recommendations");
	};

	const handleNotifications = () => {
		navigate("/user/dashboard/notifications");
	};

	const handleMyPosts = () => {
		navigate("/user/dashboard/myposts");
	};

	const handleSavedPosts = () => {
		navigate("/user/dashboard/savedposts");
	};

	return (
		<div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars">
			<div className="text-center pt-3">
				<img src={newimage} alt="User" className="img-thumbnail" />
				<h3>{currentUser.currentUser}</h3>
			</div>
			<nav
				className="nav flex-column"
				style={{ width: "87%", margin: "10px auto" }}
			>
				<Link
					to="/user/dashboard/mycourses"
					className="nav-link dash-navlink"
					onClick={handleMyCourses}
				>
					Courses
				</Link>
				<Link
					to="/user/dashboard/recommendations"
					className="nav-link dash-navlink"
					onClick={handleRecommendations}
				>
					Recommendations
				</Link>
				<Link
					to="/user/dashboard/notifications"
					className="nav-link dash-navlink"
					onClick={handleNotifications}
				>
					Notifications
				</Link>
				<Link
					to="/user/dashboard/savedposts"
					className="nav-link dash-navlink"
					onClick={handleSavedPosts}
				>
					Saved Posts
				</Link>
				<Link
					to="/user/dashboard/myposts"
					className="nav-link dash-navlink"
					onClick={handleMyPosts}
				>
					My Posts
				</Link>
			</nav>
			<button className="btn blue-button m-3" onClick={() => navigate("/home")}>
				<i className="bi bi-house"></i> Home
			</button>
			<button className="btn red-button m-3" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default UserProfile;
