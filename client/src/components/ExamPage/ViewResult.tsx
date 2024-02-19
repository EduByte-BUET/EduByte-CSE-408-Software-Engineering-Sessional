import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pass from "../../assets/pass.jpg";
import fail from "../../assets/fail.jpg";
import api from "../../api/GeneralAPI";

const ViewResult = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const {lecture_id, lecture_title, quizQuestionArr, answers} = location.state;

	const [percentage, setPercentage] = useState<number>(50); // Example percentage, change as needed
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
		  answers.forEach(async (answer, index) => {
			const postBody = {
			  question: quizQuestionArr[index].question, // Assuming each question object has a 'question' property
			  user_answer: answer
			};
			
			try {
			  const gen_response = await api.post(`/generate`, postBody);
			  console.log(gen_response.data);
			  const postBody2 = {
				question_id: quizQuestionArr[index].question_id, 
				obtained_mark: gen_response.data.obtained_mark, 
				comment: gen_response.data.comment, // Replace with actual comment
				question_answer: gen_response.data.question_answer, // Assuming the response data is the question answer
			  };
		  
			  const gen_response2 = await api.post(`/exam/ai`, postBody2); // Replace '/another-endpoint' with your actual endpoint
			  console.log(gen_response2.data);  
			} catch (err) {
			  console.error(err);
			}
		  });
	  
		  try {
			const result_response = await api.get(`/exam/result?lecture_id=${lecture_id}`);
			console.log(result_response.data);
			setTotalObtainedMark(result_response.data.totalObtainedMark);
			setTotalQuestions(result_response.data.totalQuestions);
			const pert = parseInt(result_response.data.totalObtainedMark) / parseInt(result_response.data.totalQuestions) * 100;
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
		navigate(`/quiz`);
	};

	const handleContinue = () => {
		navigate(`/courses`);
	};

	return (
		<div className="container">
			<div className="row justify-content-center" style={{ marginTop: "80px" }}>
				<h1 style={{ color: "red", fontWeight: "bolder" }}>
					Generated results on lecture | {lecture_title}
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
