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
				console.log(response.data);
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
				exam_questions: examInfo.quiz_questions
			},
		});
    };

	return (
		<div className="container" style={{ marginTop: "100px" }}>
		  <div className="row">
			{examInfo && (
			  <>
				<h1 style={{ color: "dodgerblue", fontWeight: "bold" }}>
				  {examInfo.quiz_title}
				</h1>
			  </>
			)}
		  </div>
		  <div className="row mt-5">
			<div className="col-md-2"></div>
			<div className="col-md-8">
			  {examInfo && (
				<h2 style={{ textAlign: "justify" }}>
				  {examInfo.quiz_description}
				</h2>
			  )}
			</div>
			<div className="col-md-2"></div>
		  </div>
		  <div className="row mt-5">
			<div className="col-md-8"></div>
			<div className="col-md-2">
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
