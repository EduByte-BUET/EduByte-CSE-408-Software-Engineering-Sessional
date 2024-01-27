const express = require("express");
const router = express.Router();
const exam_router = express.Router();
const quiz_router = express.Router();
const result_router = express.Router();

router.use("/", exam_router);
router.use("/quiz", quiz_router);
router.use("/result", result_router);

exam_router.route("/").get(async (req, res) => {
	console.log("/exam GET");
	const courseid = req.query.courseid;
	const lectureid = req.query.lectureid;
	// console.log(courseid, lectureid);
	// A sample json response is given below
	// Get exam data from database using courseid and lectureid
	// This info is found from the database
	examinfo = {
		status: 200,
		message: "Success",
		data: {
			examName: "Week 1 Exam",
			duration: 30,
			instructions: [
				"You have 30 minutes to complete this exam.",
				"You cannot take any break or pause once you start the exam.",
				"You can type the answer on your own, or you can ask the AI assistant to write down for you.",
				"The AI assistant will work only after you provide your logic to the assistant.",
			],
			quizzes: [
				{
					quiz_id: 101,
					title: "Quiz 1",
					creator: "John Doe",
					difficulty: "Intermediate",
					topic: "Programming",
					duration: "30 minutes",
					creation_time: "2024-01-20T09:00:00Z",
				},
				{
					quiz_id: 102,
					title: "Quiz 2",
					creator: "John Doe",
					difficulty: "",
					topic: "Programming",
					duration: "45 minutes",
					creation_time: "2024-01-21T10:30:00Z",
				},
			],
		},
	};
	if (Object.keys(examinfo).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(examinfo);
});

quiz_router
	.route("/")
	.get(async (req, res) => {
		console.log("/exam/quiz GET");
		const quiz_id = req.query.quiz_id;
		const question_id = req.query.question_id;
		console.log(quiz_id);
		// A sample json response is given below
		// Get quiz data from database using courseid and lectureid
		// This info is found from the database
		let quizinfo = {
			status: "200",
			message: "Quizzes for the specific lecture retrieved successfully.",
			data: {
				question:
					"You need to swap the two given integers without using any third variable",
				timeRemaining: "27:54",
				codeSnippet:
					"#include <stdio.h>\nint main(){\n int x = 5; y = 10;\n /* your code */\n return 0;\n}",
				aiPrompt:
					"Do consecutive xor operations on x and y and store in x, y and x.",
			},
		};

		if (Object.keys(quizinfo).length > 0) res.status(200); // OK
		else res.status(404); // Not found
		res.json(quizinfo);
	})
	.post(async (req, res) => {
		console.log("/exam/quiz POST");
		const quiz_id = req.query.quiz_id;
		const answer = req.body.answers;
		const length = answer.length;
		console.log(quiz_id, answer);

		// This info will send to database
		if (Object.keys(answer).length > 0) res.status(200);
		else res.status(404); // Not found
		res.json({
			message: "answers received",
			quiz_id: quiz_id,
			quantity: length,
			verdict: "success",
		});
	});

result_router.route("/").get(async (req, res) => {
	console.log("/exam/result GET");
	const quiz_id = req.query.quiz_id;
	console.log(quiz_id);
	// A sample json response is given below
	// Get quiz data from database using courseid and lectureid
	// This info is found from the database
	let resultinfo = {
		status: "200",
		message: "Results for the specific quiz retrieved successfully.",
		data: {
			quiz_id: 101,
			title: "Quiz 1",
			creator: "Sushmita",
			difficulty: "Intermediate",
			topic: "Programming",
			duration: "30 minutes",
			creation_time: "2024-01-20T09:00:00Z",
			total_questions: 5,
			total_correct_answers: 3,
			total_wrong_answers: 2,
			total_marks: 10,
			obtained_marks: 6,
			questions: [
				{
					question_id: 1,
					question:
						"You need to swap the two given integers without using any third variable",
					time_taken: "00:00:30",
					code_snippet:
						"#include <stdio.h>\nint main(){\n int x = 5; y = 10;\n /* your code */\n return 0;\n}",
					ai_prompt:
						"Do consecutive xor operations on x and y and store in x, y and x.",
					correct_answer: "x = x ^ y; y = x ^ y; x = x ^ y;",
					user_answer: "x = x ^ y; y = x ^ y; x = x ^ y;",
					marks: 2,
					verdict: "Correct",
				},
				{
					question_id: 2,
					question: "What is the output of the following code?",
					time_taken: "00:00:30",
					code_snippet:
						'#include <stdio.h>\nint main(){\n int x = 5; y = 10;\n printf("%d", x & y);\n return 0;\n}',
					ai_prompt: "Do consecutive and operations on x and y and store in x",
					correct_answer: "0",
					user_answer: "0",
					marks: 2,
					verdict: "Correct",
				},
			],
		},
	};
	if (Object.keys(resultinfo).length > 0) res.status(200);
	// OK
	else res.status(404); // Not found
	res.json(resultinfo);
});

module.exports = router;
