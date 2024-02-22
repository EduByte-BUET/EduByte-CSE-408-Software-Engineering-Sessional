import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmCategory } from "@google/generative-ai";
import { HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyC7U9eH7FCkx-aHYObkzURzrxFPA2Us5nk";
const MODEL_NAME = "gemini-pro";

type Message = {
	text: string;
	sender: string;
};

const ExamHintAI = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [response, setResponse] = useState<string>("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const message = event.target.elements.messageInput.value;
		setMessages([...messages, { text: message, sender: "user" }]);
		event.target.elements.messageInput.value = "";

		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 0.5,
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
							text: "Hi You are Edurika. You will work for a educational website.Your job is to assist student during exam time,when they ask for, don't give full solution, just give them some hints.Your response will be short just some hints about how to solve the problem.Don't provide solution. You can provide pseudocode .Not full solution, I repeat not the solution and your response should be in between 20-30 words. Strictly follow the rules,Don't provide detailed hint,it will be considered as cheating during exam.So be careful.Hints should not be detailed.AS Hint you can tell about about problem tags, algorithm pseudocode just don't provide full solution. If hint contains direct answer then don't provide it instead message the user he/she should do it on his/her own.Please don't provide code kindly.This is exam if you provide full solution,what student will learn?.Don't provide detailed and lengthy hints.Please try to keep your response in 40 words.Don't cross the limit",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "- Consider using dynamic programming to store intermediate results.\n- Think about using a greedy approach to make locally optimal choices.\n- Try to reduce the problem to a known subproblem.\n- Consider using a divide-and-conquer approach to break the problem into smaller subproblems.\n- Explore the possibility of using a binary search to efficiently find a solution.",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Write a function in Python to check if a given string is a palindrome. how to solve it?",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "function isPalindrome(s):\n    cleanedString = removeNonAlphanumericAndLowercase(s)\n    return cleanedString == reverseString(cleanedString)\n\nfunction removeNonAlphanumericAndLowercase(s):\n    return concatenate(lowercase(c) for c in s if isAlphanumeric(c))\n\nfunction isAlphanumeric(c):\n    return isLetter(c) OR isDigit(c)\n\nfunction isLetter(c):\n    return ('A' <= c <= 'Z') OR ('a' <= c <= 'z')\n\nfunction isDigit(c):\n    return '0' <= c <= '9'\n\nfunction reverseString(s):\n    return s[::-1]",
						},
					],
				},
				{
					role: "user",
					parts: [{ text: "singleton code in java" }],
				},
				{
					role: "model",
					parts: [
						{
							text: "class Singleton:\n    private static instance: Singleton\n    private constructor()\n\n    public static getInstance():\n        if instance is null:\n            instance = new Singleton()\n        return instance\n\n    public someMethod():\n        // Your implementation here\n\n// Example usage\nsingletonInstance1 = Singleton.getInstance()\nsingletonInstance2 = Singleton.getInstance()\n\n// singletonInstance1 and singletonInstance2 should refer to the same instance",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Explain the singleton design pattern. When and why would you use it?",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "Singleton pattern restricts a class from instantiating multiple objects, ensuring a single instance globally accessible. Use it when only one instance is needed for tasks like managing configurations, logging, or database connections. It helps control access to shared resources and reduces overhead from unnecessary object creation.",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Implement a stack using an array or a linked list in a programming language of your choice.",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "Stack:\n  Initialize empty array stack\n\nPush(element):\n  Append element to stack\n\nPop():\n  If stack is not empty:\n    Remove and return the last element from stack\n\nIsEmpty():\n  Return true if stack is empty, else false",
						},
					],
				},
				{
					role: "user",
					parts: [
						{ text: "What is SQL injection, and how can it be prevented?" },
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "SQL injection attacks exploit vulnerabilities in user input to manipulate SQL queries. This can lead to unauthorized access, data manipulation, or even system compromise. Prevention strategies include:\n\n- Input Validation: Validate user input to prevent malicious characters or SQL commands.\n- Prepared Statements: Use parameterized queries to prevent direct SQL query construction from user input.\n- Stored Procedures: Utilize stored procedures to execute pre-defined SQL statements, reducing the risk of injection.\n- Whitelisting: Implement a whitelist approach, limiting input to a predefined set of allowed values.",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Provide an example of a common runtime error and how it can be handled in a programming language of your choice.",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: 'Example:\n"Null Pointer Exception" occurs when attempting to access methods or fields of an object without proper initialization. Handle using conditional checks before accessing.',
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Write a function in Python to check if a given string is a palindrome. how to solve it?",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "Here's a hint to help you solve the problem:\n\n**Hint:** Consider using the `[::-1]` operator to reverse the string and then compare it to the original string.\n\nHere's an example of how you can implement this in Python:\n\n```python\ndef is_palindrome(string):\n    reversed_string = string[::-1]\n    return string == reversed_string\n```\nThis function takes a string as an argument and returns `True` if the string is a palindrome (reads the same forwards and backwards), and `False` otherwise.\n\nI hope this helps! Let me know if you have any other questions.",
						},
					],
				},
				{
					role: "user",
					parts: [{ text: "singleton code in java" }],
				},
				{
					role: "model",
					parts: [
						{
							text: "```java\nclass Example {\n    private static Example instance;\n\n    private Example() {\n        // Private constructor to prevent instantiation outside this class\n    }\n\n    public static Example getInstance() {\n        if (instance == null) {\n            instance = new Example();\n        }\n        return instance;\n    }\n\n    public void someMethod() {\n        // Your implementation here\n    }\n}\n```\n\n**Usage**:\n\n```java\nExample instance1 = Example.getInstance();\nExample instance2 = Example.getInstance();\n\n// instance1 and instance2 refer to the same object\n```",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: 'Write a SQL query to retrieve the total number of orders for each customer from a hypothetical "Orders" table.',
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "```sql\nSELECT customer_id, COUNT(*) AS total_orders\nFROM Orders\nGROUP BY customer_id;\n```",
						},
					],
				},
				{
					role: "user",
					parts: [
						{ text: "Find the longest common substring between two strings." },
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "**Hint:**\n\nConsider using a dynamic programming approach to find the longest common substring. Create a matrix to store the lengths of the longest common substrings of the prefixes of the two strings. Fill the matrix from the bottom-right corner diagonally towards the top-left corner. The longest common substring can be found in the top-right corner of the matrix.",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Compare the time complexity of bubble sort and quicksort.",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "**Bubble Sort**:\n\n* Average and worst-case time complexity: O(n^2)\n\n**Quicksort**:\n\n* Average-case time complexity: O(n log n)\n* Worst-case time complexity: O(n^2)\n\n**Comparison**:\n\n* Bubble sort has a simpler implementation but is less efficient.\n* Quicksort is more efficient on average but has a worst-case scenario that is as bad as bubble sort.",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Implement a stack using an array or a linked list in a programming language of your choice",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "**Using an Array**:\n\n```\nclass Stack:\n    def __init__(self):\n        self.items = []\n\n    def push(self, item):\n        self.items.append(item)\n\n    def pop(self):\n        if not self.is_empty():\n            return self.items.pop()\n\n    def is_empty(self):\n        return len(self.items) == 0\n```\n\n**Using a Linked List**:\n\n```\nclass Node:\n    def __init",
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Write a basic API request using a programming language and a library of your choice.",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: '```python\nimport requests\n\n# Make a GET request to https://example.com/api/v1/users\nresponse = requests.get("https://example.com/api/v1/users")\n\n# Check the status code of the response\nif response.status_code == 200:\n    # Request was successful, parse the JSON response\n    data = response.json()\n\n    # Iterate over the data and print each user\'s name\n    for user in data:\n        print(user["name"])\nelse:\n    # Request was not successful, handle the error\n    print("Error:", response.status_code)\n```',
						},
					],
				},
				{
					role: "user",
					parts: [
						{
							text: "Solve the Fibonacci sequence using dynamic programming and compare it with the recursive approach.",
						},
					],
				},
				{
					role: "model",
					parts: [
						{
							text: "**Dynamic Programming Approach**:\n\n1. Initialize an array `dp` of size `n+1` to store Fibonacci numbers.\n2. Set `dp[0] = 0` and `dp[1] = 1`.\n3. Iterate from `i = 2` to `n`:\n    * `dp[i] = dp[i-1] + dp[i-2]`.\n\n**Recursive Approach**:\n\n1. Define a recursive function `fib(n)`:\n    * If `n <= 1`, return `n`.\n    * Otherwise, return `fib(n-1) + fib(n-2)`.\n\n**Comparison**:\n\n* The dynamic programming approach has a time complexity of O(n) and space complexity of O(n), while the recursive approach has a time complexity of O(2^n) and space complexity of O(n).\n* The dynamic programming approach is more efficient for large values of `n` because it avoids redundant recursive calls.",
						},
					],
				},
			],
		});
		try {
			const result = await chat.sendMessage(message);
			const response = result.response;
			console.log(response.text());
			setResponse(response.text());
		} catch (error) {
			console.error(error);
			setResponse("An error occurred. Please try again later.");
		}
	};

	return (
		<Container className="mt-3">
			<Row>
				<Col>
					<div>
						{messages.map((message, index) => (
							<p key={index}>
								<strong>{message.sender}:</strong> {message.text}
							</p>
						))}
					</div>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								type="text"
								name="messageInput"
								placeholder="Type your message..."
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Ask EduRika
						</Button>
					</Form>
					<div className="mb-3 mt-3">{response}</div>
				</Col>
			</Row>
		</Container>
	);
};
export default ExamHintAI;
