import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { HarmCategory } from "@google/generative-ai";
import { HarmBlockThreshold } from "@google/generative-ai";
import { Spinner } from "react-bootstrap";

const API_KEY = "AIzaSyC7U9eH7FCkx-aHYObkzURzrxFPA2Us5nk";
const MODEL_NAME = "gemini-pro";

const AI: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [chatHistory, setChatHistory] = useState<string[]>([]);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
	};

	const handleSubmit = async () => {
		if (!message) {
			alert("Please enter a message.");
			return;
		}

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

		type Part = { text: string };

		const parts: Part[] = [];
		if (message) parts.push({ text: message });

		const conversationHistory = [
			{
				role: "user",
				parts: parts.length > 0 ? parts : [{ text: "Hello" }],
			},
			{
				role: "model",
				parts: [{ text: "How can I assist you today?" }], // Add a default text part
			},
			{
				role: "user",
				parts: [{ text: "How can you help me?" }],
			},
			{
				role: "model",
				parts: [{ text: "Sure, I can assist you. Ask me about your problems" }],
			},
		];

		const chat = model.startChat({
			generationConfig,
			safetySettings,
			history: conversationHistory,
		});

		try {
			const result = await chat.sendMessage(message);
			const response = result.response;
			// console.log(response.text());
			setChatHistory([
				...chatHistory,
				`User: ${message}`,
				`AI: ${response.text()}`,
			]);
			setMessage("");
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				setChatHistory([...chatHistory, `Error: ${error.message}`]);
			} else {
				console.error(error);
				setChatHistory([...chatHistory, `Error: An unknown error occurred.`]);
			}
		}
	};

	return (
		<div
			className="container mt-4"
			style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
		>
			<h2 className="mb-4 text-start">
				<b>Edurika</b>
			</h2>

			<div
				style={{
					height: "400px",
					overflowY: "scroll",
					border: "1px solid #ccc",
					padding: "10px",
					marginBottom: "10px",
				}}
			>
				{chatHistory.map((message, index) => (
					<div
						className="text-start"
						key={index}
						style={{
							border: "1px solid #ccc",
							padding: "10px",
							marginBottom: "10px",
							backgroundColor: "#fff",
							borderRadius: "10px",
						}}
					>
						{message}
					</div>
				))}
			</div>
			<div className="row justify-content-between">
				<div className="col-10 form-group">
					<textarea
						className="form-control"
						id="message"
						value={message}
						onChange={handleInputChange}
						placeholder="Enter your message"
					/>
				</div>
				<div className="col-2 d-flex align-items-end justify-content-end">
					<button className="btn blue-button mb-4" onClick={handleSubmit}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default AI;
