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
router.use("/", signin_router);
router.use("/logout", logout_router);
router.use("/bg", bg_router);
router.use("/accesslevel", accesslevel_router);

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

  checkPassword(password, hashedPassword).then((match) => {
    if (match) {
      req.session.username = username;
      req.session.access_level = access_level;

      console.log("after login ");
      console.log(" username " + req.session.username);
      console.log(" access_level " + req.session.access_level);

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
  console.log("accesslevel_router GET");

  const userAccessLevel = req.session.access_level;
  console.log("userAccessLevel in accesslevel_router   "+ userAccessLevel);
  if (!userAccessLevel) {
    return res.status(401).send(); 
  }
  else 
     return res.status(200).json({ access_level: userAccessLevel });
  }
 );

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

module.exports = router;
