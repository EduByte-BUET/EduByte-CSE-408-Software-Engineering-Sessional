import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/GeneralAPI";
import { Spinner } from "react-bootstrap";

const CourseDetail = () => {
	const [course, setCourse] = useState<any>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { course_id, course_title } = location.state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`/courses?course_id=${course_id}`);
				setCourse(response.data.course);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	const handleStartCourse = async () => {
		const gotoCourse = () => {
			navigate(`/courses/blocks`, {
				state: {
					course_id: course.course_id,
					course_title: course.course_title,
				},
			});
		};

		if (course !== null) {
			try {
				await api.post("/courses/register", { course_id: course_id });
				gotoCourse();
			} catch (err: any) {
				if (err.response.status === 401) {
					alert("Kindly login to start the course.");
					navigate("/signin");
				} else if (err.response.status === 409) {
					alert("You have already enrolled in this course.");
					gotoCourse();
				} else {
					console.error(err);
				}
			}
		}
	};

	if (!course) {
		return <Spinner animation="border" />;
	}

	return (
		<div className="container">
			<div
				className="row justify-content-between mt-5"
				style={{ maxHeight: "50vh", overflowY: "auto" }}
			>
				<div className="col-md-8 text-start">
					<h1 className="blue-text">
						<b>{course.course_title}</b>
					</h1>
					<p>{course.description}</p>
				</div>
				<div className="col-md-4">
					<img src={course.thumbnail_url} alt="Course Photo" height={200} />
				</div>
			</div>
			<div className="row m-3">
				<div className="col-md-2">
					<button
						className="btn red-button"
						style={{
							color: "white",
						}}
						onClick={handleStartCourse}
					>
						Start Course <i className="bi bi-arrow-right"></i>
					</button>
				</div>
			</div>
			<div
				className="row course-detail-background m-5"
				style={{ maxHeight: "50vh", overflowY: "auto" }}
			>
				<div
					className="col-md-1 text-start column-border  d-flex align-items-center justify-content-center"
					style={{
						textAlign: "center",
						backgroundColor: "lightskyblue",
						maxWidth: "40px",
					}}
				>
					O <br /> V <br /> E <br /> R <br /> V <br /> I <br /> E <br /> W
				</div>
				<div className="col-md-4 p-3 text-start ml-2 column-border">
					<h5>
						<i className="fa-solid fa-list-ol"></i> &nbsp; Number of Lessons
					</h5>
					<ul>
						<li>Total: {course.total_lessons}</li>
						<li>Fields related to: {course.tags}</li>
					</ul>
				</div>
				<div className="col-md-2 text-start ml-2 column-border p-3">
					<h5>
						<i className="fa-solid fa-user-tie"></i> &nbsp; Enrolled By
					</h5>
					<ul>
						<li>{course.total_enrolled} learners</li>
					</ul>
				</div>
				<div className="col-md-5 text-start p-3">
					<h5>
						<i className="fa-solid fa-circle-exclamation"></i> &nbsp; Skills
						required
					</h5>
					<ul>
						{course.skills_acquired.map((skill: string, index: number) => (
							<li key={index}>{skill}</li>
						))}
					</ul>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
};

export default CourseDetail;
