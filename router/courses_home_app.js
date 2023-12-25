const infoPool = require("../info/infopool");
const express = require("express");
const app = express();
const router = express.Router();
app.use(router);

function generateCategories() {
    categorylist = [];
  
    catname = [
      "Programming and Development",
      "Artificial Intelligence",
      "Computer Networks",
      "Cyber Security",
      "Cloud Computing",
      "Software Development",
      "Game Development",
      "Concrete Mathematics",
      "Discrete Mathematics",
      "Data Structure and Algorithms",
    ];
  
    courselist = ["course1", "course2"]; // fetched from db
    catname.forEach((categoryname) => {
      category = { categoryname, courselist };
      categorylist.push(category);
    });
  
    return categorylist;
  }
  // categorylist = generateCategories();

router
  .route("/")
  .get(async (req, res) => {
    popularlist = await infoPool.getPopularCourses();

    categorylist = [];
    mycourselist = await infoPool.getMyCourseList(req.session.user_id);

    list = await infoPool.courseCategory();

    for (const elem of list) {
      const courselist = await infoPool.getCourseListFromCategory(
        elem.CATEGORY
      );
      const category = { categoryname: elem, courselist };
      categorylist.push(category);
    }

    res.render("course_home", {
      data: {
        categorylist,
        mycourselist,
        popularlist,
        username: "peray achi vai",
      },
    });
  })
  .post(async (req, res) => {
    // Access the data sent from the frontend
    const selected_course = req.body.selected_course;
    console.log(selected_course);

    const course_id = await infoPool.getCourseId(selected_course);
    const course_desc = await infoPool.getCourseDescription(
      course_id[0].COURSEID
    );
    console.log(course_desc);
    // Process the data and send a response
    // For example, send it back to the frontend
    //   res.json({data: course_desc[0]});
    req.session.course_desc = course_desc[0];
    res.redirect(`/course_desc`); // page changed from ajax at course_home
  });

module.exports = router;