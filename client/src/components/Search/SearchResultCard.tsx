import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css";

const SearchResultCard = (props: any) => {
	const navigate = useNavigate();

	const courses = props.courses;

	return (
		<div className="container">
			<div className=" justify-content-between align-items-center py-3"></div>

			<div
				className="courses-container"
				style={{ height: "100vh", overflowY: "auto" }}
			>
				<div className="courses-list">
					{courses.length === 0 && (
						<h1 style={{ opacity: 0.5 }}>Welcome Newbie</h1>
					)}
					{courses.length !== 0 &&
						courses.map((course) => (
							<div className="card card-dash mb-3 shadow-sm" key={course.id}>
                                <div className="row">
                                    <div className="col-md-10">
                                        
                                    </div>
                                </div>
								<img
									src={course.thumbnail_url}
									className="card-img-top"
									alt="..."
								/>
								<div className="card-body-dash">
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
											{course.description}
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
										<button
											onClick={() =>
												navigate("/courses/detail", {
													state: {
														course_id: course.course_id,
														course_title: course.course_title,
													},
												})
											}
											className="btn blue-button mt-80"
											style={{ padding: "0.75rem 2rem" }}
										>
											Details
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default SearchResultCard;
