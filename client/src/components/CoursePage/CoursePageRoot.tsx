import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CoursesPageHome from "./CoursesPageHome";
import CourseDetail from "./CourseDetail";
import CourseBlocks from "./CourseBlocks";
import LectureInfo from "./LectureInfo";
import Lesson from "./Lesson";

import "../../css/CoursePage/CoursesPageList.css";

function CoursePageRoot() {

	return (
		<>
			<Routes>
				<Route path="" element={<CoursesPageHome />} />
				<Route path="/detail" element={<CourseDetail />} />
				<Route path="/blocks" element={<CourseBlocks />} />
				<Route path="/lectures" element={<LectureInfo />} />
				<Route path="/lectures/info" element={<Lesson />} />
			</Routes>
		</>
	);
}

export default CoursePageRoot;
