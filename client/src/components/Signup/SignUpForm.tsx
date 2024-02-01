import React from "react";
import api from "../../api/GeneralAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

function Login(props: any) {
	const { background } = props;
	const navigate = useNavigate();
	const currentUser = React.useContext(UserContext);

	const [user, setUser] = useState({
		fullname: "",
		email: "",
		username: "",
		password: "",
		retypepassword: "",
	});

	const resetFields = () => {
		setUser({
			fullname: "",
			email: "",
			username: "",
			password: "",
			retypepassword: "",
		});
	};

	const handleSubmit = async (event: React.FormEvent<any>) => {
		event.preventDefault();

		if (
			user.fullname === "" ||
			user.email === "" ||
			user.username === "" ||
			user.password === "" ||
			user.retypepassword === ""
		) {
			alert("Please fill all the fields");
			resetFields();
			return;
		}

		if (user.password !== user.retypepassword) {
			alert("Passwords do not match");
			resetFields();
			return;
		}

		// Check for username duplicacy
		try {
			await api.get(`/user/signup/${user.username}`);
			
			currentUser.setCurrentUser(user.username);
			console.log("Status code : 200");
			// status: 200
		} catch (err) {
			// status: 409 (conflict)
			alert("Username already exists");
			resetFields();
			return;
		}

		// by default, if anything occurs don't let the user create an account
		navigate("/signup/institution", {
			state: {
				fullname: user.fullname,
				email: user.email,
				username: user.username,
				password: user.password,
			},
		}); // Navigate to the next page
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
						Signup in{" "}
						<span style={{ fontWeight: "bold", color: "dodgerblue" }}>
							EduByte
						</span>
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<input
								type="text"
								className="form-control input-field"
								placeholder="Type your fullname"
								value={user.fullname}
								onChange={(e) => setUser({ ...user, fullname: e.target.value })}
							/>
						</div>
						<div className="mb-3">
							<input
								type="email"
								className="form-control input-field"
								placeholder="Type your email"
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
								type="text"
								className="form-control input-field"
								placeholder="Type your username"
								value={user.username}
								onChange={(e) => setUser({ ...user, username: e.target.value })}
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control input-field"
								placeholder="Type your password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control input-field"
								placeholder="Retype your password"
								value={user.retypepassword}
								onChange={(e) =>
									setUser({ ...user, retypepassword: e.target.value })
								}
							/>
						</div>
						<button type="submit" className="btn blue-button w-100">
							Next
						</button>
					</form>
					<div className="mt-5"></div>
					<div className="mt-5"></div>
					or signup with..
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
