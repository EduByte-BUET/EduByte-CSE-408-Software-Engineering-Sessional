const express = require("express");
const router = express.Router();
const preferences_router = express.Router();

router.use('/preferences', preferences_router);
// router.use(express.json());
// signin Credentials
// Name, Email, Username, Password

router
	.route("/") // when a client hits /login, come to this router
	.get(async (req, res) => {
		console.log("/user/signin GET");
		res.send("response from /user/signin GET");
	})
	.post(async (req, res) => {
		console.log("user/signin POST");
		const [name, email, username, password] = [
      req.body.name,
      req.body.email,
			req.body.username,
			req.body.password,
		];
    req.session.userid = username; // This creates a session ID for the user
		res.status(200); // OK
		res.json({
			message: "signup request received",
			username: username,
			verdict: "success",
		});
	});

preferences_router
  .route("/")
  .get(async (req, res) => {
    console.log("/user/signup/preferences GET");
    res.send("response from /user/preferences GET");
  })
  .post(async (req, res) => {
    console.log("/user/preferences POST");
    const [institution, experience, goal, preferences] = [
      req.body.institution,
      req.body.experience,
      req.body.goal,
      req.body.preferences,
    ];
    res.status(200); // OK
    res.json({
      message: "preferences request received",
      userid: "Dummy UserID",
      verdict: "success",
    });
  });


module.exports = router;
