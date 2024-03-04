import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/discussion.css"; // Make sure this path is correct
import api from "../../api/GeneralAPI";
import Select from "react-select";
import UserAuth from "../UserAuth";

function CreatePost() {
	const navigate = useNavigate();
	const [authorType, setAuthorType] = useState("user");
	const [postType, setPostType] = useState("discussion");
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState(""); // Updated state for summary
	const [showCourse, setShowCourse] = useState([]);
	const [showTags, setShowTags] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedTags, setSelectedTags] = useState<
		{ value: string; label: string }[]
	>([]);

	const fetchData = async () => {
		try {
			const response = await api.get(`/discussion/post/show`);
			if (response.status === 200) {
				const responseData = response.data;
				setShowCourse(responseData.courses);
				setShowTags(responseData.tags);
				console.log("Courses fetched successfully!", responseData);
			} else {
				console.error("Failed to fetch courses:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching courses:", error);
		}
	};

	const userAuth = async (justAuth: boolean) => {
		try {
			await api.get("/user/auth");

			const accesslevel = await api.get("/user/signin/accesslevel");
			if (accesslevel.data.access_level == "user") setAuthorType("user");
			else if (accesslevel.data.access_level == "ccreator") {
				setAuthorType("content_creator");
			}
			if (justAuth == false) fetchData();
		} catch (error) {
			console.error("Error fetching courses:", error);
			alert("You need to login first");
			navigate("/signin");
			return;
		}
	};

	// useeffect to fetch courses and tags
	useEffect(() => {
		const demoFunc = async () => {
			await userAuth(false);
		};

		demoFunc();
	}, []);

	const handleCourseChange = (event) => {
		setSelectedCourse(event.target.value);
	};
	const handleTagsChange = (selectedOptions) => {
		setSelectedTags(selectedOptions);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		//author_id, author_type, course, tags, title, summary, post_type
		const postData = {
			author_type: authorType,
			course: selectedCourse,
			tags: selectedTagsString.split(","), // Assuming tags are entered as a comma-separated string
			title: title,
			summary: summary, // Use the updated state for summary
			post_type: postType,
		};

		try {
			const response = await api.post(`/discussion/post/create`, postData);

			if (response.status === 200) {
				const responseData = response.data; // Assuming api.post returns data in a property
				console.log("Post created successfully!", responseData);
				navigate("/discussion"); // Replace '/discussion' with your actual endpoint
			} else {
				console.error("Failed to create post:", response.statusText);
			}
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	const options = showTags
		? showTags.map((tag) => ({ value: tag, label: tag }))
		: [];

	const selectedTagsString = selectedTags
		? selectedTags.map((option) => option.value).join(", ")
		: "";

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
							<select id="authorType" value={authorType}>
								<option value={authorType}>{authorType}</option>
							</select>
						</div>

						<div className="form-row">
							<label htmlFor="course">Course:</label>
							<select
								id="course"
								value={selectedCourse}
								onChange={handleCourseChange}
							>
								<option value="">Select...</option>
								{showCourse &&
									showCourse.map((display_course: any, index: any) => (
										<option key={index} value={display_course.course_title}>
											{display_course.course_title}
										</option>
									))}
							</select>
						</div>

						<div className="form-row">
							<label htmlFor="tags">Tags:</label>
							<Select
								isMulti
								name="tags"
								options={options}
								className="basic-multi-select"
								classNamePrefix="select"
								onChange={handleTagsChange}
								value={selectedTags}
							/>
							{/* <div>Selected tags: {selectedTagsString}</div>
              ... rest of your JSX */}
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
								{authorType === "content_creator" && (
									<option value="announcements">Announcements</option>
								)}
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

						<button type="submit" className="btn blue-button">
							Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
