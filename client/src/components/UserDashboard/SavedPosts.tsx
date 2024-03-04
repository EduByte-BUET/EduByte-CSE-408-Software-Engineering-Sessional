import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";

// Dummy data for posts

const SavedPosts = () => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState<any>([]);

	const fetchSavedPosts = async () => {
		try {
			const res = await api.get("/dashboard/user/saved_posts");

			setPosts(res.data);
		} catch (err: any) {
			if (err.response.status === 401) {
				alert("You need to be logged in to view this page");
				navigate("/signin");
			} else {
				alert("Some error occurred");
			}
		}
	};

	useEffect(() => {
		fetchSavedPosts();
	}, []);

	const handleRemovePost = async (post_id) => {
		try {
			await api.delete(`/dashboard/user/remove_saved_post?post_id=${post_id}`);
			// Refresh the saved posts
			fetchSavedPosts();
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<div className="col-md-8 col-lg-9" style={{ overflow: "auto" }}>
			<div className="container">
				{posts.length === 0 && (
					<h1 style={{ opacity: "0.5", marginTop: "100px" }}>No Saved Posts</h1>
				)}

				{posts &&
					posts.map((post) => (
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
								<button
									className="btn green-button"
									onClick={(e) => navigate("/discussion")}
								>
									<i className="fa-solid fa-forward"></i> Discussion Forum
								</button>
								<button
									className="btn red-button"
									onClick={(e) => handleRemovePost(post.post_id)}
								>
									<i className="fa-solid fa-trash"></i> Remove
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default SavedPosts;
