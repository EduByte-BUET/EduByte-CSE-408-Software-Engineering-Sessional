import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pass from "../../assets/pass.jpg";
import fail from "../../assets/fail.jpg";
import api from "../../api/GeneralAPI";

const ViewResult = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { lecture_id, lecture_title, quizQuestionArr, examDuration } =
		location.state;

	const [percentage, setPercentage] = useState<number>(0); // Example percentage, change as needed
	const [verdict, setVerdict] = useState("Fail");

	const [totalObtainedMark, setTotalObtainedMark] = useState<number>(0);
	const [totalQuestions, setTotalQuestions] = useState<number>(0);

	useEffect(() => {
		// Get the result from the result table
		const fetchData = async () => {
			try {
				const result_response = await api.get(
					`/exam/result?lecture_id=${lecture_id}`
				);
				// console.log(result_response.data);
				setTotalObtainedMark(result_response.data.totalObtainedMark);
				const pert =
					(parseInt(result_response.data.totalObtainedMark) /
						parseInt(result_response.data.totalQuestions)) *
					100;
				setPercentage(pert);
				setVerdict(pert >= 50 ? "Pass" : "Fail");
				setTotalQuestions(result_response.data.totalQuestions);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	const handleTryAgain = () => {
		navigate(`/quiz`, {
			state: {
				lecture_id: lecture_id,
				lecture_title: lecture_title,
				quizQuestions: quizQuestionArr,
				examDuration: examDuration,
			},
		});
	};

	const handleContinue = () => {
		navigate(`/courses`);
	};

	return (
		<div className="container">
			<div className="row justify-content-center" style={{ marginTop: "80px" }}>
				<h1 style={{ color: "red", fontWeight: "bolder" }}>
					Generated results on lecture |{" "}
					<span style={{ color: "dodgerblue" }}>{lecture_title}</span>
				</h1>
				<div className="col-md-6 mt-5">
					<h1 style={{ color: "dodgerblue", fontWeight: "bolder" }}>Result</h1>
					<div className="row mt-5">
						<div className="col-md-2"></div>
						<div className="col-md-4" style={{ textAlign: "left" }}>
							<h2>Correct</h2>
							<h2>Percentage</h2>
							<h2>Verdict</h2>
						</div>
						<div className="col-md-6" style={{ textAlign: "left" }}>
							<h2>
								: {totalObtainedMark} out of {totalQuestions}
							</h2>
							<h2>: {percentage.toFixed(3)}%</h2>
							<h2>: {verdict}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div style={{ width: "100%" }}>
						<img
							src={verdict === "Pass" ? pass : fail} // Provide the image paths
							alt={verdict}
							style={{ width: "80%" }}
						/>
					</div>
					<div className="button-container" style={{ marginRight: "150px" }}>
						<button className="btn red-button m-4" onClick={handleTryAgain}>
							Try Again
						</button>
						<button className="btn blue-button m-4" onClick={handleContinue}>
							Continue to Course
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewResult;
