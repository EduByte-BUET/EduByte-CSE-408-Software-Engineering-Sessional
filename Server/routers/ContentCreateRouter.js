const express = require("express");
const router = express.Router();
const content_create_router = express.Router();
const all_courses_router = express.Router();
const all_blocks_router = express.Router();

const db = require("../database/db");

router.use("/", content_create_router);
router.use("/upload/view-all-courses", all_courses_router);
router.use("/upload/view-all-blocks", all_blocks_router);


content_create_router.route("/").post(async (req, res) => {
	console.log("/content_create POST");

	// const courseInfo = req.body.courseInfo;

	// Content creator's id can be found from req.session.user_id
	console.log(req.body);
	// Store this data in the database

	// If the course is uploaded, it is first sent to the admin for approval
	// Status: Pending Approval
	site_response = {
		status: "pending_approval",
		message: "New course created. Awaiting admin approval.",
		course: {
			course_id: 101,
			course_name: "Data Structures and Algorithms",
			course_description:
				"Learn essential data structures and algorithms for software development.",
			status: "pending_approval",
			blocks: [
				{
					block_number: 1,
					block_description: "Introduction to Data Structures",
					lessons: [
						{
							lesson_number: 1,
							lesson_name: "Arrays",
							lesson_description: "Understanding the concept of arrays.",
							lectures: [
								{
									lecture_number: 1,
									lecture_title: "Introduction to Arrays",
									lecture_description: "Overview of arrays and their usage.",
									template_pic:
										"https://example.com/images/intro_to_arrays_template.jpg",
									video_lecture: {
										video_title: "Arrays_Introduction.mp4",
										video_content: "In-depth explanation of array concepts.",
										video_url:
											"https://example.com/videos/Arrays_Introduction.mp4",
									},
									pdf_lecture: {
										pdf_title: "Arrays_Handout.pdf",
										pdf_content: "Comprehensive handout on arrays.",
										pdf_url: "https://example.com/files/Arrays_Handout.pdf",
									},
								},
							],
						},
					],
				},
			],
		},
	};

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
	const all_blocks = await db.getAllBlocks(course_id);

	if (all_blocks) res.status(200); // OK
	else res.status(404); // Not found
	res.json(all_blocks);
});

module.exports = router;
