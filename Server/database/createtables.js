let { pool } = require("pg");

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
    quizzes: "quizzes"
}

const createUsersTable = async () => {
	// Create the users table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
            CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
			fullname VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
			email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(500) NOT NULL,
			institution VARCHAR(100) NOT NULL,
			experience VARCHAR(100) NOT NULL,
			goal VARCHAR(100) NOT NULL,
			interests VARCHAR(100)[] NOT NULL
            )
        `, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("USERS Table creation successful");
		}
	);
};

const createContentCreatorTable = async () => {
    // Create the content_creator table if it doesn't exist
    // SERIAL - auto-incrementing integer
    await pool.query(
        `
            CREATE TABLE IF NOT EXISTS content_creator (
            creator_id SERIAL PRIMARY KEY,
            fullname VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL
            );
        `, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("CONTENT_CREATOR Table creation successful");
        });
};
        

const createCourseTable = async () => {
	// Create the courses table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS courses (
			course_id SERIAL PRIMARY KEY,
			course_title TEXT NOT NULL,
			total_blocks INT DEFAULT 0,
			total_lectures INT DEFAULT 0,
			total_lessons INT DEFAULT 0,
			total_quizzes INT DEFAULT 0,
            total_enrolled INT DEFAULT 0,
			description TEXT,
			is_live BOOLEAN DEFAULT FALSE,
			difficulty_level VARCHAR(100),                 -- 'beginner', 'intermediate', 'advanced'
			thumbnail_url TEXT,                                  -- URL for course image
			estimated_duration INT,                            -- Duration in minutes
			tags TEXT,                                              -- Could be a comma-separated list of tags/keywords
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITHOUT TIME ZONE,
			category VARCHAR(255)
		);
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("COURSES Table creation successful");
		}
	);
}

const createBlocksTable = async () => {
	// Create the blocks table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS blocks (
			block_id SERIAL PRIMARY KEY,
			course_id INT REFERENCES courses(course_id),
			title VARCHAR(255) NOT NULL,
			description TEXT,
			is_live BOOLEAN DEFAULT FALSE,
			serial_number INT,
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITHOUT TIME ZONE
		);
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("BLOCKS Table creation successful");
		}
	);
}

const createLectureTable = async () => {
	// Create the lectures table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS lectures (
			lecture_id SERIAL PRIMARY KEY,
			block_id INT REFERENCES blocks(block_id),
			title VARCHAR(255) NOT NULL,
			description TEXT,              -- Main content of the lecture
			is_live BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITHOUT TIME ZONE,
			last_access TIMESTAM WITHOUT TIME ZONE
		);
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("LECTURES Table creation successful");
		}
	);
}

const createLessonTable = async () => {
	// Create the lessons table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS lessons (
			lesson_id SERIAL PRIMARY KEY,
			lecture_id INT REFERENCES lectures(lecture_id),
			creator_id INT REFERENCES content_creator(creator_id),		
			title VARCHAR(255) NOT NULL,
			description TEXT,                                                          -- Main content of the lesson,
			duration INT,                                                            -- Duration of the lesson (e.g., in minutes)
			is_live BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
			updated_at TIMESTAMP WITHOUT TIME ZONE
		);
		
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("LESSONS Table creation successful");
		}
	);
}

const createEnrolledCoursesTable = async () => {
	// Create the enrolled_courses table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS enrolled_courses (
			user_id INT,
			course_id INT,
			enroll_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
			feedback TEXT,
			rating DECIMAL(2, 1),
			enrollment_status VARCHAR(100),                                         -- 'active', 'completed', 'dropped'
			last_activity TIMESTAMP WITHOUT TIME ZONE,
			PRIMARY KEY (user_id, course_id)
		);
		
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("ENROLLED_COURSES Table creation successful");
		}
	);
}

const createRecommendedCoursesTable = async () => {
	// Create the recommended_courses table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS recommended_courses (
			user_id INT REFERENCES users(user_id),
			course_id INT REFERENCES courses(course_id),
			interest_tags TEXT,                                                         -- Tags related to the user's interests
			recommendation_strength VARCHAR(100),                          -- 'high', 'medium', 'low'
			user_engagement_level VARCHAR(100),                         -- Could be based on user's activity,      
			PRIMARY KEY (user_id, course_id)
		);
		
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("RECOMMENDED_COURSES Table creation successful");
		}
	);
}

const createQuizTable = async () => {
    // Create the quizzes table if it doesn't exist
    // SERIAL - auto-incrementing integer
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS quizzes (
            quiz_id SERIAL PRIMARY KEY,
            lecture_id INT REFERENCES lessons(lesson_id),
            quiz_title VARCHAR(255) NOT NULL,
            quiz_description TEXT,
            quiz_type VARCHAR(100),                                                 -- 'graded', 'ungraded'
            quiz_duration INT,                                                        -- Duration of the quiz (e.g., in minutes)
            quiz_pass_score DECIMAL(5, 2),                                     -- Pass score for the quiz
            quiz_questions TEXT,                                                    -- Could be a JSON string
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITHOUT TIME ZONE
        );
        
        `, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("QUIZZES Table creation successful");
        }
    );

}


const createCourseProgressTable = async () => {
	// Create the course_progress table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS course_progress (
			user_id INT REFERENCES users(user_id),
			course_id INT REFERENCES courses(course_id),
			block_id INT[],
			lecture_id INT[],
			lesson_id INT[],
			-- quiz_id INT REFERENCES quizzes(quiz_id),
			quiz_attempts INT, -- Number of quiz attempts within the lecture
			quiz_score DECIMAL(5, 2), -- Latest or highest quiz score		
			PRIMARY KEY (user_id, course_id)
		);
		
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("COURSE_PROGRESS Table creation successful");
		}
	);
}

const createCategogoriesTable = async () => {
	// Create the categories table if it doesn't exist
	// SERIAL - auto-incrementing integer
	await pool.query(
		`
		CREATE TABLE IF NOT EXISTS categories (
			category_id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			description TEXT,
			courses INT[] -- Array of course_id
		);
		
		`, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("CATEGORIES Table creation successful");
		}
	);
}

const createUserNotificationTable = async () => {
  // Create the user_notification table if it doesn't exist
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS user_notification (
      notification_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(user_id),
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      notification_type VARCHAR(50),
      date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) DEFAULT 'Unread'
    );
  `,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("USER_NOTIFICATION Table creation successful");
    }
  );
};


const createAdminNotificationTable = async () => {
  // Create the admin_notification table if it doesn't exist
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS admin_notification (
      notification_id SERIAL PRIMARY KEY,
      admin_id INT NOT NULL REFERENCES content_creator(creator_id),
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      notification_type VARCHAR(50),
      date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) DEFAULT 'Unread'
    );
  `,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("ADMIN_NOTIFICATION Table creation successful");
    }
  );
};

const createCourseRequestTable = async () => {
  // Create the course_request table if it doesn't exist
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS course_request (
      request_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(user_id), 
      request_type VARCHAR(50)  NULL,
      topic VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      request_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) DEFAULT 'Pending' 
    );
    `,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("COURSE_REQUEST Table creation successful");
    }
  );
};

const dropTable = async (table_name) => {
    await pool.query(
        `DROP TABLE IF EXISTS ${table_name};`,
        (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`${table_name} Table dropped successfully`);
        }
    );
}

const initDB = async (newPool) => {
  pool = newPool;

  // await dropTable(tables.courses);
  // await createUsersTable();
  // await createContentCreatorTable();
  // await createCourseTable();
  // await createBlocksTable();
  // await createLectureTable();
  // await createLessonTable();
  // await createEnrolledCoursesTable();
  // await createRecommendedCoursesTable();
  // await createQuizTable();
  // await createCourseProgressTable();
  // await createCategogoriesTable();
   //await createUserNotificationTable();
  //await createAdminNotificationTable();
  //  await createCourseRequestTable();
}

module.exports = {
    initDB
};