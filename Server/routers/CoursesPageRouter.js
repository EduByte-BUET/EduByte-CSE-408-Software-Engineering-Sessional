const express = require("express");
const requireAuth = require("./RequireAuth");
const router = express.Router();
const courses_router = express.Router();
const block_router = express.Router();
const lecture_router = express.Router();
const lesson_router = express.Router();
const register_to_course_router = express.Router();
const lesson_marked_router = express.Router();
const category_router = express.Router();
const popular_course_router = express.Router();
const recommended_course_router = express.Router();
const lecture_count = express.Router();
const isLectureViewed = express.Router();
const favorite_router = express.Router();
const fetch_fav = express.Router();
const top_categories_router = express.Router();
const search_router = express.Router();

const db = require("../database/db");

router.use("/categories", category_router);
router.use("/popular", popular_course_router);
router.use("/recommended", recommended_course_router);
router.use("/", courses_router); // "/courses?course_id=1"
block_router.use(requireAuth);
router.use("/blocks", block_router);
lecture_router.use(requireAuth);
router.use("/blocks/lectures", lecture_router);
lesson_router.use(requireAuth);
router.use("/blocks/lectures/lessons", lesson_router);
lesson_marked_router.use(requireAuth);
router.use("/marked", lesson_marked_router);
register_to_course_router.use(requireAuth);
router.use("/register", register_to_course_router);
lecture_count.use(requireAuth);
router.use("/blocks/lecture_count", lecture_count);
isLectureViewed.use(requireAuth);
router.use("/blocks/lectures/isLectureViewed", isLectureViewed);
router.use("/top_categories", top_categories_router);
router.use("/search", search_router);

category_router.route("/").get(async (req, res) => {
	console.log("/courses/categories GET");
	// Get all the categories
	const categories = await db.getCategories();
	if (categories != null) res.status(200); // OK
	else res.status(404);
	res.json(categories);
});

popular_course_router.route("/").get(async (req, res) => {
	console.log("/courses/popular GET");
	
	// Get all the popular courses
	const popular_courses = await db.getPopularCourses();
	if (popular_courses != null) res.status(200); // OK
	else res.status(404);
	res.json(popular_courses);
});

recommended_course_router.route("/").get(async (req, res) => {
	console.log("/courses/recommended GET");
	// Get all the recommended courses
    const user_id = req.session.user_id;

	let recommended_courses = await db.getRecommended_Courses(user_id);
	// console.log("inside the recomm router");
	// console.log(recommended_courses);
	if (recommended_courses==null){
		recommended_courses = [
	// 		{
    //   course_id: "",
    //   description: "",
    //   course_title: "",
    //   thumbnail_url: "",
    //   difficulty_level: "",
    //   category: "",
    //   total_enrolled: "",
    //   total_lessons: "",
    //  }
	];
	}
    if (recommended_courses != null) res.status(200); // OK
    else res.status(404);
	res.json(recommended_courses);
});

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

	// Get data from database using block_id

	const blocks_list = await db.getBlockList(course_id);
	console.log(blocks_list);

	if (blocks_list != null) res.status(200); // OK
	else res.status(404); // Not found
	res.json(blocks_list);
});

lecture_router.route("").get(async (req, res) => {
	console.log("/courses/blocks/lectures GET");
	// Get all the lectures under a block
	const block_id = req.query.block_id;

	const lecture_list = await db.getLectureList(block_id);

	if (lecture_list != null) res.status(200); // OK
	else res.status(404); // Not found
	res.json(lecture_list);
});

lesson_router.route("/").get(async (req, res) => {
	console.log("/courses/blocks/lectures/lessons GET");
	// Get all the lessons under a lecture
	const lecture_id = req.query.lecture_id;

	const lesson_list = await db.getLessonList(lecture_id);
	if (lesson_list != null) res.status(200); // OK
	else res.status(404); // Not found
	res.json(lesson_list);
});

register_to_course_router.route("/").post(async (req, res) => {
	console.log("/courses/register POST");
	// Register a user to a course
	const course_id = req.body.course_id; // Get course_id from frontend
	const enroll_date = new Date();
	const enrollment_status = "active";
	const last_activity = new Date();

	const user = await db.getUser(req.session.username);
	const user_id = user.user_id;

	const registered = await db.registerToCourse(
		user_id,
		course_id,
		enroll_date,
		enrollment_status,
		last_activity
	);

	if (registered === "success") res.status(200).send();
	else if (registered === "registered") res.status(409).send();
});

lesson_marked_router.route("/").get(async (req, res) => {
	console.log("/courses/marked get");
	// Mark a lesson as completed
	const course_id = req.query.course_id; // Get course_id from frontend
	const block_id = req.query.block_id; // Get block_id from frontend
	const lecture_id = req.query.lecture_id; // Get lecture_id from frontend
	const username = req.session.username; // Get user_id from frontend

	const user = await db.getUser(username);
	const user_id = user.user_id;

	const marked = await db.markLecture(lecture_id, block_id, course_id, user_id);

	if (marked.length > 0) res.status(200).send();
	else res.status(404).send();
});

lecture_count.get("/", async (req, res) => {
	console.log("/courses/blocks/lecture_count GET");
	const course_id = req.query.course_id;
	const block_id = req.query.block_id;

	const user = await db.getUser(req.session.username);
	const user_id = user.user_id;

	const lecture_count = await db.getLectureCount(user_id, course_id, block_id);
	if (lecture_count != null) res.status(200).json(lecture_count); // OK
	else res.status(404).send(); // Not found
});

isLectureViewed.get("/", async (req, res) => {
	console.log("/courses/blocks/lectures/isLectureViewed GET");
	const lecture_id = req.query.lecture_id;
	const block_id = req.query.block_id;
	const course_id = req.query.course_id;

	const user = await db.getUser(req.session.username);
	const user_id = user.user_id;

	const isLectureViewed = await db.isLectureViewed(
		user_id,
		course_id,
		block_id,
		lecture_id
	);
	if (isLectureViewed === true) res.status(200).send(true); // OK
	else res.status(404).send(false); // Not found
});

top_categories_router.route("/").get(async (req, res) => {
	console.log("/courses/top_categories GET");

	const top_categories = await db.getTopCategories();

	// An array of top-categories present in the website
	if (top_categories != null) res.status(200).send(top_categories); // OK
	else res.status(404).send(); // Not found
});

search_router.route("/").get(async (req, res) => {
	console.log("/courses/search GET");
	
	const search_query = req.query.keyword;

	const search_results = await db.searchCourses(search_query);

	if (search_results != null) res.status(200).send(search_results); // OK
	else res.status(404).send(); // Not found
});

module.exports = router;
