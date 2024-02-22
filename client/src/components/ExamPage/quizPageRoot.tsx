import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExamDescription from "./quizDescription";
import ExamQuiz from "./quizQuestions";
import { useLocation } from "react-router-dom";
import ViewResult from "./ViewResult";

const examPageRoot = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<ExamDescription/>} />
                <Route path="/questions" element={<ExamQuiz/>} />
                <Route path="/questions/result" element={<ViewResult/>} />
            </Routes>
        </>
    );
};

export default examPageRoot;