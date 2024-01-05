// /exam?courseid=1&lectureid=1
// exam/quiz
const express = require("express");
const router = express.Router();
const courses_router = express.Router();

router.use("/", courses_router);

courses_router.route("/").get(async (req, res) => {
	console.log("/home GET");
    const courseid = req.query.courseid;
    const lectureid = req.query.lectureid;
    // console.log(courseid, lectureid);
	// A sample json response is given below
	// Get exam data from database using courseid and lectureid
    // This info is found from the database
    examinfo =
    {
        "status": "success",
        "message": "Quizzes for the specific lecture retrieved successfully.",
        "course_id": 1,
        "lecture_id": 1,
        "quizzes": [
          {
            "quiz_id": 101,
            "title": "Math Quiz 1",
            "type": "written",
            "creator": "John Doe",
            "difficulty": "Intermediate",
            "topic": "Algebra",
            "duration": "30 minutes",
            "creation_time": "2024-01-20T09:00:00Z"
          },
          {
            "quiz_id": 102,
            "title": "Math Quiz 2",
            "type": "mcq",
            "creator": "John Doe",
            "difficulty": "Advanced",
            "topic": "Calculus",
            "duration": "45 minutes",
            "creation_time": "2024-01-21T10:30:00Z"
          }
      
        ]
      }


	if (Object.keys(examinfo).length > 0) res.status(200); // OK
    else res.status(404); // Not found
	res.json(examinfo);
});

module.exports = router;