import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import UserProfile from "./UserProfile";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";

// Dummy data for courses

const Favorites = () => {
	const [courses, setCourses] = useState<any>([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await api.get("/courses/favorites");
				if (response.status === 200) {
					setCourses(response.data);
					console.log(response.data);
					// setCourses(response.data);
				}
			} catch (error) {
				console.error("Error fetching courses: ", error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div className="col-md-8 col-lg-9">
			<div className=" justify-content-between align-items-center py-3">
				{/* Add SortBy and SearchBar components */}
			</div>
			<div
				className="courses-container"
				style={{ height: "560px", overflowY: "auto" }}
			>
				<div className="courses-list">
					{courses.map((course) => (
						<div
							className="card card-dash mb-3 shadow-sm"
							key={course.course_id}
						>
							<img src={newimage} className="card-img-top" alt="..." />
							<div
								className="card-body"
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<div
									className="container"
									style={{ display: "flex", flexDirection: "column" }}
								>
									<h5 className="card-dash-title">{course.course_title}</h5>
									<p style={{ alignContent: "start", paddingTop: "50px" }}>
										{course.description}
									</p>
								</div>
								<div style={{ width: "60%" }}>
									<a
										href="#"
										className="btn blue-button"
										style={{ padding: "0.75rem 2rem" }}
									>
										Details
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mt-auto bottom-links ">
				<button className="btn blue-button">
					<Link
						to="/courses"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						Show More Courses <i className="bi bi-arrow-down"></i>
					</Link>
				</button>
				<button className="btn blue-button">
					<Link
						to="/user/dashboard/request_course"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						Request New Course <i className="bi bi-arrow-down"></i>
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Favorites;
