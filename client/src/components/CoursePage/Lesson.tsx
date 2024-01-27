import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";

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
	content: string;
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
			const result = await axios.get(
				"http://localhost:3000/courses/blocks/lectures?course_id=1&block_id=101&lecture_id=1001"
			);
			setData(result.data);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

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
						{data.lecture.lessons.map((lesson) => (
							<div
								key={lesson.lesson_id}
								className="row-border mt-2 rounded hover-effect p-3 text-start"
							>
								<h5>Lesson {lesson.lesson_id}</h5>
								<h5>{lesson.lesson_title}</h5>
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
							{data.lecture.content}
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{data.lecture.lessons.map((lesson) => {
							if (lesson.lesson_type === "pdf") {
								return (
									<div
										key={lesson.lesson_id}
										className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
									>
										<p>
											Lesson {lesson.lesson_id}|{lesson.lesson_title}
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
									>
										<p>
											{lesson.lesson_id}|{lesson.lesson_title}
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
