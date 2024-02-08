import React, { useEffect, useState } from "react";
import api from "../../api/GeneralAPI";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import { useLocation, useNavigate } from "react-router-dom";

const Lesson = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		course_id,
		course_name,
		block_id,
		block_name,
		block_index,
		lecture_index,
		lecture_id,
		lecture_title,
		lectureSize,
	} = location.state;
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const result = await api.get(
				`courses/blocks/lectures/lessons?course_id=${course_id}&block_id=${block_id}&lecture_id=${lecture_id}`
			);
			setData(result.data);
			//console.log(result.data);
		};

		fetchData();
	}, [course_id, block_id, lecture_id]);

	if (!data) {
		return <div>Loading...</div>;
	}
	const handleNextClick = async () => {
		const nextLectureIndex = lecture_index + 1;
		const nextLectureId = lecture_id + 1;

		// Check if the current lecture is the last one
		if (nextLectureIndex > lectureSize) {
			// Navigate to the other page
			try {
				const res = await api.get(
					`courses/blocks/lectures?course_id=${course_id}&block_id=${
						block_id + 1
					}`
				);

				if (res.data) {
					navigate(`/courses/lectures`, {
						state: {
							course_id,
							course_name,
							block_id: block_id + 1,
							block_name: res.data.title,
							block_index: block_index + 1,
						},
					});
				} else {
					alert("This is the last Block");
				}
			} catch (err) {
				console.error(err);
				alert("An error occurred while fetching the next block");
			}
		} else {
			navigate(`/courses/lectures/info`, {
				state: {
					course_id: course_id,
					course_name: course_name,
					block_id: block_id,
					block_name: block_name,
					block_index: block_index,
					lecture_index: nextLectureIndex,
					lecture_id: nextLectureId,
					lecture_title: lecture_title,
					lectureSize: lectureSize,
				},
			});
		}
	};

	const handleMarkasComplete = async (e: any, lesson_id: number) => {
		e.preventDefault();
		try {
			await api.get(
				`courses/marked?course_id=${course_id}&block_id=${block_id}&lecture_id=${lecture_id}&lesson_id=${lesson_id}`
			);
			alert("Marked as complete");
		} catch (err) {
			alert("Already marked as complete");
			console.log(err);
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col-3 m-2">
					<div className="text-start mt-3">
						<h3>{course_name}</h3>
						<p>
							<b>
								| Block {block_index}|Lecture {lecture_index}
							</b>
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lessons.map((lesson: any, index: any) => (
							<div
								key={lesson.lesson_id}
								className="row-border mt-2 rounded hover-effect p-3 text-start"
								// onClick={() => {
								// 	window.location.hash = `${index + 1}`;
								// }}
								style={{ cursor: "pointer" }}
							>
								<h5>Lesson {index + 1}</h5>
								<h5>{lesson.title}</h5>
								<button
									type="button"
									className="btn blue-button w-100"
									onClick={(e) => {
										handleMarkasComplete(e, lesson.lesson_id);
									}}
								>
									Mark as Completed
								</button>
							</div>
						))}
						<button
							type="button"
							className="btn blue-button w-100 mt-3"
							onClick={handleNextClick}
						>
							Next <i className="fas fa-arrow-right"></i>
						</button>
					</div>
				</div>
				<div className="col-8 m-2" style={{ overflowY: "auto" }}>
					<div className="text-start mt-3">
						<p>
							<i className="fas fa-home"></i>.{course_name}.{block_name}
						</p>
						<p>
							<b>
								Lecture {lecture_index}|{data.title}
							</b>
							<br />
							{data.description}
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lessons.map((lesson: any, index: number) => {
							if (lesson.lesson_type === "pdf") {
								return (
									<div
										key={lesson.lesson_id}
										className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
										id={`${index + 1}`}
									>
										<p>
											Lesson {index + 1}|{lesson.title}
										</p>
										<PdfViewer
											key={lesson.lesson_id}
											pdf_content={lesson.description}
											file_url={lesson.file_url}
										/>
									</div>
								);
							} else if (lesson.lesson_type === "video") {
								return (
									<div
										key={lesson.lesson_id}
										className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
										id={`${index + 1}`}
									>
										<p>
											Lesson {index + 1}|{lesson.title}
										</p>
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
		</div>
	);
};
export default Lesson;
