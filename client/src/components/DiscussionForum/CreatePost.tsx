import React, { useState } from "react";
import "../../css/discussion.css"; // Make sure this path is correct

function CreatePost() {
  const [postType, setPostType] = useState("discussion");
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    console.log({ postType, topic, title, question });
    // Additional submit logic
  };

  return (
    <div className="col-md-8 col-lg-9">
      <div className=" justify-content-between align-items-center py-3">
        {/* Add SortBy and SearchBar components */}
        
      </div>
      <div
        className="courses-container"
        style={{ height: "640px", overflowY: "auto" }}
      >
        <div className="discussion-create-post-container">
          <h2>Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="postType">Type:</label>
              <select
                id="postType"
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
              >
                <option value="discussion">Discussion</option>
                <option value="qna">Q&A</option>
                <option value="announcements">Announcements</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="question">Question:</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="post-button">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
