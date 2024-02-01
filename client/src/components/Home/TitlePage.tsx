import { useNavigate } from "react-router-dom";

export default function TitlePage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/courses");
	};

	return (
		<>
			<section id="home" className="hero-area bg_cover">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-xl-5 offset-xl-7 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
							<div className="hero-content">
								<h2 className="mb-30 wow fadeInUp" data-wow-delay=".2s">
									EduByte
								</h2>
								<p className="wow fadeInUp" data-wow-delay=".4s">
									From the smallest lines of code to the grandest software
									systems, CSE empowers dreamers to turn their ideas into
									reality.
								</p>
								<button
									type="button"
									className="btn blue-button"
									onClick={handleClick}
								>
									View Courses
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="hero-left">
					<img src="" alt="" />
					<img src="" alt="" className="shape" />
				</div>
			</section>
		</>
	);
}
