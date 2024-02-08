import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import api from "../../api/GeneralAPI";


const CourseDetail = () => {
	const [course, setCourse] = useState<any>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const {course_id, course_title} = location.state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				//console.log("course_id: " + course_id);
				const response = await api.get(`/courses?course_id=${course_id}`);
				setCourse(response.data.course);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	const handleStartCourse = async () => {
		if (course !== null) {
			try {
				await api.post("/courses/register", { course_id: course_id });
				navigate(`/courses/blocks`,{ state: { course_id: course.course_id, course_title: course.course_title } });
			} catch (err) {
				console.error(err);
				alert(
					"Kindly login to start the course. If you don't have an account, please sign up first."
				);
			}
		}
	};

	if (!course) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col mt-6 text-start">
					<h4 className="blue-text">{course.course_title}</h4>
					<p>{course.description}</p>
					<button
						className="btn blue-button"
						style={{ color: "inherit", textDecoration: "inherit" }}
						onClick={handleStartCourse}
					>
						Start Course <i className="bi bi-arrow-right"></i>
					</button>
				</div>
				<div className="col mt-3">
					<img src={course.thumbnail_url} alt="Course Photo" />
				</div>
			</div>
			<div className="row cream-background mt-3">
				<div className="col-4 text-start ml-2 column-border p-3">
					<h5>Number of Lessons</h5>
					<ul>
						<li>Total: {course.total_lessons}</li>
						<li>Fields related to: {course.tags}</li>
					</ul>
				</div>
				<div className="col-4 text-start ml-2 column-border p-3">
					<h5>Enrolled By</h5>
					<ul>
						<li>{course.total_enrolled} learners</li>
					</ul>
				</div>
				<div className="col-4 text-start p-3">
					<h5>Skills required</h5>
					<ul>
						{course.skills_acquired.map((skill:string, index:number) => (
							<li key={index}>{skill}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseDetail;
