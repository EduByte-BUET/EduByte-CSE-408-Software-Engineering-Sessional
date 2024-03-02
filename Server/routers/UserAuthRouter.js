const express = require("express");
const requireAuth = require("./RequireAuth");


const userAuthRouter = express.Router();
userAuthRouter.use(requireAuth);

userAuthRouter.get("/auth", (req, res) => {
    console.log("GET /user/auth METHOD");

    res.status(200).send(true);
});

module.exports = userAuthRouter;