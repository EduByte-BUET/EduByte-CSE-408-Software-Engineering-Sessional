import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
	const [logo, setLogo] = useState<string>("");

	// Getting the logo from the server
	useEffect(() => {
		axios
			.get("http://localhost:3000/home/logo", { responseType: "blob" })
			.then((response) => {
				var imgURL = URL.createObjectURL(response.data);
				setLogo(imgURL);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<Navbar bg="light" expand="lg">
			<Container
				style={{ display: "flex", justifyContent: "space-between", padding: 0 }}
			>
				<Navbar.Brand />
				<Link to="/home" className="d-flex">
					<img
						src={logo}
						width="13%"
						height="13%"
						className="d-inline-block align-top"
						alt="EduByte logo"
					/>
				</Link>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" />
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/courses" className="custom-nav-link">
						Courses
					</Nav.Link>
					<Nav.Link as={Link} to="/discussion" className="custom-nav-link">
						Discussion
					</Nav.Link>
					<Nav.Link as={Link} to="/donate" className="custom-nav-link">
						Donate
					</Nav.Link>
					<Nav.Link as={Link} to="/login" className="custom-nav-link">
						Login
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;
