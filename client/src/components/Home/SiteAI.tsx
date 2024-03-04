import React from "react";
import AI from "../CoursePage/AI";

export default function SiteAI() {
	return (
		<>
			<section id="blog" className="blog-area pb-140">
				<div className="container">
					<div className="row">
						<div className="col-xl-6 col-lg-7">
							<div className="section-title">
								<h2 className="wow fadeInUp" data-wow-delay=".2s">
									AI Assitant
								</h2>
								<p className="wow fadeInUp" data-wow-delay=".4s">
									Checkout our site's humble digital learning assistant,
									EduRika.
								</p>
							</div>
						</div>
					</div>

					<div className="row">
						<AI />
					</div>
				</div>
			</section>
		</>
	);
}
