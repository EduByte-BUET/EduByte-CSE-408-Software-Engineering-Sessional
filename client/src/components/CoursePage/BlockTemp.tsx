import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/GeneralAPI";

const BlockTemp = (props: any) => {
	const { course_id, course_name, block_id, index, block_name, lectures } =
		props;
	const navigate = useNavigate();
	const handleBlockClick = () => {
		navigate(`/courses/lectures`, {
			state: {
				course_id: course_id,
				course_name: course_name,
				block_id: block_id,
				block_name: block_name,
				block_index: index,
			},
		});
	};

	const [viewTik, setViewTik] = useState(false);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(
					`courses/blocks/lecture_count?course_id=${course_id}&block_id=${block_id}`
				);
				const progress_lecture_count = res.data;
				const total_lecture_count = lectures.length;

				if (progress_lecture_count === total_lecture_count) {
					setViewTik(true);
				} else if (
					progress_lecture_count < total_lecture_count &&
					progress_lecture_count > 0
				) {
					setRunning(true);
				}
			} catch (err) {
				// The error would print due to some middleware of the fetch from axios, don't sweat it
				// console.log("Yet to complete");
			}
		};

		fetchData();
	}, []);

	return (
		<div
			className="row-border mt-2 rounded hover-effect p-3 text-start"
			onClick={handleBlockClick}
			style={{ cursor: "pointer" }}
		>
			<h5>
				<i className="fa-brands fa-codepen"></i> &nbsp; <b>Block {index}</b>
			</h5>
			<h5>
				{block_name}
				{viewTik && (
					<div className="d-flex justify-content-end">
						<i className="fa-solid fa-circle-check fa-xl"></i>
					</div>
				)}
				{running && (
					<div className="d-flex justify-content-end">
						<i className="fa-solid fa-person-running fa-beat-fade fa-xl"></i>
					</div>
				)}
			</h5>
		</div>
	);
};

export default BlockTemp;
