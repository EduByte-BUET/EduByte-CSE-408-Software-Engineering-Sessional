import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExamDescription from "./quizDescription";
import ExamQuiz from "./quizQuestions";

const examPageRoot = () => {
    return (
        <>
            <Routes>
                <Route path="/description" element={<ExamDescription />} />
                <Route path="/questions" element={<ExamQuiz />} />
            </Routes>
        </>
    );
};

export default examPageRoot;
