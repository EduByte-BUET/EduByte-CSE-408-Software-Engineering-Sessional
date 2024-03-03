import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../api/GeneralAPI";

const LectureTemp = (props: any) => {
	const { course_id, block_id, lecture, index, handleLectureClick } = props;

	const [viewTik, setViewTik] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(
					`courses/blocks/lectures/isLectureViewed?course_id=${course_id}&block_id=${block_id}&lecture_id=${lecture?.lecture_id}`
				);
				if (res.data) {
					setViewTik(true);
				} else {
					setViewTik(false);
				}
			} catch (err: any) {
				console.log("Yet to view");
			}
		};

		fetchData();
	});

	return (
		<div
			key={lecture?.lecture_id}
			className="row-border mt-2 rounded hover-effect p-3 text-start"
			onClick={handleLectureClick.bind(
				this,
				index + 1,
				lecture?.lecture_id,
				lecture?.title
			)}
			style={{ cursor: "pointer" }}
		>
			<h5>
				<i className="fa-sharp fa-regular fa-circle-right"></i> &nbsp;
				<b>Lecture {index + 1}</b>
			</h5>
			<h5>{lecture?.title}</h5>
			{viewTik && (
				<div className="d-flex justify-content-end">
					<i className="fa-solid fa-circle-check fa-xl"></i>
				</div>
			)}
		</div>
	);
};

export default LectureTemp;
