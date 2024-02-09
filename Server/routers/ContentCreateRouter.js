const express = require("express");
const router = express.Router();
const content_create_router = express.Router();
const all_courses_router = express.Router();
const all_blocks_router = express.Router();
const add_lesson_router = express.Router();

const db = require("../database/db");

router.use("/", content_create_router);
router.use("/upload/view-all-courses", all_courses_router);
router.use("/upload/view-all-blocks", all_blocks_router);
router.use("/upload/add-lesson", add_lesson_router);

content_create_router.route("/").post(async (req, res) => {
	console.log("/content_create POST");

	// If the course is uploaded, it is first sent to the admin for approval

	if (Object.keys(site_response).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(site_response);
});

all_courses_router.route("/").get(async (req, res) => {
	console.log("/upload/view-all-courses GET");
	// Get all the courses
	const all_courses = await db.getAllCourses();

	if (all_courses) res.status(200); // OK
	else res.status(404); // Not found
	res.json(all_courses);
});

all_blocks_router.route("/").get(async (req, res) => {
	console.log("/upload/view-all-blocks GET");

	const course_id = req.query.course_id;
	// Get all the blocks
	const all_blocks = await db.getBlockList(course_id);
	console.log(all_blocks);

	if (all_blocks) res.status(200); // OK
	else res.status(404); // Not found
	res.json(all_blocks);
});

add_lesson_router.route("/").post(async (req, res) => {
	console.log("/upload/add-lesson POST");

	const course_id = req.body.course_id;
	const block_id = req.body.block_id;

	const lesson = req.body.lesson;
	const lesson_id = await db.addLesson(course_id, block_id, lesson);
	console.log(lesson_id);

	if (lesson_id) res.status(200); // OK
	else res.status(404); // Not found
	res.json(lesson_id);
});

module.exports = router;
