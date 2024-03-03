const db = require("../database/db.js");
const express = require("express");
const router = express.Router();
const exam_router = express.Router();
const quiz_router = express.Router();
const result_router = express.Router();
const answer_router = express.Router();
const exam_ai_router = express.Router();
//const dummy = express.Router();

router.use("/", exam_router);
router.use("/quiz", quiz_router);
router.use("/result", result_router);
router.use("/answer", answer_router);
router.use("/save_ai_verdict", exam_ai_router);
//router.use("/dummy", dummy);

exam_router.route("/").get(async (req, res) => {
	console.log("/exam GET");
	const lecture_id = req.query.lecture_id;
	const examinfo = await db.fetchQuizData(lecture_id);
	if (Object.keys(examinfo).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(examinfo);
});

quiz_router.route("/").post(async (req, res) => {
	console.log("/exam/quiz GET");
	const question_ids = req.body.question_ids;
	console.log(question_ids);
	const quizinfo = await db.fetchQuestionData(question_ids);

	if (Object.keys(quizinfo).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(quizinfo);
});

answer_router.route("/").post(async (req, res) => {
	console.log("/exam/answer POST");

	const user_id = req.session.user_id;

	const lecture_id = req.query.lecture_id;
	const answers = req.body.answers;

	for (let answer of answers) {
		const question_id = answer.question_id;
		const user_answer = answer.user_answer;
		await db.addUserAnswer(
			user_id,
			lecture_id,
			question_id,
			user_answer
		);
	}

	res.status(200).json({
		message: "answers received",
		verdict: "success",
	});
});

exam_ai_router.route("/").post(async (req, res) => {
	console.log("/exam/save_ai_verdict POST");

	const question_id = req.body.question_id;
	const obtained_mark = req.body.obtained_mark;
	const comment = req.body.comment;
	const corrected_answer = req.body.question_answer;
	const ai_info = await db.addAiInfo(
		question_id,
		obtained_mark,
		comment,
		corrected_answer
	);

	if (ai_info != null) res.status(200).send();
	else res.status(404).send(); // Not found
});
result_router.route("/").get(async (req, res) => {
	console.log("/exam/result GET");

	const lecture_id = req.query.lecture_id;
	const resultinfo = await db.getResultsSummaryForLecture(lecture_id);

	console.log(resultinfo);
	if (resultinfo != null) res.status(200);
	// OK
	else res.status(404); // Not found
	res.json(resultinfo);
});
// dummy.route("/").get(async (req, res) => {
// 	console.log("exam/dummy GET");
// 	const result =  await db.fetchQuestionData([1,2,3]);
// 	res.status(200).json(result);
// });

module.exports = router;
