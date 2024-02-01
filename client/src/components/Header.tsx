import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import api from "../api/GeneralAPI";

function Header() {
	const navigate = useNavigate();
	const [logo, setLogo] = useState<string>("");
	const currentUser = React.useContext(UserContext).currentUser;
	// Getting the logo from the server
	useEffect(() => {
		api
			.get("/home/logo", { responseType: "blob" })
			.then((response) => {
				var imgURL = URL.createObjectURL(response.data);
				setLogo(imgURL);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<Navbar bg="light" expand="lg" className="p-0">
			<Container
				className="flex justify-content-between"
			>
				<Navbar.Brand />
				{/* Nav.Link ba Link tag use korle full navbar ta link hoye jay, tai onClick{} use korte hoyeche */}
				<img
					src={logo}
					width="12%"
					className="align-top"
					alt="logo"
					onClick={() => navigate("/home")}
					style={{ cursor: "pointer" }}
				/>

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
					<Nav.Link as={Link} to="/upload" className="custom-nav-link">
						Course Upload (Content Creator Only)
					</Nav.Link>

					{ currentUser ? <Nav.Link as={Link} to="/user/dashboard" className="custom-nav-link">
						{currentUser} [Logged In]
					</Nav.Link> : null }
					{ currentUser==null ? <Nav.Link as={Link} to="/signin" className="custom-nav-link">
						Signin
					</Nav.Link> : null }

				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;
