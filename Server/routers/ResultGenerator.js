const db = require("../database/db.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();
const result_gen_router = express.Router();
//const dummy = express.Router();

router.use("/", result_gen_router);

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyC7U9eH7FCkx-aHYObkzURzrxFPA2Us5nk";

result_gen_router.route("/").post(async (req, res) => {
	console.log("/generate");
	const userInput = req.body;
	const question = userInput.question;
	const user_answer = userInput.user_answer;

	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [
			{
				role: "user",
				parts: [
					{
						text: 'you will provided question and user answer  in json format. Based on the question generate correct answer as question_answer then match the correct answer with user answer .If they match set obtained_mark 1 and comment pass otherwise set obtained_mark 0 and comment fail then return your response in format "question_answer" : correct answer, "obtained_mark" :0 or 1, "comment": "pass" or "fail"',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question": "What is the capital of India?",\n "user_answer" : "Delhi"\n}',
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '{\n "question": "What is the capital of India?",\n "user_answer" : "Delhi"\n}',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question_answer" : "New Delhi",\n "obtained_mark" : 0,\n "comment" : "fail"\n}',
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '{\n"question": "What is the primary purpose of the \'elif\' statement in Python?",\n"user_answer": "The \'elif\' statement is used to check another condition if the preceding \'if\' statement is false."\n}',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question_answer" : "The \'elif\' statement is used to check another condition if the preceding \'if\' statement is false.",\n "obtained_mark" : 1,\n "comment" : "pass"\n}',
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '{\n"question": "Write a Python code snippet that uses a \'for\' loop to iterate through a list of numbers and prints each number multiplied by 2.",\n"user_answer": "python\\nnumbers = [1, 2, 3, 4, 5]\\nfor num in numbers:\\n result = num * 2\\n print(result)\\n"\n}',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question_answer" : "python\\nnumbers = [1, 2, 3, 4, 5]\\nfor num in numbers:\\n result = num * 2\\n print(result)\\n",\n "obtained_mark" : 1,\n "comment" : "pass"\n}',
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '"question": "What is the purpose of a \'try-except\' block in Python?",\n"user_answer": ""\n}',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question_answer" : "A \'try-except\' block in Python is used to handle errors and exceptional conditions that may occur during the execution of a program.",\n "obtained_mark" : 0,\n "comment" : "fail"\n}',
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '{\n"question": "Explain the concept of object-oriented programming (OOP) and provide an example of a programming language that supports it.",\n"user_answer": "Object-oriented programming (OOP) is a programming paradigm that organizes code into objects, which are instances of classes. These objects encapsulate data and behavior. OOP promotes concepts such as encapsulation, inheritance, and polymorphism. An example of a programming language that supports OOP is Java. In Java, you can create classes, define attributes and methods, create objects, and use inheritance to create a hierarchy of classes."\n}',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '{\n "question_answer" : "Object-oriented programming (OOP) is a programming paradigm that organizes code into objects, which are instances of classes. These objects encapsulate data and behavior. OOP promotes concepts such as encapsulation, inheritance, and polymorphism. An example of a programming language that supports OOP is Java. In Java, you can create classes, define attributes and methods, create objects, and use inheritance to create a hierarchy of classes.",\n "obtained_mark" : 1,\n "comment" : "pass"\n}',
					},
				],
			},
		],
	});
	const jsonObject = {
		question: userInput.question,
		user_answer: userInput.user_answer,
	};

	const result = await chat.sendMessage(JSON.stringify(jsonObject));
	const response = result.response;
	const user_result = JSON.parse(response.text());

	console.log(response.text());
	if (response != null) res.status(200);
	else res.status(404); // Not found
	res.json({
		message: "AI Generated Result based on user answer",
		verdict: "success",
		question_answer: user_result.question_answer,
		obtained_mark: user_result.obtained_mark,
		comment: user_result.comment,
	});
});

module.exports = router;
