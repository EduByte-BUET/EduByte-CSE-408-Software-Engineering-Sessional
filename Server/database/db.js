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
  questions: "questions",
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
			`SELECT * FROM course_progress WHERE user_id = $1 AND course_id = $2;`,
			[user_id, course_id]
		);

		if (result.rows.length === 0) {
			await pool.query(
				`INSERT INTO course_progress (user_id, course_id, lesson_id, lecture_id, block_id) VALUES ($1, $2, $3, $4, $5);`,
				[user_id, course_id, lessonIds, [lecture_id], [block_id]] // Convert lecture_id and block_id to arrays
			);
			console.log("New lesson, lecture, and block marked");
			return "success";
		} else {
			await pool.query(
				`UPDATE course_progress
          		SET lesson_id = lesson_id || $1, -- Concatenate arrays
          		lecture_id = lecture_id || $2,
          		block_id = block_id || $3
          		WHERE user_id = $4 AND course_id = $5;`,
				[lessonIds, [lecture_id], [block_id], user_id, course_id] // Convert lecture_id and block_id to arrays
			);

			console.log("Lesson, lecture, and block marked successfully");
			return "success";
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
    if (!courseId) {
      const courseInsertResult = await pool.query(
        "INSERT INTO courses (course_title, description) VALUES ($1, $2) RETURNING course_id",
        [course.course_title, course.description]
      );
      courseId = courseInsertResult.rows[0].course_id;
    }

    let blockId = block.block_id;
    if (!blockId) {
      const blockInsertResult = await pool.query(
        "INSERT INTO blocks (course_id, title, description) VALUES ($1, $2, $3) RETURNING block_id",
        [courseId, block.title, block.description]
      );
      blockId = blockInsertResult.rows[0].block_id;
    }

    let lectureId = lecture.lecture_id;
    if (!lectureId) {
      const lectureInsertResult = await pool.query(
        "INSERT INTO lectures (block_id, title, description) VALUES ($1, $2, $3) RETURNING lecture_id",
        [blockId, lecture.title, lecture.description]
      );
      lectureId = lectureInsertResult.rows[0].lecture_id;
    }

    const lessonInsertResult = await pool.query(
      "INSERT INTO lessons (lecture_id, creator_id, title, description, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING lesson_id",
      [lectureId, lesson.creator_id, lesson.title, lesson.description]
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
      lesson.creator_id,
    ];

    await pool.query(
      "INSERT INTO pending_courses (creator_id, course_id, course_title, course_description, block_id, block_title, block_description, lecture_id, lecture_title, lecture_description, lesson_title, lesson_description, file_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
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
        course_id: row.course_id || "",
        course_title: row.course_title || "",
        description: row.course_description || "",
      };

      const block = {
        block_id: row.block_id || "",
        title: row.block_title || "",
        description: row.block_description || "",
      };

      const lecture = {
        lecture_id: row.lecture_id || "",
        title: row.lecture_title || "",
        description: row.lecture_description || "",
      };

      const lesson = {
        title: row.lesson_title || "",
        description: row.lesson_description || "",
        file_url: row.file_url || "",
        creator_id: row.creator_id || "",
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

// Quiz section
const fetchQuizData = async () => {
    try {
        await pool.query("BEGIN");

        const queryText = 'SELECT * FROM quizzes WHERE quiz_id = $1';
        console.log(queryText);
        const queryValues = [1]; // Assuming quiz_id = 1

        // const result = await pool.query(queryText, queryValues);

        // await pool.query("COMMIT");

        // const quizData = result.rows[0];

        // return {
        //     quiz_id: quizData.quiz_id,
        //     lecture_id: quizData.lecture_id,
        //     quiz_title: quizData.quiz_title,
        //     quiz_duration: quizData.quiz_duration,
        //     quiz_type: quizData.quiz_type,
        //     quiz_description: JSON.parse(quizData.quiz_description),
        //     quiz_pass_score: quizData.quiz_pass_score,
        //     quiz_questions: JSON.parse(quizData.quiz_questions)
        };
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error('Error fetching quiz data:', error);
        throw error;
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
const getAdminNotificationData = async (admin_id) => {
  try {
    // Query to fetch the data from the tables
    const res = await pool.query(
      "SELECT * FROM admin_notification WHERE admin_id = $1",
      [admin_id]
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
	markLesson: markLecture,
	getMyCoursesData,
	getCategories,
	getRecommendedCourses,
	getAllCourses,
	getUserNotificationData,
	getAdminNotificationData,
	addLesson,
	addLessonToPendingCourses,
  getAccessLevel,
	approveLesson,
	fetchQuizData,

};
