import React, { useState, useEffect } from "react";
import "../../css/popularcourses.css";
import newImage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";
import { useNavigate } from "react-router-dom";

interface PopularCoursesProps {
	course_id: number;
	course_title: string;
	thumbnail_url: string;
	difficulty_level: string;
	category: string;
	total_enrolled: number;
	total_lessons: number;
}

export default function PopularCourses() {
	let popularCourses: PopularCoursesProps[]; // Default value
	const [itemChunks, setItemChunks] = useState<any>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		const chunkData = (data: any) => {
			const chunkSize = 3;
			const chunks = [] as any;

			for (let i = 0; i < data.length; i += chunkSize) {
				chunks.push(data.slice(i, i + chunkSize));
			}

			setItemChunks(chunks);
		};

		const fetchPopularCourses = async () => {
			try {
				const response = await api.get("/courses/popular");
				popularCourses = response.data;

				chunkData(popularCourses);
			} catch (err) {
				console.error(err);
			}
		};

		fetchPopularCourses();
	}, []);

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % itemChunks.length);
	};

	const handlePrev = () => {
		setActiveIndex(
			(prevIndex) => (prevIndex - 1 + itemChunks.length) % itemChunks.length
		);
	};

	const handleCourseselection = (event: any) => {
		const course_id = event.target.value;
		navigate(`/courses?course_id=${course_id}`);
	};

	return (
		<>
			<section id="courses" className="course-area pt-100">
				<div className="container">
					<div className="row">
						<div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
							<div className="section-title text-center">
								<h2 className="mb-15 wow fadeInUp" data-wow-delay=".2s">
									Popular Courses
								</h2>
								{/* Say something about edubytes popular courses */}
								<p className="wow fadeInUp" data-wow-delay=".4s">
									Get along with the latest and trending topics in the field of
									Computer Science.
								</p>
							</div>
						</div>
					</div>
					<div
						id="carouselExample"
						className="carousel slide"
						data-ride="carousel"
						style={{ cursor: "pointer" }}
					>
						<div className="carousel-inner" style={{ padding: "40px" }}>
							{itemChunks.map((chunk: PopularCoursesProps[], index: number) => (
								<div
									key={index}
									className={`carousel-item ${
										index === activeIndex ? "active" : ""
									}`}
								>
									<div className="row justify-content-center">
										{chunk.map((item) => (
											<div key={item.course_id} className="col-md-3">
												<div className=" card cardi card-hover ">
													{/* <a href="../course-single.html">*/}
													<img
														src={item.thumbnail_url}
														alt=""
														className="card-img-top card-img-topi"
													/>
													<div className=" card-body card-bodyi ">
														<div className="d-flex justify-content-between align-items-center mb-3">
															<span
																className="badge bg-info-soft"
																style={{ backgroundColor: "#17a2b8" }}
															>
																{item.difficulty_level}
															</span>
															<a href="#" className=" fs-5">
																<i className="fe fe-heart align-middle"></i>
															</a>
														</div>
														<h4 className="mb-2 text-truncate-line-2 ">
															<a
																href="../course-single.html"
																className="text-inherit"
																style={{
																	textDecoration: "none",
																	fontSize: "large",
																}}
															>
																{item.course_title}
															</a>
														</h4>
														<div style={{ marginTop: "8px" }}>
															<div style={{ fontSize: "14px", color: "#333" }}>
																Total Enrolled: {item.total_enrolled}
															</div>
															<div style={{ fontSize: "14px", color: "#555" }}>
																Total Lessons: {item.total_lessons}
															</div>
														</div>
													</div>
													{/* <!-- Card Footer --> */}
													<div className="card-footer">
														<div className="row align-items-center g-0">
															<div className="col-auto">
																<button
																	className="btn blue-button"
																	value={item.course_id}
																	onClick={handleCourseselection}
																>
																	Details
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
						</div>

						<a
							className="carousel-control-prev"
							role="button"
							onClick={handlePrev}
						>
							<span
								className="carousel-control-prev-icon"
								aria-hidden="false"
							></span>
						</a>
						<a
							className="carousel-control-next"
							role="button"
							onClick={handleNext}
						>
							<span
								className="carousel-control-next-icon"
								aria-hidden="false"
							></span>
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
