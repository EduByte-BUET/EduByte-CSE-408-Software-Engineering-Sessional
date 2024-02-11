import React from "react";
import { useNavigate } from "react-router-dom";

const examDescription = () => {
    const navigate = useNavigate();

	const examInfo = {
        quiz_id: 1,
        lecture_id: 1,
        quiz_title: "Week 1 Exam",
        quiz_duration: 30, // in seconds
        quiz_type: "descriptive",
        quiz_description: [
            "You have 30 minutes to complete this exam. You cannot take any break or pause once you start the exam. You can type the answer on your own, or you can ask the AI assistant to write down for you. The AI assistant will work only after you provide your logic to the assistant."
        ],
        quiz_pass_score: 60,
        quiz_questions: [1, 2] // This will be an array of question IDs
    };

	const quizTitle = examInfo.quiz_title;
	const quizDescription = examInfo.quiz_description;

    const handleStartExam = () => {
        navigate("/quiz/questions", {
			state: examInfo
		}); // quiz demo ekta banate hobe db te, see postman url for details
    };

	return (
		<div className="container" style={{ marginTop: "100px" }}>
			<div className="row">
				<h1 style={{ color: "dodgerblue", fontWeight: "bold" }}>
					{quizTitle}
				</h1>
			</div>
			<div className="row mt-5">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					<h2 style={{ textAlign: "justify" }}>
						{quizDescription}
					</h2>
				</div>
				<div className="col-md-2"></div>
			</div>
			<div className="row mt-5">
				<div className="col-md-8"></div>
				<div className="col-md-2">
					<button onClick={handleStartExam} className="btn red-button w-100">
						Start Exam
					</button>
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
	);
};

export default examDescription;
