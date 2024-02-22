import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../css/dashboard.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AllCourses = (props: any) => {
	const { coursesData } = props;
	const navigate = useNavigate();

	const handleClick = (course: any) => {
		navigate("/courses/detail", {
			state: {
				course_id: course.course_id,
				course_title: course.course_title,
			},
		});
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
												{/* Fixed height for title */}
												{course.course_title}
											</h5>
											<p className="card-text admin-allcourses-text">
												{/* Fixed height and scroll for description */}
												{course.description}
											</p>
											<ul className="list-group list-group-flush ">
												{/* Pushed to bottom with mt-auto */}
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
										<div className="">
											<button
												className="btn blue-button mb-3"
												onClick={() => handleClick(course)}
											>
												<Link
													to="#"
													style={{
														color: "inherit",
														textDecoration: "inherit",
													}}
												>
													Detail <i className=""></i>
												</Link>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

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
