import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExamDescription from "./quizDescription";
import ExamQuiz from "./quizQuestions";
import { useLocation } from "react-router-dom";

const examPageRoot = () => {
    const location = useLocation();
    const { lecture_id, lecture_title } = location.state;
    return (
        <>
            <Routes>
                <Route path="" element={<ExamDescription />} />
                <Route path="/questions" element={<ExamQuiz />} />
            </Routes>
        </>
    );
};

export default examPageRoot;
