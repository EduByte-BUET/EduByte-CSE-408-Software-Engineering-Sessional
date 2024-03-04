import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import api from "../api/GeneralAPI";
import { UserContext } from "./UserContext/UserContext";

function Header() {
	const navigate = useNavigate();
	const [logo, setLogo] = useState<string>("");
	const [accesslevelData, setAccessLevelData] = React.useState<any>(null);
	const { currentUser, setCurrentUser } = React.useContext(UserContext);

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

	// Get the access level of the current user and set the current user from local storage
	useEffect(() => {
		// User signed in na thakle access level e error dibe
		const clearLS = () => {
			localStorage.removeItem("currentUser");
		};
		// Function to handle the fetching of the access level
		const handleAccessLevel = async () => {
			try {
				const res = await api.get("/user/signin/accesslevel");
				setAccessLevelData(res.data.access_level);
			} catch (err) {
				clearLS();
				console.log(err);
			}
		};

		handleAccessLevel();
	}, [currentUser]);

	// Function to handle the logout
	const handleLogout = async () => {
		try {
			await api.get("/user/signin/logout");

			window.localStorage.removeItem("currentUser");
			navigate("/home");
			setCurrentUser(null);
		} catch (err) {
			console.error(err);
		}
	};

	// Accesslevel ta error return korbe and data jodio save thake LS e but header e show korbe na

	return (
		<Navbar bg="light" expand="lg" className="p-0 header">
			<Container fluid className="justify-content-between">
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

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/search" className="custom-nav-link">
							Search
						</Nav.Link>
						<Nav.Link as={Link} to="/courses" className="custom-nav-link">
							Courses
						</Nav.Link>
						<Nav.Link as={Link} to="/discussion" className="custom-nav-link">
							Discussion
						</Nav.Link>
						<Nav.Link as={Link} to="/donate" className="custom-nav-link">
							Donate
						</Nav.Link>
						{currentUser && accesslevelData === "ccreator" && (
							<>
								<Nav.Link as={Link} to="/upload" className="custom-nav-link">
									<i className="fa-solid fa-upload"></i> Course Upload
								</Nav.Link>
								<Nav.Link onClick={handleLogout} className="custom-nav-link">
                                    Logout
                                </Nav.Link>
							</>
						)}
						{currentUser && accesslevelData === "user" ? (
							<Nav.Link
								as={Link}
								to="/user/dashboard"
								className="custom-nav-link"
							>
								<i
									className="fa-solid fa-user-large"
									style={{ color: "#74C0FC" }}
								></i>{" "}
								{currentUser.toUpperCase()}
							</Nav.Link>
						) : currentUser && accesslevelData === "admin" ? (
							<Nav.Link
								as={Link}
								to="/admin/dashboard"
								className="custom-nav-link"
							>
								<i
									className="fa-solid fa-user-large"
									style={{ color: "red" }}
								></i>{" "}
								{currentUser.toUpperCase()}
							</Nav.Link>
						) : null}
						{!currentUser ? (
							<Nav.Link as={Link} to="/signin" className="custom-nav-link">
								Signin
							</Nav.Link>
						) : null}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
