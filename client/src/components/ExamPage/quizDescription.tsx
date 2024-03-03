import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/GeneralAPI";

const examDescription = () => {
	const location = useLocation();
	const { lecture_id, lecture_title } = location.state;
	const [examInfo, setExamInfo] = React.useState<any>(null);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`/exam?lecture_id=${lecture_id}`);

				setExamInfo(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [lecture_id]);

	const handleStartExam = () => {
		navigate(`/quiz/questions`, {
			state: {
				lecture_id: lecture_id,
				lecture_title: lecture_title,
				exam_id: examInfo.quiz_id,
				exam_title: examInfo.quiz_title,
				exam_duration: examInfo.quiz_duration,
				exam_type: examInfo.quiz_type,
				exam_pass_score: examInfo.quiz_pass_score,
				exam_questions: examInfo.quiz_questions,
			},
		});
	};

	return (
		<div className="container" style={{ marginTop: "50px" }}>
			<div className="row" style={{ borderBottom: "2px solid black" }}>
				<div className="col-md-1"></div>
				<div className="col-md-3">
					{examInfo && (
						<>
							<h1 style={{ color: "dodgerblue", fontWeight: "bold" }}>
								{examInfo.quiz_title}
							</h1>
						</>
					)}
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					{examInfo && (
						<>
							<h2 style={{ textAlign: "justify" }}>
								{examInfo.quiz_description}
							</h2>
							<>
								<table>
									<tbody>
										<tr>
											<td
												style={{
													textAlign: "left",
													color: "red",
													paddingRight: "20px",
												}}
											>
												<h3>Exam Duration</h3>
											</td>
											<td style={{ textAlign: "left" }}>
												<h3>{examInfo?.quiz_duration}</h3>
											</td>
										</tr>
										<tr>
											<td style={{ textAlign: "left", color: "red" }}>
												<h3>Total Questions</h3>
											</td>
											<td style={{ textAlign: "left" }}>
												<h3>{examInfo?.quiz_questions.length}</h3>
											</td>
										</tr>
									</tbody>
								</table>
							</>
						</>
					)}
					<p>
						<i className="fa-solid fa-circle-exclamation"></i> Kindly try to
						solve each of the questions without any help from the internet
					</p>
				</div>
				<div className="col-md-2"></div>
			</div>
			<div className="row mt-5">
				<div className="col-md-8"></div>
				<div className="col-md-2 m-5">
					{examInfo && (
						<button onClick={handleStartExam} className="btn red-button w-100">
							Start Exam
						</button>
					)}
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
	);
};

export default examDescription;
