import React, { useEffect, useState } from "react";
import api from "../../api/GeneralAPI";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import { useLocation, useNavigate } from "react-router-dom";

const Lesson = () => {
	const location = useLocation();
	const {
		course_id,
		course_name,
		block_id,
		block_name,
		block_index,
		lecture_index,
		lecture_id,
		lecture_title,
	} = location.state;
	const [data, setData] = useState<any>(null);
	const navigate = useNavigate(); // Move useNavigate outside the component

	useEffect(() => {
		const fetchData = async () => {
			const result = await api.get(
				`courses/blocks/lectures/lessons?course_id=${course_id}&block_id=${block_id}&lecture_id=${lecture_id}`
			);
			setData(result.data);
		};

		fetchData();
	}, [course_id, block_id, lecture_id]);

	const handleBlockClick = () => {
		navigate(`/courses/lectures`, {
			state: {
				course_id: course_id,
				course_name: course_name,
				block_id: block_id,
				block_name: block_name,
				block_index: block_index,
			},
		});
	};

	if (!data) {
		return <div>Loading...</div>;
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4">
					<div className="text-start mt-3">
						<h3>{course_name}</h3>
						<div
							onClick={handleBlockClick}
							style={{
								cursor: "pointer",
								color: "blue",
								textDecoration: "underline",
							}}
							className="mb-3 mt-3"
						>
							<i className="fa-solid fa-link"></i> Block {block_index}
							&nbsp; {block_name}
						</div>
						<div className="mb-3">
							<i className="fa-solid fa-play"></i> Lecture {lecture_index}
							&nbsp; <i className="fa-solid fa-arrow-right"></i> &nbsp;{" "}
							{lecture_title}
							<br />
						</div>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lessons.map((lesson: any, index: any) => (
							<div
								key={lesson.lesson_id}
								className="row-border mt-2 rounded hover-effect p-3 text-start"
								style={{ cursor: "pointer" }}
								onClick={() => {
									const element = document.getElementById(`${index + 1}`);
									if (element) {
										element.scrollIntoView({ behavior: "smooth" });
									}
								}}
							>
								<h5>
									<i className="fa-regular fa-circle-play"></i> &nbsp;
									{lesson.title}
								</h5>
							</div>
						))}
					</div>
				</div>
				<div
					className="col-md-8 mt-3 text-start"
					style={{ overflow: "scroll", height: "90vh" }}
				>
					<i className="fas fa-home mb-3"></i> &nbsp; {course_name} &nbsp;
					<i className="fa-solid fa-arrow-right"></i> &nbsp; {block_name} &nbsp;
					<i className="fa-solid fa-arrow-right"></i> &nbsp; {lecture_title}
					<br />
					<b>
						<i className="fa-solid fa-play"></i> &nbsp; Lecture &nbsp;
						{lecture_index} &nbsp; | &nbsp; {data.title}
					</b>
					<br />
					{data.description}
					{data.lessons.map((lesson: any, index: number) => {
						if (lesson.lesson_type === "pdf") {
							return (
								<div
									key={lesson.lesson_id}
									id={`${index + 1}`}
									className="block-effect mt-4"
								>
									<h4>
										Lesson {index + 1} &nbsp; | &nbsp; {lesson.title}
									</h4>
									<p>{lesson.description}</p>
									<PdfViewer file_url={lesson.file_url} />
								</div>
							);
						} else if (lesson.lesson_type === "video") {
							return (
								<div
									key={lesson.lesson_id}
									className="block-effect mt-4"
									id={`${index + 1}`}
								>
									<h4>
										Lesson {index + 1} &nbsp; | &nbsp; {lesson.title}
									</h4>
									<p>{lesson.description}</p>
									<VideoPlayer videoUrl={lesson.file_url} />
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		</div>
	);
};

export default Lesson;
