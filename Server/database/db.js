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
	posts: "posts",
	replies: "replies",
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

const getAccessLevel = async (username) => {
	try {
		const res = await pool.query(
			"SELECT access_level FROM users WHERE username = $1",
			[username]
		);
		if (res.rows[0]) {
			return res.rows[0].access_level;
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};
const getFieldOptionData = async () => {
	try {
		const res = await pool.query("SELECT name FROM categories");
		if (res.rowCount > 0) {
			// Use map to transform the array of objects into an array of names
			const fieldOption = res.rows.map((row) => row.name);
			return fieldOption;
		} else {
			// If the query returned no rows, return null
			return null;
		}
	} catch (err) {
		console.log(err);
	}
};

const addUser = async (user) => {
	try {
		await pool.query(
			"INSERT INTO users (fullname, username, email, password, institution, experience, goal, interests,access_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[
				user.fullname,
				user.username,
				user.email,
				user.password,
				user.institution,
				user.experience,
				user.goal,
				user.interests,
				"user",
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
			"SELECT * FROM courses c ORDER BY total_enrolled DESC;"
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
				return course;
			});
		}
		return null;
	} catch (err) {
		console.log(err);
	}
};
const getCCInfo = async () => {
  try {
    const res = await pool.query(
      `SELECT c.*
   FROM users c
   WHERE c.access_level = 'ccreator'`
    );

    const courseno = await pool.query(
      `SELECT COUNT(*) AS course_count
FROM courses;
`
    );

    const enrolled = await pool.query(
      `SELECT SUM(total_enrolled) AS total_enrollment
FROM courses;
`
    );

    if (res.rows[0]) {
      return res.rows.map((row) => {
        // convert the row object to a popular course object
        const cc = {
          fullname: row.fullname,
          username: row.username,
          email: row.email,
          access_level: row.access_level,
          
          total_course: courseno.rows[0].course_count,
          total_enrolled: enrolled.rows[0].total_enrollment,
        };
        return cc;
      });
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

const getSiteStats = async () => {
  try {
    const c1 = await pool.query(
      `SELECT COUNT(*) AS total_admins
FROM users
WHERE access_level = 'admin';`
    );

    const c2 = await pool.query(
      `SELECT COUNT(*) AS total_users
FROM users
WHERE access_level = 'user'
`
    );

    const c3 = await pool.query(
      `SELECT COUNT(*) AS total_creators
FROM users
WHERE access_level = 'ccreator';
`
    );

     const c4 = await pool.query(
       `SELECT COUNT(*) AS total_course
FROM courses;`
     );

     const c5 = await pool.query(
       `SELECT COUNT(*) AS total_cat
FROM categories;
`
     );

     const c6 = await pool.query(
       `SELECT SUM(total_enrolled) AS total_enrolled
FROM courses;;
`
     );


       const c7 = await pool.query(
         `SELECT COUNT(*) AS total_block
FROM blocks
;
`
       );

       const c8 = await pool.query(
         `SELECT COUNT(*) AS total_lecture
FROM lectures;`
       );

       const c9 = await pool.query(
         `SELECT COUNT(*) AS total_lesson
FROM lessons;
`
       );

       const c10 = await pool.query(
         `SELECT COUNT(*) AS total_quiz
FROM quizzes;
`
       );


  
        const cc = {
          userStats: {
            totalUsers: c2.rows[0].total_users,
            totalCreators: c3.rows[0].total_creators,
            totalAdmin: c1.rows[0].total_admins,
          },
          courseStats: {
            totalCategories: c5.rows[0].total_cat,
            totalCourses: c4.rows[0].total_course,

            totalEnrollments: c6.rows[0].total_enrolled,
          },
          contentStats: {
            totalBlocks: c7.rows[0].total_block,
            totalLectures: c8.rows[0].total_lecture,
            totalLessons: c9.rows[0].total_lesson,
            totalQuizzes: c10.rows[0].total_quiz,
          },
        };
        return cc;
      
    
    return null;
  } catch (err) {
    console.log(err);
  }
};



const getRecommended_Courses = async (user_id) => { 
	try { 
	  // const res = await pool.query( 
	  //   `SELECT c.* 
	  //    FROM courses c 
	  //    WHERE c.category = ANY( 
	  //      SELECT unnest(interests) 
	  //      FROM users 
	  //      WHERE user_id = $1 
	  //    ) 
	  //    ORDER BY c.total_enrolled DESC 
	  //    LIMIT 2`, 
	  //   [user_id] 
	  // ); 
   
	  const res = await pool.query( 
		`SELECT c.* 
		 FROM courses c 
		 WHERE c.category = ANY( 
		   SELECT unnest(interests) 
		   FROM users 
		   WHERE user_id = $1 
		 ) 
		 AND NOT EXISTS ( 
		   SELECT 1 
		   FROM enrolled_courses ec 
		   WHERE ec.user_id = $1 
		   AND ec.course_id = c.course_id 
		 ) 
		 ORDER BY c.total_enrolled DESC 
		 LIMIT 2`, 
		[user_id] 
	  ); 
	  if (res.rows[0]) { 
		return res.rows.map((row) => { 
		  // convert the row object to a popular course object 
		  const course = { 
			course_id: row.course_id, 
			description: row.description, 
			course_title: row.course_title, 
			thumbnail_url: row.thumbnail_url, 
			difficulty_level: row.difficulty_level, 
			category: row.category, 
			total_enrolled: row.total_enrolled, 
			total_lessons: row.total_lessons, 
		  }; 
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
const getAllTags = async () => {
	try {
		const res = await pool.query(
			"SELECT DISTINCT unnest(string_to_array(tags, ',')) AS tag FROM courses"
		);
		return res.rows.map((row) => row.tag); // An array of unique tags
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
					"SELECT * FROM courses WHERE course_id = $1",
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
		// Check if the entry already exists
		const existingEntry = await pool.query(
			"SELECT * FROM enrolled_courses WHERE user_id = $1 AND course_id = $2",
			[user_id, course_id]
		);

		if (existingEntry.rows.length > 0) {
			console.log("User already registered to course");
			return "registered";
		}

		// Get the total_enrolled count from the enrolled_courses table
		const total_enrolled = await pool.query(
			"SELECT COUNT(user_id) AS total_enrolled FROM enrolled_courses WHERE course_id = $1",
			[course_id]
		);
		// now set the total_enrolled field in the courses table
		await pool.query(
			"UPDATE courses SET total_enrolled = $1 WHERE course_id = $2",
			[total_enrolled.rows[0].total_enrolled + 1, course_id]
		);

		// If entry doesn't exist, insert the data
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
			"SELECT c.course_id, c.course_title, c.total_lectures, c.total_quizzes, b.block_id, b.title AS block_title, l.lecture_id, l.title AS lecture_title FROM courses c JOIN blocks b ON c.course_id = b.course_id JOIN lectures l ON b.block_id = l.block_id WHERE c.course_id = $1 GROUP BY c.course_id, b.block_id, l.lecture_id ORDER BY b.block_id, l.lecture_id",
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
					title: courseRow.block_title,
					lectures: [],
					total_quizzes: 0,
				};
			}
			let lecture = {
				lecture_id: courseRow.lecture_id,
				title: courseRow.lecture_title,
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

const markLecture = async (lecture_id, block_id, course_id, user_id) => {
	try {
		const lectureExistsResult = await pool.query(
			`SELECT * FROM course_progress WHERE user_id = $1 AND course_id = $2 AND lecture_id @> $3;`,
			[user_id, course_id, [lecture_id]] // Convert lecture_id to an array
		);

		if (lectureExistsResult.rows.length > 0) {
			console.log("Lecture already marked as completed");
			return "";
		}

		const lessonIdsResult = await pool.query(
			`SELECT lesson_id FROM lessons WHERE lecture_id = $1;`,
			[lecture_id]
		);

		const lessonIds = lessonIdsResult.rows.map((row) => row.lesson_id);

		const result = await pool.query(
			`SELECT * FROM course_progress WHERE user_id = $1 AND course_id = $2 AND block_id = $3;`,
			[user_id, course_id, block_id]
		);

		if (result.rows.length === 0) {
			await pool.query(
				`INSERT INTO course_progress (user_id, course_id, lesson_id, lecture_id, block_id) VALUES ($1, $2, $3, $4, $5);`,
				[user_id, course_id, lessonIds, [lecture_id], block_id] // Convert lecture_id and block_id to arrays
			);
			return "success";
		} else {
			await pool.query(
				`UPDATE course_progress
          		SET lesson_id = lesson_id || $1, -- Concatenate arrays
          		lecture_id = lecture_id || $2
          		WHERE user_id = $3 AND course_id = $4 AND block_id = $5;`,
				[lessonIds, [lecture_id], user_id, course_id, block_id] // Convert lecture_id and block_id to arrays
			);

			console.log("Lesson, lecture, and block marked successfully");
			return "success";
		}
	} catch (err) {
		console.log(err);
		return "";
	}
};

const getLectureCount = async (user_id, course_id, block_id) => {
	try {
		const result = await pool.query(
			"SELECT lecture_id FROM course_progress WHERE user_id = $1 AND course_id = $2 AND block_id = $3",
			[user_id, course_id, block_id]
		);
		if (result.rows.length > 0) {
			const lectureCount = result.rows[0].lecture_id.length;
			return lectureCount;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
		return null;
	}
};

const isLectureViewed = async (user_id, course_id, block_id, lecture_id) => {
	try {
		const result = await pool.query(
			"SELECT lecture_id FROM course_progress WHERE user_id = $1 AND course_id = $2 AND block_id = $3",
			[user_id, course_id, block_id]
		);
		if (result.rows.length > 0) {
			const lectureIds = result.rows[0].lecture_id;

			if (lectureIds.includes(parseInt(lecture_id))) {
				return true;
			}
		}
		return false;
	} catch (err) {
		console.log(err);
		return false;
	}
};

// Function to get the courses data for a user
const getCoursesEnrolled = async (user_id) => {
	try {
		let queryText = `
            SELECT DISTINCT
                course_id, enroll_date
            FROM
                enrolled_courses
            WHERE
                user_id = $1
			ORDER BY
				enroll_date DESC;
        `;
		let queryValues = [user_id];
		const enrolled_courses = await pool.query(queryText, queryValues);

		let courseArray = [];

		for (const course of enrolled_courses.rows) {
			let lessons_completed = 0;

			queryText = `
                SELECT
                    lesson_id
                FROM
                    course_progress
                WHERE
                    user_id = $1 AND course_id = $2;
            `;
			queryValues = [user_id, course.course_id];
			const lesson_list = await pool.query(queryText, queryValues);

			for (const arr of lesson_list.rows) {
				lessons_completed += arr.lesson_id.length;
			}

			queryText = `
                SELECT
                    course_title, total_lessons, description, thumbnail_url, difficulty_level, estimated_duration, category
                FROM
                    courses
                WHERE
                    course_id = $1;
            `;
			queryValues = [course.course_id];
			const course_title_and_total_lessons = await pool.query(
				queryText,
				queryValues
			);

			const courseInfo = {
				course_id: course.course_id,
				course_title: course_title_and_total_lessons.rows[0].course_title,
				lessons_completed: lessons_completed,
				total_lessons: course_title_and_total_lessons.rows[0].total_lessons,
				course_description: course_title_and_total_lessons.rows[0].description,
				thumbnail_url: course_title_and_total_lessons.rows[0].thumbnail_url,
				difficulty_level:
					course_title_and_total_lessons.rows[0].difficulty_level,
				estimated_duration:
					course_title_and_total_lessons.rows[0].estimated_duration,
				category: course_title_and_total_lessons.rows[0].category,
			};

			courseArray.push(courseInfo);
		}

		return courseArray;
	} catch (error) {
		console.error("Error fetching enrolled courses:", error);
		return null;
	}
};

const unregisterCourse = async (user_id, course_id) => {
	try {
		await pool.query(
			"DELETE FROM enrolled_courses WHERE user_id = $1 AND course_id = $2",
			[user_id, course_id]
		);

		// Update the total_enrolled count in the courses table
		const total_enrolled = await pool.query(
			"SELECT COUNT(user_id) AS total_enrolled FROM enrolled_courses WHERE course_id = $1",
			[course_id]
		);
		// now set the total_enrolled field in the courses table
		await pool.query(
			"UPDATE courses SET total_enrolled = $1 WHERE course_id = $2",
			[total_enrolled.rows[0].total_enrolled, course_id]
		);

		// Delete that course from course_progress too
		await pool.query(
			"DELETE FROM course_progress WHERE user_id = $1 AND course_id = $2",
			[user_id, course_id]
		);

		return "success";
	} catch (err) {
		console.log(err);
		return null;
	}
};

/*
const course = {
		course_id: courseToBeUploaded.course_id,
		course_title: courseToBeUploaded.course_title,
		description: courseToBeUploaded.course_description,
	};
	const block = {
		block_id: courseToBeUploaded.block_id,
		title: courseToBeUploaded.block_title,
		description: courseToBeUploaded.block_description,
	};
	const lecture = {
		lecture_id: courseToBeUploaded.lecture_id,
		title: courseToBeUploaded.lecture_title,
		description: courseToBeUploaded.lecture_description,
	};
	const lesson = {
		title: courseToBeUploaded.lesson_title,
		description: courseToBeUploaded.lesson_description,
		file_url: courseToBeUploaded.file_url,
		creator_id: courseToBeUploaded.creator_id,
	};
*/
const addLesson = async (course, block, lecture, lesson) => {
	try {
		await pool.query("BEGIN");

		let courseId = course.course_id;
		if (courseId == null) {
			const courseInsertResult = await pool.query(
				"INSERT INTO courses (course_title, description) VALUES ($1, $2) RETURNING course_id",
				[course.course_title, course.description]
			);
			courseId = courseInsertResult.rows[0].course_id;
		}

		let blockId = block.block_id;
		if (blockId == null) {
			const blockInsertResult = await pool.query(
				"INSERT INTO blocks (course_id, title, description) VALUES ($1, $2, $3) RETURNING block_id",
				[courseId, block.title, block.description]
			);
			blockId = blockInsertResult.rows[0].block_id;
		}

		let lectureId = lecture.lecture_id;
		if (lectureId == null) {
			const lectureInsertResult = await pool.query(
				"INSERT INTO lectures (block_id, title, description) VALUES ($1, $2, $3) RETURNING lecture_id",
				[blockId, lecture.title, lecture.description]
			);
			lectureId = lectureInsertResult.rows[0].lecture_id;
		}

		const lessonInsertResult = await pool.query(
			"INSERT INTO lessons (lecture_id, creator_id, title, description, created_at, updated_at, file_url, lesson_type) VALUES ($1, $2, $3, $4, NOW(), NOW(), $5, $6) RETURNING lesson_id",
			[
				lectureId,
				lesson.creator_id,
				lesson.title,
				lesson.description,
				lesson.file_url,
				lesson.file_type,
			]
		);

		await pool.query("COMMIT");

		return lessonInsertResult.rows[0].lesson_id;
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error adding lesson:", error);
		throw error;
	}
};

const addLessonToPendingCourses = async (course, block, lecture, lesson) => {
	try {
		await pool.query("BEGIN");

		const [
			course_id,
			course_title,
			course_description,
			block_id,
			block_title,
			block_description,
			lecture_id,
			lecture_title,
			lecture_description,
			lesson_title,
			lesson_description,
			file_url,
			file_type,
			creator_id,
		] = [
			course.course_id,
			course.course_title,
			course.description,
			block.block_id,
			block.title,
			block.description,
			lecture.lecture_id,
			lecture.title,
			lecture.description,
			lesson.title,
			lesson.description,
			lesson.file_url,
			lesson.file_type,
			lesson.creator_id,
		];

		await pool.query(
			"INSERT INTO pending_courses (creator_id, course_id, course_title, course_description, block_id, block_title, block_description, lecture_id, lecture_title, lecture_description, lesson_title, lesson_description, file_url, file_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
			[
				creator_id || null,
				course_id || null,
				course_title || null,
				course_description || null,
				block_id || null,
				block_title || null,
				block_description || null,
				lecture_id || null,
				lecture_title || null,
				lecture_description || null,
				lesson_title || null,
				lesson_description || null,
				file_url || null,
				file_type || null,
			]
		);

		await pool.query("COMMIT");
		console.log("Lesson added to pending_courses successfully");

		return "success";
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error adding lesson:", error);
		return "";
	}
};

const approveLesson = async (pending_id) => {
	try {
		// Fetch data from the database
		const lessonData = await pool.query("SELECT * FROM pending_courses");

		// Organize the fetched data into objects and add lessons to the respective tables
		for (const row of lessonData.rows) {
			const course = {
				course_id: row.course_id || null,
				course_title: row.course_title || null,
				description: row.course_description || null,
			};

			const block = {
				block_id: row.block_id || null,
				title: row.block_title || null,
				description: row.block_description || null,
			};

			const lecture = {
				lecture_id: row.lecture_id || null,
				title: row.lecture_title || null,
				description: row.lecture_description || null,
			};

			const lesson = {
				title: row.lesson_title || null,
				description: row.lesson_description || null,
				file_url: row.file_url || null,
				file_type: row.file_type || null,
				creator_id: row.creator_id || null,
			};

			// Add the lesson to the respective tables using addLesson function
			const lessonId = await addLesson(course, block, lecture, lesson);

			// Remove the entry from pending_courses table
			await pool.query("DELETE FROM pending_courses WHERE pending_id = $1", [
				pending_id,
			]);

			console.log(`Lesson added successfully with lesson_id ${lessonId}`);
		}

		console.log("All lessons added successfully");
	} catch (error) {
		console.error("Error fetching and adding lessons:", error);
	}
};

const DeleteReviewLesson = async (pending_id) => {
	try {
		// Remove the entry from the pending_courses table
		await pool.query("DELETE FROM pending_courses WHERE pending_id = $1", [
			pending_id,
		]);

		console.log(`Lesson with pending_id ${pending_id} deleted successfully.`);
	} catch (error) {
		console.error("Error deleting lesson:", error);
	}
};

// Quiz section
const fetchQuizData = async (lecture_id) => {
	try {
		await pool.query("BEGIN");

		const queryText = "SELECT * FROM quizzes WHERE lecture_id = $1";

		const queryValues = [lecture_id]; // Assuming quiz_id = 1

		const result = await pool.query(queryText, queryValues);

		await pool.query("COMMIT");
		console.log(result);
		const quizData = result.rows[0];

		//console.log(quizData);

		return {
			quiz_id: quizData.quiz_id,
			lecture_id: quizData.lecture_id,
			quiz_title: quizData.quiz_title,
			quiz_duration: quizData.quiz_duration,
			quiz_type: quizData.quiz_type,
			quiz_description: quizData.quiz_description,
			quiz_pass_score: quizData.quiz_pass_score,
			quiz_questions: quizData.quiz_questions,
		};
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error fetching quiz data:", error);
		throw error;
	}
};
//questions info

// Quiz section
const fetchQuestionData = async (question_ids) => {
	try {
		await pool.query("BEGIN");

		const queryText = "SELECT * FROM question WHERE question_id = ANY($1)";
		// Use ANY() to match multiple values in an array

		const queryValues = [question_ids];

		const result = await pool.query(queryText, queryValues);

		await pool.query("COMMIT");
		console.log(result);

		const questionDataList = result.rows.map((questionData) => ({
			question_id: questionData.question_id,
			question_type: questionData.question_type,
			question: questionData.question,
			sample_info: questionData.sample_info,
			question_answer: questionData.question_answer,
		}));

		return questionDataList;
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error fetching question data:", error);
		throw error;
	}
};

const addUserAnswer = async (user_id, lecture_id, question_id, user_answer) => {
	try {
		await pool.query("BEGIN");

		// Add or update user answer in the result table
		const saveResultQuery = `
		INSERT INTO result (user_id, lecture_id, question_id, user_answer)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (user_id, question_id) DO UPDATE
		SET user_answer = EXCLUDED.user_answer
		RETURNING user_id`;
		const saveResultValues = [user_id, lecture_id, question_id, user_answer];
		const result = await pool.query(saveResultQuery, saveResultValues);

		user_id = result.rows[0].user_id;

		await pool.query("COMMIT");
	} catch (error) {
		await pool.query("ROLLBACK");

		console.error("Error adding user answer:", error);
		throw error;
	}
};

const addAiInfo = async (
	question_id,
	obtained_mark,
	comment,
	newQuestionAnswer
) => {
	try {
		// Start a database transaction
		await pool.query("BEGIN");

		// Update question_answer in the Question table
		const updateQuestionText = `
		UPDATE Question
		SET question_answer = $1
		WHERE question_id = $2`;
		const updateQuestionValues = [newQuestionAnswer, question_id];
		await pool.query(updateQuestionText, updateQuestionValues);

		// Update obtained_mark and comment in the result table
		const updateResultText = `
		UPDATE result 
		SET obtained_mark = $1, 
			comment = $2
		WHERE question_id = $3
		RETURNING question_id`;
		const updateResultValues = [obtained_mark, comment, question_id];
		const result = await pool.query(updateResultText, updateResultValues);

		if (result.rows.length === 0) {
			throw new Error(`No row with question_id ${question_id} found`);
		}

		await pool.query("COMMIT");

		return question_id;
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error updating AI info:", error);
		throw error;
	}
};

const getResultsSummaryForLecture = async (lecture_id) => {
	try {
		const queryText = `
		SELECT
		  r.lecture_id,
		  SUM(r.obtained_mark) AS total_obtained_mark,
		  COUNT(r.question_id) AS total_questions,
		  ARRAY_AGG(
			JSON_BUILD_OBJECT(
			  'question_text', q.question,
			  'question_answer', q.question_answer
			)
		  ) AS questions
		FROM result r
		JOIN question q ON r.question_id = q.question_id
		WHERE r.lecture_id = $1
		GROUP BY r.lecture_id
	  `;

		const result = await pool.query(queryText, [lecture_id]);

		if (result.rows.length === 0) {
			console.log(`No results found for lecture_id ${lecture_id}`);
			return null;
		}

		const summary = {
			totalObtainedMark: result.rows[0].total_obtained_mark,
			totalQuestions: result.rows[0].total_questions,
			questions: result.rows[0].questions,
		};

		return summary;
	} catch (error) {
		console.error(
			"Error fetching results summary with detailed questions:",
			error
		);
		throw error;
	}
};

const getUploadReviewData = async (user_id) => {
	try {
		// Query to fetch the data from the tables
		const res = await pool.query("SELECT * FROM pending_courses");

		// Check if the query returned any rows
		if (res.rowCount > 0) {
			const uploadData = res.rows;

			// Create the object to return
			const upload_list = {
				status: "success",
				message: "Upload data for the admin retrieved successfully.",
				uploadData: uploadData,
			};

			return upload_list;
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
const getAdminCoursesData = async () => {
	try {
		// Query to fetch the desired data from the courses table
		const res = await pool.query(
			`SELECT
          course_id,
          course_title,
          difficulty_level,
          category,
          estimated_duration,
          total_enrolled,
          total_lectures,
          thumbnail_url
        FROM courses
        ORDER BY course_id`
		);

		// Check if the query returned any rows
		if (res.rowCount > 0) {
			// If yes, return the rows
			const coursesData = res.rows;

			// Create the object to return
			const coursesList = {
				status: "success",
				message: "Courses data retrieved successfully.",
				coursesData: coursesData,
			};

			return coursesList;
		} else {
			// If the query returned no rows, return an appropriate message
			return {
				status: "error",
				message: "No courses found.",
			};
		}
	} catch (err) {
		// If there is an error, log it and return an error message
		console.error(err);
		return {
			status: "error",
			message: "An error occurred while fetching courses data.",
		};
	}
};
// Function to get the notification data for a user
const getUserNotificationData = async (user_id) => {
	try {
		// Query to fetch the data from the tables
		const res = await pool.query(
			"SELECT * FROM user_notification WHERE user_id = $1",
			[user_id]
		);

		// Check if the query returned any rows
		if (res.rowCount > 0) {
			const notificationData = res.rows;

			// Create the object to return
			const notification_list = {
				status: "success",
				message: "Notification data for the user retrieved successfully.",
				notificationData: notificationData,
			};

			return notification_list;
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

// Function to get the notification data for a user
const getAdminNotificationData = async (user_id) => {
	try {
		// Query to fetch the data from the tables
		const res = await pool.query("SELECT * FROM admin_notification");

		// Check if the query returned any rows
		if (res.rowCount > 0) {
			const notificationData = res.rows;

			// Create the object to return
			const notification_list = {
				status: "success",
				message: "Notification data for the user retrieved successfully.",
				notificationData: notificationData,
			};

			return notification_list;
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

const removeCourse = (course_id) => {
	// Eta complete korte hobe ********************************************************************************

	// Query to remove the course from the courses table
	const queryText = "DELETE FROM courses WHERE course_id = $1";
	const queryValues = [course_id];

	// Execute the query
	pool.query(queryText, queryValues, (err, res) => {
		if (err) {
			return err;
		}
	});
};

const addUserPost = async (
	author_id,
	author_type,
	author_name,
	course,
	tags,
	title,
	summary,
	post_type
) => {
	try {
		await pool.query("BEGIN");

		const queryText =
			"INSERT INTO posts (author_id, author_type, author_name, course, tags, title, summary, post_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING post_id";
		const queryValues = [
			author_id,
			author_type,
			author_name,
			course,
			tags,
			title,
			summary,
			post_type,
		];
		const result = await pool.query(queryText, queryValues);

		const post_id = result.rows[0].post_id;

		await pool.query("COMMIT");
		return post_id;
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error adding user post:", error);
		throw error;
	}
};

const getContentCreator = async (username) => {
	try {
		const res = await pool.query(
			"SELECT * FROM content_creator WHERE username = $1",
			[username]
		);
		if (res.rows[0]) {
			return res.rows[0];
		}
		return null;
	} catch (err) {
		console.log(err);
		// Handle the error appropriately, e.g., throw an error or return a default value
		throw err;
	}
};

const fetchPostsData = async () => {
	try {
		const postsQueryResult = await pool.query("SELECT * FROM posts");
		const postsData = postsQueryResult.rows.map((post) => ({
			post_id: post.post_id,
			author_id: post.author_id,
			author_type: post.author_type,
			author_name: post.author_name,
			course: post.course,
			tags: post.tags
				? post.tags
						.replace(/[{}"]/g, "")
						.split(",")
						.map((tag) => tag.trim())
				: [],
			timestamp: post.timestamp.toISOString(),
			title: post.title,
			summary: post.summary,
			post_type: post.post_type,
			upvotes: post.upvotes,
			downvotes: post.downvotes,
			replies: [],
		}));

		const repliesQueryResult = await pool.query("SELECT * FROM replies");
		const repliesData = repliesQueryResult.rows.map((reply) => ({
			reply_id: reply.reply_id,
			post_id: reply.post_id,
			timestamp: reply.timestamp.toISOString(),
			summary: reply.summary,
			author_id: reply.author_id,
			author_type: reply.author_type,
			author_name: reply.author_name,
			upvotes: reply.upvotes,
			downvotes: reply.downvotes,
			parent_reply_id: reply.parent_reply_id,
			replies: [],
		}));

		const findReply = (replies, replyId) => {
			for (let reply of replies) {
				if (reply.reply_id === replyId) {
					return reply;
				}
				const foundReply = findReply(reply.replies, replyId);
				if (foundReply) {
					return foundReply;
				}
			}
		};

		repliesData.forEach((reply) => {
			if (reply.parent_reply_id === null) {
				const post = postsData.find((post) => post.post_id === reply.post_id);
				if (post) {
					post.replies.push(reply);
				}
			} else {
				const allReplies = postsData.reduce(
					(acc, post) => acc.concat(post.replies),
					[]
				);
				const parentReply = findReply(allReplies, reply.parent_reply_id);
				if (parentReply) {
					parentReply.replies.push(reply);
				}
			}
		});

		return postsData;
	} catch (error) {
		console.error("Error fetching posts data:", error.message);
		throw error;
	}
};

const addReply = async (
	post_id,
	summary,
	author_id,
	author_type,
	author_name,
	parent_reply_id
) => {
	try {
		await pool.query("BEGIN");

		const queryText = `
		INSERT INTO replies (post_id, summary, author_id, author_type, author_name, parent_reply_id) 
		VALUES ($1, $2, $3, $4, $5, $6) 
		RETURNING reply_id`;

		const queryValues = [
			post_id,
			summary,
			author_id,
			author_type,
			author_name,
			parent_reply_id,
		];
		const result = await pool.query(queryText, queryValues);

		const reply_id = result.rows[0].reply_id;

		await pool.query("COMMIT");
		return reply_id;
	} catch (error) {
		await pool.query("ROLLBACK");
		console.error("Error adding reply:", error);
		throw error;
	}
};

const fetchPostsDataByTypes = async (types) => {
	try {
		const postsQueryResult = await pool.query(
			"SELECT * FROM posts WHERE post_type = ANY($1::text[])",
			[types]
		);
		const postsData = postsQueryResult.rows.map((post) => ({
			post_id: post.post_id,
			author_id: post.author_id,
			author_type: post.author_type,
			author_name: post.author_name,
			course: post.course,
			tags: post.tags
				? post.tags
						.replace(/[{}"]/g, "")
						.split(",")
						.map((tag) => tag.trim())
				: [],
			timestamp: post.timestamp.toISOString(),
			title: post.title,
			summary: post.summary,
			post_type: post.post_type,
			upvotes: post.upvotes,
			downvotes: post.downvotes,
			replies: [],
		}));

		const repliesQueryResult = await pool.query("SELECT * FROM replies");
		const repliesData = repliesQueryResult.rows.map((reply) => ({
			reply_id: reply.reply_id,
			post_id: reply.post_id,
			timestamp: reply.timestamp.toISOString(),
			summary: reply.summary,
			author_id: reply.author_id,
			author_type: reply.author_type,
			author_name: reply.author_name,
			upvotes: reply.upvotes,
			downvotes: reply.downvotes,
			parent_reply_id: reply.parent_reply_id,
			replies: [],
		}));

		const findReply = (replies, replyId) => {
			for (let reply of replies) {
				if (reply.reply_id === replyId) {
					return reply;
				}
				const foundReply = findReply(reply.replies, replyId);
				if (foundReply) {
					return foundReply;
				}
			}
		};

		repliesData.forEach((reply) => {
			if (reply.parent_reply_id === null) {
				const post = postsData.find((post) => post.post_id === reply.post_id);
				if (post) {
					post.replies.push(reply);
				}
			} else {
				const allReplies = postsData.reduce(
					(acc, post) => acc.concat(post.replies),
					[]
				);
				const parentReply = findReply(allReplies, reply.parent_reply_id);
				if (parentReply) {
					parentReply.replies.push(reply);
				}
			}
		});

		return postsData;
	} catch (error) {
		console.error("Error fetching posts data by types:", error.message);
		throw error;
	}
};
const fetchPostsDataByCourse = async (course) => {
	try {
		const postsQueryResult = await pool.query(
			"SELECT * FROM posts WHERE course = $1",
			[course]
		);
		const postsData = postsQueryResult.rows.map((post) => ({
			post_id: post.post_id,
			author_id: post.author_id,
			author_type: post.author_type,
			author_name: post.author_name,
			course: post.course,
			tags: post.tags
				? post.tags
						.replace(/[{}"]/g, "")
						.split(",")
						.map((tag) => tag.trim())
				: [],
			timestamp: post.timestamp.toISOString(),
			title: post.title,
			summary: post.summary,
			post_type: post.post_type,
			upvotes: post.upvotes,
			downvotes: post.downvotes,
			replies: [],
		}));

		const repliesQueryResult = await pool.query("SELECT * FROM replies");
		const repliesData = repliesQueryResult.rows.map((reply) => ({
			reply_id: reply.reply_id,
			post_id: reply.post_id,
			timestamp: reply.timestamp.toISOString(),
			summary: reply.summary,
			author_id: reply.author_id,
			author_type: reply.author_type,
			author_name: reply.author_name,
			upvotes: reply.upvotes,
			downvotes: reply.downvotes,
			parent_reply_id: reply.parent_reply_id,
			replies: [],
		}));

		const findReply = (replies, replyId) => {
			for (let reply of replies) {
				if (reply.reply_id === replyId) {
					return reply;
				}
				const foundReply = findReply(reply.replies, replyId);
				if (foundReply) {
					return foundReply;
				}
			}
		};

		repliesData.forEach((reply) => {
			if (reply.parent_reply_id === null) {
				const post = postsData.find((post) => post.post_id === reply.post_id);
				if (post) {
					post.replies.push(reply);
				}
			} else {
				const allReplies = postsData.reduce(
					(acc, post) => acc.concat(post.replies),
					[]
				);
				const parentReply = findReply(allReplies, reply.parent_reply_id);
				if (parentReply) {
					parentReply.replies.push(reply);
				}
			}
		});

		return postsData;
	} catch (error) {
		console.error("Error fetching posts data by course:", error.message);
		throw error;
	}
};
const fetchPostsDataByTags = async (tags) => {
	try {
		const postsQueryResult = await pool.query(
			"SELECT * FROM posts WHERE tags::text[] && $1::text[]",
			[tags]
		);
		const postsData = postsQueryResult.rows.map((post) => ({
			post_id: post.post_id,
			author_id: post.author_id,
			author_type: post.author_type,
			author_name: post.author_name,
			course: post.course,
			tags: post.tags
				? post.tags
						.replace(/[{}"]/g, "")
						.split(",")
						.map((tag) => tag.trim())
				: [],
			timestamp: post.timestamp.toISOString(),
			title: post.title,
			summary: post.summary,
			post_type: post.post_type,
			upvotes: post.upvotes,
			downvotes: post.downvotes,
			replies: [],
		}));

		const repliesQueryResult = await pool.query("SELECT * FROM replies");
		const repliesData = repliesQueryResult.rows.map((reply) => ({
			reply_id: reply.reply_id,
			post_id: reply.post_id,
			timestamp: reply.timestamp.toISOString(),
			summary: reply.summary,
			author_id: reply.author_id,
			author_type: reply.author_type,
			author_name: reply.author_name,
			upvotes: reply.upvotes,
			downvotes: reply.downvotes,
			parent_reply_id: reply.parent_reply_id,
			replies: [],
		}));

		const findReply = (replies, replyId) => {
			for (let reply of replies) {
				if (reply.reply_id === replyId) {
					return reply;
				}
				const foundReply = findReply(reply.replies, replyId);
				if (foundReply) {
					return foundReply;
				}
			}
		};

		repliesData.forEach((reply) => {
			if (reply.parent_reply_id === null) {
				const post = postsData.find((post) => post.post_id === reply.post_id);
				if (post) {
					post.replies.push(reply);
				}
			} else {
				const allReplies = postsData.reduce(
					(acc, post) => acc.concat(post.replies),
					[]
				);
				const parentReply = findReply(allReplies, reply.parent_reply_id);
				if (parentReply) {
					parentReply.replies.push(reply);
				}
			}
		});

		return postsData;
	} catch (error) {
		console.error("Error fetching posts data by tags:", error.message);
		throw error;
	}
};

const getTopCategories = async () => {
	try {
		const res = await pool.query(
			`
		SELECT category, COUNT(category) AS count
		FROM courses
		GROUP BY category
		ORDER BY count DESC
		LIMIT 8
		`
		);
		// get the description for each category from the category table
		const categories = res.rows;
		const categoriesWithDescription = [];
		for (const category of categories) {
			const categoryDescription = await pool.query(
				"SELECT description FROM categories WHERE name = $1",
				[category.category]
			);
			categoriesWithDescription.push({
				category: category.category,
				count: category.count,
				description: categoryDescription.rows[0].description,
			});
		}

		// The array is sorted by the count in descending order
		return categoriesWithDescription;
	} catch (err) {
		console.error(err);
		// Handle the error appropriately, e.g., throw an error or return a default value
		return null;
	}
};

const searchCourses = async (searchQuery) => {
	try {
		const res = await pool.query(
			`
		SELECT *
		FROM courses
		WHERE course_title ILIKE $1
		`,
			["%" + searchQuery + "%"]
		);
		return res.rows;
	} catch (err) {
		console.error(err);
		// Handle the error appropriately, e.g., throw an error or return a default value
		return null;
	}
};

const getUserType = async (user_id) => {
	try {
		const res = await pool.query(
			`
		SELECT access_level FROM users WHERE user_id = $1
		`,
			[user_id]
		);

		const userType = res.rows[0].access_level;
		if (userType === "user") return "user";
		else if (userType === "content_creator") return "content_creator";
		else if (userType === "admin") return "admin";

		return null;
	} catch (err) {
		console.error(err);

		return null;
	}
};

const upvotePost = async (post_id, user_id) => {
	// check in the post_reaction table (user_id, post_id, reaction_type) to check whether the user has already upvoted or downvoted the post
	// if the the upvoted then don't do anything
	// if the user has downvoted then update the reaction_type to upvote and downvotes to downvotes - 1, upvotes to upvotes + 1
	try {
		const res = await pool.query(
			`
		SELECT reaction_type FROM post_reaction WHERE user_id = $1 AND post_id = $2
		`,
			[user_id, post_id]
		);

		if (res.rows.length === 0) {
			// if the user has not reacted to the post yet
			await pool.query(
				`
			INSERT INTO post_reaction (user_id, post_id, reaction_type)
			VALUES ($1, $2, $3)
			`,
				[user_id, post_id, "upvote"]
			);

			await pool.query(
				`
			UPDATE posts
			SET upvotes = upvotes + 1
			WHERE post_id = $1
			`,
				[post_id]
			);
		} else {
			// if the user has already reacted to the post
			if (res.rows[0].reaction_type === "downvote") {
				await pool.query(
					`
				UPDATE post_reaction
				SET reaction_type = $1
				WHERE user_id = $2 AND post_id = $3
				`,
					["upvote", user_id, post_id]
				);
				await pool.query(
					`
				UPDATE posts
				SET upvotes = upvotes + 1, downvotes = downvotes - 1
				WHERE downvotes > 0 AND post_id = $1
				`,
					[post_id]
				);
			}
		}
	} catch (err) {
		console.error(err);
	}
};

const downvotePost = async (post_id, user_id) => {
	// check in the post_reaction table (user_id, post_id, reaction_type) to check whether the user has already upvoted or downvoted the post
	// if the the downvoted then don't do anything
	// if the user has upvoted then update the reaction_type to downvote and upvotes to upvotes - 1, downvotes to downvotes + 1
	try {
		const res = await pool.query(
			`
		SELECT reaction_type FROM post_reaction WHERE user_id = $1 AND post_id = $2
		`,
			[user_id, post_id]
		);

		if (res.rows.length === 0) {
			// if the user has not reacted to the post yet
			await pool.query(
				`
			INSERT INTO post_reaction (user_id, post_id, reaction_type)
			VALUES ($1, $2, $3)
			`,
				[user_id, post_id, "downvote"]
			);

			await pool.query(
				`
			UPDATE posts
			SET downvotes = downvotes + 1
			WHERE post_id = $1
			`,
				[post_id]
			);
		} else {
			// if the user has already reacted to the post
			if (res.rows[0].reaction_type === "upvote") {
				await pool.query(
					`
				UPDATE post_reaction
				SET reaction_type = $1
				WHERE user_id = $2 AND post_id = $3
				`,
					["downvote", user_id, post_id]
				);
				await pool.query(
					`
				UPDATE posts
				SET upvotes = upvotes - 1, downvotes = downvotes + 1
				WHERE upvotes > 0 AND post_id = $1
				`,
					[post_id]
				);
			}
		}
	} catch (err) {
		console.error(err);
	}
};

const getUpDownVotes = async (post_id) => {
	try {
		const res = await pool.query(
			`
		SELECT upvotes, downvotes FROM posts WHERE post_id = $1
		`,
			[post_id]
		);

		return res.rows[0];
	} catch (err) {
		console.error(err);
	}
};

const savePost = async (post_id, user_id) => {
	// There is a field named saved_posts[] in the users table
	// insert the post_id in that field, but make sure that, the post_id is not already in the array

	try {
		const res = await pool.query(
			`
		SELECT saved_posts FROM users WHERE user_id = $1
		`,
			[user_id]
		);

		if (res.rows[0].saved_posts === null) {
			await pool.query(
				`
			UPDATE users
			SET saved_posts = $1
			WHERE user_id = $2
			`,
				[[post_id], user_id]
			);
		} else {
			const savedPosts = res.rows[0].saved_posts;

			if (!savedPosts.includes(post_id)) {
				await pool.query(
					`
				UPDATE users
				SET saved_posts = array_append(saved_posts, $1)
				WHERE user_id = $2
				`,
					[post_id, user_id]
				);
				return "success";
			}
		}

		return "duplicate";
	} catch (err) {
		console.error(err);
		return null;
	}
};

const getSavedPosts = async (user_id) => {
	try {
		const res = await pool.query(
			`
		SELECT saved_posts FROM users WHERE user_id = $1
		`,
			[user_id]
		);

		// Fetch data from the posts table using the post_id
		const post_ids = res.rows[0].saved_posts;

		const savedPosts = [];
		for (const post_id of post_ids) {
			const res1 = await pool.query(
				`
			SELECT * FROM posts WHERE post_id = $1
			`,
				[post_id]
			);
			const post = res1.rows[0];
			const postData = {
				post_id: post.post_id,
				author_id: post.author_id,
				author_type: post.author_type,
				author_name: post.author_name,
				course: post.course,
				tags: post.tags
					? post.tags
							.replace(/[{}"]/g, "")
							.split(",")
							.map((tag) => tag.trim())
					: [],
				timestamp: post.timestamp.toISOString(),
				title: post.title,
				summary: post.summary,
				post_type: post.post_type,
				upvotes: post.upvotes,
				downvotes: post.downvotes,
				replies: [],
			};

			savedPosts.push(postData);
		}
		return savedPosts;
	} catch (err) {
		console.error(err);
	}
};

const removeSavedPost = async (post_id, user_id) => {
	try {
		const res = await pool.query(
			`
		SELECT saved_posts FROM users WHERE user_id = $1
		`,
			[user_id]
		);

		const savedPosts = res.rows[0].saved_posts;
		console.log("savedPosts: ");
		console.log(savedPosts);
		console.log("Post id: ", post_id);

		if (savedPosts.includes(parseInt(post_id))) {
			console.log("Post id found in the saved_posts array");
			await pool.query(
				`
			UPDATE users
			SET saved_posts = array_remove(saved_posts, $1)
			WHERE user_id = $2
			`,
				[post_id, user_id]
			);

			return "success";
		}
	} catch (err) {
		console.error(err);
		return null;
	}
};

const getMyPosts = async (user_id) => {
	try {
		const res = await pool.query(
			`
		SELECT * FROM posts WHERE author_id = $1
		`,
			[user_id]
		);

		const myPosts = res.rows.map((post) => ({
			post_id: post.post_id,
			author_id: post.author_id,
			author_type: post.author_type,
			author_name: post.author_name,
			course: post.course,
			tags: post.tags
				? post.tags
						.replace(/[{}"]/g, "")
						.split(",")
						.map((tag) => tag.trim())
				: [],
			timestamp: post.timestamp.toISOString(),
			title: post.title,
			summary: post.summary,
			post_type: post.post_type,
			upvotes: post.upvotes,
			downvotes: post.downvotes,
			replies: [],
		}));

		return myPosts;
	} catch (err) {
		console.error(err);
		return null;
	}
};


const deletePost = async (post_id) => {
	try {
		await pool.query(
			`
		DELETE FROM posts WHERE post_id = $1
		`,
			[post_id]
		);

		return "success";
	} catch (err) {
		console.error(err);
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
	markLecture,
	getCoursesEnrolled,
	getCategories,
	getRecommendedCourses,
	getAllCourses,
	getAllTags,
	getUserNotificationData,
	getAdminNotificationData,
	addLesson,
	addLessonToPendingCourses,
	getAccessLevel,
	getAdminCoursesData,
	getUploadReviewData,
	DeleteReviewLesson,
	approveLesson,
	approveLesson,
	fetchQuizData,
	fetchQuestionData,
	addUserAnswer,
	addAiInfo,
	getResultsSummaryForLecture,
	getLectureCount,
	isLectureViewed,
	removeCourse,
	addUserPost,
	getContentCreator,
	fetchPostsData,
	addReply,
	unregisterCourse,
	getTopCategories,
	getFieldOptionData,
	getRecommended_Courses,
	searchCourses,
	fetchPostsDataByTypes,
	fetchPostsDataByCourse,
	fetchPostsDataByTags,
	getUserType,
	upvotePost,
	downvotePost,
	getUpDownVotes,
	savePost,
	getSavedPosts,
	removeSavedPost,
	getMyPosts,
	deletePost,
  getCCInfo,
  getSiteStats,
};
