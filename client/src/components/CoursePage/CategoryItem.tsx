import React, { useState } from "react";
import CourseViewSections from "./CourseViewSections";


const CategoryItem = (props:any) => {
	const {category} = props;
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
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
