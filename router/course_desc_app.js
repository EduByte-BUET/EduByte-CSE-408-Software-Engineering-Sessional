const infoPool = require("../info/infopool");
const express = require('express');
const app = express();
const router = express.Router();
app.use(router);

router.route('/')
    .get(async (req, res) => {
        const cdesc = req.session.course_desc;
        const course_id = await infoPool.getCourseId(cdesc.TITLE);
        const lc = await infoPool.getLearnerCount(course_id[0].COURSEID);
        
        console.log("Course desc: " , lc);

        req.session.course_id = course_id[0].COURSEID;

        res.render('course_desc', {
            data: {
                coursename: cdesc.TITLE,
                total_contents: cdesc.TOTAL_CONTENTS,
                avg_duration: cdesc.AVG_DURATION,
                learner_count: lc[0].ENROLLED
            }
        });
        console.log("Now here");
    })

module.exports = router;