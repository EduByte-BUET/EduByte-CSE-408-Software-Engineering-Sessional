import React from "react";

export default function Footer() {
	return (
		<>
			<footer id="footer" className="footer-area">
				<div className="container" style={{ borderTop: "2px solid black" }}>
					<div className="row mt-30">
						<div className="col-md-6">
							<div className="footer-widget d-flex justify-content-left">
								<img
									src="https://cdn.pixabay.com/photo/2016/11/12/23/34/learn-1820039_640.jpg"
									alt=""
									height={"150px"}
									style={{
										opacity: 0.8,
										borderRadius: "5%",
										border: "1px solid black",
									}}
								/>
								&nbsp;&nbsp;&nbsp;
								{/* Say something nice about this site */}
								&nbsp;{" "}
								<p style={{ textAlign: "justify" }}>
									{" "}
									<b>Empowering Minds with AI Powered Education</b> <br />
									We believe that everyone has the right to learn and grow, and
									we are committed to making that a reality. Our platform is
									designed to be interactive, engaging, and user-friendly, so
									that learners of all ages and backgrounds can benefit from it.
									We are constantly working to improve our platform and expand
									our offerings, so that we can reach more people and make a
									greater impact. We are excited to be a part of the future of
									education, and we hope you will join us on this journey.
								</p>
							</div>
						</div>
						<div className="col-md-2">
							<h5>
								<b>About</b>
							</h5>
							<ul style={{ textAlign: "left", paddingLeft: "70px" }}>
								<li>Innovative</li>
								<li>Empowering</li>
								<li>AI Powered</li>
								<li>Interactive</li>
							</ul>
						</div>
						<div className="col-md-4">
							<h5>
								<b>Contact</b>
							</h5>
							<ul style={{ textAlign: "left", paddingLeft: "140px" }}>
								<li>
									<b>Contact Information</b>
									<ul>
										<li>EduByte.01@gmail.com</li>
										<li>Phone | 000-2222-5555</li>
									</ul>
								</li>
								<li>
									<b>Social Media</b>
									<ul>
										<li>Facebook | EduByte</li>
										<li>Instagram | EduByte</li>
										<li>Twitter | EduByte</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="footer-credit">
							<div className="footer-social">
								<i className="fa-solid fa-copyright"></i> Copyright by Team of
								EduByte, BUET, Dhaka
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
