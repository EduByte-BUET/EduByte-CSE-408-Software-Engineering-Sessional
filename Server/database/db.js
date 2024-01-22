const { Pool } = require("pg");

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

const initDB = async () => {
	// Create the users table if it doesn't exist
	await pool.query(
		`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            age INTEGER
            )
        `, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}

			console.log("Table creation successful");
		}
	);
};

const addUser = async (username, password) => {
	try {
		await pool.query(
			`INSERT INTO users(username, password) VALUES($1, $2)`, [username, password]
		);
		console.log('User added successfully');
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
    initDB,
	connectToDB,
    addUser,
};
