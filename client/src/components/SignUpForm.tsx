import React from "react";
import { Form, Button } from "react-bootstrap";
import bg from ".././assets/images/background_signup.jpg";
import { useState } from "react";
import axios from "axios";

function SignUpForm() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [retype, setRetype] = useState("");

	const handleSubmit = (event: React.FormEvent<any>) => {
		event.preventDefault();
		console.log("Form submitted");
		console.log([fullName, email, userName, password, retype]);

    axios.post('http://localhost:3000/api/signup', {
      fullName: fullName,
      email: email,
      userName: userName,
      password: password
	});

	};

	const handleInputChange = async (event: React.ChangeEvent<any>) => {
		const { name, value } = event.target;

		switch (name) {
			case "fullname":
				setFullName(value);
				break;
			case "email":
				setEmail(value);
				break;
			case "username":
				setUserName(value);
				break;
			case "password":
				setPassword(value);
				break;
			case "retype":
				setRetype(value);
				break;
			default:
				break;
		}
	};

	return (
		<div className="row">
			<div
				className="col-md-6"
				style={{
					backgroundImage: `url(${bg})`,
					backgroundSize: "cover",
					height: "100vh",
				}}
			></div>
			<div className="col-md-6 d-flex align-items-center justify-content-center">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Fullname</Form.Label>
						<Form.Control
							name="fullname"
							type="text"
							placeholder="Enter your full name"
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="Enter your email"
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">
							Email Address must contain '@domain'
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							name="username"
							type="text"
							placeholder="Enter your username"
							onChange={handleInputChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="Enter your password"
							onChange={handleInputChange}
						/>
						<Form.Text className="text-danger">
							Use 8 characters or more for your password
						</Form.Text>
					</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Retype</Form.Label>
            <Form.Control
              name="retype"
              type="password"
              placeholder="Retype your password"
              onChange={handleInputChange}
            />
          </Form.Group>

					<button className="btn btn-primary" type="submit">
						Next
					</button>

					<div className="mt-3 mb-3">or sign up with</div>

					<Button variant="outline-primary" className="me-3">
						Facebook
					</Button>
					<Button variant="outline-danger">Google</Button>

					<div className="mt-3">
						<a href="#">Request for content creator account</a>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default SignUpForm;
