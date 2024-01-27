const path = require("path");
const fs = require("fs").promises;

const express = require("express");
const router = express.Router();
const signin_router = express.Router();
const bg_router = express.Router();

router.use("/", signin_router);
router.use("/bg", bg_router);

// router.use(express.json());
// signin Credentials
// Name, Email, Username, Password

signin_router
	.route("/") // when a client hits /login, come to this router
	.get(async (req, res) => {
		console.log("/user/signin GET");
		res.send("response from /user/signin GET");
	})
	.post(async (req, res) => {
		console.log("user/signin POST");
		const [username, password] = [
			req.body.username,
			req.body.password,
		];
		console.log("Serverside: ", username, password);
		res.status(200); // OK
		res.json({
			message: "login request received",
			verdict: "success",
		});

		// const data = await infoPool.getUserInfo(username, pass);
		// console.log(data);

		// try {
		//   if (data.length != 0) {
		//     // user provided correct credentials
		//     req.session.validUser = true;
		//     req.session.username = username;
		//     console.log(data);

		//     auth_type = data[0].AUTH_TYPE;
		//     if (auth_type == 'user') {
		//       req.session.user_id = data[0].USER_ID;

		//       res.redirect("/");
		//     }
		//     else if(auth_type == "creator") {
		//       req.session.user_id = data[0].USER_ID;

		//       res.redirect("/content_creator");
		//     }

		//   } else {
		//     return res.render("login", {
		//       message: "Incorrect Email or Password",
		//     });
		//   }
		// } catch {
		//   console.log("Error in loggin in!!");
		// }
	});

bg_router.route("/").get(async (req, res) => {
	console.log("/bg GET");

	const bg_path = path.join(__dirname, "../public/images/background_signup.jpg");
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

module.exports = router;
