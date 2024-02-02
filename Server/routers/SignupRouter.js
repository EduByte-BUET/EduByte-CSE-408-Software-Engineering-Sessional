const express = require("express");
const router = express.Router();

const db = require("../database/db");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

// signin Credentials
// fullname, Email, Username, Password, Retype Password, Institution, Experience, Goal, Interests
let userInfo = {
	fullname: "",
	email: "",
	username: "",
	password: "",
	institution: "",
	experience: "",
	goal: "",
	interests: [],
};

// Router chaining ekhane problem create kore .route("/"), same route e mount kore but get and post route alada ekhane
router.get("/:username", async (req, res) => {
	console.log("/user/signup GET");

	const username = req.params.username;

	const db_response = await db.checkUsername(username);
	console.log("DB Response", db_response);
	if (db_response) {
		res.status(409).send(); // only send the status
	} else {
		res.status(200).send();
	}
	console.log("response from /user/signin GET", username);
});

router.post("/", async (req, res) => {
	console.log("user/signup POST");

	userInfo = req.body.updatedUserInfo;
	console.log(userInfo);

	const hashedPassword = await hashPassword(userInfo.password);
	userInfo.password = hashedPassword;

	try {
		await db.addUser(userInfo);

		// Username is unique, so we can use it as the user ID
		req.session.username = userInfo.username;

		res.status(200).send();
	} catch (err) {
		res.status(409).send();
	}
});

module.exports = router;
