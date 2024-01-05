const express = require("express");
const router = express.Router();
const posts_router = express.Router();
const post_selected_router = express.Router();
const myposts_router = express.Router();
const post_update_router = express.Router();
const post_create_router = express.Router();
const post_update_upvote_router = express.Router();
const post_update_downvote_router = express.Router();
const post_update_upvote_remove_router = express.Router();
const post_update_downvote_remove_router = express.Router();
const post_update_delete_router = express.Router();
const post_filter = express.Router();

router.use("/", posts_router);
router.use("/post", post_selected_router);
router.use("/myposts", myposts_router);
router.use("/post/update", post_update_router);
router.use("/post/create", post_create_router);
router.use("/post/update/upvote", post_update_upvote_router);
router.use("/post/update/downvote", post_update_downvote_router);
router.use("/post/update/upvote_remove", post_update_upvote_remove_router);
router.use("/post/update/downvote_remove", post_update_downvote_remove_router);
router.use("/post/update/delete", post_update_delete_router);
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
    });

post_update_router
    .route("/")
    .post(async (req, res) => {
        console.log("/discussion/post/update POST");
        postid = req.body.postid;
        post_content = req.body.post_content;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update post_content in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post updated');
    });

post_create_router
    .route("/")
    .post(async (req, res) => {
        console.log("/discussion/post/create POST");

        post_title = req.body.post_title;
        post_content = req.body.post_content;
        user_id = req.body.user_id;
        post_tag = req.body.post_tag;

        console.log('Post title: ' + post_title);
        console.log('Post content: ' + post_content);
        console.log('User id: ' + user_id);
        console.log('Post tag: ' + post_tag);

        // A sample json response is given below, fetch data from database
        // Create post in database using post_title, post_content, user_id, user_name, post_tag
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);

        res.send('post created');
    });

post_update_upvote_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post/update/upvote GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update upvote in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post upvote updated');
    });

post_update_downvote_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post/update/downvote GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update downvote in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post downvote updated');
    });

post_update_upvote_remove_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post/update/upvote_remove GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update upvote_remove in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post upvote_remove updated');
    });

post_update_downvote_remove_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post/update/downvote_remove GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // A sample json response is given below, fetch data from database
        // Update downvote_remove in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post downvote_remove updated');
    });

post_update_delete_router
    .route("/")
    .get(async (req, res) => {
        console.log("/discussion/post/update/delete GET");
        postid = req.query.postid;
        console.log('Postid: ' + postid);

        // Only posts created by user can be deleted by user
        // Idea: Keep the delete button only in myposts list (React Frontend)
        // A sample json response is given below, fetch data from database
        // Delete post in database using postid
        res_db = 'success';
        if (res_db === 'success') res.status(200);
        else res.status(404);
        res.send('post deleted');
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