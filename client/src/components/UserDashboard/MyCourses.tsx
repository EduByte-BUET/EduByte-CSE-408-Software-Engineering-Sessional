import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/GeneralAPI";
import Popup from "./ConfirmUnregisterModal";
// Dummy data for courses
// let courses = [
//   {
//     course_id: 1,
//     course_title: "Data Structures and Algorithms",
//     lessons_completed: 12,
//     total_lessons: 30,
//   },
// ];

const MyCourses = (props: any) => {
	const navigate = useNavigate();
	const [courses, setcourses] = useState<any>([]);
	const [showModal, setShowModal] = useState(false);
	const [courseToDelete, setCourseToDelete] = useState(0);

	const getMyCourses = async () => {
		try {
			const res = await api.get("/dashboard/user/courses");
			setcourses(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMyCourses();
	}, []);

	const unregister = async () => {
		try {
			const res = await api.delete(
				`/dashboard/user/courses?course_id=${courseToDelete}`
			);
			console.log(res.data);

			await getMyCourses();
			setShowModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="col-md-8 col-lg-9">
			<div className="container">
				{showModal && (
					<Popup
						showModal={showModal}
						setShowModal={setShowModal}
						confirmRemoveCourse={unregister}
					/>
				)}

				<div className=" justify-content-between align-items-center py-3"></div>

				<div
					className="courses-container"
					style={{ height: "580px", overflowY: "auto" }}
				>
					<div className="courses-list">
						{courses.length === 0 && (
							<h1 style={{ opacity: 0.5 }}>Welcome Newbie</h1>
						)}
						{courses.length !== 0 &&
							courses.map((course) => (
								<div className="card card-dash mb-3 shadow-sm" key={course.id}>
									<img
										src={course.thumbnail_url}
										className="card-img-top"
										alt="..."
									/>
									<div className="card-body card-body-dash">
										<div>
											<h5 className="card-dash-title">{course.course_title}</h5>
											<p
												style={{
													color: "black",
													fontWeight: "lighter",
													fontSize: "0.9rem",
													textAlign: "justify",
													width: "80%",
												}}
											>
												{course.course_description}
											</p>
											<div className="row p-0 m-0">
												<div className="col-md-4">
													<p>
														<b>Difficulty Level</b> <br />{" "}
														{course.difficulty_level}
													</p>
												</div>
												<div className="col-md-4">
													<p>
														<b>Estimated Duration</b> <br />{" "}
														{course.estimated_duration}
													</p>
												</div>
												<div className="col-md-4">
													<p>
														<b>Category</b> <br /> {course.category}
													</p>
												</div>
											</div>
										</div>

										<div className="text-part">
											<p className="card-dash-text">
												Lessons completed: {course.lessons_completed}/
												{course.total_lessons}
											</p>
											{/* <p className="card-text">
												Tests completed: {course.testsCompleted}/
												{course.totalTests}
												</p>
												<p className="card-text">
												Average score: {course.averageScore}%
												</p> */}
											<div
												className="progress mb-4"
												role="progressbar"
												aria-label="Example with label"
												aria-valuenow={25}
												aria-valuemin={0}
												aria-valuemax={100}
											>
												<div
													className="progress-bar"
													style={{
														width:
															(course.lessons_completed /
																course.total_lessons) *
																100 +
															"%",
													}}
												>
													{(
														(course.lessons_completed / course.total_lessons) *
														100
													).toFixed(2)}{" "}
													%
												</div>
											</div>

											<button
												onClick={() =>
													navigate("/courses/detail", {
														state: {
															course_id: course.course_id,
															course_title: course.course_title,
														},
													})
												}
												className="btn blue-button"
												style={{ padding: "0.75rem 2rem" }}
											>
												Details
											</button>
											<button
												onClick={() => {
													setShowModal(true);
													setCourseToDelete(course.course_id);
												}}
												className="btn red-button mt-2"
												style={{ padding: "0.75rem 2rem" }}
											>
												Unregister
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

				<div className="mt-auto bottom-links ">
					<button
						className="btn green-button"
						onClick={() => navigate("/courses")}
					>
						Add Course <i className="bi bi-arrow-right"></i>
					</button>
					{/* <button className="btn green-button">
						<Link
							to="/reqCourse"
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							Request Course <i className="bi bi-arrow-right"></i>
						</Link>
					</button> */}
				</div>

			</div>
		</div>
	);
};

export default MyCourses;
