const path = require("path");
const fs = require("fs").promises;

const express = require("express");
const router = express.Router();
const courses_router = express.Router();
const logo_router = express.Router();

router.use("/", courses_router);
router.use("/logo", logo_router);

courses_router.route("/").get(async (req, res) => {
	console.log("/home GET");

	// A sample json response is given below
	const courseid = req.query.courseid;
	// Get data from database using courseid
	site_description = {
		logo: "logo.png",
		introPic: "intro.jpg",
		subtitle: "This is the subtitle of the site",
		description: "This is a brief description of the site",
	};
	most_popular_courses = [
		{
			course_id: 1,
			course_name: "Data Science Fundamentals",
			cover_photo: "cover_photo_url",
			category: "Data Science",
			instructor: "John Doe",
			taken: 1234,
			estimated_time: "5 hours",
		},
		{
			course_id: 2,
			course_name: "JavaScript for Beginners",
			cover_photo: "cover_photo_url",
			category: "Web Development",
			instructor: "Jane Smith",
			taken: 5678,
			estimated_time: "6 hours",
		},
		{
			course_id: 3,
			course_name: "JavaScript for Intemediate Learners",
			cover_photo: "cover_photo_url",
			category: "Web Development",
			instructor: "Jane Smith",
			taken: 1231,
			estimated_time: "4.2 hours",
		},
	];
	supporters = [
		{
			name: "Supporter 1",
			description: "Supporter 1 description",
		},
	];
	edubyte_content_info = {
		email: "info@edubyte.com",
		phone: "+1234567890",
		address: "123 Street, City, Country",
		fb_link: "http://facebook.com/edubyte",
		twitter_link: "http://twitter.com/edubyte",
		insta_link: "http://instagram.com/edubyte",
	};
	about =
		"We're dedicated to providing the best online learning experience, with thousands of courses taught by industry experts and experienced instructors.";

	homepageinfo = {
		site_description: site_description,
		most_popular_courses: most_popular_courses,
		supporters: supporters,
		edubyte_content_info: edubyte_content_info,
		about: about,
	};

	if (Object.keys(homepageinfo).length > 0) res.status(200); // OK
	else res.status(404); // Not found
	res.json(homepageinfo);
});

logo_router.route("/").get(async (req, res) => {
	console.log("/logo GET");

	logo = path.join(__dirname, "../public/logo/EduByte_Logo.png");

	fs.access(logo)
		.then(() => res.status(200)) // OK
		.catch(() => res.status(404)); // Not found

	res.sendFile(logo);
});

module.exports = router;
