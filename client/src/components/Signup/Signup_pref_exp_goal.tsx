import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface Props {
	background: string;
	experienceOptions: string[];
	goalOptions: string[];
}

function Signup_pref_exp_goal(props: Props) {
	const { background, experienceOptions, goalOptions } = props;
	
	const navigate = useNavigate();
	const location = useLocation();
	// Get data from the previous page
	const userInfo = location.state;

	const [experienceSelected, setExperienceSelected] = useState("");
    const [goalSelected, setGoalSelected] = useState("");

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(experienceSelected);
        console.log(goalSelected);

		if (experienceSelected === "" || goalSelected == "" || userInfo === undefined) {
			alert("There was a problem in updating your data, kindly try again from the beginning");
			return;
		}
		const updatedUserInfo = { ...userInfo, experience: experienceSelected, goal: goalSelected};

		navigate("/signup/interests", {state: updatedUserInfo}); // reload
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
						<h3 className="mb-1">What is your experience level?</h3>
						{experienceOptions.map((option, index) => (
							<div className="form-check custom-form-check mt-3" key={index}>
								<input
									className="form-check-input custom-form-check-input"
									type="radio"
									name="experienceLevel"
									id={`exp-${index}`}
									value={option}
									onChange={(e) => setExperienceSelected(e.target.value)}
								/>
								<label
									className="form-check-label custom-form-check-label"
									htmlFor={`exp-${index}`}
								>
									{option}
								</label>
							</div>
						))}
						{/* --------------------- info pass korte pera hobe tai component korlam na------------------------------------- */}
						<h3 className="mb-1">What is your goal?</h3>
						{goalOptions.map((option, index) => (
							<div className="form-check custom-form-check mt-3" key={index}>
								<input
									className="form-check-input custom-form-check-input"
									type="radio"
									name="goalLevel"
									id={`goal-${index}`}
									value={option}
									onChange={(e) => setGoalSelected(e.target.value)}
								/>
								<label
									className="form-check-label custom-form-check-label"
									htmlFor={`goal-${index}`}
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

export default Signup_pref_exp_goal;
