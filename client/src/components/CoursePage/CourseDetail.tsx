import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Route } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { Link } from "react-router-dom";
import api from "../../api/CourseInfo";

interface RouteParams {
	course_id: string;
}

interface Course {
	course_id: number;
	course_name: string;
	course_description: string;
	instructor_name: string;
	total_lectures: number;
	total_enrolled_students: number;
	start_date: string;
	end_date: string;
	tags: string[];
	course_video_url: string;
	skills_acquired: string[];
	author: {
		author_id: number;
		author_name: string;
		author_bio: string;
	};
}

interface ApiResponse {
	status: string;
	message: string;
	course: Course;
}
interface CourseDetailProps {
	onCourseData: (data: { course_id: number; courseName: string }) => void;
}

const CourseDetail = ({ onCourseData }: CourseDetailProps) => {
	const [course, setCourse] = useState<Course | null>(null);
	const { course_id } = useParams<Record<string, string>>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("Courseid: " + course_id);
				const response = await api.getCourse(course_id);
				console.log(response.data.course);

				setCourse(response.data.course);
				onCourseData({
					course_id: response.data.course.course_id,
					courseName: response.data.course.course_name,
				});
				// status: 200
			} catch (err) {
				// status: 409 (conflict)
				console.error(err);
			}
		};

		fetchData();
	}, [course_id]);

	if (!course) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col mt-6 text-start">
					<h4 className="blue-text">{course.course_name}</h4>
					<p>{course.course_description}</p>
					<button className="btn blue-button">
						<Link
							to={`/courses/${course.course_id}/blocks`}
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							Start Course <i className="bi bi-arrow-right"></i>
						</Link>
					</button>
				</div>
				<div className="col mt-3">
					<VideoPlayer videoUrl={course.course_video_url} />
				</div>
			</div>
			<div className="row cream-background mt-3">
				<div className="col-4 text-start ml-2 column-border p-3">
					<h5>Number of Lectures</h5>
					<ul>
						<li>About {course.total_lectures}</li>
						<li>Instructor: {course.instructor_name}</li>
						<li>Starting from {course.start_date}</li>
					</ul>
				</div>
				<div className="col-4 text-start ml-2 column-border p-3">
					<h5>Enrolled By</h5>
					<ul>
						<li>{course.total_enrolled_students} learners</li>
					</ul>
				</div>
				<div className="col-4 text-start p-3">
					<h5>Skills required</h5>
					<ul>
						{course.skills_acquired.map((skill, index) => (
							<li key={index}>{skill}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseDetail;
