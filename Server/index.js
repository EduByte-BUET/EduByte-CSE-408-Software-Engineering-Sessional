// const infoPool = require("./info/infopool");
// infoPool.connectToDB();

// const bodyParser = require("body-parser");
const express = require("express");
const app = express();

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
// const bodyparser = require("body-parser");
// const session = require("express-session");
const signup_router = require("./routers/SignupRouter");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );

// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/signup", signup_router);

app.listen(3000, () => {
  console.log("Listening on server: 3000");
});
