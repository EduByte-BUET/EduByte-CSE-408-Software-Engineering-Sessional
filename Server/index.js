const db = require("./database/db");
db.connectToDB();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

const signup_router = require("./routers/SignupRouter");
const signin_router = require("./routers/SigninRouter");
const dashboard_router = require("./routers/DashboardRouter");
const courses_page_router = require("./routers/CoursesPageRouter");
const home_page_router = require("./routers/HomePageRouter");
const exam_page_router = require("./routers/ExamPageRouter");
const discussion_page_router = require("./routers/DiscussionPageRouter");
const content_create_router = require("./routers/ContentCreateRouter");
const result_gen_router = require("./routers/ResultGenerator");
const userAuthRouter = require("./routers/UserAuthRouter");
const sslcommerzRouter = require("./routers/SSLCommerz");

app.use(
	cors({
		origin: "http://localhost:5173", // replace with your frontend url
		credentials: true,
	})
);

app.use(
	session({
		secret: "this a secret mate",
		cookie: {
			maxAge: 30 * 60 * 1000, // expires in 15 mins
			httpOnly: true,
			secure: false,
		},
		// Session saving options
		saveUninitialized: false, // don't save the initial session if the session object is unmodified (i.e the user did not log in)
		resave: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ------------------------------------------------
app.use("/user/signup", signup_router);
app.use("/user/signin", signin_router);
app.use("/dashboard", dashboard_router);
app.use("/courses", courses_page_router);
app.use("/home", home_page_router);
app.use("/exam", exam_page_router);
app.use("/discussion", discussion_page_router);
app.use("/content-create", content_create_router);
app.use("/generate",result_gen_router);
app.use("/user", userAuthRouter);
app.use("/donate", sslcommerzRouter);
// -----------------------------------------------

app.listen(3000, () => {
	db.createTables(); // Initialize the db when the server starts

	console.log("Listening on server: 3000");
});
