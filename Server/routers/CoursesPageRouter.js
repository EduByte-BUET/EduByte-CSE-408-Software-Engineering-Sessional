const express = require("express");
const router = express.Router();
const courses_router = express.Router();
const block_router = express.Router();
const lecture_router = express.Router();
const lesson_router = express.Router();
const register_to_course_router = express.Router();
const lesson_marked_router = express.Router();
const store_video_file = express.Router();
const store_pdf_file = express.Router();
const category_router = express.Router();
const popular_course_router = express.Router();
const recommended_course_router = express.Router();

const db = require("../database/db");
const fs = require("fs");

router.use("/categories", category_router);
router.use("/popular", popular_course_router);
router.use("/recommended", recommended_course_router);
router.use("/", courses_router);
router.use("/blocks", block_router);
router.use("/blocks/lectures", lecture_router);
router.use("/blocks/lectures/lessons", lesson_router);
router.use("/marked", lesson_marked_router);
router.use("/register", register_to_course_router);
router.use("/store/video", store_video_file);
router.use("/store/pdf", store_pdf_file);

category_router.route("/").get(async (req, res) => {
	console.log("/courses/categories GET");
	// Get all the categories
	const categories = await db.getCategories();
	if (categories != null) res.status(200); // OK
	else res.status(404); 
	res.json(categories);
}
);
popular_course_router.route("/").get(async (req, res) => {
	console.log("/courses/popular GET");
	// Get all the popular courses
	const popular_courses = await db.getPopularCourses();
	if (popular_courses != null) res.status(200); // OK
	else res.status(404); 
	res.json(popular_courses);
}
);


recommended_course_router.route("/").get(async (req, res) => {
    console.log("/courses/recommended GET");
    // Get all the recommended courses
    const recommended_courses = await db.getRecommendedCourses();
    if (recommended_courses != null) res.status(200); // OK
    else res.status(404); 
    res.json(recommended_courses);
}
);

courses_router.route("/").get(async (req, res) => {
	console.log("/courses GET");
	const course_id = req.query.course_id;

	const course_info = await db.getCourse(course_id);
	if (course_info) res.status(200); // OK
	else res.status(404); // Not found
	res.json(course_info);
});

// Sends all the blocks of a course
block_router.route("/").get(async (req, res) => {
	console.log("/courses/blocks GET");
	const course_id = req.query.course_id;
	console.log(course_id);

	// A sample json response is given below
	// Get data from database using block_id

	const blocks_list = await db.getBlockList(course_id);
	console.log(blocks_list);

	if (blocks_list!=null) res.status(200); // OK
	else res.status(404); // Not found
	res.json(blocks_list);
});

lecture_router.route("").get(async (req, res) => {
	console.log("/courses/blocks/lectures GET");
	// Get all the lectures under a block
	const course_id = req.query.course_id;
	const block_id = req.query.block_id;
	const lecture_id = req.query.lecture_id;
	//console.log("LectureID: ", lecture_id);
	//console.log("block_id: ", block_id);
	const lectures_list = await db.getLectureList(block_id);


	const details_lecture_info = await db.getLectureInfo(lecture_id);
	console.log(details_lecture_info);

	let res_obj = lectures_list;
	if (lecture_id !== undefined) {
		res_obj = details_lecture_info;
	}
	if (res_obj!= null) res.status(200); // OK
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
	const course_id = req.body.course_id; // Get course_id from frontend
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

store_video_file.post("/", async (req, res) => {
	console.log("/courses/store/video POST");


	const writer = fs.createWriteStream(__dirname + "/../videos/" + video_file_name);
  	res.data.pipe(writer);
	const video_file = req.files.file;
	const video_file_name = video_file.name;
	console.log(video_file_path);
});

module.exports = router;
