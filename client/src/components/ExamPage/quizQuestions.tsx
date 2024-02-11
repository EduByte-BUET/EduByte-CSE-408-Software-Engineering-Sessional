import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

interface QuizQuestion {
    question_id: number;
    description: string;
    sample_info: string;
    type: string;
    duration: number;
}

const ExamQuiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { question_id: currentQuestionId } = useParams();

    const examInfo = location.state;

    const numberOfQuestions = examInfo.quiz_questions.length;
    const questions: number[] = examInfo.quiz_questions;
    const quizPassScore = examInfo.quiz_pass_score;
    const quizType = examInfo.quiz_type;

    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);

    useEffect(() => {
        if (currentQuestionId) {
            fetchQuestion(parseInt(currentQuestionId));
        }
    }, [currentQuestionId]);

    const fetchQuestion = async (questionId: number) => {
        try {
            const response = await axios.get(`/exam/questions?qid=${questionId}`);
            setQuizQuestion(response.data);
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    const handleNextQuestion = () => {
		const current_qid = currentQuestionId ? currentQuestionId : ""; // Using conditional statement to avoid undefined error
        const currentQuestionIndex = questions.indexOf(parseInt(current_qid)); // current_qid gives undefined error if not attended
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex === numberOfQuestions || !questions[nextQuestionIndex]) {
            navigate("/home"); // Navigate to the result viewing page
        } else {
            const nextQuestionId = questions[nextQuestionIndex];
            navigate(`/exam/questions/${nextQuestionId}`, {
                state: {
                    questions: questions, // Pass the entire questions array
                    currentQuestionIndex: nextQuestionIndex // Pass the index of the next question
                }
            });
        }
    };

    const renderQuestion = () => {
        if (!quizQuestion) {
            return <Spinner />;
        }

        return (
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row" style={{ marginTop: "100px" }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                        <h2 style={{ textAlign: "justify" }}>Question {quizQuestion.question_id}</h2>
                        <br className="mt-2" />
                        <h5 style={{ textAlign: "justify" }}>{quizQuestion.description}</h5>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="timer">
                            Time Remaining: {quizQuestion.duration} seconds
                        </div>
                        <div
                            style={{
                                backgroundColor: "whitesmoke",
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            <code>{quizQuestion.sample_info}</code>
                        </div>
                        <button
                            type="button"
                            onClick={handleNextQuestion}
                            className="btn blue-button"
                        >
                            Next
                        </button>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    };

    return renderQuestion();
};

export default ExamQuiz;
