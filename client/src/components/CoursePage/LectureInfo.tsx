import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

// lectures_list = {
//   status: "success",
//   message: "Lectures for the block retrieved successfully.",
//   block: {
//     block_id: 101,
//     block_title: "Fundamentals of Programming",
//     total_lectures: 5,
//   },
//   lectures: [
//     {
//       lecture_id: 1001,
//       lecture_title: "Introduction to Variables",
//       description: "Understanding the basics of variables in programming."
//                                lessons: [
//       {
//         lesson_id: 1,
//         lesson_type: "pdf",
//         title: "Intro_to_Variables_Handout",
//         description:
//           "A comprehensive handout on the introduction to variables.",
//       },
//     ],
//     },
//     {
//       lecture_id: 1002,
//       lecture_title: "Control Structures",
//       description: "Exploring control flow in programming."
//                                lessons: [
//       {
//         lesson_id: 1,
//         lesson_type: "pdf",
//         title: "Intro_to_Variables_Handout",
//         description:
//           "A comprehensive handout on the introduction to variables.",
//       },
//     ],
//     },
//   ],
// };

type Block = {
  block_id: number;
  block_name: string;
  total_lectures: number;
  total_quizzes: number;
};
type Lesson = {
	lesson_id: number;
	lesson_type: string;
	lesson_title: string;
	lesson_content: string;
	file_url: string;
};

type Lecture = {
	lecture_id: number;
  description: string;
	lecture_title: string;
	author: string;
	content: string;
	serial: number;
	view_count: number;
	difficulty: string;
	duration: string;
	creation_time: string;
	lessons: Lesson[];
};

type LecturesData = {
  lectures: Lecture[];
  block: Block;
};
interface LectureInfoProps {
    courseData: { course_id: number; courseName: string } | null;
    blockData: { block_id: number; blockName: string } | null;
    onLectureData: (data: { lecture_id: number; lecture_title: string }) => void;
}
const LectureInfo: React.FC<LectureInfoProps> = ({ courseData, blockData, onLectureData}) => {
  const { course_id, block_id } = useParams<{ course_id: string; block_id: string }>();
  const [data, setData] = useState<LecturesData | null>(null);

  const handleClick = (lecture_id: number, lecture_title: string) => {
    console.log([lecture_id, lecture_title]);
    onLectureData({ lecture_id, lecture_title });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/courses/blocks/lectures?course_id=${course_id}&block_id=${block_id}`);
      console.log(res.data);
      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <Spinner />;
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
            {data.lectures.map(((lecture, index) => (
              <Link to={`/courses/${course_id}/blocks/${block_id}/lectures/${lecture.lecture_id}`} onClick={()=>handleClick(lecture.lecture_id,lecture.lecture_title)} className='custom-link'>
              <div key={lecture.lecture_id} className="row-border mt-2 rounded hover-effect p-3 text-start">
                <h5>Lecture {index+1}</h5>
                <h5>{lecture.lecture_title}</h5>
              </div>
            </Link>
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
            {data.lectures.map((lecture, index) => (
               <Link to={`/courses/${course_id}/blocks/${block_id}/lectures/${lecture.lecture_id}`} onClick={()=>handleClick(lecture.lecture_id,lecture.lecture_title)}className='custom-link'>
               <div key={lecture.lecture_id} className="row-border mt-2 rounded p-3 text-start bold-text block-effect">
                 <p>Lecture {index+1}|{lecture.lecture_title}</p>
                 <p>{lecture.description}</p>
                 {lecture.lessons.map((lesson) => (
                    <p><i className="bi bi-file-earmark-text"></i> {lesson.lesson_title}</p>
                 ))}
                 {/* <p><i className="bi bi-file-earmark-text"></i> {lecture.lessons.lesson_title}</p>
                 <p><i className="bi bi-camera-video"></i> {lecture.video_title}</p> */}
               </div>
             </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;