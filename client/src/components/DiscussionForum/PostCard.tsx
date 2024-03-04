import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/discussion.css"; // Custom CSS for the post card
import api from "../../api/GeneralAPI";
import UserAuth from "../UserAuth";

function PostCard() {
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedCourse, trimmedTags, selectedPostTypes } =
		location.state || {};
	const [postData, setPostData] = useState<any>();
	const [replyBoxVisible, setReplyBoxVisible] = useState<null | boolean>(false);
	const [replyText, setReplyText] = useState("");
	const [activePost, setActivePost] = useState<null | number>(null);
	const [activeReply, setActiveReply] = useState<null | number>(null);
	const [commentsVisible, setCommentsVisible] = useState({});

	const filterData = async () => {
		try {
			let url = "/discussion";
			let response;

			// Check if any filters are selected
			if (
				(selectedPostTypes && selectedPostTypes.length > 0) ||
				selectedCourse ||
				(trimmedTags && trimmedTags.length > 0)
			) {
				// Include selected filters in the API request
				if (selectedPostTypes && selectedPostTypes.length > 0) {
					url = `/discussion/postTypes?types=${selectedPostTypes
						.map((type) => type.value)
						.join(",")}`;
					response = await api.get(url);
				}

				if (selectedCourse) {
					url = `/discussion/courses?course=${selectedCourse.label}`;
					response = await api.get(url);
				}

				if (trimmedTags && trimmedTags.length > 0) {
					url = `/discussion/tags?tags=${trimmedTags
						.map((tag) => tag.value)
						.join(",")}`;
					response = await api.get(url);
				}
			} else {
				response = await api.get(url);
			}

			if (response.status === 200) {
				const responseData = response.data;
				setPostData(responseData);
				// console.log("Posts fetched successfully!", responseData);
			} else {
				console.error("Failed to fetch posts:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
			//alert("No posts found for this filter. Fetching all posts.");
			setPostData([]);
		}
	};

	const fetchAllData = async () => {
		try {
			const response = await api.get("/discussion");
			if (response.status === 200) {
				const responseData = response.data;
				setPostData(responseData);
				// console.log("All posts fetched successfully!", responseData);
			} else {
				console.error("Failed to fetch all posts:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching all posts:", error);
		}
	};

	useEffect(() => {
		filterData().then(() => {
			if (!postData || postData.length === 0) {
				fetchAllData();
			}
		});
	}, [selectedCourse, trimmedTags, selectedPostTypes]);

	// const toggleComments = (postId) => {
	//   setCommentsVisible((prev) => ({ ...prev, [postId]: !prev[postId] }));
	// };

	const handleReplyChange = (event) => {
		setReplyText(event.target.value);
	};

	const handleSubmitReply = async (post: any) => {
		// add async keyword here
		// console.log(replyText);
		// console.log(activePost);
		const loggedIn = await UserAuth();
		if (!loggedIn) {
			alert("You must be logged in to reply to a post.");
			navigate("/signin");
			return;
		}

		const replyData = {
			post_id: post.post_id,
			summary: replyText,
			parent_reply_id: activeReply, // use activeReply here
		};

		try {
			const response = await api.post(`/discussion/reply`, replyData); // now await can be used here
			if (response.status === 200) {
				const responseData = response.data;
				// console.log("Reply created successfully!", responseData);
				// filterData();
				navigate("/discussion", {
					state: { selectedCourse, trimmedTags, selectedPostTypes },
				});
			} else {
				console.error("Failed to create reply:", response.statusText);
			}
		} catch (error) {
			console.error("Error creating reply:", error);
		}

		setReplyBoxVisible(null);
		setReplyText("");
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

	const updatePost = async (index, command) => {
		const post_id = postData[index].post_id;
		try {
			const res = await api.put("/discussion/post/update", {
				post_id: post_id,
				command: command,
			});
			const upDownCount = res.data;
			const newPostData = [...postData];
			newPostData[index].upvotes = upDownCount.upvotes;
			newPostData[index].downvotes = upDownCount.downvotes;

			setPostData(newPostData);
		} catch (err) {
			alert("Did you logged in?");
		}
	};

	const handleUpvoteClick = async (index) => {
		updatePost(index, "upvote");
	};

	const handleDownvoteClick = async (index) => {
		updatePost(index, "downvote");
	};

	const handleSavePost = async (post_id) => {
		try {
			const res = await api.put("/discussion/post/save", { post_id: post_id });
			alert(res.data);
		} catch (err: any) {
			if (err.response.status === 404)
				alert("You need to login to save a post!");
			else if (err.response.status === 409) alert("Post already saved!");
		}
	};

	const renderComments = (comments) => {
		return comments.map((comment) => (
			<div key={comment.reply_id} className="card mt-3">
				<div className="card-body">
					<div className="d-flex justify-content-between">
						<b className="card-title" style={{ color: "green" }}>
							@{comment.author_name}
						</b>
						<small className="text-muted">{comment.timestamp}</small>
					</div>
					<div style={{ textAlign: "left", marginBottom: "10px" }}>
						<p className="card-text">{comment.summary}</p>
					</div>

					<div className="d-flex justify-content-between">
						<div>
							<button
								className={`btn blue-button ${
									activeReply === comment.reply_id && replyBoxVisible
										? "btn-primary"
										: "btn-outline-primary"
								}`}
								onClick={() =>
									handleReplyClick(comment.reply_id, comment.post_id)
								}
								style={{ marginRight: "10px" }}
							>
								Reply
							</button>
							<button
								className={`btn ${
									commentsVisible[comment.reply_id]
										? "red-button"
										: "green-button"
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

	return (
		<div className="col-md-8 col-lg-9" style={{ overflow: "auto" }}>
			<div className="container">
				{postData &&
					postData.map((post, index) => (
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
							<div style={{ textAlign: "left" }}>
								<h3 className="discussion_card-title">{post.title}</h3>
								<p className="discussion_card-summary">{post.summary}</p>
							</div>

							<div className="discussion_card-footer">
								<div>
									<button
										className="btn btn-outline-primary btn-sm"
										style={{ marginRight: "50px" }}
										onClick={(e) => handleUpvoteClick(index)}
									>
										<span>{post.upvotes}</span> &nbsp;
										<i className="fas fa-thumbs-up"></i>
									</button>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={(e) => handleDownvoteClick(index)}
									>
										<span className="mr-1">{post.downvotes}</span> &nbsp;
										<i className="fas fa-thumbs-down"></i>
									</button>
								</div>
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
								<button
									className="btn"
									style={{ color: "green" }}
									onClick={(e) => handleSavePost(post.post_id)}
								>
									<i className="fa-solid fa-floppy-disk"></i> Save Post
								</button>
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
