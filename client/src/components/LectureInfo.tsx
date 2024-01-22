import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlockTemp from './BlockTemp';

type Block = {
    block_id: number;
    block_name: string;
    total_lectures: number;
    total_quizzes: number;
};
type Lecture = {
  lecture_id: number;
  lecture_title: string;
  description: string;
  video_url: string;
  pdf_url: string;
};

type LecturesData = {
  lectures: Lecture[];
  block: Block;
};
interface LectureInfoProps {
    courseData: { course_id: number; courseName: string } | null;
    blockData: { block_id: number; blockName: string } | null;
}
const LectureInfo: React.FC<LectureInfoProps> = ({ courseData, blockData }) => {
  const { course_id, block_id } = useParams<{ course_id: string; block_id: string }>();
  const [data, setData] = useState<LecturesData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/courses/blocks/lectures?course_id=${course_id}&block_id=${block_id}`);
      setData(result.data);
    };

    fetchData();
  }, [course_id, block_id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-5 m-2">
          <div className="text-start mt-3">
            <h3>{courseData?.courseName}</h3>
            <p>
              <b>
                | Block {data.block.block_id}
              </b>
            </p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {data.lectures.map((lecture => (
              <div key={lecture.lecture_id} className="row-border mt-2 rounded hover-effect p-3 text-start">
              <h5>Lecture {lecture.lecture_id}</h5>
              <h5>{lecture.lecture_title}</h5>
            </div>
            )))}
          </div>
        </div>
        <div className="col-6 m-2" style={{ overflowY: "auto" }}>
          <div className="text-start mt-3">
            <p>
              <i className="bi bi-house"></i>.{courseData?.courseName}
            </p>
            <p><b>Block {blockData?.block_id}|{blockData?.blockName}</b></p>
          </div>
          <div style={{ overflowY: "auto" }}>
            {data.lectures.map((lecture) => (
                <div key={lecture.lecture_id} className="row-border mt-2 rounded p-3 text-start bold-text block-effect">
                <p>Lecture {lecture.lecture_id}|{lecture.lecture_title}</p>
                <p>{lecture.description}</p>
                <p><i className="bi bi-file-earmark-text"></i> {lecture.pdf_url}</p>
                <p><i className="bi bi-camera-video"></i> {lecture.video_url}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;