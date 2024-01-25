import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import CoursesPage from "./components/Courses";
import SignUpForm from "./components/SignUpForm";
import CourseDetail from "./components/CourseDetail";
import CourseBlocks from "./components/CourseBlocks";
import Header from './components/Header';
import './App.css';
import './button.css';
import LectureInfo from './components/LectureInfo';
import Homepage from './components/homepage';

const App: React.FC = () => {
  const [courseData, setCourseData] = useState<{ course_id: number; courseName: string } | null>(null);

  const handleCourseData = (data: { course_id: number; courseName: string }) => {
    setCourseData(data);
  };
  const [blockData, setBlockData] = useState<{ block_id: number; blockName: string } | null>(null);
  const handleBlockData = (data: {block_id:number; blockName:string}) => {
    setBlockData(data);
  };

  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/courses/:course_id" element={<CourseDetail onCourseData={handleCourseData}/>} />
        <Route path="/courses/:course_id/blocks" element={<CourseBlocks onBlockData={handleBlockData}/>} />
        <Route path="/courses/:course_id/blocks/:block_id" element={<LectureInfo courseData={courseData} blockData={blockData}/>} />
      </Routes>
    </Router>
  );
};

export default App;