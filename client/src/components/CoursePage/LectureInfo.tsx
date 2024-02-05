import React, { FC, useEffect, useState } from "react";
import api from "../../api/GeneralAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const LectureInfo = () => {
  const location = useLocation();
  const {
    course_id,
    course_name,
    block_id,
    block_name,
    block_index,
  } = location.state;
  const [lectureInfo, setLectureInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(
        `courses/blocks/lectures?course_id=${course_id}&block_id=${block_id}`
      );
      //console.log(res.data);
      setLectureInfo(res.data);
    };

    fetchData();
  }, []);
  let lectureSize = 0;
  if (lectureInfo && lectureInfo.lectures) {
  lectureSize = lectureInfo.lectures.length;
  }
  const navigate = useNavigate();
  const handleLectureClick = (
    index: number,
    lecture_id: number,
    lecture_title: string
  ) => {
    navigate(`/courses/lectures/info`, {
      state: {
        course_id: course_id,
        course_name: course_name,
        block_id: block_id,
        block_name: block_name,
        block_index: block_index,
        lecture_index: index,
        lecture_id: lecture_id,
        lecture_title: lecture_title,
        lectureSize: lectureSize,
      },
    });
  };

  if (!lectureInfo) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 m-2">
          <div className="text-start mt-3">
            <h3>{course_name}</h3>
            <p>
              <b>| Block {block_index}</b>
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {lectureInfo.lectures.map((lecture: any, index: any) => (
              // Use the lecture id as the key
              <div
                key={lecture.lecture_id}
                className="row-border mt-2 rounded hover-effect p-3 text-start"
                onClick={handleLectureClick.bind(
                  this,
                  index + 1,
                  lecture.lecture_id,
                  lecture.title
                )}
                style={{ cursor: "pointer" }}
              >
                <h5>Lecture {index + 1}</h5>
                <h5>{lecture.title}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="col-6 m-2" style={{ overflowY: "auto" }}>
          <div className="text-start mt-3">
            <p>
              <i className="fas fa-home"></i>.{course_name}
            </p>
            <p>
              <b>
                Block {block_index}|{block_name}
              </b>
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {lectureInfo.lectures.map((lecture: any, index: any) => (
              <div
                key={lecture.lecture_id}
                className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
                onClick={handleLectureClick.bind(
                  this,
                  index + 1,
                  lecture.lecture_id,
                  lecture.title
                )}
                style={{ cursor: "pointer" }}
              >
                <p>
                  Lecture {index + 1}|{lecture.title}
                </p>
                <p>{lecture.description}</p>
                {lecture.lessons.map((lesson: any) =>
                  lesson.lesson_type === "pdf" ? (
                    <p key={lesson.lesson_id}>
                      <i className="fas fa-file-alt"></i> {lesson.title}
                    </p>
                  ) : (
                    <p key={lesson.lesson_id}>
                      <i className="fas fa-video"></i> {lesson.title}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;
