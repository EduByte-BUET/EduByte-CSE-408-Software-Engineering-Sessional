import React from "react";
import { UserContext } from "../UserContext/UserContext";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/GeneralAPI";

function Login(props: any) {
	const { background } = props;
	const { setCurrentUser } = React.useContext(UserContext);

	const [user, setUser] = useState({ email: "", password: "" });

	const resetFields = () => {
		setUser({ email: "", password: "" });
	};

	// Custom hook to set local storage
	const useLocalStorage = (key: any, initValue: any) => {
		window.localStorage.setItem(key, initValue);
	}

	const navigate = useNavigate();
	const handleSubmit = async (event: React.FormEvent<any>) => {
		event.preventDefault();

		if (user.email === "" || user.password === "") {
			alert("Please fill all the fields");
			resetFields();
			return;
		}
		
		try {
			const response = await api.post("/user/signin", {
				username: user.email,
				password: user.password,
			});
			
			if (response) {
				// Current user is in the system now
				setCurrentUser(user.email);
				useLocalStorage("currentUser", user.email);

				navigate("/home", { state: user }); 
				resetFields();
			}
		} catch (err) {
			console.log(err);
			alert(
				"Wrong username or password"
			);
			resetFields();
			return;
		}
	};

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				height: "93vh",
				width: "100vw",
			}}
			className="d-flex"
		>
			<div className="flex-fill"></div>
			<div className="flex-fill"></div>
			<div className="flex-fill d-flex justify-content-center align-items-center">
				<div className="d-flex flex-column align-items-center">
					<h1 className="mb-5">
						Signin to{" "}
						<span style={{ fontWeight: "bold", color: "dodgerblue" }}>
							EduByte
						</span>
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<input
								type="text"
								className="form-control input-field"
								placeholder="Email/Username"
								value={user.email}
								aria-describedby="emailHelp"
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
							<div id="emailHelp" className="form-text">
								We'll never share your email with anyone else.
							</div>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control input-field"
								placeholder="Password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>
						<div className="d-flex justify-content-between">
							<button
								type="button"
								className="btn red-button"
								style={{ marginRight: "20px" }}
							>
								<Nav.Link as={Link} to="/signup">
									No account? Signup
								</Nav.Link>
							</button>
							<button type="submit" className="btn blue-button">
								Signin
							</button>
						</div>
					</form>
					<div className="mt-5"></div>
					<div className="mt-5"></div>
					or signin with..
					<br />
					<div className="d-flex justify-content-between mt-4">
						<button
							type="button"
							className="btn btn-primary"
							style={{ marginRight: "20px" }}
						>
							<i className="fab fa-facebook-f pr-2"></i> Facebook
						</button>
						<button type="button" className="btn btn-danger">
							<i className="fab fa-google pr-2"></i> Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
