import React, { useState } from "react";
import "../../css/discussion.css"; // Make sure this path is correct

function CreatePost() {
  const [authorType, setAuthorType] = useState("user");
  const [course, setCourse] = useState("");
  const [tags, setTags] = useState("");
  const [postType, setPostType] = useState("discussion");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState(""); // Updated state for summary

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    console.log({ authorType, course, tags, postType, title, summary });
    // Additional submit logic, e.g., send data to your backend for database insertion
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
              <label htmlFor="authorType">Author Type:</label>
              <select
                id="authorType"
                value={authorType}
                onChange={(e) => setAuthorType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="content_creator">Content Creator</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="course">Course:</label>
              <input
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="tags">Tags(',' sep):</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

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
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="summary">Summary:</label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
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
