const express = require("express");
const router = express.Router();
const courses_router = express.Router();
const category_router = express.Router();
const block_router = express.Router();
const lecture_router = express.Router();

router.use("/", courses_router);
router.use("/category", category_router);
router.use("/blocks", block_router);
router.use("/blocks/lectures", lecture_router);

courses_router.route("/").get(async (req, res) => {
  console.log("/courses GET");
  const course_id = req.query.course_id;

  // A sample json response is given below
  // Get data from database using courseid
  coursesinfo = {
    status: "success",
    message: "Course page information retrieved successfully.",
    categories: [
      {
        category_id: 1,
        name: "Programming",
        description: "Explore the world of programming languages.",
        courses: [
          {
            course_id: 101,
            title: "JavaScript Fundamentals",
            author: "John Doe",
            total_content: 30,
            description: "Learn the basics of JavaScript programming.",
          },
          {
            course_id: 102,
            title: "Full Stack Web Development",
            author: "Jane Smith",
            total_content: 50,
            description:
              "Become a full-stack web developer with this comprehensive course.",
          },
        ],
      },
      {
        category_id: 2,
        name: "Web Development",
        description: "Build web applications and websites.",
        courses: [
          {
            course_id: 201,
            title: "Python for Data Science",
            author: "Alice Johnson",
            total_content: 40,
            description:
              "Explore data science using Python programming language.",
          },
          {
            course_id: 202,
            title: "Machine Learning Basics",
            author: "Bob Williams",
            total_content: 35,
            description:
              "Introduction to machine learning concepts and algorithms.",
          },
        ],
      },
    ],
    popular_courses: [
      {
        course_id: 101,
        title: "JavaScript Fundamentals",
        author: "John Doe",
        total_content: 30,
        description: "Learn the basics of JavaScript programming.",
      },
      {
        course_id: 102,
        title: "Full Stack Web Development",
        author: "Jane Smith",
        total_content: 50,
        description:
          "Become a full-stack web developer with this comprehensive course.",
      },
    ],
    recommended_courses: [
      {
        course_id: 201,
        title: "Python for Data Science",
        author: "Alice Johnson",
        total_content: 40,
        description: "Explore data science using Python programming language.",
      },
      {
        course_id: 202,
        title: "Machine Learning Basics",
        author: "Bob Williams",
        total_content: 35,
        description:
          "Introduction to machine learning concepts and algorithms.",
      },
    ],
  };
  course_info = {
    status: "success",
    message: "Course details retrieved successfully.",
    course: {
      course_id: 201,
      course_name: "Introduction to Programming",
      course_description:"An introduction to the basic concepts of data science. Data Science is one of the hottest topics in the 21st century.In this course, you will learn the basics of data science and statistical modeling using Python programming language.",
      instructor_name: "Prof. John Smith",
      total_lectures: 12,
      total_enrolled_students: 150,
      start_date: "2023-06-01",
      end_date: "2023-07-15",
      tags: ["data science", "statistics"],
      course_video_url: "https://www.youtube.com/embed/JL_grPUnXzY?si=mQtLZnjhMkVBdRGf",
      skills_acquired: ["Data Analysis", "Statistical Modeling"],
      author: {
        author_id: 101,
        author_name: "John Smith",
        author_bio: "Experienced data scientist and educator.",
      },
    },
  };

  let res_obj = coursesinfo;
  if (course_id) {
    res_obj = course_info;
  }
  if (Object.keys(res_obj).length > 0) res.status(200); // OK
  else res.status(404); // Not found
  res.json(res_obj);
});

category_router.route("/").get(async (req, res) => {
  console.log("/courses/category GET");
  const category_id = req.query.category_id;
  console.log(category_id);

  // A sample json response is given below
  // Get data from database using category_id
  categoryinfo = {
    status: "success",
    message: "Courses by category retrieved successfully.",
    category: {
      category_id: 1,
      name: "Programming",
      description: "Explore the world of programming languages.",
    },
    courses: [
      {
        course_id: 1,
        course_name: "Introduction to Programming",
        instructor_name: "Prof. Alice Johnson",
        total_lectures: 10,
        total_enrolled_students: 120,
        start_date: "2023-08-01",
        end_date: "2023-08-30",
        tags: ["programming", "coding"],
        course_image_url: "https://example.com/images/intro_to_programming.jpg",
      },
      {
        course_id: 2,
        course_name: "Web Development Basics",
        instructor_name: "Dr. Bob Williams",
        total_lectures: 15,
        total_enrolled_students: 180,
        start_date: "2023-09-01",
        end_date: "2023-09-30",
        tags: ["web development", "frontend", "backend"],
        course_image_url: "https://example.com/images/web_dev_basics.jpg",
      },
    ],
  };

  if (Object.keys(categoryinfo).length > 0) res.status(200); // OK
  else res.status(404); // Not found
  res.json(categoryinfo);
});

block_router.route("/").get(async (req, res) => {
  console.log("/courses/blocks GET");
  const course_id = req.query.course_id;
  console.log(course_id);

  // A sample json response is given below
  // Get data from database using block_id
  blockinfo = {
    status: "success",
    message: "Blocks and lectures for the course retrieved successfully.",
    course: {
      course_id: 1,
      course_name: "Introduction to Programming",
      total_lectures: 20,
      total_quizzes: 15,
      blocks: [
        {
          block_id: 1,
          block_name: "Fundamentals of Programming",
          total_lectures: 5,
          total_quizzes: 2,
          lectures: [
            {
              lecture_id: 1,
              lecture_title: "Introduction to Variables",
              duration_minutes: 30,
              quiz_id: 2001,
            },
            {
              lecture_id: 2,
              lecture_title: "Control Structures",
              duration_minutes: 45,
              quiz_id: 2002,
            },
          ],
        },
        {
          block_id: 2,
          block_name: "Advanced Programming Concepts",
          total_lectures: 7,
          total_quizzes: 3,
          lectures: [
            {
              lecture_id: 1,
              lecture_title: "Object-Oriented Programming",
              duration_minutes: 60,
              quiz_id: 2003,
            },
            {
              lecture_id: 2,
              lecture_title: "Exception Handling",
              duration_minutes: 40,
              quiz_id: 2004,
            },
          ],
        },
      ],
    },
  };
  if (Object.keys(blockinfo).length > 0) res.status(200); // OK
  else res.status(404); // Not found
  res.json(blockinfo);
});

lecture_router.route("").get(async (req, res) => {
  console.log("/courses/blocks/lectures GET");
  const course_id = req.query.course_id;
  const block_id = req.query.block_id;
  const lecture_id = req.query.lecture_id;
  console.log(course_id, block_id, lecture_id);
  lecture_info = {
    status: "success",
    message: "Lectures for the block retrieved successfully.",
    block: {
      block_id: 101,
      block_name: "Fundamentals of Programming",
      total_lectures: 5,
      total_quizzes: 2,
    },
    lectures: [
      {
        lecture_id: 1001,
        lecture_title: "Introduction to Variables",
        description: "Understanding the basics of variables in programming.",
        video_url: "https://example.com/videos/intro_to_variables.mp4",
        pdf_url: "https://example.com/pdfs/intro_to_variables.pdf",
      },
      {
        lecture_id: 1002,
        lecture_title: "Control Structures",
        description: "Exploring control flow in programming.",
        video_url: "https://example.com/videos/control_structures.mp4",
        pdf_url: "https://example.com/pdfs/control_structures.pdf",
      },
    ],
  };
  details_lecture_info = {
    status: "success",
    message: "Detailed lecture information retrieved successfully.",
    lecture: {
      lecture_id: 1001,
      lecture_title: "Introduction to Variables",
      author: "Prof. Alice Johnson",
      content:
        "This lecture covers the fundamental concepts of variables in programming.",
      serial: 1,
      view_count: 500,
      difficulty: "Intermediate",
      duration: "30 minutes",
      creation_time: "2023-02-15T14:30:00Z",
      pdfs: [
        {
          pdf_id: 2001,
          pdf_title: "Intro_to_Variables_Handout.pdf",
          pdf_content:
            "A comprehensive handout on the introduction to variables.",
          serial: 1,
          file_url: "https://example.com/files/Intro_to_Variables_Handout.pdf",
        },
      ],
      videos: [
        {
          video_id: 3001,
          video_title: "Intro_to_Variables_Video.mp4",
          video_content:
            "Watch the video to grasp the concepts of variables effectively.",
          serial: 1,
          video_url: "https://example.com/videos/Intro_to_Variables_Video.mp4",
        },
      ],
    },
  };

  let res_obj = lecture_info;
  if (lecture_id) {
    res_obj = details_lecture_info;
  }
  if (Object.keys(res_obj).length > 0) res.status(200); // OK
  else res.status(404); // Not found
  res.json(res_obj);
});
module.exports = router;
