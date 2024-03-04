import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const donate = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/home");
	};

	return (
		<Container className="py-5">
			<Row className="justify-content-md-center">
				<Col md={6}>
					<div className="text-center mb-5">
						<h2 className="search-heading" style={{ textAlign: "left" }}>
							Donate
						</h2>
						<i
							style={{ fontSize: "200px", color: "green", marginTop: "15%" }}
							className="fa-solid fa-check fa-2xl"
						></i>
					</div>
					<div>
						<h3 style={{ opacity: "0.6" }}>Thank you for your donation!</h3>
					</div>
					<div>
						<button className="btn blue-button mt-5" onClick={handleClick}>
							Go to Home
						</button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default donate;
