const infoPool = require("./info/infopool");
infoPool.connectToDB();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
// const login_router = require("./router/login_app");
// const signup_router = require('./router/signup_app');
// const category_router = require('./router/category_app');
const logout_router = require("./router/logout");
const courses_router = require("./router/course_desc_app");
const course_contents_router = require("./router/course_contents_app");
const block_content_router = require("./router/block_content_app");
const lecture_content_router = require("./router/lecture_content_app");
const courses_home_router = require('./router/courses_home_app');
const content_creator_router = require('./router/content_creator_app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

app.set("views", __dirname + "/views");

// // for login page
// app.use('/static_login', express.static(__dirname + '/public/login'));
// // for signup page
// app.use('/static_signup', express.static(__dirname + '/public/signup'));
// for home page
app.use("/beautify", express.static(__dirname + "/public"));

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/login", login_router); // when in /login => go to subapp login_router
// app.use('/signup', signup_router); // when in /signup => go to signup_router
app.use("/logout", logout_router);
app.use("/course_desc", courses_router);
app.use("/course_contents", course_contents_router);
app.use("/block_content", block_content_router);
app.use("/lecture_content", lecture_content_router);
app.use("/content_creator", content_creator_router);
app.use('/', courses_home_router);

// categoryname = 'artificial intelligence';
// courselist = ['course1', 'course2'];
// category2 = {categoryname, courselist};



app.get("/login", (req, res) => {
  res.render("login", {
    message: "",
  });
});

app.post("/login", async (req, res) => {
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
      if (auth_type == "user") {
        req.session.user_id = data[0].USER_ID;

        res.redirect("/");
      } else if (auth_type == "creator") {
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

app.listen(3000, () => {
  console.log("Listening on server: 3000");
});
