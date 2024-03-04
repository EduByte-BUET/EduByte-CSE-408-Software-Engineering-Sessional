import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/home");
	};

	const handleTryAgain = () => {
		navigate("/donate");
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
							style={{ fontSize: "200px", color: "red" }}
							className="fa-solid fa-ban"
						></i>
					</div>
					<div>
						<h2 style={{ opacity: "0.6", color: "red" }}>
							Transaction Cancelled
						</h2>
					</div>
					<div>
						<button className="btn red-button mt-5" onClick={handleClick}>
							Go to Home
						</button>
						<button
							className="btn blue-button mt-5"
							style={{ marginLeft: "20px" }}
							onClick={handleTryAgain}
						>
							Try Again
						</button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Cancel;
