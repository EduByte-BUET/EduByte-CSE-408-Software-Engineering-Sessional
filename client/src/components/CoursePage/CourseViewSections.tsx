import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CoursePage/CourseViewSections.css";

const CourseCard = (props: any) => {
	const { course } = props;
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent) => {
		navigate("/courses/detail", {
			state: { course_id: course.course_id, course_title: course.course_title },
		});
	};

	return (
		<div
			key={course.course_id}
			className="course-card rounded mb-2 pt-2"
			onClick={handleClick}
		>
			<div className="row">
				<h5>
					<i className="fa-regular fa-bookmark"></i> &nbsp;{" "}
					{course.course_title}
				</h5>
			</div>
			<div className="row">
				<div className="col-md-10">
					<p>{course.category}</p>
				</div>
				<div className="col-md-2">
					<p>{course.difficulty_level}</p>
				</div>
			</div>
		</div>
	);
};

const CoursesSection = (props: any) => {
	const { title, courses } = props;
	return (
		<div className="course-section row bg-gradient p-3">
			<h4
				style={{
					textAlign: "left",
					borderBottom: "2px solid black",
					marginBottom: "20px",
				}}
			>
				{title}
			</h4>
			{courses.map((course: any) => (
				<CourseCard key={course.course_id} course={course} />
			))}
		</div>
	);
};

export default CoursesSection;
