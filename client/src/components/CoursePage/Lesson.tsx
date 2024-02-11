import React, { useEffect, useState } from "react";
import api from "../../api/GeneralAPI";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import { useLocation, useNavigate } from "react-router-dom";
import AI from "./AI";
import AIImage from "./AI_Image";

const Lesson = () => {
  const location = useLocation();
  const {
    course_id,
    course_name,
    block_id,
    block_name,
    block_index,
    lecture_index,
	lecture_id,
	lecture_title
  } = location.state;
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate(); // Move useNavigate outside the component

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `courses/blocks/lectures/lessons?course_id=${course_id}&block_id=${block_id}&lecture_id=${lecture_id}`
      );
      setData(result.data);
    };

    fetchData();
  }, [course_id, block_id, lecture_id]);

  const handleBlockClick = () => {
    navigate(`/courses/lectures`, {
      state: {
        course_id: course_id,
        course_name: course_name,
        block_id: block_id,
        block_name: block_name,
        block_index: block_index,
      },
    });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 m-2">
          <div className="text-start mt-3">
            <h3>{course_name}</h3>
            <p>
              <b onClick={handleBlockClick} style = {{cursor:"pointer"}}>
                | Block {block_index}|Lecture {lecture_index}
              </b>
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {data.lessons.map((lesson: any, index: any) => (
              <div
                key={lesson.lesson_id}
                className="row-border mt-2 rounded hover-effect p-3 text-start"
                style={{ cursor: "pointer" }}
              >
                <h5>Lesson {index + 1}</h5>
                <h5>{lesson.title}</h5>
              </div>
            ))}
			{/* integrate an AI chatbot UI here */}
			<AI/>
      <p>It's in progress</p>
      <AIImage/>
          </div>
        </div>
        <div className="col-6 m-2" style={{ overflowY: "auto" }}>
          <div className="text-start mt-3">
            <p>
              <i className="fas fa-home"></i>.{course_name}.{block_name}
            </p>
            <p>
              <b onClick={handleBlockClick} style = {{cursor:"pointer"}}>
                Lecture {lecture_index}|{data.title}
              </b>
              <br />
              {data.description}
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {data.lessons.map((lesson: any, index: number) => {
              if (lesson.lesson_type === "pdf") {
                return (
                  <div
                    key={lesson.lesson_id}
                    className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
                    id={`${index + 1}`}
                  >
                    <p>
                      Lesson {index + 1}|{lesson.title}
                    </p>
                    <PdfViewer
                      key={lesson.lesson_id}
                      pdf_content={lesson.description}
                      file_url={lesson.file_url}
                    />
                  </div>
                );
              } else if (lesson.lesson_type === "video") {
                return (
                  <div
                    key={lesson.lesson_id}
                    className="row-border mt-2 rounded p-3 text-start bold-text block-effect"
                    id={`${index + 1}`}
                  >
                    <p>
                      Lesson {index + 1}|{lesson.title}
                    </p>
                    <VideoPlayer videoUrl={lesson.file_url} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
