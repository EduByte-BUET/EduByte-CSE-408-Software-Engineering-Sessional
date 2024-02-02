const path = require("path");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const db = require("../database/db");

const express = require("express");
const router = express.Router();
const signin_router = express.Router();
const bg_router = express.Router();
const logout_router = express.Router();

router.use("/", signin_router);
router.use("/logout", logout_router);
router.use("/bg", bg_router);

async function checkPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match; // true if the passwords match, false otherwise
}

signin_router.route("/")
  .post(async (req, res) => {
    console.log("user/signin POST");
    const [username, password] = [req.body.username, req.body.password];

    const usernameExists = await db.checkUsername(username);
    if (!usernameExists) {
      return res.status(401).send(); // Unauthorized
    }
    const hashedPassword = await db.getUserPassword(username);

    checkPassword(password, hashedPassword).then(match => {
      if (match) {
        console.log("Successful login", username);
        req.session.username = username;
        req.session.save(err => {
          if (err) {
            console.log(err);
            return res.status(500).send(); // Internal Server Error
          }
          return res.status(200).send(); // OK
        });
      } else {
        return res.status(401).send(); // Unauthorized
      }
    });
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

logout_router.route("/").get(async (req, res) => {
	console.log("/logout GET");
	req.session.destroy();
	res.status(200).send();
});

module.exports = router;
