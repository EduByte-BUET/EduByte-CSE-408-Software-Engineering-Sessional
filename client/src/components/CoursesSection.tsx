import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  course_id: string | number;
  title: string;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      key={course.course_id} 
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ?  "#cadee6":"#b8e5ff" }}
      className="rounded mb-2 mr-auto ml-auto"
    >
      <h6 className="d-flex justify-content-between align-items-center p-3">
        <Link to={`/courses/${course.course_id}`}>{course.title}</Link>
      </h6>
    </div>
  );
};

interface CoursesSectionProps {
  title: string;
  courses: Course[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ title, courses }) => (
  <div className="row mb-3 bg-light bg-gradient">
    <h4>{title}</h4>
    {courses.map((course) => <CourseCard key={course.course_id} course={course} />)}
  </div>
);

export default CoursesSection;