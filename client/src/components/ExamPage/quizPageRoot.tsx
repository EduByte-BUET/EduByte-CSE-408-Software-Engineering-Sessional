import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizDescription from "./quizDescription";
import QuizQuestions from "./quizQuestions";
import { useLocation } from "react-router-dom";
import "../../css/ExamPage/ButtonContainer.css";
import ViewResult from "./ViewResult";

/*
lecture_info = {
    course_id,
    course_name,
    block_id,
    block_name,
    block_index,
    lecture_index,
    lecture_id,
    lecture_title,
}
*/

const examPageRoot = () => {
	const location = useLocation();
	const [lecture_info, setLectureInfo] = useState<any>(null);

	if (!lecture_info) {
		setLectureInfo(location.state);
	}

	return (
		<>
			<Routes>
				<Route path="" element={<QuizDescription />} />
				{/* PROPS is required to go to the running course */}
				<Route path="/questions" element={<QuizQuestions />} />
				<Route
					path="/result"
					element={<ViewResult lecture_info={lecture_info} />}
				/>
			</Routes>
		</>
	);
};

export default examPageRoot;
