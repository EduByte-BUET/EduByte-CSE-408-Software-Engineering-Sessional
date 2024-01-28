// CategoryItem.tsx

import React, { useState } from "react";
import CourseViewSections from "./CourseViewSections";

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

interface CategoryItemProps {
	category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
		console.log("ON click print");
		console.log(category.courses);
		setIsExpanded(!isExpanded);
	};
	// console.log(category.courses);

	return (
		<div key={category.category_id} className="category-item rounded m-2">
			<div className="category-header" onClick={handleExpandClick}>
				<h5>{category.name}</h5>
				<i className="fa-solid fa-chevron-down"></i>
			</div>
			{isExpanded && <CourseViewSections title="" courses={category.courses} />}
		</div>
	);
};

export default CategoryItem;
