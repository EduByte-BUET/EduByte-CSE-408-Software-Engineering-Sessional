const express = require('express');
const app = express();
const router = express.Router();
app.use(router);

router.route('/')
    .get((req, res) => {
        console.log("Hi here");
        res.render('content_creator');
    });

module.exports = router;