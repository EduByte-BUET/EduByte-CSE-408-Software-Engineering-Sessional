import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pass from "../../assets/pass.jpg";
import fail from "../../assets/fail.jpg";
import api from "../../api/GeneralAPI";

const ViewResult = (props: any) => {
	const navigate = useNavigate();

	const lecture_info = props.lecture_info;

	const [percentage, setPercentage] = useState(50); // Example percentage, change as needed
	const [verdict, setVerdict] = useState("Fail");

	/*
	        {
    "totalObtainedMark": "1.00",
    "totalQuestions": "3",
    "questions": [
        {
            "question_text": "Write a function to find the sum of two numbers in JavaScript.",
            "question_answer": "function sum(a, b) { return a + b; }"
        },
        {
            "question_text": "Implement a Python function to reverse a list.",
            "question_answer": "def reverse_list(lst): return lst[::-1]"
        },
        {
            "question_text": "The Moon orbits the Earth.",
            "question_answer": "True"
        }
    ]
}
	    */
	const [totalObtainedMark, setTotalObtainedMark] = useState<any>();
	const [totalQuestions, setTotalQuestions] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(
					`/exam/result?lecture_id=${lecture_info.lecture_id}`
				);
				console.log(res.data);

				if (res) {
					const tom = res.data.totalObtainedMark;
					const tq = res.data.totalQuestions;
					setPercentage((tom / tq) * 100);
					setTotalObtainedMark(tom);
					setTotalQuestions(tq);

					if ((tom / tq) * 100 >= 50) {
						setVerdict("Pass");
					} else {
						setVerdict("Fail");
					}
				}
			} catch (err) {
				console.log("View result page error, AI didnot generate result");
			}
		};

		fetchData();
	}, []);

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
							<h2>
								: {parseInt(totalObtainedMark)} out of {totalQuestions}
							</h2>
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
