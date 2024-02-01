import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface Props {
    background: string;
    options: string[];
}

function Signup_pref_institution(props: Props) {
	const { background, options } = props;
	
	const navigate = useNavigate();
	const location = useLocation();
	// Get data from the previous page
	const userInfo = location.state;

	const [optionSelected, setOptionSelected] = useState("");

	const handleSubmit_Institution = (event: any) => {
		event.preventDefault();
		console.log(optionSelected);

		if (optionSelected === "" || userInfo === undefined) {
			alert("There was a problem in updating your data, kindly try again from the beginning");
			return;
		}
		const updatedUserInfo = { ...userInfo, institution: optionSelected };

		navigate("/signup/experience", {state: updatedUserInfo}); // reload
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
					<form onSubmit={handleSubmit_Institution}>
						<h1 className="mb-5">
							Signup in{" "}
							<span style={{ fontWeight: "bold", color: "dodgerblue" }}>
								EduByte
							</span>
						</h1>
						<h3 className="mb-1">What is your institution level?</h3>
						{options.map((option, index) => (
							<div className="form-check custom-form-check mt-3" key={index}>
								<input
									className="form-check-input custom-form-check-input"
									type="radio"
									name="educationLevel"
									id={`radio-${index}`}
									value={option}
									onChange={(e) => setOptionSelected(e.target.value)}
								/>
								<label
									className="form-check-label custom-form-check-label"
									htmlFor={`radio-${index}`}
								>
									{option}
								</label>
							</div>
						))}
						<div className="d-flex justify-content-end w-100">
							<button type="submit" className="btn blue-button mt-5 w-50">
								Next
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup_pref_institution;
