import React, { useState } from "react";
import CourseViewSections from "./CourseViewSections";

const CategoryItem = (props: any) => {
	const { category } = props;
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div key={category.category_id} className="category-item rounded mb-3">
			<div
				className="d-flex justify-content-between category-header"
				onClick={handleExpandClick}
			>
				<h5>
					<i className="fa-solid fa-list"></i> &nbsp;{category.name}
				</h5>

				{!isExpanded && <i className="fa-solid fa-angles-down"></i>}
				{isExpanded && <i className="fa-solid fa-angles-up"></i>}
			</div>
			<div>
				{isExpanded && (
					<CourseViewSections title="" courses={category.courses} />
				)}
			</div>
		</div>
	);
};

export default CategoryItem;
