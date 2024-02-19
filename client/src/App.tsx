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
import CoursesPage from "./components/CoursePage/CoursesPageHome";
import CourseDetail from "./components/CoursePage/CourseDetail";
import CourseBlocks from "./components/CoursePage/CourseBlocks";
import LectureInfo from "./components/CoursePage/LectureInfo";
import Lesson from "./components/CoursePage/Lesson";
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
import PostCard from "./components/DiscussionForum/PostCard";
import ForumPage from "./components/DiscussionForum/ForumPage";
import CreatePost from "./components/DiscussionForum/CreatePost";

function App() {
	// -----User Context
	const [currentUser, setCurrentUser] = useState<any>(null);
	// -----
	const [courseData, setCourseData] = useState<{
		course_id: number;
		courseName: string;
	} | null>(null);

	const handleCourseData = (data: {
		course_id: number;
		courseName: string;
	}) => {
		setCourseData(data);
	};
	const [blockData, setBlockData] = useState<{
		block_id: number;
		blockName: string;
	} | null>(null);
	const handleBlockData = (data: { block_id: number; blockName: string }) => {
		setBlockData(data);
	};
	const [lectureData, setLectureData] = useState<{
		lecture_id: number;
		lecture_title: string;
	} | null>(null);
	const handleLectureData = (data: {
		lecture_id: number;
		lecture_title: string;
	}) => {
		setLectureData(data);
	};
	// -----
	const intitutionOptions = [
		"School",
		"College",
		"Under Graduate",
		"Post Graduate",
		"Other",
	];
	const experienceOptions = ["Beginner", "Intermediate", "Advanced"];
	const goalOptions = ["Entering a new field", "Improving my skillset"];
	const fieldOptions = [
		"Computer Science",
		"Software Engineering",
		"Information Technology",
		"Network Engineering",
		"Cybersecurity",
		"Data Science",
		"Artificial Intelligence",
		"Machine Learning",
		"Systems Engineering",
		"Computer Engineering",
		"Database Systems",
		"Web Development",
		"Mobile Application Development",
		"Game Development",
		"Cloud Computing",
		"Big Data",
		"Internet of Things",
		"Virtual Reality",
		"Augmented Reality",
		"Blockchain Technology",
	];

	const [signin_bg, setSignin_bg] = useState<string>("");

	const getSignin_bg = async () => {
		try {
			const response = await signin_api.get("user/signin/bg", { responseType: "blob" });
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

	// save user information in local storage
	useEffect(() => {
		if (currentUser) {
			localStorage.setItem("currentUser", currentUser);
		}
	}, [currentUser]);
	// get user information from local storage
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
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
