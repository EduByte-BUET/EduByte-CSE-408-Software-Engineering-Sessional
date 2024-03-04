import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// -----User Context
import { UserContext } from "./components/UserContext/UserContext";
// ---------
import SignUpForm from "./components/Signup/SignUpForm";
import SignupInstitution from "./components/Signup/Signup_pref_institution";
import SignupExpGoal from "./components/Signup/Signup_pref_exp_goal";
import SignupFieldPref from "./components/Signup/Signup_pref_interests";
import SignInForm from "./components/Signin/SignInForm";
import Header from "./components/Header";
import signin_api from "./api/GeneralAPI";

import CoursePageRoot from "./components/CoursePage/CoursePageRoot";
//----home
import Homepage from "./components/Home/Homepage";
import Dashboard from "./components/UserDashboard/Dashboard";
import Dashboard_admin from "./components/AdminDashboard/Dashboard_admin";
// ----
import CourseUpload from "./components/ContentCreatorPage/CourseUpload";
// ----
import QuizPageRoot from "./components/ExamPage/quizPageRoot";
// ----
import "./css/App.css";
import "./css/Header.css";
import "./css/Button.css";
import "./css/SigninSingupInput.css";
import "./css/CoursePage/CoursesPageList.css";
import "./css/SignupPrefs.css";
import ForumPage from "./components/DiscussionForum/ForumPage";
// ---
import Search from "./components/Search/SearchPage";
// ---
import Donation from "./components/DonationPage/DonationPage";
import DonationSuccess from "./components/DonationPage/Successful";
import DonationFailure from "./components/DonationPage/Failue";
import DonationCancel from "./components/DonationPage/Cancel";

function App() {
	// -----User Context
	const [currentUser, setCurrentUser] = useState<string>("");

	const intitutionOptions = [
		"School",
		"College",
		"Under Graduate",
		"Post Graduate",
		"Other",
	];
	const experienceOptions = ["Beginner", "Intermediate", "Advanced"];
	const goalOptions = ["Entering a new field", "Improving my skillset"];
	// const fieldOptions = [
	// 	"Computer Science",
	// 	"Software Engineering",
	// 	"Information Technology",
	// 	"Network Engineering",
	// 	"Cybersecurity",
	// 	"Data Science",
	// 	"Artificial Intelligence",
	// 	"Machine Learning",
	// 	"Systems Engineering",
	// 	"Computer Engineering",
	// 	"Database Systems",
	// 	"Web Development",
	// 	"Mobile Application Development",
	// 	"Game Development",
	// 	"Cloud Computing",
	// 	"Big Data",
	// 	"Internet of Things",
	// 	"Virtual Reality",
	// 	"Augmented Reality",
	// 	"Blockchain Technology",
	// ];

	const [signin_bg, setSignin_bg] = useState<string>("");

  const [fieldOptions, setfieldOptions] = useState<any>([]);
  useEffect(() => {
    const handleFieldOptions = async () => {
      try {
        const res = await signin_api.get("/user/signin/fieldOption");
        
        setfieldOptions(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    handleFieldOptions();
  }, []);

	const getSignin_bg = async () => {
		try {
			const response = await signin_api.get("user/signin/bg", {
				responseType: "blob",
			});
			const imgURL = URL.createObjectURL(response.data);
			return imgURL;
		} catch (error) {
			console.error(error);
			return "";
		}
	};

	useEffect(() => {
		getSignin_bg().then((data) => {
			setSignin_bg(data);
		});
	}, []);

	// Get the user from the local storage
	useEffect(() => {
		const user = localStorage.getItem("currentUser");
		if (user) {
			setCurrentUser(user);
		}
	}, []);

	return (
		<>
			<UserContext.Provider value={{ currentUser, setCurrentUser }}>
				<Router>
					<Header />
					<Routes>
						<Route
							path="/signup"
							element={<SignUpForm background={signin_bg} />}
						/>
						<Route
							path="/signup/institution"
							element={
								<SignupInstitution
									background={signin_bg}
									options={intitutionOptions}
								/>
							}
						/>
						<Route
							path="/signup/experience"
							element={
								<SignupExpGoal
									background={signin_bg}
									experienceOptions={experienceOptions}
									goalOptions={goalOptions}
								/>
							}
						/>
						<Route
							path="/signup/interests"
							element={
								<SignupFieldPref
									background={signin_bg}
									fieldOptions={fieldOptions}
								/>
							}
						/>
						<Route
							path="/signin"
							element={<SignInForm background={signin_bg} />}
						/>

						<Route path="/courses/*" element={<CoursePageRoot />} />
						<Route path="/upload" element={<CourseUpload />} />
						<Route path="/home" element={<Homepage />} />
						<Route path="/user/dashboard/*" element={<Dashboard />} />
						<Route path="/admin/dashboard/*" element={<Dashboard_admin />} />
						<Route path="/quiz/*" element={<QuizPageRoot />} />
						<Route path="/discussion/*" element={<ForumPage />} />
						<Route path="/search" element={<Search />} />
						<Route path="/donate" element={<Donation />} />
						<Route
							path="/donate/payment/success"
							element={<DonationSuccess />}
						/>
						<Route path="/donate/payment/fail" element={<DonationFailure />} />
						<Route path="/donate/payment/cancel" element={<DonationCancel />} />
					</Routes>
				</Router>
			</UserContext.Provider>
		</>
	);
}

export default App;
