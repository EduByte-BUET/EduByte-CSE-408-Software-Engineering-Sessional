const express = require('express');
const app = express();
const router = express.Router();
app.use(router);

router.route('/')
    .get((req, res) => {
        res.render('lecture_content');
    })

module.exports = router;