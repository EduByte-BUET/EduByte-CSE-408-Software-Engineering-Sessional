import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import api from "../../api/GeneralAPI";

const ExamQuiz = () => {
	const [nextQuestionIdx, setNextQuestionIdx] = useState<number>(0);
	const [submitButton, setSubmitButton] = useState<boolean>(false);
	const [answers, setAnswers] = useState<any>([]);
	const [currentAnswer, setCurrentAnswer] = useState<string>("");
	const [quizQuestionArr, setquizQuestionArr] = useState<any>(null);

	const location = useLocation();
	const {
		lecture_id,
		lecture_title,
		exam_duration,
		exam_questions,
	} = location.state;

	const navigate = useNavigate();

	const evalAnswersByAI = async (answers) => {
		const evaluationPromises = answers.map(async (answer, index) => {
			const postBody = {
				question: quizQuestionArr[index].question, // Assuming each question object has a 'question' property
				user_answer: answer,
			};

			try {
				const gen_response = await api.post(`/generate`, postBody);

				// setTotalQuestions(quizQuestionArr.length);
				// console.log(gen_response.data);
				const postBody2 = {
					question_id: quizQuestionArr[index].question_id,
					obtained_mark: gen_response.data.obtained_mark,
					comment: gen_response.data.comment, // Replace with actual comment
					question_answer: gen_response.data.question_answer, // Assuming the response data is the question answer
				};

				await api.post(`/exam/save_ai_verdict`, postBody2); // Replace '/another-endpoint' with your actual endpoint
			} catch (err) {
				console.error(err);
			}
		});

		await Promise.all(evaluationPromises);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.post(`/exam/quiz`, {
					question_ids: exam_questions,
				});
				setquizQuestionArr(response.data);
				//console.log(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const numberOfQuestions = exam_questions.length;
	const questions: number[] = exam_questions;
	const [timeRemaining, setTimeRemaining] = useState<number>(
		exam_duration // Convert minutes to seconds
	);

	const currentQuestion = quizQuestionArr
		? quizQuestionArr[nextQuestionIdx]
		: null; // apatoto index ei dhore nicchi

	const handleNextQuestion = () => {
		if (
			nextQuestionIdx === numberOfQuestions - 2 ||
			!questions[nextQuestionIdx]
		) {
			setSubmitButton(true);
		}
		const newAnswers = [...answers];
		newAnswers[nextQuestionIdx] = currentAnswer;
		setAnswers(newAnswers);

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

	const handleSubmit = async () => {
		const newAnswers = [...answers];
		newAnswers[nextQuestionIdx] = currentAnswer;
		setAnswers(newAnswers);
		const postBody = {
			answers: newAnswers.map((answer, index) => ({
				question_id: quizQuestionArr[index].question_id,
				user_answer: answer,
			})),
		};

		try {
			// Save user answers in the database
			const res = await api.post(
				`/exam/answer?lecture_id=${lecture_id}`,
				{
					...postBody,
				}
			);

			console.log(res.data);
		} catch (err) {
			console.error(err);
		}

		// Evaluate the answers by AI
		await evalAnswersByAI(newAnswers);
		// Results would be saved in the database

		setCurrentAnswer("");
		navigate(`/quiz/questions/result`, {
			state: {
				lecture_id: lecture_id,
				lecture_title: lecture_title,
				quizQuestionArr: quizQuestionArr,
				examDuration: exam_duration,
			},
		});

		// Submit the answers

		//navigate("/home"); // Navigate to the result viewing page
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
			//navigate("/home");
		}
	}, [timeRemaining]);

	if (!currentQuestion) {
		return <Spinner />;
	}

	const timerContainerStyle = {
		display: "inline-block",
		border: "2px solid #333",
		padding: "10px",
		borderRadius: "5px",
		fontSize: "24px",
		fontWeight: "bold"
	};
	
	const timerDigitStyle = {
		display: "inline-block",
		width: "40px",
		height: "40px",
		backgroundColor: "#f5f5f5",
		border: "2px solid #333",
		borderRadius: "5px",
		margin: "0 5px",
		lineHeight: "40px",
		overflow: "hidden",
		animation: "roll 1s infinite alternate"
	};

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
				</div>
				<div className="col-md-1"></div>
				<div className="col-md-4">
					<div className="timer" style={timerContainerStyle}>
						<h4>
							<i className="fa-solid fa-clock fa-xl"></i> &nbsp; Time Remaining:
							<div className="timer-digit">
								{timeRemaining
									.toString()
									.padStart(2, "0")
									.split("")
									.map((digit, index) => (
										<span key={index} style={timerDigitStyle}>
											{digit}
										</span>
									))}
							</div>{" "}
							seconds
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
							className="btn blue-button m-3"
						>
							Next
						</button>
					)}
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>
	);
};

export default ExamQuiz;
