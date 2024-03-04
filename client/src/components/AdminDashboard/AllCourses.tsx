import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ConfirmDeletionModal from "./ConfirmDeletionModal";
import Popup from "../Popup";
import api from "../../api/GeneralAPI";

const AllCourses = () => {
	const [authFailed, setAuthFailed] = useState<boolean>(false);
	const navigate = useNavigate();

	const [coursesData, setCoursesData] = useState<any>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [courseRemoved, setCourseRemoved] = useState<boolean>(false);
	const [courseToRemove, setCourseToRemove] = useState<any>(null);

	useEffect(() => {
		const handleCourses = async () => {
			try {
				const res = await api.get("/dashboard/admin/courses");

				setCoursesData(res.data.coursesData);
			} catch (err: any) {
				if (err.response.status === 401) {
					setAuthFailed(true);
				}
				console.log(err);
			}
		};

		handleCourses();
	}, []);

	const handleCourseDetails = (course: any) => {
		navigate("/courses/detail", {
			state: {
				course_id: course.course_id,
				course_title: course.course_title,
			},
		});
	};

	const handleRemoveCourse = async (course) => {
		setCourseToRemove(course);
		setShowModal(true);
	};

	const confirmRemoveCourse = async () => {
		console.log("Confirm remove course");
		try {
			let res = await api.delete(
				`/dashboard/admin/remove_course?course_id=${courseToRemove.course_id}`
			);
			setCourseRemoved(true);
			// Refresh course list after removal
			res = await api.get("/dashboard/admin/courses");
			setCoursesData(res.data.coursesData);
		} catch (err: any) {
			if (err.response.status === 401) {
				setAuthFailed(true);
			}
			console.log(err);
		}
	};

	return (
		<div className="col-md-8 col-lg-9">
			<Container>
				<div className=" justify-content-between align-items-center py-3"></div>
				<div
					className="courses-container"
					style={{ height: "590px", overflowY: "auto" }}
				>
					<div className="container my-4">
						<div className="row row-cols-1 row-cols-md-3 g-4">
							{coursesData.map((course: any) => (
								<div className="col" key={course.course_id}>
									<div className="card admin-allcourses-card h-100 shadow">
										<img
											src={course.thumbnail_url}
											className="card-img-top admin-allcourses-img"
											alt={course.course_title}
										/>
										<div className="card-body d-flex flex-column">
											<h5
												className="card-title admin-allcourses-title"
												style={{ height: "48px" }}
											>
												{course.course_title}
											</h5>
											<p className="card-text admin-allcourses-text">
												{course.description}
											</p>
											<ul className="list-group list-group-flush text-start">
												<li className="list-group-item">{course.category}</li>
												<li className="list-group-item">
													Difficulty: {course.difficulty_level}
												</li>
												<li className="list-group-item">
													Enrolled: {course.total_enrolled}
												</li>
												<li className="list-group-item">
													Duration: {course.estimated_duration / 60} Hours
												</li>
											</ul>
										</div>
										<div className="d-flex justify-content-between p-2">
											<button
												className="btn blue-button mb-3"
												onClick={() => handleCourseDetails(course)}
											>
												Details
											</button>

											{/* <button
												className="btn red-button mb-3"
												onClick={() => handleRemoveCourse(course)}
											>
												Remove
											</button> */}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<ConfirmDeletionModal
					showModal={showModal}
					setShowModal={setShowModal}
					confirmRemoveCourse={confirmRemoveCourse}
				/>

				{courseRemoved && (
					<Popup
						description="Course removed successfully!"
						toggle={setCourseRemoved}
					/>
				)}

				{authFailed && (
					<Popup
						description="Authentication failed. Please login."
						toggle={setAuthFailed}
					/>
				)}

				<div className="mt-auto bottom-links ">
					<button className="btn blue-button">
						<Link
							to="/admin/dashboard/review_requests"
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							Review Course Requests <i className="bi bi-arrow-right"></i>
						</Link>
					</button>
					<button className="btn blue-button">
						<Link
							to="/admin/dashboard/review_uploads"
							style={{ color: "inherit", textDecoration: "inherit" }}
						>
							Review Course Uploads <i className="bi bi-arrow-right"></i>
						</Link>
					</button>
				</div>
			</Container>
		</div>
	);
};

export default AllCourses;
