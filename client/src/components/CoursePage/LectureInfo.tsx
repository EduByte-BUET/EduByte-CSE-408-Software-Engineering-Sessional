import React, { FC, useEffect, useState } from "react";
import api from "../../api/GeneralAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LectureTemp from "./LectureTemp";

const LectureInfo = () => {
	const location = useLocation();
	const { course_id, course_name, block_id, block_name, block_index } =
		location.state;
	const [lectureInfo, setLectureInfo] = useState<any>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const res = await api.get(
				`courses/blocks/lectures?course_id=${course_id}&block_id=${block_id}`
			);
			setLectureInfo(res.data);
		};

		fetchData();
	}, [course_id, block_id]);

	if (!lectureInfo) {
		return <Spinner />;
	}

	const handleLectureClick = (
		index: number,
		lecture_id: number,
		lecture_title: string
	) => {
		navigate(`/courses/lectures/info`, {
			state: {
				course_id: course_id,
				course_name: course_name,
				block_id: block_id,
				block_name: block_name,
				block_index: block_index,
				lecture_index: index,
				lecture_id: lecture_id,
				lecture_title: lecture_title,
			},
		});
	};
	const navigateToBlocks = () => {
		navigate(`/courses/blocks`, {
			state: {
				course_id: course_id,
				course_title: course_name,
			},
		});
	};

	const handleBackToCourse = () => {
		navigate(`/courses/detail`, {
			state: {
				course_id: course_id,
				course_name: course_name,
			},
		});
	};

	if (!lectureInfo) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col-5 m-2">
					<div className="text-start mt-3">
						<h3>{course_name}</h3>
						<div
							onClick={navigateToBlocks}
							style={{
								cursor: "pointer",
								color: "blue",
								textDecoration: "underline",
							}}
							className="mb-3 mt-3"
						>
							<button className="btn bordered-button">
								<i className="fa-solid fa-circle-chevron-left"></i> &nbsp; Back
								to Block List
							</button>
						</div>
					</div>
					<div style={{ overflowY: "auto" }}>
						{lectureInfo.lectures.map((lecture: any, index: any) => (
							// Use the lecture id as the key
							<LectureTemp
								key={lecture.lecture_id}
								course_id={course_id}
								block_id={block_id}
								lecture={lecture}
								index={index}
								handleLectureClick={handleLectureClick}
							/>
						))}
					</div>
				</div>
				<div className="col-6 m-2" style={{ overflowY: "auto" }}>
					<div className="text-start mt-3">
						<p onClick={handleBackToCourse} style={{ cursor: "pointer" }}>
							<i className="fas fa-home"></i> &nbsp; {course_name} &nbsp;
							<i className="fa-solid fa-arrow-right"></i> &nbsp;
							{block_name}
						</p>
						<p>
							<b>
								Block {block_index} &nbsp; | &nbsp; {block_name}
							</b>
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{lectureInfo.lectures.map((lecture: any, index: any) => (
							<div
								key={lecture.lecture_id}
								className="row-border mt-2 rounded p-3 text-start block-effect"
								onClick={handleLectureClick.bind(
									this,
									index + 1,
									lecture.lecture_id,
									lecture.title
								)}
								style={{ cursor: "pointer" }}
							>
								<b>
									Lecture {index + 1} &nbsp; | &nbsp; {lecture.title}
								</b>
								<p>{lecture.description}</p>
								{lecture.lessons.map((lesson: any) =>
									lesson.lesson_type === "pdf" ? (
										<p key={lesson.lesson_id} className="hover-translate">
											<i className="fas fa-file-alt"></i> &nbsp; {lesson.title}
										</p>
									) : (
										<p key={lesson.lesson_id} className="hover-translate">
											<i className="fas fa-video"></i> &nbsp; {lesson.title}
										</p>
									)
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LectureInfo;
