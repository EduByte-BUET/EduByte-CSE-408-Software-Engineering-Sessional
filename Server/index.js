const db = require("./database/db");
db.connectToDB();

const session = require('express-session');
const express = require("express");
const cors = require('cors')

const app = express();

const signup_router = require("./routers/SignupRouter");
const signin_router = require("./routers/SigninRouter");
const dashboard_router = require("./routers/DashboardRouter");
const courses_page_router = require("./routers/CoursesPageRouter");
const home_page_router = require("./routers/HomePageRouter");
const exam_page_router = require("./routers/ExamPageRouter");
const discussion_page_router = require("./routers/DiscussionPageRouter");
const content_create_router = require("./routers/ContentCreateRouter");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public')); // Getting access to the public directory

app.use("/user/signup", signup_router);
app.use("/user/signin", signin_router);
app.use("/dashboard", dashboard_router);
app.use("/courses", courses_page_router);
app.use("/home", home_page_router);
app.use("/exam", exam_page_router);
app.use("/discussion", discussion_page_router);
app.use("/content_create", content_create_router);

app.listen(3000, () => {
  // db.createTables(); // Initialize the db when the server starts
  
  console.log("Listening on server: 3000");
});
