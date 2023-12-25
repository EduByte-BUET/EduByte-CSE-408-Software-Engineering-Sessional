const infoPool = require("../info/infopool");
const express = require("express");
const app = express();
const router = express.Router();
app.use(router);

router
  .route("/") // when a client hits /login, come to this router
  .get((req, res) => {
    res.render("login", {
      message: "",
    });
  })
  .post(async (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;

    console.log(username + " " + pass);

    const data = await infoPool.getUserInfo(username, pass);
    console.log(data);

    try {
      if (data.length != 0) {
        // user provided correct credentials
        req.session.validUser = true;
        req.session.username = username;
        console.log(data);

        auth_type = data[0].AUTH_TYPE;
        if (auth_type == 'user') {
          req.session.user_id = data[0].USER_ID;

          res.redirect("/");
        }
        else if(auth_type == "creator") {
          req.session.user_id = data[0].USER_ID;

          res.redirect("/content_creator");
        }
        
      } else {
        return res.render("login", {
          message: "Incorrect Email or Password",
        });
      }
    } catch {
      console.log("Error in loggin in!!");
    }
  });

module.exports = router;
