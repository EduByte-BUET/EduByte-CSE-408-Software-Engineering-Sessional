import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	InputGroup,
	FormControl,
} from "react-bootstrap";
import api from "../../api/GeneralAPI";
import { useNavigate } from "react-router-dom";

interface DonationAmount {
	amount: number;
}

const donate = () => {
	const navigate = useNavigate();
	const [donationAmount, setDonationAmount] = useState<DonationAmount>({
		amount: 0,
	});

	const handleDonationChange = (e) => {
		setDonationAmount({ amount: parseInt(e.target.value) || 0 });
	};

	const handleSubmit = async () => {
		// Process donation here
		try {
			await api
				.post("/donate/payment", {
					amount: donationAmount.amount,
				})
				.then((res: any) => {
					navigate(res.data.url);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container className="py-5">
			<Row className="justify-content-md-center">
				<Col md={6}>
					<div className="text-center mb-5">
						<h2 className="search-heading" style={{ textAlign: "left" }}>
							Donate
						</h2>
						<p className="lead" style={{ textAlign: "justify" }}>
							On this platform, we are working so more and more people have
							access to education in computer science. You can help us by
							donating so we can maintain this platform and offer our best
							service.
						</p>
					</div>
					<Form onSubmit={handleSubmit}>
						<Row className="justify-content-center mb-3">
							<Col xs={"auto"}>
								<Button
									variant="primary"
									className="me-2"
									size="lg"
									onClick={() =>
										handleDonationChange({ target: { value: "100" } })
									}
								>
									100 /-
								</Button>
							</Col>
							<Col xs={"auto"}>
								<Button
									variant="primary"
									className="me-2"
									size="lg"
									onClick={() =>
										handleDonationChange({ target: { value: "200" } })
									}
								>
									200 /-
								</Button>
							</Col>
							<Col xs={"auto"}>
								<Button
									variant="primary"
									className="me-2"
									size="lg"
									onClick={() =>
										handleDonationChange({ target: { value: "500" } })
									}
								>
									500 /-
								</Button>
							</Col>
							<Col xs={"auto"}>
								<Button
									variant="primary"
									className="me-2"
									size="lg"
									onClick={() =>
										handleDonationChange({ target: { value: "1000" } })
									}
								>
									1000 /-
								</Button>
							</Col>
						</Row>
						<Row className="justify-content-center mb-3">
							<Col>
								<input
									id="donationAmount"
									type="text"
									value={donationAmount.amount}
									onChange={handleDonationChange}
									style={{
										marginRight: "10px",
										borderLeft: "2px solid black",
										borderRight: "2px solid black",
									}}
								/>
							</Col>
						</Row>
						<Row className="justify-content-center mt-3">
							<Col xs={"auto"}>
								<Button
									className="btn green-button"
									variant="primary"
									type="submit"
									size="lg"
									onClick={handleSubmit}
								>
									Donate Now
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default donate;
