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
	const {lecture_id, lecture_title, exam_id, exam_title, exam_duration, exam_type, exam_pass_score, exam_questions} = location.state;

	const navigate = useNavigate();

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
		exam_duration * 15 // Convert minutes to seconds
	);

	const currentQuestion = quizQuestionArr ? quizQuestionArr[nextQuestionIdx] : null; // apatoto index ei dhore nicchi

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
			  user_answer: answer
			}))
		  };

		try {
		 const ans_response = await api.post(`/exam/answer?lecture_id=${lecture_id}`, {
				...postBody,
			  });
			console.log(ans_response.data);
		} catch (err) {	
			console.error(err);
		}
		setCurrentAnswer("");
		navigate(`/quiz/questions/result`, {
			state: {
				lecture_id: lecture_id,
				lecture_title: lecture_title,
				quizQuestionArr: quizQuestionArr,
				answers: newAnswers,
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
					<div className="timer">
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