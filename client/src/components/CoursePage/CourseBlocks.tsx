import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BlockTemp from "./BlockTemp";
import BlockComponent from "./BlockComponent";
import api from "../../api/GeneralAPI";
import { Spinner } from "react-bootstrap";

const CourseBlocks = () => {
  const location = useLocation();
  const { course_id, course_title } = location.state;
  const [course, setCourse] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/courses/blocks?course_id=${course_id}`);
        setCourse(response.data);
        // status: 200
      } catch (err) {
        // status: 409 (conflict)
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!course) {
    return <Spinner />;
  }
  const handleCourseClick = () => {
    navigate(`/courses/detail`, {
      state: { course_id: course_id, course_title: course_title },
    });
  };
  const handleHomeClick = () => {
    navigate(`/courses/detail`, {
      state: { course_id: course_id, course_title: course_title },
    });
  };
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 m-2">
          <div className="text-start mt-3">
            <h3 onClick={handleCourseClick} style={{ cursor: "pointer" }}>
              {course.course_title}
            </h3>
            <p>
              <b>
                {course.total_lectures} Lectures, {course.total_quizzes} Quizzes
              </b>
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {course.blocks.map((block: any, index: number) => (
              <BlockTemp
                key={block.block_id}
                course_id={course_id}
                course_name={course_title}
                block_id={block.block_id}
                index={index + 1}
                block_name={block.title}
                lectures={block.lectures}
              />
            ))}
          </div>
        </div>
        <div className="col-6 m-2" style={{ overflowY: "auto" }}>
          <div className="text-start mt-3">
            <p onClick={handleHomeClick} style={{ cursor: "pointer" }}>
              <i className="fas fa-home"></i> &nbsp; {course.course_title}
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {course.blocks.map((block: any, index: number) => (
              <BlockComponent
                key={block.block_id}
                course_id={course_id}
                course_name={course_title}
                block_id={block.block_id}
                index={index + 1}
                blockName={block.title}
                lectures={block.lectures}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBlocks;
