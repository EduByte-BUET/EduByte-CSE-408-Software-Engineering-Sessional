import React, { useEffect, useState } from "react";
import "../../css/CoursePage/courseUpload.css";
import "../../css/Button.css";
import api from "../../api/GeneralAPI";

interface Course {
	course_id: number;
	course_title: string;
}
interface Block {
	block_id: number;
	title: string;
}
interface Lecture {
	lecture_id: number;
	title: string;
}
interface Lesson {
	lesson_id: number;
	title: string;
}

export default function CourseUpload() {
	const [courses, setCourses] = useState<Course[]>([
		{
			course_id: 0,
			course_title: "Create New",
		},
	]);
	const [blocks, setBlocks] = useState<Block[]>([
		{
			block_id: 0,
			title: "Create New",
		},
	]);
	const [lectures, setLectures] = useState<Lecture[]>([
		{
			lecture_id: 0,
			title: "Create New",
		},
	]);
	const [lessons, setLessons] = useState<Lesson[]>([
		{
			lesson_id: 0,
			title: "Create New",
		},
	]);

	const [selectedCourse, setSelectedCourse] = useState("");
	const [courseDescription, setCourseDescription] = useState("");

	const [selectedBlock, setSelectedBlock] = useState("");
	const [blockDescription, setBlockDescription] = useState("");

	const [selectedLecture, setSelectedLecture] = useState("");
	const [lectureDescription, setLectureDescription] = useState("");

	const [selectedLesson, setSelectedLesson] = useState("");
	const [lessonDescription, setLessonDescription] = useState("");

	const [templateFile, setTemplateFile] = useState<File | null>(null);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	// Fetch courses
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await api.get("/content-create/upload/view-all-courses");
				setCourses(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await api.get(
					`/content-create/upload/view-all-blocks?course_id${selectedCourse}`
				);
				setBlocks(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [selectedCourse]);

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	return (
		<div className="container">
			<h2
				style={{
					marginTop: "20px",
					marginBottom: "20px",
					textAlign: "left",
					color: "crimson",
					fontWeight: "bold",
					borderBottom: "2px solid black",
					paddingBottom: "10px",
				}}
			>
				Course Management
			</h2>
			<div className="row">
				{/* Select Course and Description in left column */}
				<div className="col-md-6">
					{/* course selction */}
					<div className="row" style={{ marginBottom: "10px" }}>
						{/* Label */}
						<div className="col-md-4">
							<label htmlFor="courseSelect" className="form-label">
								Select Course
							</label>
						</div>
						{/* Dropdown */}
						<div className="col-md-8">
							<select
								id="courseSelect"
								className="form-control"
								value={selectedCourse}
								onChange={(e) => setSelectedCourse(e.target.value)}
							>
								{/* Only show this option when no course is selected */}
								{selectedCourse === "" && (
									<option value="" disabled hidden>
										Select a course
									</option>
								)}

								{courses.map((course, index) => (
									<option key={course.course_id} value={course.course_id}>
										{index + 1} | {course.course_title}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="row" style={{ marginBottom: "10px" }}>
						{/* Description */}

						<div className="col-md-4">
							<label htmlFor="courseDescription" className="form-label">
								Description
							</label>
						</div>
						<div className="col-md-8">
							<textarea
								id="courseDescription"
								className="form-control"
								placeholder="Enter course description here..."
								value={courseDescription}
								onChange={(e) => setCourseDescription(e.target.value)}
								rows={2}
							/>
						</div>
					</div>

					{/* Block Selection */}

					<div>
						<div className="row" style={{ marginBottom: "10px" }}>
							{/* Label */}
							<div className="col-md-4">
								<label htmlFor="blockSelect" className="form-label">
									Select Block
								</label>
							</div>
							{/* Dropdown */}
							<div className="col-md-8">
								<select
									id="blockSelect"
									className="form-control  custom-select"
									value={selectedBlock}
									onChange={(e) => setSelectedBlock(e.target.value)}
								>
									{/* Only show this option when no course is selected */}
									{selectedBlock === "" && (
										<option value="" disabled hidden>
											Select a Block
										</option>
									)}

									{blocks.map((block, index) => (
										<option key={block.block_id} value={block.block_id}>
											{index} | {block.title}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="row" style={{ marginBottom: "20px" }}>
							{/*  Description */}

							<div className="col-md-4">
								<label htmlFor="blockDescription" className="form-label">
									Description
								</label>
							</div>
							<div className="col-md-8">
								<textarea
									id="blockDescription"
									className="form-control"
									placeholder="Enter block description here..."
									value={blockDescription}
									onChange={(e) => setBlockDescription(e.target.value)}
									rows={2}
								/>
							</div>
						</div>
					</div>

					{/* Lecture Selection */}

					<div style={{ marginBottom: "10px" }}>
						<div className="row" style={{ marginBottom: "10px" }}>
							{/* Label */}
							<div className="col-md-4">
								<label htmlFor="lectureSelect" className="form-label">
									Select Lecture
								</label>
							</div>
							{/* Dropdown */}
							<div className="col-md-8">
								<select
									id="lectureSelect"
									className="form-control  custom-select"
									value={selectedLecture}
									onChange={(e) => setSelectedLecture(e.target.value)}
								>
									{/* Only show this option when no course is selected */}
									{selectedLecture === "" && (
										<option value="" disabled hidden>
											Select a Lecture
										</option>
									)}

									{lectures.map((lecture, index) => (
										<option key={lecture.lecture_id} value={lecture.lecture_id}>
											{index} | {lecture.title}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="row" style={{ marginBottom: "10px" }}>
							{/*  Description */}

							<div className="col-md-4">
								<label htmlFor="lectureDescription" className="form-label">
									Description
								</label>
							</div>
							<div className="col-md-8">
								<textarea
									id="lectureDescription"
									className="form-control"
									placeholder="Enter lecture description here..."
									value={lectureDescription}
									onChange={(e) => setLectureDescription(e.target.value)}
									rows={2}
								/>
							</div>
						</div>
					</div>

					{/* Lesson Selection */}

					<div style={{ marginBottom: "10px" }}>
						<div className="row" style={{ marginBottom: "10px" }}>
							{/* Label */}
							<div className="col-md-4">
								<label htmlFor="lessonSelect" className="form-label">
									Select Lesson
								</label>
							</div>
							{/* Dropdown */}
							<div className="col-md-8">
								<select
									id="lessonSelect"
									className="form-control  custom-select"
									value={selectedLesson}
									onChange={(e) => setSelectedLesson(e.target.value)}
								>
									{/* Only show this option when no course is selected */}
									{selectedLesson === "" && (
										<option value="" disabled hidden>
											Select a Lesson
										</option>
									)}

									{lessons.map((lesson, index) => (
										<option key={lesson.lesson_id} value={lesson.lesson_id}>
											{index} | {lesson.title}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="row" style={{ marginBottom: "10px" }}>
							{/*  Description */}

							<div className="col-md-4">
								<label htmlFor="lessonDescription" className="form-label">
									Description
								</label>
							</div>
							<div className="col-md-8">
								<textarea
									id="lessonDescription"
									className="form-control"
									placeholder="Enter lesson description here..."
									value={lessonDescription}
									onChange={(e) => setLessonDescription(e.target.value)}
									rows={2}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column: Template Upload */}
				<div className="col-md-6">
					<div className="row" style={{ marginBottom: "20px" }}>
						<div className="col-md-4">
							<label htmlFor="templateUpload" className="form-label">
								Template
							</label>
						</div>
						<div className="col-md-8">
							<input
								type="file"
								id="templateUpload"
								className="form-control"
								onChange={(event: any) =>
									setTemplateFile(event.target.files[0])
								}
							/>
						</div>
					</div>
					<div className="row" style={{ marginBottom: "20px" }}>
						<div className="col-md-4">
							<label htmlFor="videoUpload" className="form-label">
								Video Lecture
							</label>
						</div>
						<div className="col-md-8">
							<input
								type="file"
								id="videoUpload"
								className="form-control"
								onChange={(event: any) => setVideoFile(event.target.files[0])}
							/>
						</div>
					</div>
					<div className="row" style={{ marginBottom: "20px" }}>
						<div className="col-md-4">
							<label htmlFor="pdfeUpload" className="form-label">
								PDF Lecture
							</label>
						</div>
						<div className="col-md-8">
							<input
								type="file"
								id="pdfUpload"
								className="form-control"
								onChange={(event: any) => setPdfFile(event.target.files[0])}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="form-group">
				<button
					type="button"
					className="btn blue-button float-right btn-upward"
					onClick={handleSubmit}
				>
					Submit for Reviewing
				</button>
			</div>
		</div>
	);
}
