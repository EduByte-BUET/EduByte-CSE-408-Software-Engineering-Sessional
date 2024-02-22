const express = require("express");
const requireAuth = require("./RequireAuth");
const router = express.Router();
const courses_router = express.Router();
const recommendations_router = express.Router();
const notifications_router = express.Router();
const saved_posts_router = express.Router();
const db = require("../database/db");

// --------------------------------------------- User ---------------------------------------------

courses_router.use(requireAuth)
router.use("/user/courses", courses_router);
recommendations_router.use(requireAuth);
router.use("/user/recommendations", recommendations_router);
notifications_router.use(requireAuth);
router.use("/user/notifications", notifications_router);
saved_posts_router.use(requireAuth);
router.use("/user/saved_posts", saved_posts_router);
// dashboard Credentials
// Name, Email, Username, Password

courses_router.route("/").get(async (req, res) => {
	console.log("/user/courses GET");

	const user = await db.getUser(req.session.username); // req.session.userid;
	const user_id = user.user_id;

	let courses = await db.getCoursesEnrolled(user_id);
	console.log(courses);
	if (courses.length === 0) {
		res.status(400);
		courses = {
			status: "success",
			message: "Courses data for the user retrieved successfully.",
			coursesData: [],
		};
	}

	res.status(200);
	res.json(courses);
});

recommendations_router.route("/").get(async (req, res) => {
	console.log("/user/recommendations GET");

	// Client would want to get the recommendations from the database
	// userid (needed to get data form the db) is stored in req.session.userid
	// A sample json response is given below
	recommendations = {
		recommended_courses: [
			{
				course_id: 1,
				course_name: "Data Science Fundamentals",
				course_intro: "Explore the basics of data science and analytics.",
			},
			{
				course_id: 2,
				course_name: "JavaScript for Beginners",
				course_intro: "Learn the fundamentals of JavaScript programming.",
			},
			{
				course_id: 3,
				course_name: "Python for Data Analysis",
				course_intro:
					"Learn how to use Python for data analysis and visualization.",
			},
			{
				course_id: 4,
				course_name: "Introduction to Machine Learning",
				course_intro:
					"Discover the basics of machine learning and build your first models.",
			},
		],
	};
	if (Object.keys(recommendations).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(recommendations);
});

notifications_router.route("/").get(async (req, res) => {
	console.log("/user/notifications GET");

	const user_id = req.session.user_id;
	let notifications = await db.getUserNotificationData(user_id);
	if (notifications == null) {
		notifications = {
			status: "success",
			message: "Notificaation data for the user retrieved successfully.",
			notificationData: [],
		};
	}

	if (Object.keys(notifications).length > 0)
		res.status(200).json(notifications); // OK
	else res.status(400).send(); // Bad Request
});

saved_posts_router.route("/").get(async (req, res) => {
	console.log("/user/saved_posts GET");

	// Client would want to get the saved posts from the database
	// userid (needed to get data form the db) is stored in req.session.userid
	// A sample json response is given below
	saved_posts = {
		saved_posts: [
			{
				post_id: 1,
				post_title: "Introduction to React",
				post_content: "Learn the basics of React programming.",
				user_id: 123,
				user_name: "JohnDoe",
				post_time: "2023-05-15T08:00:00Z",
				total_upvote: 25,
				total_downvote: 5,
				total_reply: 10,
				post_tag: "react",
				reply: [
					{
						reply_id: 101,
						user_id: 456,
						user_name: "Doe",
						post_id: 1,
						reply_content: "This is a great post!",
						reply_time: "2023-05-15T08:15:00Z",
						parent_reply_id: 0,
					},
					{
						reply_id: 102,
						user_id: 789,
						user_name: "Jane",
						post_id: 1,
						reply_content: "I found this post very helpful!",
						reply_time: "2023-05-15T08:30:00Z",
						parent_reply_id: 0,
					},
				],
			},
			{
				post_id: 2,
				post_title: "Web Development Tips",
				post_content: "Explore useful tips for web development.",
				user_id: 789,
				user_name: "JaneSmith",
				post_time: "2023-05-16T10:30:00Z",
				total_upvote: 15,
				total_downvote: 2,
				total_reply: 8,
				post_tag: "webdev",
				reply: [
					{
						reply_id: 201,
						user_id: 456,
						user_name: "John",
						post_id: 2,
						reply_content: "Thanks for sharing!",
						reply_time: "2023-05-16T11:00:00Z",
						parent_reply_id: 0,
					},
					{
						reply_id: 202,
						user_id: 123,
						user_name: "Doe",
						post_id: 2,
						reply_content: "Great tips!",
						reply_time: "2023-05-16T11:30:00Z",
						parent_reply_id: 0,
					},
				],
			},
			{
				post_id: 3,
				post_title: "Understanding CSS Grid",
				post_content: "Learn how to use CSS Grid for layout design.",
				user_id: 456,
				user_name: "JohnDoe",
				post_time: "2023-05-17T09:00:00Z",
				total_upvote: 20,
				total_downvote: 3,
				total_reply: 9,
				post_tag: "css",
				reply: [
					{
						reply_id: 301,
						user_id: 789,
						user_name: "Jane",
						post_id: 3,
						reply_content: "This is a great introduction to CSS Grid!",
						reply_time: "2023-05-17T09:30:00Z",
						parent_reply_id: 0,
					},
					{
						reply_id: 302,
						user_id: 123,
						user_name: "Doe",
						post_id: 3,
						reply_content: "Thanks for the post!",
						reply_time: "2023-05-17T10:00:00Z",
						parent_reply_id: 0,
					},
				],
			},
		],
	};

	if (Object.keys(saved_posts).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(saved_posts);
});

// --------------------------------------------- Admin ---------------------------------------------

const admin_courses_router = express.Router();
const admin_content_creators_router = express.Router();
const admin_site_stats = express.Router();
const admin_notifications_router = express.Router();
const admin_review_upload_router = express.Router();
const admin_reviewupload_action_router = express.Router();

router.use("/admin/courses", admin_courses_router);
router.use("/admin/content_creators", admin_content_creators_router);
router.use("/admin/site_stats", admin_site_stats);
router.use("/admin/notifications", admin_notifications_router);
router.use("/admin/review_upload", admin_review_upload_router);
router.use("/admin/review_upload/action", admin_reviewupload_action_router);
admin_courses_router.route("/").get(async (req, res) => {
	console.log("/admin/courses GET");

	// admin would want to get the courses from the database (all courses present in the database)
	// A sample json response is given below
	//   courses = {
	//     courses: [
	//       {
	//         course_id: 1,
	//         course_name: "Data Science Fundamentals",
	//         course_description:
	//           "An introduction to the basic concepts of data science.",
	//         instructor_name: "Prof. John Smith",
	//         total_lectures: 12,
	//         total_enrolled_students: 150,
	//         start_date: "2023-06-01",
	//         end_date: "2023-07-15",
	//         tags: ["data science", "statistics"],
	//       },
	//       {
	//         course_id: 2,
	//         course_name: "Web Development Basics",
	//         course_description:
	//           "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
	//         instructor_name: "Prof. John Smith",
	//         total_lectures: 20,
	//         total_enrolled_students: 120,
	//         start_date: "2023-06-15",
	//         end_date: "2023-08-01",
	//         tags: ["web development", "HTML", "CSS", "JavaScript"],
	//       },
	//     ],
	//   };

	let courses = await db.getAdminCoursesData();
	if (courses == null) {
		courses = {
			status: "success",
			message: "Course data for the admin retrieved successfully.",
			CoursesData: [],
		};
	}

	if (Object.keys(courses).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(courses);
});

admin_content_creators_router.route("/").get(async (req, res) => {
	console.log("/admin/content_creators GET");

	// admin would want to get the content creators from the database (all content creators present in the database)
	// A sample json response is given below
	content_creators = {
		content_creators: [
			{
				content_creator_name: "Alice ContentCreator",
				total_created_lectures: 30,
				contribution_point: 500,
			},
			{
				content_creator_name: "Bob Lecturer",
				total_created_lectures: 25,
				contribution_point: 450,
			},
			{
				content_creator_name: "Charlie Instructor",
				total_created_lectures: 20,
				contribution_point: 400,
			},
			{
				content_creator_name: "David Teacher",
				total_created_lectures: 15,
				contribution_point: 350,
			},
		],
	};

	if (Object.keys(content_creators).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(content_creators);
});

admin_site_stats.route("/").get(async (req, res) => {
	console.log("/admin/site_stats GET");

	// admin would want to get the site stats from the database
	// A sample json response is given below
	site_stats = {
		total_users: 1500,
		total_posts: 500,
		total_courses: 30,
		total_lessons_creators: 10,
		average_user_rating: 4.5,
	};

	if (Object.keys(site_stats).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(site_stats);
});

admin_notifications_router.route("/").get(async (req, res) => {
	console.log("/admin/notifications GET");

	// admin would want to get the notifications from the database
	// A sample json response is given below
	// notifications = {
	// 	notifications: [
	// 		{
	// 			notification_id: 1,
	// 			type: "announcement",
	// 			content: "Monthly check of systems",
	// 		},
	// 		{
	// 			notification_id: 2,
	// 			type: "reminder",
	// 			content:
	// 				"Asta registered as a content creator. View registration request. ",
	// 		},
	// 		// Additional notifications...
	// 	],
	// };

	const user_id = 2; //req.session.userid
	let notifications = await db.getAdminNotificationData();
	if (notifications == null) {
		notifications = {
			status: "success",
			message: "Notificaation data for the admin retrieved successfully.",
			notificationData: [],
		};
	}
	console.log(notifications);
	if (Object.keys(notifications).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(notifications);
});

admin_review_upload_router.route("/").get(async (req, res) => {
	console.log("/admin/review_upload GET");

	let uploads = await db.getUploadReviewData();
	if (uploads == null) {
		uploads = {
			status: "success",
			message: "Upload Review data for the admin retrieved successfully.",
			uploadData: [],
		};
	}
	console.log(uploads);
	if (Object.keys(uploads).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(uploads);
});

admin_reviewupload_action_router.route("/").post(async (req, res) => {
	console.log("/admin/review_upload_action POST");

	const pending_id = req.body.pending_id;
	const message = req.body.message;
	console.log("pending id  " + pending_id);
	console.log("message  " + req.body.message);

	try {
		if (message === "accept") {
			await db.approveLesson(pending_id);
			res.status(200).send({ message: "Lesson approved successfully." });
		} else if (message === "delete") {
			await db.DeleteReviewLesson(pending_id);
			res.status(200).send({ message: "Lesson deleted successfully." });
		} else {
			res.status(400).send({ error: "Invalid action specified." });
		}
	} catch (err) {
		console.error(err);

		res
			.status(500)
			.send({ error: "An error occurred while processing your request." });
	}
});

module.exports = router;
