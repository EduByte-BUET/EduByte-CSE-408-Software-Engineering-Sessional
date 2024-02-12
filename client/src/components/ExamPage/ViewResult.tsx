import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pass from "../../assets/pass.jpg";
import fail from "../../assets/fail.jpg";
import api from "../../api/GeneralAPI";

const ViewResult = (props: any) => {
	const location = useLocation();
	const navigate = useNavigate();

	const [answers, questions] = [
		location.state.answers,
		location.state.questions,
	];
	// console.log(answers);
	// console.log(questions);
	const lecture_info = props.lecture_info;

	const [percentage, setPercentage] = useState(50); // Example percentage, change as needed
	const [verdict, setVerdict] = useState(percentage >= 50 ? "Pass" : "Fail");

	// useEffect(() => {
	//     /*
	//     {
	//         "message": "AI info received",
	//         "verdict": "success",
	//         "question_answer": "New Delhi",
	//         "obtained_mark": 0,
	//         "comment": "fail"
	//     }
	//     */
	//     try {
	//         const fetchData = async () => {
	//             questions.map(async (question: any, index: number) => {
	//                 const reqObj = {
	//                     "question": question.question,
	//                     "user_answer": answers[index],
	//                 }
	//             });

	//             const result = await api.post("/generate", {
	//                 answers: answers,
	//                 questions: questions,
	//             });
	//             setPercentage(result.data.percentage);
	//             setVerdict(result.data.verdict);
	//         }
	//     }
	// }, []);

	const handleTryAgain = () => {
		navigate(`/quiz`, {
			state: {
				course_id: lecture_info.course_id,
				course_name: lecture_info.course_name,
				block_id: lecture_info.block_id,
				block_name: lecture_info.block_name,
				block_index: lecture_info.block_index,
				lecture_index: lecture_info.lecture_index,
				lecture_id: lecture_info.lecture_id,
				lecture_title: lecture_info.lecture_title,
			},
		});
	};

	const handleContinue = () => {
		navigate(`/courses/lectures/info`, {
			state: {
				course_id: lecture_info.course_id,
				course_name: lecture_info.course_name,
				block_id: lecture_info.block_id,
				block_name: lecture_info.block_name,
				block_index: lecture_info.block_index,
				lecture_index: lecture_info.lecture_index,
				lecture_id: lecture_info.lecture_id,
				lecture_title: lecture_info.lecture_title,
			},
		});
	};

	return (
		<div className="container">
			<div className="row justify-content-center" style={{ marginTop: "80px" }}>
				<h1 style={{ color: "red", fontWeight: "bolder" }}>
					Generated results on lecture | {lecture_info.lecture_title}
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
							<h2>: 3 out of 5</h2>
							<h2>: {percentage}%</h2>
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
