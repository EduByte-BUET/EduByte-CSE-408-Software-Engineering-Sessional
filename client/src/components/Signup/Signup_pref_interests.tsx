import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { useState } from "react";
import React from "react";
import api from "../../api/GeneralAPI";

interface Props {
	background: string;
	fieldOptions: string[];
}

function Signup_pref_interests(props: Props) {
	const { setCurrentUser } = React.useContext(UserContext);
	const { background, fieldOptions } = props;

	const navigate = useNavigate();
	const location = useLocation();
	// Get data from the previous page
	const userInfo = location.state;

	const resetAll = () => {
		setFieldsSelected([]);
	};

	const [fieldsSelected, setFieldsSelected] = useState<string[]>([]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		console.log(fieldsSelected);

		if (fieldsSelected.length == 0) {
			alert("You must select at least one field of interest to continue");
			return;
		}
		const updatedUserInfo = { ...userInfo, interests: fieldsSelected };
		console.log(updatedUserInfo);

		// Send data to backend
		try {
			const res = await api.post("/user/signup", { updatedUserInfo });

			if (res) {
				navigate("/home", { state: updatedUserInfo }); // reload
				setCurrentUser(updatedUserInfo.username);
				resetAll();
			}
		} catch (err) {
			console.log(err);
			alert(
				"There was a problem in updating your data, kindly try again from the beginning"
			);
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
					<form onSubmit={handleSubmit}>
						<h1 className="mb-5">
							Signup in{" "}
							<span style={{ fontWeight: "bold", color: "dodgerblue" }}>
								EduByte
							</span>
						</h1>
						<h3 className="mb-2">What are your interests?</h3>
						<div style={{ overflowY: "auto", maxHeight: "50vh" }}>
							{fieldOptions.map((option, index) => (
								<div className="form-check" key={index}>
									<input
										className="form-check-input custom-form-check-input"
										type="checkbox"
										value=""
										id={`field-${index}`}
										onChange={(event) => {
											if (event.target.checked) {
												setFieldsSelected([...fieldsSelected, option]);
											} else {
												const newFieldsSelected = fieldsSelected.filter(
													(field) => field !== option
												);
												setFieldsSelected(newFieldsSelected);
											}
										}}
									/>
									<label
										className="form-check-label custom-form-check-label"
										htmlFor={`field-${index}`}
									>
										{option}
									</label>
								</div>
							))}
						</div>
						<div className="d-flex justify-content-end w-100">
							<button type="submit" className="btn blue-button mt-5 w-50">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup_pref_interests;
