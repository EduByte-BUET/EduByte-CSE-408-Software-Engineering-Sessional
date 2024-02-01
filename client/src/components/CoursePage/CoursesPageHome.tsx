import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CourseViewSections from "./CourseViewSections";
import CategoryItem from "./CategoryItem";
import api from "../../api/GeneralAPI";
import { Spinner } from "react-bootstrap";
import "../../css/CoursePage/CourseHome.css";

interface Course {
	course_id: number;
	title: string;
	author: string;
	total_lessons: number;
	description: string;
}

interface Category {
	category_id: number;
	name: string;
	description: string;
	courses: Course[];
}

interface ApiResponse {
	status: string;
	message: string;
	categories: Category[];
	popular_courses: Course[];
	recommended_courses: Course[];
}

const CoursesPage: React.FC = () => {
	const [data, setData] = useState<ApiResponse | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get("/courses");
				setData(res.data);
			} catch (err) {
				alert("Error occurred. Please try again later.");
			}
		};

		fetchData();
	}, []);

	if (!data) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<div className="row d-flex justify-content-between">
				<div className="col-6 bg-light m-2" style={{ overflowY: "auto" }}>
					<h4 style={{ marginBottom: "10px" }}>
						<i
							className="bi bi-journal-text"
							style={{ marginRight: "1px" }}
						></i>
						Courses By Categories
					</h4>
					{data.categories.map((category) => (
						<CategoryItem key={category.category_id} category={category} />
					))}
				</div>
				<div className="col-5 mt-2 mb-2 mr-3" style={{ overflowY: "auto" }}>
					<CourseViewSections
						title="Popular Courses"
						courses={data.popular_courses}
					/>
					<CourseViewSections
						title="Courses By Preferences"
						courses={data.recommended_courses}
					/>
				</div>
			</div>
		</div>
	);

	// ... rest of your code ...
};

export default CoursesPage;
