const express = require("express");
const router = express.Router();
const courses_router = express.Router();
const block_router = express.Router();
const lecture_router = express.Router();
const lesson_router = express.Router();
const register_to_course_router = express.Router();
const lesson_marked_router = express.Router();

const db = require("../database/db");

router.use("/", courses_router);
router.use("/blocks", block_router);
router.use("/blocks/lectures", lecture_router);
router.use("/blocks/lectures/lessons", lesson_router);
router.use("/marked", lesson_marked_router);
router.use("/register", register_to_course_router);

courses_router.route("/").get(async (req, res) => {
	console.log("/courses GET ----------------------------------- ", req.session.username);
	// User ID is stored in the session (RAM)
	// const userid = req.session.userid;
	// const userid = 1;

	// if (req.session.username === undefined) {
	// 	res.status(200).json(); // The user is not logged in
	// }

	const coursesPageInfo = await db.getCoursesPageInfo(1); // user_id = 1
	console.log(coursesPageInfo);

	// A sample json response is given below
	// coursesPageInfo = {
	// 	status: "success",
	// 	message: "Course page information retrieved successfully.",
	// 	categories: [
	// 		{
	// 			category_id: 1,
	// 			name: "Programming",
	// 			description: "Explore the world of programming languages.",
	// 			courses: [
	// 				{
	// 					course_id: 101,
	// 					title: "JavaScript Fundamentals",
	// 					author: "John Doe",
	// 					total_lessons: 30,
	// 					description: "Learn the basics of JavaScript programming.",
	// 				},
	// 				{
	// 					course_id: 102,
	// 					title: "Full Stack Web Development",
	// 					author: "Jane Smith",
	// 					total_lessons: 50,
	// 					description:
	// 						"Become a full-stack web developer with this comprehensive course.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			category_id: 2,
	// 			name: "Web Development",
	// 			description: "Build web applications and websites.",
	// 			courses: [
	// 				{
	// 					course_id: 201,
	// 					title: "Python for Data Science",
	// 					author: "Alice Johnson",
	// 					total_lessons: 40,
	// 					description:
	// 						"Explore data science using Python programming language.",
	// 				},
	// 				{
	// 					course_id: 202,
	// 					title: "Machine Learning Basics",
	// 					author: "Bob Williams",
	// 					total_lessons: 35,
	// 					description:
	// 						"Introduction to machine learning concepts and algorithms.",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	popular_courses: [
	// 		{
	// 			course_id: 101,
	// 			title: "JavaScript Fundamentals",
	// 			author: "John Doe",
	// 			total_lessons: 30,
	// 			description: "Learn the basics of JavaScript programming.",
	// 		},
	// 		{
	// 			course_id: 102,
	// 			title: "Full Stack Web Development",
	// 			author: "Jane Smith",
	// 			total_lessons: 50,
	// 			description:
	// 				"Become a full-stack web developer with this comprehensive course.",
	// 		},
	// 	],
	// 	recommended_courses: [
	// 		{
	// 			course_id: 201,
	// 			title: "Python for Data Science",
	// 			author: "Alice Johnson",
	// 			total_lessons: 40,
	// 			description: "Explore data science using Python programming language.",
	// 		},
	// 		{
	// 			course_id: 202,
	// 			title: "Machine Learning Basics",
	// 			author: "Bob Williams",
	// 			total_lessons: 35,
	// 			description:
	// 				"Introduction to machine learning concepts and algorithms.",
	// 		},
	// 	],
	// };
	// course_info = {
	// 	status: "success",
	// 	message: "Course details retrieved successfully.",
	// 	course: {
	// 		course_id: 1,
	// 		course_name: "Introduction to Programming",
	// 		course_description:
	// 			"An introduction to the basic concepts of data science. Data Science is one of the hottest topics in the 21st century.In this course, you will learn the basics of data science and statistical modeling using Python programming language.",
	// 		total_lessons: 12,
	// 		total_enrolled: 150,
	// 		tags: ["data science", "statistics"],
	// 		course_video_url:
	// 			"https://www.youtube.com/embed/JL_grPUnXzY?si=mQtLZnjhMkVBdRGf",
	// 		skills_acquired: ["Data Analysis", "Statistical Modeling"],
	// 	},
	// };
	const course_id = req.query.course_id;
	const course_info = await db.getCourse(course_id); // course_id = 1
	console.log(course_info);

	let res_obj = coursesPageInfo;
	if (course_id !== undefined) {
		res_obj = course_info;
	}
	if (Object.keys(res_obj).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(res_obj);
});

// Sends all the blocks of a course
block_router.route("/").get(async (req, res) => {
	console.log("/courses/blocks GET");
	const course_id = req.query.course_id;
	console.log(course_id);

	// A sample json response is given below
	// Get data from database using block_id
	// blocks_list = {
	// 	status: "success",
	// 	message: "Blocks and lectures for the course retrieved successfully.",
	// 	course: {
	// 		course_id: 1,
	// 		course_name: "Introduction to Programming",
	// 		total_lectures: 20,
	// 		total_quizzes: 15,
	// 		blocks: [
	// 			{
	// 				block_id: 1,
	// 				block_name: "Fundamentals of Programming",
	// 				total_lectures: 5,
	// 				total_quizzes: 2,
	// 				lectures: [
	// 					{
	// 						lecture_id: 1,
	// 						lecture_title: "Introduction to Variables",
	// 						duration_minutes: 30,
	// 						quiz_id: 2001,
	// 					},
	// 					{
	// 						lecture_id: 2,
	// 						lecture_title: "Control Structures",
	// 						duration_minutes: 45,
	// 						quiz_id: 2002,
	// 					},
	// 				],
	// 			},
	// 			{
	// 				block_id: 2,
	// 				block_name: "Advanced Programming Concepts",
	// 				total_lectures: 7,
	// 				total_quizzes: 3,
	// 				lectures: [
	// 					{
	// 						lecture_id: 1,
	// 						lecture_title: "Object-Oriented Programming",
	// 						duration_minutes: 60,
	// 						quiz_id: 2003,
	// 					},
	// 					{
	// 						lecture_id: 2,
	// 						lecture_title: "Exception Handling",
	// 						duration_minutes: 40,
	// 						quiz_id: 2004,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// };

	const blocks_list = await db.getBlockList(course_id);

	if (Object.keys(blocks_list).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(blocks_list);
});

lecture_router.route("").get(async (req, res) => {
	console.log("/courses/blocks/lectures GET");
	// Get all the lectures under a block
	const course_id = req.query.course_id;
	const block_id = req.query.block_id;
	const lecture_id = req.query.lecture_id;

	// lectures_list = {
	// 	status: "success",
	// 	message: "Lectures for the block retrieved successfully.",
	// 	block: {
	// 		block_id: 101,
	// 		block_title: "Fundamentals of Programming",
	// 		total_lectures: 5,
	// 		total_quizzes: 2,
	// 	},
	// 	lectures: [
	// 		{
	// 			lecture_id: 1001,
	// 			lecture_title: "Introduction to Variables",
	// 			description: "Understanding the basics of variables in programming.",
	// 			video_title: "Intro_to_Variables_Video",
	// 			pdf_title: "Intro_to_Variables_Handout",
	// 		},
	// 		{
	// 			lecture_id: 1002,
	// 			lecture_title: "Control Structures",
	// 			description: "Exploring control flow in programming.",
	// 			video_title: "Intro_to_Variables_Video",
	// 			pdf_title: "Intro_to_Variables_Handout",
	// 		},
	// 	],
	// };
	const lectures_list = await db.getLectureList(block_id);
	// console.log(lectures_list);

	// details_lecture_info = {
	// 	status: "success",
	// 	message: "Detailed lecture information retrieved successfully.",
	// 	lecture: {
	// 		lecture_id: 1001,
	// 		lecture_title: "Introduction to Variables",
	// 		description:
	// 			"This lecture covers the fundamental concepts of variables in programming.",
	// 		lessons: [
	// 			{
	// 				lesson_id: 1,
	// 				lesson_type: "pdf",
	// 				lesson_title: "Intro_to_Variables_Handout",
	// 				description:
	// 					"A comprehensive handout on the introduction to variables.",
	// 				file_url:
	// 					"https://inspirehep.net/files/81d2b60e6d136b097d7a2eb55f2137d9",
	// 			},
	// 			{
	// 				lesson_id: 2,
	// 				lesson_type: "video",
	// 				lesson_title: "Intro_to_Variables_Video",
	// 				description:
	// 					"Watch the video to grasp the concepts of variables effectively.",
	// 				file_url:
	// 					"https://www.youtube.com/embed/JL_grPUnXzY?si=mQtLZnjhMkVBdRGf",
	// 			},
	// 		],
	// 	},
	// };
	const details_lecture_info = await db.getLectureInfo(lecture_id);
	console.log(details_lecture_info);

	let res_obj = lectures_list;
	if (lecture_id !== undefined) {
		res_obj = details_lecture_info;
	}
	if (Object.keys(res_obj).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(res_obj);
});

lesson_router.route("/").get(async (req, res) => {
	console.log("/courses/blocks/lectures/lessons GET");
	// Get all the lessons under a lecture
	const lecture_id = req.query.lecture_id;

	lessons_list = {
		status: "success",
		message: "Detailed lecture information retrieved successfully.",
		lecture: {
			lecture_id: 1001,
			lecture_title: "Introduction to Variables",
			author: "Prof. Alice Johnson",
			content:
				"This lecture covers the fundamental concepts of variables in programming.",
			serial: 1,
			view_count: 500,
			difficulty: "Intermediate",
			duration: "30 minutes",
			creation_time: "2023-02-15T14:30:00Z",
			lessons: [
				{
					lesson_id: 1,
					lesson_type: "pdf",
					pdf_id: 2001,
					lesson_title: "Intro_to_Variables_Handout",
					lesson_content:
						"A comprehensive handout on the introduction to variables.",
					file_url:
						"https://inspirehep.net/files/81d2b60e6d136b097d7a2eb55f2137d9",
				},
				{
					lesson_id: 2,
					lesson_type: "video",
					lesson_title: "Intro_to_Variables_Video",
					lesson_content:
						"Watch the video to grasp the concepts of variables effectively.",
					file_url:
						"https://www.youtube.com/embed/JL_grPUnXzY?si=mQtLZnjhMkVBdRGf",
				},
			],
		},
	};

	if (Object.keys(lessons_list).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(lessons_list);
});

register_to_course_router.route("/").post(async (req, res) => {
	console.log("/courses/register POST");
	// Register a user to a course
	const course_id = req.query.course_id; // Get course_id from frontend
	const enroll_date = new Date();
	const enrollment_status = "active";
	const last_activity = new Date();

	// console.log(req.session.username);
	// const user = await db.getUser(req.session.username);
	const user_id = 1;
	console.log("user_id: ", user_id);
	console.log("course_id: ", course_id);

	// CREATE TABLE IF NOT EXISTS enrolled_courses (
	// 	user_id INT REFERENCES users(user_id),
	// 	course_id INT REFERENCES courses(course_id),
	// 	enroll_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
	// 	feedback TEXT,
	// 	rating DECIMAL(2, 1),
	// 	enrollment_status VARCHAR(100),                                         -- 'active', 'completed', 'dropped'
	// 	last_activity TIMESTAMP WITHOUT TIME ZONE,
	// 	PRIMARY KEY (user_id, course_id)
	// );
	const registered = await db.registerToCourse(user_id, course_id, enroll_date, enrollment_status, last_activity);

	// if (registered.length > 0) res.status(200).send();
	// else res.status(404).send(); 
	res.status(200).send();
});

lesson_marked_router.route("/").post(async (req, res) => {
	console.log("/courses/marked POST");
	// Mark a lesson as completed
	const course_id = req.query.course_id; // Get course_id from frontend
	const lesson_id = req.query.lesson_id; // Get lesson_id from frontend
	const user_id = 1;

	const marked = await db.markLesson(user_id, course_id, lesson_id);

	if (marked.length > 0) res.status(200).send();
	else res.status(404).send();
	// res.status(200).send();
});

module.exports = router;
