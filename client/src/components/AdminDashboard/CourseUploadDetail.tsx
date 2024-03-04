import React from "react";
import "../../css/dashboard.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/GeneralAPI";
function CourseUploadDetail() {
	const navigate = useNavigate();

	const location = useLocation();
	const { course } = location.state || {};
	const displayValue = (value: any) => (value ? value : "Not Given");

	//   const courses = {
	//     pending_id: 1,
	//     creator_id: 101,
	//     course_id: 201,
	//     course_title: "Introduction to React",
	//     course_description:
	//       "Learn the basics of React, from components to state management.",
	//     block_id: 301,
	//     block_title: "React Basics",
	//     block_description: "Introduction to React components and JSX.",
	//     lecture_id: 401,
	//     lecture_title: "Understanding JSX",
	//     lecture_description:
	//       "Learn what JSX is and how to use it in React applications.",
	//     lesson_title: "JSX Deep Dive",
	//     lesson_description: "An in-depth look at JSX and its usage in React.",
	//     file_url: "https://example.com/intro-to-react.pdf",
	//   };
	// Function to handle acceptance of the course upload
	const handleAccept = async () => {
		console.log(`Accepted course ID: ${course.pending_id}`);
		if (course !== null) {
			try {
				// Assuming /courses/decline is your endpoint for declining a course
				await api.post("/dashboard/admin/review_upload/action", {
					pending_id: course.pending_id,
					message: "accept",
				});
				navigate("/admin/dashboard/");
				// Handle any post-declination logic here, like navigating or updating UI
			} catch (err) {
				console.error(err);
				alert("There was an error accepting the course. Please try again.");
			}
		}

		// Here you would typically make an API call to update the course status to 'Accepted'
	};

	// Function to handle deletion of the course upload
	const handleDelete = async () => {
		console.log(`Deleted course ID: ${course.pending_id}`);
		if (course !== null) {
			try {
				// Assuming /courses/decline is your endpoint for declining a course
				await api.post("/dashboard/admin/review_upload/action", {
					pending_id: course.pending_id,
					message: "delete",
				});
				navigate("/admin/dashboard/");

				// Handle any post-declination logic here, like navigating or updating UI
			} catch (err) {
				console.error(err);
				alert("There was an error declining the course. Please try again.");
			}
		}

		// Here you would typically make an API call to remove the course from pending uploads
	};

	return (
		<div className="col-md-8 col-lg-9">
			<div className="container" style={{ paddingTop: "0px" }}>
				<div className="container  review-requests">
					<h2 className="text-center mb-4">Course Upload Detail</h2>

					<table className="table">
						<tbody style={{ textAlign: "left" }}>
							{/* Pending and Creator Information */}
							<tr>
								<th>Pending ID</th>
								<td>{displayValue(course.pending_id)}</td>
							</tr>
							<tr>
								<th>Creator ID</th>
								<td>{displayValue(course.creator_id)}</td>
							</tr>

							{/* Spacer Row for visual separation */}
							<tr className="table-spacer">
								<td colSpan={2}></td>
							</tr>

							{/* Course Information */}
							<tr>
								<th>Course Title</th>
								<td>{displayValue(course.course_title)}</td>
							</tr>
							<tr>
								<th>Description</th>
								<td>{displayValue(course.course_description)}</td>
							</tr>

							{/* Spacer Row for visual separation */}
							<tr className="table-spacer">
								<td colSpan={2}></td>
							</tr>

							{/* Block Information */}
							<tr>
								<th>Block Title</th>
								<td>{displayValue(course.block_title)}</td>
							</tr>
							<tr>
								<th>Block Description</th>
								<td>{displayValue(course.block_description)}</td>
							</tr>

							{/* Spacer Row for visual separation */}
							<tr className="table-spacer">
								<td colSpan={2}></td>
							</tr>

							{/* Lecture Information */}
							<tr>
								<th>Lecture Title</th>
								<td>{displayValue(course.lecture_title)}</td>
							</tr>
							<tr>
								<th>Lecture Description</th>
								<td>{displayValue(course.lecture_description)}</td>
							</tr>

							{/* Spacer Row for visual separation */}
							<tr className="table-spacer">
								<td colSpan={2}></td>
							</tr>

							{/* Lesson Information */}
							<tr>
								<th>Lesson Title</th>
								<td>{displayValue(course.lesson_title)}</td>
							</tr>
							<tr>
								<th>Lesson Description</th>
								<td>{displayValue(course.lesson_description)}</td>
							</tr>

							{/* File Information */}
							{course.file_url && (
								<tr>
									<th>File URL</th>
									<td>
										<a
											href={course.file_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											View File
										</a>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<div
						className="my-5"
						style={{
							display: "flex",
							justifyContent: "center",
							gap: "20px",
						}}
					>
						<button className="btn green-button" onClick={handleAccept}>
							Approve <i className=""></i>
						</button>
						<button className="btn red-button" onClick={handleDelete}>
							Delete <i className=""></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseUploadDetail;
