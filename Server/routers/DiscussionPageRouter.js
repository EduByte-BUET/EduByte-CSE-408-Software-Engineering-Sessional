const express = require("express");
const router = express.Router();
const posts_router = express.Router();
const post_selected_router = express.Router();
const myposts_router = express.Router();
const post_update_router = express.Router();
const post_create_router = express.Router();
const show_posts_router = express.Router();
const post_filter = express.Router();
const db = require("../database/db");
router.use("/", posts_router);
router.use("/post", post_selected_router);
router.use("/myposts", myposts_router);
router.use("/post/update", post_update_router);
router.use("/post/create", post_create_router);
router.use("/post/show", show_posts_router);
router.use("/filter", post_filter);

posts_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion GET");
        
        // A sample json response is given below, fetch data from database
        posts = 
        {
            "posts": [
              {
                "post_id": 1,
                "post_title": "Introduction to Programming",
                "post_content": "Learn the basics of programming.",
                "user_id": 123,
                "user_name": "JohnDoe",
                "post_time": "2023-08-01T12:00:00Z",
                "total_upvote": 25,
                "total_downvote": 5,
                "total_reply": 10,
                "post_tag": "programming",
                "replies": []
              },
              {
                "post_id": 2,
                "post_title": "Web Development Tips",
                "post_content": "Explore useful tips for web development.",
                "user_id": 789,
                "user_name": "JaneSmith",
                "post_time": "2023-08-02T09:30:00Z",
                "total_upvote": 15,
                "total_downvote": 2,
                "total_reply": 8,
                "post_tag": "webdev",
                "replies": []
              },
              {
                "post_id": 3,
                "post_title": "Understanding Data Structures",
                "post_content": "Dive into the world of data structures.",
                "user_id": 456,
                "user_name": "AliceJohnson",
                "post_time": "2023-08-03T14:20:00Z",
                "total_upvote": 30,
                "total_downvote": 3,
                "total_reply": 12,
                "post_tag": "datastructures",
                "replies": []
              }
            ]
          }
          
        if (Object.keys(posts).length != 0) res.status(200);
        else res.status(404);
        res.json(posts);
    });

post_selected_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        post = 
        {
            "post_id": 1,
            "post_title": "Introduction to Programming",
            "post_content": "Learn the basics of programming.",
            "user_id": 123,
            "user_name": "JohnDoe",
            "post_time": "2023-08-01T12:00:00Z",
            "total_upvote": 25,
            "total_downvote": 5,
            "total_reply": 10,
            "post_tag": "programming",
            "replies": [
            {
                "reply_id": 101,
                "user_id": 456,
                "post_id": 1,
                "reply_content": "This is a great post!",
                "reply_time": "2023-08-01T12:15:00Z",
                "parent_reply_id": 0
            },
            {
                "reply_id": 102,
                "user_id": 789,
                "post_id": 1,
                "reply_content": "I have a question...",
                "reply_time": "2023-08-01T12:30:00Z",
                "parent_reply_id": 101
            },
            // Additional replies...
            ]
        }
          
        if (Object.keys(post).length != 0) res.status(200);
        else res.status(404);
        res.json(post);
    });

myposts_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/myposts GET");
        userid = req.query.userid;
        console.log('Userid: ' + userid);

        // A sample json response is given below, fetch data from database using userid
        myposts =
        {
            "user_posts": [
              {
                "post_id": 1,
                "post_title": "Introduction to Programming",
                "post_content": "Learn the basics of programming.",
                "user_id": 123,
                "user_name": "JohnDoe",
                "post_time": "2023-08-01T12:00:00Z",
                "total_upvote": 25,
                "total_downvote": 5,
                "total_reply": 10,
                "post_tag": "programming",
                "Replies": []
              },
              {
                "post_id": 2,
                "post_title": "Web Development Tips",
                "post_content": "Explore useful tips for web development.",
                "user_id": 123,
                "user_name": "JohnDoe",
                "post_time": "2023-08-02T09:30:00Z",
                "total_upvote": 15,
                "total_downvote": 2,
                "total_reply": 8,
                "post_tag": "webdev",
                 "Replies": []
              },
            ]
          }
          
          
        if (Object.keys(myposts).length != 0) res.status(200);
        else res.status(404);
        res.json(myposts);
    })
    .put(async (req, res) => {
        console.log("/discussion/myposts PUT");
        postid = req.body.postid;
        command = req.body.command;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update post_content in database using postid

        res_string = '';
        res_db = 'success';
        if (command == "update") {
          content = req.body.content;
          // check the userid and postid before deletion
          // if the req.body.userid == post.user_id then delete the post
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'mypost updated';
        }
        else if (command == "delete") { 
          // check the userid and postid before deletion
          // if the req.body.userid == post.user_id then delete the post
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'Mypost deleted';
        }

        else res.status(404);

        res.send(res_string);
    });

post_update_router
    .route("/")
    .put(async (req, res) => {
        console.log("/discussion/post/update POST");
        postid = req.body.postid;
        command = req.body.command;
        post_content = req.body.post_content;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update post_content in database using postid

        res_string = '';
        res_db = 'success';
        if (command == "upvote") {
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'post upvoted';
        }
        else if (command == "downvote") {
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'post downvoted';
        }
        else if (command == "rm_upvote") {
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'post upvote removed';
        }
        else if (command == "rm_downvote") {
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'post downvote removed';
        }
        else if (command == "comment") {
            content = req.body.content;
            // Add comment to database using postid, content
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'comment added';
        }
        else if (command == "delete") {
          // check the userid and postid before deletion
          // if the req.body.userid == post.user_id then delete the post
            if (res_db === 'success') res.status(200);
            else res.status(404);
            res_string = 'post deleted';
        }
        else res.status(404);

        res.send(res_string);
    });

post_create_router
    .route("/")
    .post(async (req, res) => {
        console.log("/discussion/post/create POST");

        // author_id, author_type, course, tags, title, summary, post_type
        // const postData = {
        //   authorType,
        //   course,
        //   tags: tags.split(','), // Assuming tags are entered as a comma-separated string
        //   postType,
        //   title,
        //   summary,
        // };
        const {author_type, course, tags, title, summary, post_type} = req.body;
        let author_id = 1;
        // if(author_type === "user"){
        //   const user = await db.getUser(req.session.username);
	      //   author_id = user.user_id;
        // }
        // else{
        //   const creator = await db.getContentCreator(req.session.username);
        //   author_id = creator.creator_id;
        // }
        const author_name = req.session.username;
        const post_id = await db.addUserPost(author_id, author_type, author_name, course, tags, title, summary, post_type);

        // A sample json response is given below, fetch data from database
        // Create post in database using post_title, post_content, user_id, user_name, post_tag
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);

        res.send(post_id.toString());
    });

show_posts_router.get("/", async (req, res) => {
    console.log("/discussion/post/show GET");
    const courses = await db.getAllCourses();
    const tags = await db.getAllTags();
    if (courses != null && tags != null) res.status(200);
    else res.status(404);
    res.status(200).json({courses, tags});
});

post_filter
    .route("/")
    .post(async (req, res) => {
        console.log("/discussion/filter POST");
        filters = req.body;
        console.log(filters);

        // Get a list of posts filtered - using the filters (json)
        // A sample json response is given below, fetch data from database
        filtered_posts = 
        {
            "posts": [
              {
                "post_id": 1,
                "post_title": "Introduction to Programming",
                "post_content": "Learn the basics of programming.",
                "user_id": 123,
                "user_name": "JohnDoe",
                "post_time": "2023-08-01T12:00:00Z",
                "total_upvote": 25,
                "total_downvote": 5,
                "total_reply": 10,
                "post_tag": "programming",
                "replies": []
              },
              {
                "post_id": 2,
                "post_title": "Web Development Tips",
                "post_content": "Explore useful tips for web development.",
                "user_id": 789,
                "user_name": "JaneSmith",
                "post_time": "2023-08-02T09:30:00Z",
                "total_upvote": 15,
                "total_downvote": 2,
                "total_reply": 8,
                "post_tag": "webdev",
                "replies": []
              },
              {
                "post_id": 3,
                "post_title": "Understanding Data Structures",
                "post_content": "Dive into the world of data structures.",
                "user_id": 456,
                "user_name": "AliceJohnson",
                "post_time": "2023-08-03T14:20:00Z",
                "total_upvote": 30,
                "total_downvote": 3,
                "total_reply": 12,
                "post_tag": "datastructures",
                "replies": []
              }
            ]
          }
          
        if (Object.keys(filtered_posts).length != 0) res.status(200);
        else res.status(404);
        res.json(filtered_posts);
    });

module.exports = router;