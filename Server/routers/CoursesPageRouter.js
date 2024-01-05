const express = require("express");
const router = express.Router();
const courses_router = express.Router();

router.use("/", courses_router);

courses_router
    .route("/")
	.get(async (req, res) => {
        console.log("/courses GET");

        // A sample json response is given below
        const courseid = req.query.courseid;
        // Get data from database using courseid
        courseinfo = 
        {
            "course_id": 1,
            "course_name": "Data Science Fundamentals",
            "course_description": "An introduction to the basic concepts of data science.",
            "instructor_name": "Prof. John Smith",
            "total_lectures": 12,
            "total_enrolled_students": 150,
            "start_date": "2023-06-01",
            "end_date": "2023-07-15",
            "tags": ["data science", "statistics"]
        }

        if (Object.keys(courseinfo).length > 0) res.status(200); // OK
        else res.status(404); // Not found
        res.json(courseinfo);
    });
    
module.exports = router;
