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
		return res.rows.map(row => {
		  // convert the row object to a popular course object
		  const course = {
			course_id: row.course_id,
			course_title: row.course_title,
			thumbnail_url: row.thumbnail_url,
			difficulty_level: row.difficulty_level,
			category: row.category,
			total_enrolled: row.total_enrolled,
			total_lessons: row.total_lessons
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
	}
	catch (err) {
		console.log(err);
		return null;
	}
}

const getRecommendedCourses = async (user_id) => {
	try {
		const res = await pool.query(
			"SELECT courses.course_id, courses.course_title as title, courses.total_lessons, courses.description FROM recommended_courses JOIN courses ON recommended_courses.course_id = courses.course_id WHERE user_id = $1",
			[user_id]
		);
		return res.rows;
	}
	catch (err) {
		console.log(err);
	}
}

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

// Function to get the blocks and lectures for a course
const getBlockList = async (course_id) => {
	try {
	  // Query to fetch the data from the tables
	  const res = await pool.query(
		`SELECT
		  c.course_id,
		  c.course_title AS course_name,
		  c.total_lectures,
		  c.total_quizzes,
		  b.block_id,
		  b.title AS block_name,
		  l.lecture_id,
		  l.title AS lecture_title,
		  ls.duration AS duration_minutes
		FROM courses c
		JOIN blocks b ON c.course_id = b.course_id
		JOIN lectures l ON b.block_id = l.block_id
		JOIN lessons ls ON l.lecture_id = ls.lecture_id
		WHERE c.course_id = $1
		GROUP BY
		  c.course_id,
		  c.course_title,
		  c.total_lectures,
		  c.total_quizzes,
		  b.block_id,
		  b.title,
		  l.lecture_id,
		  l.title,
		  ls.duration
		ORDER BY
		  b.serial_no,
		  l.serial_no`,
		[course_id]
	  );
  
	  // Check if the query returned any rows
	  if (res.rowCount > 0) {
		// Initialize an empty object to store the course data
		const course = {};
  
		// Loop through the rows of the query result
		for (let row of res.rows) {
		  // If the course_id is not in the course object, add it and other course details
		  if (!course.course_id) {
			course.course_id = row.course_id;
			course.course_name = row.course_name;
			course.total_lectures = row.total_lectures;
			course.total_quizzes = row.total_quizzes;
			course.blocks = []; // Initialize an empty array to store the blocks
		  }
  
		  // Find the index of the block with the same block_id as the row
		  let blockIndex = course.blocks.findIndex(
			(block) => block.block_id === row.block_id
		  );
  
		  // If the block is not in the course object, add it and other block details
		  if (blockIndex === -1) {
			course.blocks.push({
			  block_id: row.block_id,
			  block_name: row.block_name,
			  total_lectures: row.total_lectures,
			  total_quizzes: row.total_quizzes,
			  lectures: [], // Initialize an empty array to store the lectures
			});
  
			// Update the block index to the last element of the blocks array
			blockIndex = course.blocks.length - 1;
		  }
  
		  // Find the index of the lecture with the same lecture_id as the row
		  let lectureIndex = course.blocks[blockIndex].lectures.findIndex(
			(lecture) => lecture.lecture_id === row.lecture_id
		  );
  
		  // If the lecture is not in the block object, add it and other lecture details
		  if (lectureIndex === -1) {
			course.blocks[blockIndex].lectures.push({
			  lecture_id: row.lecture_id,
			  lecture_title: row.lecture_title,
			  duration_minutes: row.duration_minutes,
			});
		  }
		}
  
		// Create the object to return
		const blocks_list = {
		  status: "success",
		  message: "Blocks and lectures for the course retrieved successfully.",
		  course: course,
		};
  
		return blocks_list;
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
  
// Function to get the lectures and lessons for a block
const getLectureList = async (block_id) => {
	try {
	  // Query to fetch the data from the tables
	  const res = await pool.query(
		`SELECT
		  b.block_id,
		  b.title AS block_title,
		  COUNT(DISTINCT l.lecture_id) AS total_lectures,
		  l.lecture_id,
		  l.title AS lecture_title,
		  l.description,
		  ls.lesson_id,
		  ls.lesson_type,
		  ls.title AS lesson_title,
		  ls.description AS lesson_description
		FROM blocks b
		JOIN lectures l ON b.block_id = l.block_id
		JOIN lessons ls ON l.lecture_id = ls.lecture_id
		WHERE b.block_id = $1
		GROUP BY
		  b.block_id,
		  b.title,
		  l.lecture_id,
		  l.title,
		  l.description,
		  ls.lesson_id,
		  ls.lesson_type,
		  ls.title,
		  ls.description
		ORDER BY
		  l.serial_no,
		  ls.serial_no`,
		[block_id]
	  );
  
	  // Check if the query returned any rows
	  if (res.rowCount > 0) {
		// Initialize an empty object to store the block data
		const block = {};
  
		// Loop through the rows of the query result
		for (let row of res.rows) {
		  // If the block_id is not in the block object, add it and other block details
		  if (!block.block_id) {
			block.block_id = row.block_id;
			block.block_title = row.block_title;
			block.total_lectures = row.total_lectures;
			block.lectures = []; // Initialize an empty array to store the lectures
		  }
  
		  // Find the index of the lecture with the same lecture_id as the row
		  let lectureIndex = block.lectures.findIndex(
			(lecture) => lecture.lecture_id === row.lecture_id
		  );
  
		  // If the lecture is not in the block object, add it and other lecture details
		  if (lectureIndex === -1) {
			block.lectures.push({
			  lecture_id: row.lecture_id,
			  lecture_title: row.lecture_title,
			  description: row.description,
			  lessons: [], // Initialize an empty array to store the lessons
			});
  
			// Update the lecture index to the last element of the lectures array
			lectureIndex = block.lectures.length - 1;
		  }
  
		  // Find the index of the lesson with the same lesson_id as the row
		  let lessonIndex = block.lectures[lectureIndex].lessons.findIndex(
			(lesson) => lesson.lesson_id === row.lesson_id
		  );
  
		  // If the lesson is not in the lecture object, add it and other lesson details
		  if (lessonIndex === -1) {
			block.lectures[lectureIndex].lessons.push({
			  lesson_id: row.lesson_id,
			  lesson_type: row.lesson_type,
			  lesson_title: row.lesson_title,
			  description: row.lesson_description,
			});
		  }
		}
  
		// Create the object to return
		const lectures_list = {
		  status: "success",
		  message: "Lectures and lessons for the block retrieved successfully.",
		  block: block,
		  lectures: block.lectures,
		};
  
		return lectures_list;
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

// Function to get the detailed lecture information
const getLectureInfo = async (lecture_id) => {
	try {
	  // Query to fetch the data from the tables
	  const res = await pool.query(
		`SELECT
		  l.lecture_id,
		  l.title AS lecture_title,
		  l.description,
		  ls.lesson_id,
		  ls.lesson_type,
		  ls.title AS lesson_title,
		  ls.description AS lesson_description,
		  ls.file_url
		FROM lectures l
		JOIN lessons ls ON l.lecture_id = ls.lecture_id
		WHERE l.lecture_id = $1
		ORDER BY
		  ls.serial_no`,
		[lecture_id]
	  );
	  console.log("Lecture id: ", lecture_id);
  
	  // Check if the query returned any rows
	  if (res.rowCount > 0) {
		// Initialize an empty object to store the lecture data
		const lecture = {};
  
		// Loop through the rows of the query result
		for (let row of res.rows) {
		  // If the lecture_id is not in the lecture object, add it and other lecture details
		  if (!lecture.lecture_id) {
			lecture.lecture_id = row.lecture_id;
			lecture.lecture_title = row.lecture_title;
			lecture.description = row.description;
			lecture.lessons = []; // Initialize an empty array to store the lessons
		  }
  
		  // Find the index of the lesson with the same lesson_id as the row
		  let lessonIndex = lecture.lessons.findIndex(
			(lesson) => lesson.lesson_id === row.lesson_id
		  );
  
		  // If the lesson is not in the lecture object, add it and other lesson details
		  if (lessonIndex === -1) {
			lecture.lessons.push({
			  lesson_id: row.lesson_id,
			  lesson_type: row.lesson_type,
			  lesson_title: row.lesson_title,
			  lesson_description: row.lesson_description,
			  file_url: row.file_url,
			});
		  }
		}
  
		// Create the object to return
		const details_lecture_info = {
		  status: "success",
		  message: "Detailed lecture information retrieved successfully.",
		  lecture: lecture,
		};
  
		return details_lecture_info;
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
  }
  
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
	getLectureInfo,
	markLesson,
	getMyCoursesData,
	getCategories,
	getRecommendedCourses,
};
