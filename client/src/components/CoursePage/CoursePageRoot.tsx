import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// ---------

import api from "../../api/GeneralAPI";

import CoursesPageHome from "./CoursesPageHome";
import CourseDetail from "./CourseDetail";
import CourseBlocks from "./CourseBlocks";
import LectureInfo from "./LectureInfo";
import Lesson from "./Lesson";

import "../../css/CoursePage/CoursesPageList.css";

function CoursePageRoot() {


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

  return (
    <>
        <Routes>
          <Route
            path=""
            element={
              <CoursesPageHome/>
            }
          />
          <Route
            path="/detail"
            element={<CourseDetail/>}
          />
          <Route
            path="/blocks"
            element={<CourseBlocks/>}
          />
          <Route
            path="/lectures"
            element={
              <LectureInfo/>
            }
          />
          <Route
            path="/lectures/info"
            element={
              <Lesson/>
            }
          />
        </Routes>
    </>
  );
}

export default CoursePageRoot;
