const express = require("express");
const router = express.Router();

const db = require("../database/db");

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
		}
		else {
			res.status(200).send();
		}
		console.log("response from /user/signin GET", username);
	})

router.post("/", async (req, res) => {
		console.log("user/signup POST");
    
		userInfo = req.body.updatedUserInfo;
		console.log(userInfo);


    // req.session.userid = username; // This creates a session ID for the user
		res.status(200); // OK
		res.json({
			message: "signup request received",
			verdict: "success",
		});
		
		try { 
			await db.addUser(userInfo);
			console.log("Successfully saved user info to database");
		}
		catch (err) {
			console.log("Error in saving userinfo to database");
		}
	});


module.exports = router;
