import React from "react";

export default function Skills() {
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
									<h4>Personalized Learning</h4>
									<div> -AI chatbot assistant</div>
									<div> -Enhance Learning</div>
									<div> -Course Recommendation</div>
									Experiences improves the overall learning journey with
									community and relevant content
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
									<div>Hierarchical Education</div>
									<div>Diverse Courses</div>
									<div>Mandatory Exam/Quizzes</div>
									<div>Progress Tracker</div>
									<div>Learner-Instructor Interaction</div>
									<div>AI Chatbot Practice</div>
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
									<div>Interactive Platform</div>
									<div>User Questions</div>
									<div>Upvoting System</div>
									<div>Commenting</div>
									<div>Post Saving</div>
									<div>Peer Learning</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
