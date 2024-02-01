import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";

type Lesson = {
	lesson_id: number;
	lesson_type: string;
	lesson_title: string;
	lesson_content: string;
	file_url: string;
};

type Lecture = {
	lecture_id: number;
	lecture_title: string;
	author: string;
	description: string;
	serial: number;
	view_count: number;
	difficulty: string;
	duration: string;
	creation_time: string;
	lessons: Lesson[];
};

type ApiResponse = {
	status: string;
	message: string;
	lecture: Lecture;
};
interface LessonProps {
	courseData: { course_id: number; courseName: string } | null;
	blockData: { block_id: number; blockName: string } | null;
	lectureData: { lecture_id: number; lecture_title: string } | null;
}

const Lesson: React.FC<LessonProps> = ({
	courseData,
	blockData,
	lectureData,
}) => {
	const [data, setData] = useState<ApiResponse | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!courseData || !blockData || !lectureData) return;
			const result = await axios.get(
				`http://localhost:3000/courses/blocks/lectures?course_id=${courseData.course_id}&block_id=${blockData.block_id}&lecture_id=${lectureData.lecture_id}`
			);
			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, [courseData, blockData, lectureData]);

	if (!data) {
		return <div>Loading...</div>;
	}

	const handleMarkasComplete = async (e: any, lesson_id: number) => {
		e.preventDefault();
		try {
			await axios.post(`http://localhost:3000/courses/marked?course_id=${courseData?.course_id}&lesson_id=${lesson_id}`);
			alert("Marked as complete");
		} catch (err) {
			console.log(lesson_id);
			alert("Already marked as complete")
			console.log(err);
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col-3 m-2">
					<div className="text-start mt-3">
						<h3>{courseData?.courseName}</h3>
						<p>
							<b>
								| Block {blockData?.block_id}|Lecture {lectureData?.lecture_id}
							</b>
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lecture.lessons.map((lesson, index) => (
							<div
								key={lesson.lesson_id}
								className="row-border mt-2 rounded hover-effect p-3 text-start"
								// onClick={() => {
								// 	window.location.hash = `${index + 1}`;
								// }}
								style={{ cursor: "pointer" }}
							>
								<h5>Lesson {index + 1}</h5>
								<h5>{lesson.lesson_title}</h5>
								<button
									type="button"
									className="btn blue-button w-100"
									onClick={(e) => { handleMarkasComplete(e, lesson.lesson_id); }}
								>
									Mark as Completed
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="col-8 m-2" style={{ overflowY: "auto" }}>
					<div className="text-start mt-3">
						<p>
							<i className="bi bi-house"></i>.{courseData?.courseName}.
							{blockData?.blockName}
						</p>
						<p>
							<b>
								Lecture {lectureData?.lecture_id}|{lectureData?.lecture_title}
							</b>
							<br />
							{data.lecture.description}
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lecture.lessons.map((lesson, index) => {
							if (lesson.lesson_type === "pdf") {
								return (
									<div
										key={lesson.lesson_id}
										className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
										id={`${index + 1}`}
									>
										<p>
											Lesson {index + 1}|{lesson.lesson_title}
										</p>
										<PdfViewer
											key={lesson.lesson_id}
											pdf_content={lesson.lesson_content}
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
											Lesson {index + 1}|{lesson.lesson_title}
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
