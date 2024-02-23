import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/notification.css";
import UserProfile from "./UserProfile";

const UserNotification = (props: any) => {
	const { notificationData } = props;
	console.log("it is frontend notification");
	console.log(notificationData);

	const badgeColor = (notificationType: string) => {
		switch (notificationType) {
			case "discussion_forum_post":
				return "primary"; // Blue color for forum posts
			case "new_announcement":
				return "info"; // Light blue color for announcements
			case "new_course_enrolled":
				return "success"; // Green color for new course enrollments
			case "quiz_available":
				return "warning"; // Yellow color for quizzes
			case "competition_announcement":
				return "danger"; // Red color for competitions
			default:
				return "secondary"; // Grey color for any other types
		}
	};

	// const [notifys] = useState(notificationData);

	return (
		<div className="col-md-8 col-lg-9">
			<div className=" justify-content-between align-items-center py-3">
				{/* Add SortBy and SearchBar components */}
			</div>
			<div
				className="courses-container"
				style={{ height: "640px", overflowY: "auto" }}
			>
				<div className="notification-container">
					<div className="container">
						{notificationData.map((notify: any) => (
							<div key={notify.notification_id} className="notification-card">
								<div className="row g-0">
									<div
										className={`col-md-3 notification-header bg-${badgeColor(
											notify.notification_type
										)} text-white`}
									>
										<i
											className="bi bi-bell-fill"
											style={{ fontSize: "3rem" }}
										></i>
									</div>
									<div className="col-md-9">
										<div className="notification-top-bar">
											<small
												className={`badge bg-${badgeColor(
													notify.notification_type
												)}`}
											>
												{notify.status}
											</small>
											<small className="notification-date">
												Created:{" "}
												{new Date(notify.date_created).toLocaleDateString()}
											</small>
										</div>
										<div className="notification-body">
											<h5 className="notification-title">{notify.title}</h5>
											<p className="notification-text">{notify.message}</p>
										</div>
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

export default UserNotification;
