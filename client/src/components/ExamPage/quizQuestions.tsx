import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import api from "../../api/GeneralAPI";
import ExamHintAI from "./ExamHintAI";

interface QuizQuestion {
	question_id: number;
	description: string;
	sample_info: string;
	type: string;
	duration: number;
}

const ExamQuiz = (props: any) => {
	const navigate = useNavigate();

	const lecture_id = 1;
	const [nextQuestionIdx, setNextQuestionIdx] = useState<number>(0);
	const [submitButton, setSubmitButton] = useState<boolean>(false);
	const [given_answers, set_given_answers] = useState<any>([]);
	const [currentAnswer, setCurrentAnswer] = useState<string>("");
	// const [examInfo, setExamInfo] = useState<any>(null);

	// const examInfo = location.state;
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await api.get(`/exam?lecture_id=${lecture_id}`);
	// 			setExamInfo(res.data);
	// 		} catch (err) {
	// 			console.log("Error fetching exam info");
	// 		}
	// 	};

	// 	fetchData();
	// }, [lecture_id]);

	const examInfo = {
		quiz_id: 1,
		lecture_id: 1,
		quiz_title: "Quiz 1",
		quiz_duration: 2,
		quiz_type: "ungraded",
		quiz_description:
			"Description for Quiz 1: This quiz covers various topics related to the lecture. It includes multiple-choice questions, true/false questions, and coding exercises.",
		quiz_pass_score: "20.00",
		quiz_questions: [2, 3, 4],
	};

	const numberOfQuestions = examInfo.quiz_questions.length;
	const questions: number[] = examInfo.quiz_questions;
	const [timeRemaining, setTimeRemaining] = useState<number>(
		examInfo.quiz_duration * 60 // Convert minutes to seconds
	);

	// const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
	const quizQuestionArr = [
		{
			question_id: 1,
			question_type: "Coding",
			question:
				"Write a function to find the sum of two numbers in JavaScript.",
			sample_info: "Use any appropriate JavaScript syntax.",
			question_answer: "function sum(a, b) { return a + b; }",
		},
		{
			question_id: 2,
			question_type: "Coding",
			question: "Implement a Python function to reverse a list.",
			sample_info: "Provide a Python code snippet.",
			question_answer: "def reverse_list(lst): return lst[::-1]",
		},
		{
			question_id: 3,
			question_type: "True/False",
			question: "The Moon orbits the Earth.",
			sample_info: "Answer with either 'True' or 'False'.",
			question_answer: "True",
		},
	];

	const currentQuestion = quizQuestionArr[nextQuestionIdx]; // apatoto index ei dhore nicchi

	const handleNextQuestion = () => {
		if (
			nextQuestionIdx === numberOfQuestions - 2 ||
			!questions[nextQuestionIdx]
		) {
			setSubmitButton(true);
		}
		const newAnswers = [...given_answers];
		newAnswers[nextQuestionIdx] = currentAnswer;
		set_given_answers(newAnswers);

		setCurrentAnswer("");

		setNextQuestionIdx(nextQuestionIdx + 1); // it would cause the component to re-render and get the currentQuestion
	};

	const handlePrevQuestion = () => {
		if (nextQuestionIdx === 0) {
			return;
		} else {
			setNextQuestionIdx(nextQuestionIdx - 1);
			setSubmitButton(false);
		}
	};

	// send data to store in the backend
	const sendData = async (answers) => {
		try {
			const res = await api.post(`/exam/answer?lecture_id=${lecture_id}`, {
				answers,
			});

			if (res) {
				console.log(res.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const examAIeval = async (
		question_id: number,
		obtained_mark: number,
		comment: string,
		question_answer: string
	) => {
		try {
			const res = await api.post("/exam/ai", {
				question_id,
				obtained_mark,
				comment,
				question_answer,
			});

			if (res) {
				console.log(res.data.message);

				navigate("/quiz/result"); // Navigate to the result viewing page
			}
		} catch (err) {
			console.log(err);
		}
	};

	//    {
	// 	   "message": "AI info received",
	// 	   "verdict": "success",
	// 	   "question_answer": "New Delhi",
	// 	   "obtained_mark": 0,
	// 	   "comment": "fail"
	//    }
	const generateResult = async (question: any, user_answer: string) => {
		try {
			const res = await api.post("/generate", {
				question: question.question,
				user_answer: user_answer,
			});

			if (res) {
				// Format - See in router
				const question_id = question.question_id;
				const obtained_mark = res.data.obtained_mark;
				const comment = res.data.comment;
				const question_answer = res.data.question_answer;

				await examAIeval(question_id, obtained_mark, comment, question_answer);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async () => {
		const newAnswers = [...given_answers];
		newAnswers[nextQuestionIdx] = currentAnswer;

		setCurrentAnswer("");

		const answers: any = [];
		quizQuestionArr.map((question, index) => {
			const question_id = question.question_id;
			const user_answer = newAnswers[index];
			answers[index] = { question_id, user_answer };
		});

		await sendData(answers);

		// {
		// 	"question": "What is the capital of India?",
		// 	"user_answer" : "Delhi"
		//    }
		answers.map(async (answer: any, index: number) => {
			await generateResult(quizQuestionArr[index], newAnswers[index]);
		});
	};

	const handleTextareaChange = (event) => {
		event.preventDefault();

		setCurrentAnswer(event.target.value);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (timeRemaining === 0) {
			alert("Time's up!");
			handleSubmit();
		}
	}, [timeRemaining]);

	if (!currentQuestion) {
		return <Spinner />;
	}

	return (
		<div className="container" style={{ marginTop: "100px" }}>
			<div className="row" style={{ marginTop: "100px" }}>
				<div className="col-md-2"></div>
				<div className="col-md-3">
					<h2 style={{ textAlign: "justify" }}>
						Question {nextQuestionIdx + 1}
					</h2>
					<br className="mt-2" />
					<h5 style={{ textAlign: "justify" }}>{currentQuestion?.question}</h5>

					<div className="progress mt-5">
						<div
							className="progress-bar"
							role="progressbar"
							aria-valuenow={75}
							aria-valuemin={0}
							aria-valuemax={100}
							style={{
								width: `${((nextQuestionIdx + 1) / numberOfQuestions) * 100}%`,
							}}
						></div>
					</div>
				</div>
				<div className="col-md-1"></div>
				<div className="col-md-4">
					<div
						className="timer"
						style={{ position: "fixed", top: "80px", right: "40px" }}
					>
						<h4>
							<i className="fa-solid fa-clock fa-xl"></i> &nbsp; Time Remaining:{" "}
							{timeRemaining} seconds
						</h4>
					</div>
					<div
						className="mt-3"
						style={{
							backgroundColor: "whitesmoke",
							maxHeight: "400px",
							overflowY: "auto",
						}}
					>
						<code style={{ fontSize: "20px" }}>
							{currentQuestion?.sample_info}
						</code>
					</div>

					<ExamHintAI/>

					<div className="m-3">
						<textarea
							name="text"
							placeholder="Write your answer here..."
							rows={2}
							value={currentAnswer}
							onChange={handleTextareaChange}
							style={{ border: "1px solid black" }}
						></textarea>
					</div>

					<div className="button-container">
						<button
							type="button"
							onClick={handlePrevQuestion}
							className="btn blue-button m-3"
						>
							Prev
						</button>

						{submitButton && (
							<button
								type="button"
								onClick={handleSubmit}
								className="btn red-button m-3"
							>
								Submit
							</button>
						)}

						{!submitButton && (
							<button
								type="button"
								onClick={handleNextQuestion}
								className="btn green-button m-3"
							>
								Next
							</button>
						)}
					</div>
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
	);
};

export default ExamQuiz;
