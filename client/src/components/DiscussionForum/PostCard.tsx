import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/discussion.css"; // Custom CSS for the post card

const postData = [
  {
    post_id: 1,
    author_id: 1,
    author_type: 'user',
    author_name: 'kevin_peter',
    course: 'Computer Science',
    tags: ['Algorithm', 'DFS'],
    timestamp: '2024-02-22T12:00:00Z',
    title: 'Running BFS for finding shortest path',
    summary: 'If we run BFS for finding the shortest path, what will be the time complexity?',
    post_type: 'question',
    upvotes: 345,
    downvotes: 9,
    replies: [
      {
        reply_id: 1,
        post_id: 1,
        timestamp: '2024-02-22T12:15:00Z',
        summary: 'Great question! The time complexity would generally be O(V+E) for BFS.',
        author_id: 2,
        author_type: 'user',
        author_name: 'alice_jones',
        upvotes: 25,
        downvotes: 2,
        parent_reply_id: null,
        replies: [
          {
            reply_id: 2,
            post_id: 1,
            timestamp: '2024-02-22T12:30:00Z',
            summary: 'Don\'t forget that the complexity can vary based on the graph representation.',
            author_id: 3,
            author_type: 'content_creator',
            author_name: 'bob_smith',
            upvotes: 12,
            downvotes: 1,
            parent_reply_id: 1,
            replies: []
          }
          // More nested replies can be added here
        ]
      }
      // More top-level replies can be added here
    ]
  },
  {
    post_id: 2,
    author_id: 4,
    author_type: 'content_creator',
    author_name: 'susan_park',
    course: 'Data Structures',
    tags: ['Graph', 'Data Structures'],
    timestamp: '2024-02-22T13:00:00Z',
    title: 'Traverse a graph and generate the largest array',
    summary: 'Given an undirected graph of N nodes and M connections, traverse all the nodes at least once.',
    post_type: 'discussion',
    upvotes: 92,
    downvotes: 2,
    replies: [
      {
        reply_id: 3,
        post_id: 2,
        timestamp: '2024-02-22T13:15:00Z',
        summary: 'That sounds like an interesting challenge! Have you considered using a depth-first search?',
        author_id: 5,
        author_type: 'user',
        author_name: 'charlie_doe',
        upvotes: 18,
        downvotes: 0,
        parent_reply_id: null,
        replies: [
          // More nested replies can be added here
        ]
      }
      // More top-level replies can be added here
    ]
  },
  {
    post_id: 3,
    author_id: 6,
    author_type: 'user',
    author_name: 'john_smith',
    course: 'Mathematics',
    tags: ['Geometry'],
    timestamp: '2024-02-22T14:30:00Z',
    title: 'Exploring Euclidean Geometry',
    summary: 'Discussing the beauty of Euclidean Geometry and its applications.',
    post_type: 'discussion',
    upvotes: 50,
    downvotes: 5,
    replies: [
      // More replies can be added here
    ]
  }
  // ... more posts
];

function PostCard() {
  const navigate = useNavigate();
  const [replyBoxVisible, setReplyBoxVisible] = useState<null | boolean>(false);
  const [replyText, setReplyText] = useState("");
  const [activePost, setActivePost] = useState<null | number>(null);
  const [commentsVisible, setCommentsVisible] = useState({});

  // const toggleComments = (postId) => {
  //   setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  // };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmitReply = () => {
    console.log(replyText);
    console.log(activePost);
    setReplyBoxVisible(null);
    setReplyText("");
  };

  const handleReplyClick = (replyId) => {
    setReplyBoxVisible(!replyBoxVisible);
    setActivePost(replyId);
    setReplyText("");
  };

  const toggleComments = (commentId) => {
    setCommentsVisible((prevCommentsVisible) => ({
      ...prevCommentsVisible,
      [commentId]: !prevCommentsVisible[commentId],
    }));
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.reply_id} className="card mt-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">@{comment.author_name}</h5>
            <small className="text-muted">{comment.timestamp}</small>
          </div>
          <p className="card-text">{comment.summary}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-outline-primary btn-sm">
                <span className="mr-1">{comment.upvotes}</span>
                {/* Add your upvote icon here */}
              </button>
              <button className="btn btn-outline-danger btn-sm ml-2">
                <span className="mr-1">{comment.downvotes}</span>
                {/* Add your downvote icon here */}
              </button>
            </div>
            <div>
              <button
                className={`btn btn-sm ${activePost === comment.post_id && replyBoxVisible ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleReplyClick(comment.reply_id)}
              >
                Reply
              </button>
              <button
                className={`btn btn-sm ml-2 ${commentsVisible[comment.reply_id] ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => toggleComments(comment.reply_id)}
              >
                {commentsVisible[comment.reply_id] ? "Hide Replies" : "Show Replies"} ({comment.replies.length})
              </button>
            </div>
          </div>
          {comment.replies && comment.replies.length > 0 && commentsVisible[comment.reply_id] && (
            <div className="mt-3">
              {renderComments(comment.replies)}
            </div>
          )}
        </div>
      </div>
    ));
  };
  const handleCreatePostClick = () => {
    navigate(`/discussion/create_post`);
  };

  return (
    <div className="col-md-8 col-lg-9" style={{ overflow: 'auto' }}>
    <div className="container">
      <div className="text-right">
      <button
          className="btn blue-button align-right"
          onClick={handleCreatePostClick}
        >
          Create Post
        </button>
      </div>
      {postData.map((post) => (
        <div className="discussion_card" key={post.post_id}>
          <div className="discussion_card-header">
            <span className="discussion_card-author">@{post.author_name}</span>
            <span className="discussion_card-timestamp">{post.timestamp}</span>
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
              <span className="discussion_card-upvote-count">{post.upvotes}</span>
              {/* Add your upvote icon here */}
            </button>
            <button className="discussion_card-upvote">
              <span className="discussion_card-downvote-count">{post.downvotes}</span>
              {/* Add your downvote icon here */}
            </button>
            <button
              className={`discussion_card-ownreply ${
                activePost === post.post_id && replyBoxVisible ? "active" : ""
              }`}
              onClick={() => handleReplyClick(post.post_id)}
            >
              Reply
            </button>
            <span
              className={`discussion_card-replies ${
                commentsVisible[post.post_id] ? "active" : ""
              }`}
              onClick={() => toggleComments(post.post_id)}
            >
              {commentsVisible[post.post_id] ? "Hide Replies" : "Show Replies"}
              ({post.replies.length})
            </span>
          </div>

          {activePost === post.post_id && replyBoxVisible && (
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

          {commentsVisible[post.post_id] && (
            <div
              className={`discussion-comments-container ${
                commentsVisible[post.post_id] ? "expanded" : ""
              }`}
            >
              {renderComments(post.replies)}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default PostCard;
