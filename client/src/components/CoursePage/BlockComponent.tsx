import { useNavigate } from 'react-router-dom';

interface Lecture {
  lecture_id: number;
  lecture_title: string;
}

interface BlockProps {
  course_id: number;
  block_id: number;
  blockName: string;
  lectures: Lecture[];
}

interface BlockComponentProps extends BlockProps {
  onBlockClick: (blockId: number, blockName: string) => void;
}

const BlockComponent = (props:any) => {
  const {course_id, block_id, index, blockName, lectures} = props;
  return (
      <div className="row-border mt-2 rounded p-3 text-start bold-text block-effect">
        <p>Block {index}|{blockName}</p>
        <ul>
          {lectures.map((lecture:any) => (
            <li key={lecture.lecture_id}>{lecture.lecture_title}</li>
          ))}
        </ul>
      </div>
  );
};

export default BlockComponent;