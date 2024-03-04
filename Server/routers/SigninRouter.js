const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const db = require("../database/db");

const express = require("express");
const router = express.Router();
const signin_router = express.Router();
const bg_router = express.Router();
const logout_router = express.Router();
const accesslevel_router = express.Router();
const fieldOption_router = express.Router();
router.use("/", signin_router);
router.use("/logout", logout_router);
router.use("/bg", bg_router);
router.use("/accesslevel", accesslevel_router);
router.use("/fieldOption", fieldOption_router);

async function checkPassword(password, hashedPassword) {
	const match = await bcrypt.compare(password, hashedPassword);
	return match; // true if the passwords match, false otherwise
}

signin_router.route("/").post(async (req, res) => {
	console.log("user/signin POST");
	const [username, password] = [req.body.username, req.body.password];

	const usernameExists = await db.checkUsername(username);
	if (!usernameExists) {
		return res.status(401).send(); // Unauthorized
	}
	const hashedPassword = await db.getUserPassword(username);
	const access_level = await db.getAccessLevel(username);
	const user = await db.getUser(username);

	checkPassword(password, hashedPassword).then((match) => {
		if (match) {
			req.session.username = username;
			req.session.access_level = access_level;
			req.session.user_id = user.user_id;

			console.log(username + "   " + access_level + " " + user.user_id);

			req.session.save((err) => {
				if (err) {
					console.log(err);
					return res.status(500).send(); // Internal Server Error
				}
				return res.status(200).json({ access_level: req.session.access_level }); // OK
			});
		} else {
			return res.status(401).send(); // Unauthorized
		}
	});
});

accesslevel_router.route("/").get(async (req, res) => {
	console.log("/user/signin/accesslevel GET");

	const userAccessLevel = req.session.access_level;
	console.log("userAccessLevel in accesslevel_router   " + userAccessLevel);
	
	if (!userAccessLevel) {
		return res.status(401).send();
	} else return res.status(200).json({ access_level: userAccessLevel });
});

bg_router.route("/").get(async (req, res) => {
	console.log("/bg GET");

	const bg_path = path.join(
		__dirname,
		"../public/images/background_signup.jpg"
	);
	console.log(bg_path);

	fs.access(bg_path)
		.then(() => {
			res.status(200);
			res.sendFile(bg_path);
		}) // OK
		.catch(() => {
			res.status(404);
			res.send("Not found");
		}); // Not found
});

logout_router.route("/").get(async (req, res) => {
	console.log("/logout GET");
	req.session.destroy();
	res.status(200).send();
});

fieldOption_router.route("/").get(async (req, res) => {
	const user_id = req.session.userid;
	let fieldOption = await db.getFieldOptionData();
	if (fieldOption == null) {
		fieldOption = {
			status: "success",
			message: "Field Option Data Received successfully.",
			fieldOptionData: [],
		};
	}
	console.log(fieldOption);
	if (Object.keys(fieldOption).length > 0) res.status(200); // OK
	else res.status(400); // Bad Request
	res.json(fieldOption);
});

module.exports = router;
