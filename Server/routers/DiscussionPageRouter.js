const express = require("express");
const userAuth = require("./RequireAuth");
const db = require("../database/db");

const router = express.Router();
const posts_router = express.Router();
const post_update_router = express.Router();
const post_save_router = express.Router();
const post_create_router = express.Router();
const show_posts_router = express.Router();
const reply_router = express.Router();
const postType_router = express.Router();
const course_router = express.Router();
const tag_router = express.Router();

router.use("/", posts_router);
post_update_router.use(userAuth);
router.use("/post/update", post_update_router);
post_save_router.use(userAuth);
router.use("/post/save", post_save_router);
post_create_router.use(userAuth);
router.use("/post/create", post_create_router);
router.use("/post/show", show_posts_router);
router.use("/reply", reply_router);
router.use("/postTypes", postType_router);
router.use("/courses", course_router);
router.use("/tags", tag_router);

posts_router.route("/").get(async (req, res) => {
	console.log("/discussion GET");
	const postsData = await db.fetchPostsData();
	if (postsData.length > 0) {
		res.status(200).json(postsData);
	} else {
		res.status(404).send("No posts found");
	}
});

reply_router.route("/").post(async (req, res) => {
	console.log("/discussion/reply POST");
	const { post_id, summary, parent_reply_id } = req.body;
	// author_id, author_type, author_name
	const author_id = req.session.user_id;
	const author_name = req.session.username;
	const author_type = await db.getUserType(author_id);

	const reply_id = await db.addReply(
		post_id,
		summary,
		author_id,
		author_type,
		author_name,
		parent_reply_id
	);
	if (reply_id != null) res.status(200);
	else res.status(404);
	res.send(reply_id.toString());
});

// Route for filtering by post types
postType_router.route("/").get(async (req, res) => {
	console.log("/discussion/postTypes GET");
	const types = req.query.types.split(",");
	const postsData = await db.fetchPostsDataByTypes(types);
	if (postsData.length > 0) {
		res.status(200).json(postsData);
	} else {
		res.status(404).send("No posts found for the selected types");
	}
});

// Route for filtering by a single course
course_router.route("/").get(async (req, res) => {
	console.log("/discussion/courses GET");
	const course = req.query.course;
	const postsData = await db.fetchPostsDataByCourse(course);
	if (postsData.length > 0) {
		res.status(200).json(postsData);
	} else {
		res.status(404).send("No posts found for the selected course");
	}
});

// Route for filtering by tags
tag_router.route("/").get(async (req, res) => {
	console.log("/discussion/tags GET");
	const tags = req.query.tags.split(",");
	const postsData = await db.fetchPostsDataByTags(tags);
	if (postsData.length > 0) {
		res.status(200).json(postsData);
	} else {
		res.status(404).send("No posts found for the selected tags");
	}
});

post_update_router.route("/").put(async (req, res) => {
	console.log("/discussion/post/update PUT");

	postid = req.body.post_id;
	command = req.body.command;

	res_string = "";
	let upvotes = 0;
	let downvotes = 0;
	if (command == "upvote") {
		try {
			await db.upvotePost(postid, req.session.user_id);
			const count = await db.getUpDownVotes(postid);
			upvotes = count.upvotes;
			downvotes = count.downvotes;
			res_string = "done";
		} catch (e) {
			console.log(e);
		}
	} else if (command == "downvote") {
		try {
			await db.downvotePost(postid, req.session.user_id);
			const count = await db.getUpDownVotes(postid);
			upvotes = count.upvotes;
			downvotes = count.downvotes;
			res_string = "done";
		} catch (e) {
			console.log(e);
		}
	} else {
		res_string = "done";
	}

	const upDownCount = { upvotes, downvotes };

	if (res_string === "done") res.status(200).json(upDownCount);
	else res.status(404).send();
});

post_save_router.route("/").put(async (req, res) => {
	console.log("/discussion/post/save POST");

	const post_id = req.body.post_id;

	const saved = await db.savePost(post_id, req.session.user_id);

	if (saved === "success") res.status(200).send("Post Saved Successfully");
	else if (saved === "duplicate") res.status(409).send("Post already saved");
	else res.status(404).send();
});

post_create_router.route("/").post(async (req, res) => {
	console.log("/discussion/post/create POST");

	const { author_type, course, tags, title, summary, post_type } = req.body;
	let author_id = req.session.user_id;

	const trimmedTags = tags.map((tag) => tag.trim());
	const author_name = req.session.username;
	const post_id = await db.addUserPost(
		author_id,
		author_type,
		author_name,
		course,
		trimmedTags,
		title,
		summary,
		post_type
	);

	// A sample json response is given below, fetch data from database
	// Create post in database using post_title, post_content, user_id, user_name, post_tag
	res_db = "success";
	if (res_db === "success") res.status(200);
	else res.status(404);

	res.send(post_id.toString());
});

show_posts_router.get("/", async (req, res) => {
	console.log("/discussion/post/show GET");
	const courses = await db.getAllCourses();
	const tags = await db.getAllTags();
	if (courses != null && tags != null) res.status(200);
	else res.status(404);
	res.status(200).json({ courses, tags });
});

module.exports = router;
