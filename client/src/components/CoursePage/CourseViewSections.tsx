import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CoursePage/CourseViewSections.css";
import api from "../../api/GeneralAPI";

const CourseCard = (props: any) => {
	const { course } = props;
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent) => {
		navigate("/courses/detail", {
			state: { course_id: course.course_id, course_title: course.course_title },
		});
	};

	const handleAddToFavorites = (event: React.MouseEvent) => {
		const addToFav = async () => {
			try {
				const response = await api.get(
					`/courses/addtofav?course_id=${course.course_id}`
				);
				if (response.status === 200) {
					alert("Course added to favorites");
				}
			} catch (error) {
				alert("Error adding course to favorites");
			}
		};

		addToFav();
	};

	return (
		<div key={course.course_id} className="course-card rounded mb-2 pt-2">
			<div className="row" onClick={handleClick}>
				<div className="row">
					<h5>
						<i className="fa-regular fa-bookmark"></i> &nbsp;{" "}
						{course.course_title}
					</h5>
				</div>
				<div className="row">
					<div className="col-md-9">
						<p>
							<i className="fa-solid fa-table-list"></i> &nbsp;{" "}
							{course.category}
						</p>
					</div>
					<div className="col-md-3">
						<p>
							<i className="fa-solid fa-gears"></i> &nbsp;{" "}
							{course.difficulty_level}
						</p>
					</div>
				</div>
			</div>
			<div
				className="row"
				style={{
					border: "1px solid black",
					padding: "3px",
					borderRadius: "5px",
					backgroundColor: "whitesmoke",
				}}
				onClick={handleAddToFavorites}
			>
				<h5>
					<i className="fa-solid fa-plus"></i> &nbsp; Add to favorites
				</h5>
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
