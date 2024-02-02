import { useNavigate } from "react-router-dom";

const BlockComponent = (props: any) => {
  const {
    course_id,
    course_name,
    block_id,
    index,
    blockName,
    lectures,
  } = props;
  const navigate = useNavigate();
  const handleBlockClick = () => {
    navigate(`/courses/lectures`, {
      state: {
        course_id: course_id,
        course_name: course_name,
        block_id: block_id,
        block_name: blockName,
        index: index,
      },
    });
  };
  const handleLectureClick = (lecture_id: number, lecture_title: string) => {
    navigate(`/courses/lectures/info`, {
      state: {
        course_id: course_id,
        course_name: course_name,
        block_id: block_id,
        block_name: blockName,
        index: index,
        lecture_id: lecture_id,
        lecture_title: lecture_title,
      },
    });
  };
  return (
    <div className="row-border mt-2 rounded p-3 text-start bold-text block-effect">
      <p key={block_id} onClick={handleBlockClick}>
        Block {index}|{blockName}
      </p>
      <ul>
        {lectures.map((lecture: any) => (
          <li
            key={lecture.lecture_id}
            onClick={handleLectureClick.bind(
              this,
              lecture.lecture_id,
              lecture.title
            )}
          >
            {lecture.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockComponent;
