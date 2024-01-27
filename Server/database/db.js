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
    quizzes: "quizzes"
}

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "test",
	password: "postgredb",
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
}

const checkUsername = async (username) => {
	try {
		const res = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);
		console.log(res.rows[0]);
		if (res.rows[0] != undefined) {
			return true;
		}
		return false;
	}
	catch (err) {
		console.log(err);
	}
}

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
		console.log('User added successfully');
	} catch (err) {
		console.log(err);
	}
};

const getUser = async (username) => {
	try {
		const res = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);
		if (res.rows[0]) {
			return res.rows[0];
		}
		return null;
	}
	catch (err) {
		console.log(err);
	}
}

const getPopularCourses = async () => {
	try {
		const res = await pool.query(
			`SELECT * FROM ${tables.courses} ORDER BY total_enrolled DESC`
		);
		if (res.rows[0]) {
			return res.rows[0];
		}
		return null;
	}
	catch (err) {
		console.log(err);
	}
}

const getCourse = async (course_id) => {
	try {
		const res = await pool.query(
			`SELECT * FROM ${tables.courses} WHERE course_id = $1`,
			[course_id]
		);
		if (res.rows[0]) {
			return res.rows[0];
		}
		return null;
	}
	catch (err) {
		console.log(err);
	}
}

module.exports = {
    createTables,
	connectToDB,
	checkUsername,
    addUser,
	getUser,
	getCourse
};
