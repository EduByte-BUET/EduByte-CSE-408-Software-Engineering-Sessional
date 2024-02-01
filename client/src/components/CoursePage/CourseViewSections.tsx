import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/CoursePage/CourseViewSections.css';

const CourseCard = (props:any) => {
  const {course} = props;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    navigate(`/courses/${course.course_id}`);
  };

  return (
    <div key={course.course_id} className="course-card rounded mb-2 mr-auto ml-auto">
      <h6 onClick={handleClick} style={{ cursor: 'pointer' }}>
        {course.course_title}
      </h6>
    </div>
  );
};

const CoursesSection= (props:any) => {
  const {title, courses} = props;
  return (
    <div className="course-section row bg-light bg-gradient">
      <h4>{title}</h4>
      {courses.map((course:any) => <CourseCard key={course.course_id} course={course} />)}
    </div>
)};

export default CoursesSection;