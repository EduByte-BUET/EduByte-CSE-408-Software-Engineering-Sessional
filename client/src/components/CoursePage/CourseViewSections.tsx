import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CoursePage/CourseViewSections.css";
import api from "../../api/GeneralAPI";

const CourseCard = (props: any) => {
  const { course } = props;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    navigate("/courses/detail", {
      state: { course_id: course.course_id, course_title: course.course_title },
    });
  };
  // const handleFavourites = (event: React.MouseEvent) => {
  // 	const postFavourites = async () => {
  // 	  try {
  // 		const res = await api.post(`/courses/favorite?course_id=${course.course_id}`);
  // 		console.log(res);
  // 	  } catch (err) {
  // 		console.log(err);
  // 	  }
  // 	};
  // 	postFavourites();
  //   };

  return (
    <div
      key={course.course_id}
      className="course-card rounded mb-2 pt-2"
      onClick={handleClick}
    >
      <div className="row">
        <div className="col">
          <h5>
            <i className="fa-regular fa-bookmark"></i> &nbsp;{" "}
            {course.course_title}
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <p>
            <i className="fa-solid fa-table-list"></i> &nbsp; {course.category}
          </p>
        </div>
        <div className="col-md-3">
          <p>
            <i className="fa-solid fa-gears"></i> &nbsp;{" "}
            {course.difficulty_level}
          </p>
        </div>
      </div>
    </div>
  );
};

const CoursesSection = (props: any) => {
  const { title, courses } = props;
  return (
    <div className="course-section row bg-gradient p-3">
      <h4
        style={{
          textAlign: "left",
          borderBottom: "2px solid black",
          marginBottom: "20px",
        }}
      >
        {title}
      </h4>
      {courses.map((course: any) => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  );
};

export default CoursesSection;
