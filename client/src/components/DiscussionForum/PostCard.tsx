import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/discussion.css"; // Custom CSS for the post card
import api from "../../api/GeneralAPI";

function PostCard() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>();
  const [replyBoxVisible, setReplyBoxVisible] = useState<null | boolean>(false);
  const [replyText, setReplyText] = useState("");
  const [activePost, setActivePost] = useState<null | number>(null);
  const [activeReply, setActiveReply] = useState<null | number>(null);
  const [commentsVisible, setCommentsVisible] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/discussion`);
      if (response.status === 200) {
        const responseData = response.data;
        setPostData(responseData);
        console.log("Posts fetched successfully!", responseData);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postData]);

  // const toggleComments = (postId) => {
  //   setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
  // };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmitReply = async (post: any) => {
    // add async keyword here
    console.log(replyText);
    console.log(activePost);

    const replyData = {
      post_id: post.post_id,
      summary: replyText,
      author_id: post.author_id,
      author_type: post.author_type,
      author_name: post.author_name,
      parent_reply_id: activeReply, // use activeReply here
    };

    try {
      const response = await api.post(`/discussion/reply`, replyData); // now await can be used here
      if (response.status === 200) {
        const responseData = response.data;
        console.log("Reply created successfully!", responseData);
      } else {
        console.error("Failed to create reply:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating reply:", error);
    }

    setReplyBoxVisible(null);
    setReplyText("");
    fetchData();
    navigate("/discussion");
  };

  const handleReplyClick = (replyId, postId) => {
    setReplyBoxVisible(!replyBoxVisible);
    setActiveReply(replyId);
    setActivePost(postId);
    setReplyText("");
  };
  const handlePostClick = (postId) => {
    setReplyBoxVisible(!replyBoxVisible);
    setActivePost(postId);
    setActiveReply(null);
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
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="btn btn-outline-danger btn-sm ml-2">
                <span className="mr-1">{comment.downvotes}</span>
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
            <div>
              <button
                className={`btn btn-sm ${
                  activeReply === comment.reply_id && replyBoxVisible
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleReplyClick(comment.reply_id, comment.post_id)}
              >
                Reply
              </button>
              <button
                className={`btn btn-sm ml-2 ${
                  commentsVisible[comment.reply_id]
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => toggleComments(comment.reply_id)}
              >
                {commentsVisible[comment.reply_id]
                  ? "Hide Replies"
                  : "Show Replies"}{" "}
                ({comment.replies.length})
              </button>
            </div>
          </div>
          {comment.replies &&
            comment.replies.length > 0 &&
            commentsVisible[comment.reply_id] && (
              <div className="mt-3">{renderComments(comment.replies)}</div>
            )}
        </div>
      </div>
    ));
  };
  const handleCreatePostClick = () => {
    navigate(`/discussion/create_post`);
  };

  return (
    <div className="col-md-8 col-lg-9" style={{ overflow: "auto" }}>
      <div className="container">
        <div className="text-left">
          <button
            className="btn blue-button w-100 mb-3"
            onClick={handleCreatePostClick}
          >
            Create Post
          </button>
        </div>
        {postData &&
          postData.map((post) => (
            <div className="discussion_card" key={post.post_id}>
              <div className="discussion_card-header">
                <span className="discussion_card-author">
                  @{post.author_name}
                </span>
                <span className="discussion_card-timestamp">
                  {post.timestamp}
                </span>
                <div className="discussion_card-tags">
                  {post.tags &&
                    post.tags.map((tag, index) => (
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
                  <i className="fas fa-thumbs-up"></i>
                </button>
                <button className="discussion_card-upvote">
                  <span className="discussion_card-downvote-count">
                    {post.downvotes}
                  </span>
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <button
                  className={`discussion_card-ownreply ${
                    activePost === post.post_id && replyBoxVisible
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handlePostClick(post.post_id)}
                >
                  Reply
                </button>
                <span
                  className={`discussion_card-replies ${
                    commentsVisible[post.post_id] ? "active" : ""
                  }`}
                  onClick={() => toggleComments(post.post_id)}
                >
                  {commentsVisible[post.post_id]
                    ? "Hide Replies"
                    : "Show Replies"}
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
                    onClick={() => handleSubmitReply(post)}
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
