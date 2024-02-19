import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/discussion.css"; // Custom CSS for the post card

// Example JSON array of posts
const postsData = [
  {
    id: 1,
    author: "kevin_peter",
    timestamp: "10 hours ago",
    tags: ["DFS", "Algorithm"],
    title: "Running BFS for finding shortest path",
    summary:
      "If we run BFS for finding shortest path, what will be the time complexity?",
    upvotes: 345,
    downvotes: 9,
    replies: 118,
    comments: [
      {
        id: 1,
        author: "alice_jones",
        timestamp: "9 hours ago",
        text: "Great question! The time complexity would generally be O(V+E) for BFS.",
      },
      {
        id: 2,
        author: "bob_smith",
        timestamp: "8 hours ago",
        text: "Don't forget that the complexity can vary based on the graph representation.",
      },
      // More comments can be added here
    ],
  },
  {
    id: 2,
    author: "susan_park",
    timestamp: "8 hours ago",
    tags: ["Graph", "Data Structures"],
    title: "Traverse a graph and generate largest array",
    summary:
      "Given an undirected graph of N nodes and M connections, traverse all the nodes at least once.",
    upvotes: 92,
    downvotes: 2,
    replies: 30,
    comments: [
      {
        id: 1,
        author: "charlie_doe",
        timestamp: "7 hours ago",
        text: "That sounds like an interesting challenge! Have you considered using a depth-first search?",
      },
      // More comments can be added here
    ],
  },
  // ... more posts
];

function PostCard() {
   const navigate = useNavigate();
  const [replyBoxVisible, setReplyBoxVisible] = useState<null | boolean>(false);
  const [replyText, setReplyText] = useState("");
  const [activePost, setActivePost] = useState<null | number>(null);

  const [commentsVisible, setCommentsVisible] = useState({});

  const toggleComments = (postId) => {
    setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };


  // Function to handle reply text change
  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  // Function to handle the submission of the reply
  const handleSubmitReply = () => {
    console.log(replyText); // Print the reply to the console
    console.log(activePost);
    setReplyBoxVisible(null); // Hide the reply box after submission
    setReplyText(""); // Clear the reply text
  };

  const handleReplyClick = (postId) => {
    setReplyBoxVisible(!replyBoxVisible);
    setActivePost(postId);
    setReplyText(""); // Reset the reply text whenever a new reply box is opened
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="discussion-comment">
        <div className="discussion-comment-header">
          <span className="discussion-comment-author">@{comment.author}</span>
          <span className="discussion-comment-timestamp">
            {comment.timestamp}
          </span>
        </div>
        <p className="discussion-comment-text">{comment.text}</p>
      </div>
    ));
  };


  return (
    <>
      <div className="col-md-8 col-lg-9">
        <div className="d-flex justify-content-end py-3">
          {/* Add SortBy and SearchBar components */}
          <button
            className="btn blue-button m-3"
            onClick={() => navigate("/discussion/create_post")}
          >
            Create Post
          </button>
        </div>
        <div
          className="courses-container"
          style={{ height: "640px", overflowY: "auto" }}
        >
          <div className="container">
            {postsData.map((post) => (
              <>
                <div className="discussion_card" key={post.id}>
                  <div className="discussion_card-header">
                    <span className="discussion_card-author">
                      @{post.author}
                    </span>
                    <span className="discussion_card-timestamp">
                      {post.timestamp}
                    </span>
                    <div className="discussion_card-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="discussion_card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="discussion_card-title">{post.title}</h3>
                  <p className="discussion_card-summary">{post.summary}</p>
                  <div className="discussion_card-footer">
                    <button className="discussion_card-upvote">
                      <span className="discussion_card-upvote-count">
                        {post.upvotes}
                      </span>
                      <i className="icon-thumb_up"></i>
                    </button>
                    <button className="discussion_card-upvote">
                      <span className="discussion_card-downvote-count">
                        {post.downvotes}
                      </span>
                      {/* <i className="fas fa-thumbs-down"></i>{" "} */}
                      <i className="icon-thumb_down"></i>
                    </button>

                    {/* <span className="discussion_card-replies">
                      {post.replies} replies
                    </span> */}

                    <button
                      className={`discussion_card-ownreply ${
                        activePost === post.id && replyBoxVisible
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleReplyClick(post.id)}
                    >
                      Reply
                    </button>
                    <span
                      className={`discussion_card-replies ${
                        commentsVisible[post.id] ? "active" : ""
                      }`}
                      onClick={() => toggleComments(post.id)}
                    >
                      {commentsVisible[post.id]
                        ? "Hide Replies"
                        : "Show Replies"}
                      ({post.comments.length})
                    </span>

                    {/* <button className="discussion_card-share">Share</button> */}
                    <button className="discussion_card-save">Save</button>
                    {/* <button className="discussion_card-report">Report</button> */}
                  </div>
                </div>

                {activePost === post.id && replyBoxVisible && (
                  <div className="discussion-reply-box">
                    <textarea
                      className="discussion-reply-textarea"
                      value={replyText}
                      onChange={handleReplyChange}
                      placeholder="Write your reply here..."
                    />
                    <button
                      className="btn blue-button"
                      onClick={handleSubmitReply}
                    >
                      Submit
                    </button>
                  </div>
                )}

                {commentsVisible[post.id] && (
                  <div
                    className={`discussion-comments-container ${
                      commentsVisible[post.id] ? "expanded" : ""
                    }`}
                  >
                    {renderComments(post.comments)}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
