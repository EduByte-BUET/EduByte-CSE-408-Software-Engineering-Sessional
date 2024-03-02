import React from "react";

export default function Skills() {
	const personalizedLearning = {
		content: [
			"AI chatbot assistant",
			"Enhance Learning",
			"Course Recommendation",
			"Experiences improves the overall learning journey with community and relevant content",
		],
	};

	const structuredEducation = {
		content: [
			"Hierarchical Education",
			"Diverse Courses",
			"Mandatory Exam/Quizzes",
			"Progress Tracker",
			"Learner-Instructor Interaction",
			"AI Chatbot Practice",
		],
	};

	const discussionForum = {
		content: [
			"Interactive Platform",
			"User Questions",
			"Upvoting System",
			"Commenting",
			"Post Saving",
			"Peer Learning",
		],
	};

	return (
		<>
			<section id="skill" className="skill-area pt-170">
				<div className="container">
					<div className="row">
						<div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
							<div className="section-title text-center">
								<h2 className="mb-15 wow fadeInUp" data-wow-delay=".2s">
									Why Choose Edubyte
								</h2>
								<p className="wow fadeInUp" data-wow-delay=".4s">
									Learn New Skills with Certified Instructors on our eLearning
									Platform. Access a Large Collection of Courses to Learn
									Anything you desire
								</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xl-4 col-lg-4 col-md-6">
							<div className="single-skill wow fadeInUp" data-wow-delay=".2s">
								<div className="skill-icon">
									<i className="fa-solid fa-kitchen-set"></i>
								</div>
								<div className="skill-content">
									<h4> Personalized Learning</h4>
									{personalizedLearning.content.map((content, index) => (
										<div key={index}>
											<i className="fa-solid fa-check"></i> &nbsp; {content}
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-md-6">
							<div className="single-skill wow fadeInUp" data-wow-delay=".4s">
								<div className="skill-icon">
									<i className="fa-solid fa-school"></i>
								</div>
								<div className="skill-content">
									<h4>Structured Education</h4>
									{structuredEducation.content.map((content, index) => (
										<div key={index}>
											<i className="fa-solid fa-check"></i> &nbsp; {content}
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-md-6">
							<div className="single-skill wow fadeInUp" data-wow-delay=".6s">
								<div className="skill-icon">
									<i className="fa-solid fa-people-arrows"></i>
								</div>
								<div className="skill-content">
									<h4>Discussion Forum</h4>
									{discussionForum.content.map((content, index) => (
										<div key={index}>
											<i className="fa-solid fa-check"></i> &nbsp; {content}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
