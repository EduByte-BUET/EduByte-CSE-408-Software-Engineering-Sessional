const { Pool } = require("pg");
const { initDB } = require("./createtables");

const tables = {
	users: "users",
	content_creator: "content_creator",
	courses: "courses",
	blocks: "blocks",
	lectures: "lectures",
	lessons: "lessons",
	enrolled_courses: "enrolled_courses",
	recommended_courses: "recommended_courses",
	course_progress: "course_progress",
	quizzes: "quizzes",
};

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "test",
	password: "connectdb",
	port: 5432,
});

const connectToDB = async () => {
	try {
		await pool.connect();
		console.log("Connected to DB");
	} catch (err) {
		console.log("Error connecting to db");
	}
};

const createTables = async () => {
	await initDB(pool);
};

const checkUsername = async (username) => {
	try {
		const res = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);
		if (res.rows[0] != undefined) {
			return true;
		}
		return false;
	} catch (err) {
		console.log(err);
	}
};

const getUserPassword = async (username) => {
	try {
		const res = await pool.query(
			"SELECT password FROM users WHERE username = $1",
			[username]
		);
		if (res.rows[0]) {
			return res.rows[0].password;
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};

const addUser = async (user) => {
	try {
		await pool.query(
			"INSERT INTO users (fullname, username, email, password, institution, experience, goal, interests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[
				user.fullname,
				user.username,
				user.email,
				user.password,
				user.institution,
				user.experience,
				user.goal,
				user.interests,
			]
		);
		console.log("User added successfully");
	} catch (err) {
		console.log(err);
	}
};

const getUser = async (username) => {
	try {
		const res = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);
		if (res.rows[0]) {
			return res.rows[0];
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};

const getPopularCourses = async () => {
	try {
		const res = await pool.query(
			"SELECT c.* FROM courses c ORDER BY total_enrolled DESC;"
		);
		if (res.rows[0]) {
			return res.rows.map((row) => {
				// convert the row object to a popular course object
				const course = {
					course_id: row.course_id,
					course_title: row.course_title,
					thumbnail_url: row.thumbnail_url,
					difficulty_level: row.difficulty_level,
					category: row.category,
					total_enrolled: row.total_enrolled,
					total_lessons: row.total_lessons,
				};
				console.log(course);
				return course;
			});
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};

const getCourse = async (course_id) => {
	try {
		const res = await pool.query(
			"SELECT course_id, course_title, description, total_lessons, total_enrolled, tags, thumbnail_url FROM courses WHERE course_id = $1",
			[course_id]
		);

		const course = res.rows[0];

		const course_info = {
			status: "success",
			message: "Course details retrieved successfully.",
			course: {
				course_id: course.course_id,
				course_title: course.course_title,

				description: course.description,
				total_lessons: course.total_lessons,
				total_enrolled: course.total_enrolled,
				tags: course.tags.split(","),
				thumbnail_url: course.thumbnail_url,
				skills_acquired: course.tags.split(","),
			},
		};

		return course_info;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getAllCourses = async () => {
	try {
		const res = await pool.query("SELECT course_id, course_title FROM courses");
		return res.rows; // An array of the courses
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getCategories = async () => {
	try {
		const categoriesResult = await pool.query("SELECT * FROM categories");
		let categories = categoriesResult.rows;

		for (let i = 0; i < categories.length; i++) {
			let courses = [];
			for (let j = 0; j < categories[i].courses.length; j++) {
				const courseResult = await pool.query(
					"SELECT course_id, course_title FROM courses WHERE course_id = $1",
					[categories[i].courses[j]]
				);
				courses.push(courseResult.rows[0]);
			}
			categories[i].courses = courses;
		}

		return categories;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getRecommendedCourses = async (user_id) => {
	try {
		const res = await pool.query(
			"SELECT courses.course_id, courses.course_title as title, courses.total_lessons, courses.description FROM recommended_courses JOIN courses ON recommended_courses.course_id = courses.course_id WHERE user_id = $1",
			[user_id]
		);
		return res.rows;
	} catch (err) {
		console.log(err);
	}
};

// registerToCourse(user_id, course_id, enroll_date, enrollment_status, last_activity)
const registerToCourse = async (
	user_id,
	course_id,
	enroll_date,
	enrollment_status,
	last_activity
) => {
	try {
		await pool.query(
			"INSERT INTO enrolled_courses (user_id, course_id, enroll_date, enrollment_status, last_activity) VALUES ($1, $2, $3, $4, $5)",
			[user_id, course_id, enroll_date, enrollment_status, last_activity]
		);
		console.log("User registered to course successfully");
		return "success";
	} catch (err) {
		console.log(err);
		return "";
	}
};

const getBlockList = async (course_id) => {
	try {
		const courseResult = await pool.query(
			"SELECT c.course_id, c.course_title, c.total_lectures, c.total_quizzes, b.block_id, b.title, l.lecture_id, l.title FROM courses c JOIN blocks b ON c.course_id = b.course_id JOIN lectures l ON b.block_id = l.block_id WHERE c.course_id = $1 GROUP BY c.course_id, b.block_id, l.lecture_id ORDER BY b.block_id, l.lecture_id",
			[course_id]
		);
		let courseRows = courseResult.rows;
		let course = {};
		let blocks = [];
		let currentBlockId = null;
		let currentBlock = {};
		for (let i = 0; i < courseRows.length; i++) {
			let courseRow = courseRows[i];
			if (i === 0) {
				course.course_id = courseRow.course_id;
				course.course_title = courseRow.course_title;
				course.total_lectures = courseRow.total_lectures;
				course.total_quizzes = courseRow.total_quizzes;
			}
			// If the current block id is different from the row's block id, it means we have a new block
			if (currentBlockId !== courseRow.block_id) {
				if (currentBlockId !== null) {
					blocks.push(currentBlock);
				}
				currentBlockId = courseRow.block_id;
				currentBlock = {
					block_id: courseRow.block_id,
					title: courseRow.title,
					lectures: [],
					total_quizzes: 0,
				};
			}
			let lecture = {
				lecture_id: courseRow.lecture_id,
				title: courseRow.title,
			};
			const quizResult = await pool.query(
				"SELECT quiz_id, quiz_title, quiz_duration FROM quizzes WHERE lecture_id = $1",
				[lecture.lecture_id]
			);
			let quiz = quizResult.rows[0];
			if (quiz) {
				currentBlock.total_quizzes++;
			}
			currentBlock.lectures.push(lecture);
		}
		blocks.push(currentBlock);
		course.blocks = blocks;

		return course;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getLectureList = async (block_id) => {
	try {
		const blockResult = await pool.query(
			"SELECT b.block_id, b.title AS block_title, l.lecture_id, l.title AS lecture_title FROM blocks b JOIN lectures l ON b.block_id = l.block_id WHERE b.block_id = $1 GROUP BY b.block_id, l.lecture_id ORDER BY l.lecture_id",
			[block_id]
		);
		let blockRows = blockResult.rows;
		let block = {};
		let lectures = [];

		for (let i = 0; i < blockRows.length; i++) {
			let blockRow = blockRows[i];

			if (i === 0) {
				block.block_id = blockRow.block_id;
				block.title = blockRow.block_title;
			}

			let lecture = {
				lecture_id: blockRow.lecture_id,
				title: blockRow.lecture_title,
				lessons: [],
				total_lessons: 0,
				total_quizzes: 1,
			};
			const lessonResult = await pool.query(
				"SELECT lesson_id, title, lesson_type, description FROM lessons WHERE lecture_id = $1",
				[lecture.lecture_id]
			);
			for (let j = 0; j < lessonResult.rows.length; j++) {
				let lesson = lessonResult.rows[j];
				lecture.lessons.push(lesson);

				lecture.total_lessons++;
			}
			lectures.push(lecture);
		}
		block.lectures = lectures;

		return block;
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getLessonList = async (lecture_id) => {
	try {
		const lectureResult = await pool.query(
			"SELECT l.lecture_id, l.title, l.description, ls.lesson_id, ls.title, ls.description, ls.creator_id, ls.duration, ls.lesson_type, ls.file_url FROM lectures l JOIN lessons ls ON l.lecture_id = ls.lecture_id WHERE l.lecture_id = $1 GROUP BY l.lecture_id, ls.lesson_id ORDER BY ls.lesson_id",
			[lecture_id]
		);
		let lectureRows = lectureResult.rows;
		let lecture = {};
		let lessons = [];

		for (let i = 0; i < lectureRows.length; i++) {
			let lectureRow = lectureRows[i];

			if (i === 0) {
				lecture.lecture_id = lectureRow.lecture_id;
				lecture.title = lectureRow.title;
				lecture.description = lectureRow.description;
			}
			let lesson = {
				lesson_id: lectureRow.lesson_id,
				title: lectureRow.title,
				description: lectureRow.description,
				creator_id: lectureRow.creator_id,
				duration: lectureRow.duration,
				lesson_type: lectureRow.lesson_type,
				file_url: lectureRow.file_url,
			};

			lessons.push(lesson);
		}

		lecture.lessons = lessons;

		return lecture;
	} catch (err) {
		console.log(err);
		return null;
	}
};
const markLesson = async (user_id, course_id, lesson_id) => {
	try {
		const result = await pool.query(
			`SELECT * FROM course_progress WHERE user_id = $1 AND course_id = $2;`,
			[user_id, course_id]
		);

		if (result.rows.length === 0) {
			// If the user_id and course_id do not exist, insert a new row
			await pool.query(
				`INSERT INTO course_progress (user_id, course_id, lesson_id) VALUES ($1, $2, ARRAY[$3::integer]);`,
				[user_id, course_id, lesson_id]
			);
			console.log("New row inserted");
			return "success";
		} else {
			// If the user_id and course_id exist, update the row
			const oldLessonIds = result.rows[0].lesson_id;
			await pool.query(
				`UPDATE course_progress
		  SET lesson_id = ARRAY(SELECT DISTINCT UNNEST(lesson_id || ARRAY[$3::integer]))
		  WHERE user_id = $1 AND course_id = $2;`,
				[user_id, course_id, lesson_id]
			);

			const updatedResult = await pool.query(
				`SELECT * FROM course_progress WHERE user_id = $1 AND course_id = $2;`,
				[user_id, course_id]
			);
			const newLessonIds = updatedResult.rows[0].lesson_id;

			if (oldLessonIds.length === newLessonIds.length) {
				console.log("Duplicate lesson_id, no update made");
				return "";
			} else {
				console.log("Lesson marked successfully");
				return "success";
			}
		}
	} catch (err) {
		console.log(err);
		return "";
	}
};

// Function to get the courses data for a user
const getMyCoursesData = async (user_id) => {
	try {
		// Query to fetch the data from the tables
		const res = await pool.query(
			`SELECT
		  c.course_id,
		  c.course_title,
		  array_length(cp.lesson_id, 1) as lesson_count,
		  c.total_lessons
		FROM courses c
		INNER JOIN course_progress cp ON c.course_id = cp.course_id AND cp.user_id = $1
		GROUP BY
		  c.course_id,
		  lesson_count,
		  c.course_title,
		  c.total_lessons
		ORDER BY
		  c.course_id`,
			[user_id]
		);

		// Check if the query returned any rows
		if (res.rowCount > 0) {
			// Initialize an empty array to store the courses data
			const coursesData = [];

			// Loop through the rows of the query result
			for (let row of res.rows) {
				// Add the course data to the array
				coursesData.push({
					course_id: row.course_id,
					course_title: row.course_title,
					lessons_completed: row.lesson_count,
					total_lessons: row.total_lessons,
				});
			}

			// Create the object to return
			const courses_list = {
				status: "success",
				message: "Courses data for the user retrieved successfully.",
				coursesData: coursesData,
			};

			return courses_list;
		} else {
			// If the query returned no rows, return null
			return null;
		}
	} catch (err) {
		// If there is an error, log it and return null
		console.log(err);
		return null;
	}
};

module.exports = {
	createTables,
	connectToDB,
	checkUsername,
	addUser,
	getUser,
	getCourse,
	getPopularCourses,
	getUserPassword,
	registerToCourse,
	getBlockList,
	getLectureList,
	getLessonList,
	markLesson,
	getMyCoursesData,
	getCategories,
	getRecommendedCourses,
	getAllCourses,
};
