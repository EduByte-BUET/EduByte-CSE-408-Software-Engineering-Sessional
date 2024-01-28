// CoursesSection.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/CoursePage/CourseViewSections.css';

interface Course {
  course_id: string | number;
  title: string;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    navigate(`/courses/${course.course_id}`);
  };

  return (
    <div key={course.course_id} className="course-card rounded mb-2 mr-auto ml-auto">
      <h6 onClick={handleClick} style={{ cursor: 'pointer' }}>
        {course.title}
      </h6>
    </div>
  );
};

interface CoursesSectionProps {
  title: string;
  courses: Course[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ title, courses }) => {
  return (
    <div className="course-section row bg-light bg-gradient">
      <h4>{title}</h4>
      {courses.map((course) => <CourseCard key={course.course_id} course={course} />)}
    </div>
)};

export default CoursesSection;