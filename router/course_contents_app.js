const infopool = require("../info/infopool");
const express = require("express");
const app = express();
const router = express.Router();
app.use(router);

// categoryname = 'Development';
// coursename = 'Introduction to programming';
// block = {blockno: 1, blockname: 'Different programming languages'};
// blocklist = [block]

lecturelist = ["lecturename"];

router.route("/").get(async (req, res) => {
  // Comes here after clicking start
  const course_id = req.session.course_id;
  const user_id = req.session.user_id;

  let isEnrolled = await infopool.isEnrolled(course_id, user_id);
  isEnrolled = isEnrolled[0].HAS_ENROLLED;

  if (isEnrolled == 0) {
    let today = new Date().toLocaleDateString();
    await infopool.addCourse(course_id, user_id, today);
  }
  // already enrolled here
  // Get block information
  const blocks = await infopool.getCourseBlocks(course_id);
  const nameandcat = await infopool.getCourseDescription(course_id);
  const coursename = nameandcat[0].TITLE;
  const categoryname = nameandcat[0].CATEGORY;
  const lecturecount = nameandcat[0].TOTAL_CONTENTS;

  blocklist = [];
  for (const elem of blocks) {
    blockno = elem.SERIAL;
    blockname = elem.TITLE;
    blocklist.push({blockno, blockname});
  }

  res.render("course_contents", {
    data: {
      blocklist,
      lecturelist,
      coursename,
      lecturecount,
      categoryname,
    },
  });
})
.post(async (req, res) => {
  const blocktitle = req.body.selected_block;

  const lecturelist = await infopool.getLectureInfoFromBlock(blocktitle);
  console.log(blocktitle);

  res.json({ lecturelist });
});

module.exports = router;
