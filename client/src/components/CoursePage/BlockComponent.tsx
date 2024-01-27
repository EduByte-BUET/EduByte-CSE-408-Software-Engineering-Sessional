import { Link } from 'react-router-dom';

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

const BlockComponent: React.FC<BlockComponentProps> = ({ course_id, block_id, blockName, lectures, onBlockClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    onBlockClick(block_id, blockName);
  };

  return (
    <Link to={`/courses/${course_id}/blocks/${block_id}`} className="custom-link" onClick={handleClick}>
      <div className="row-border mt-2 rounded p-3 text-start bold-text block-effect">
        <p>Block {block_id}|{blockName}</p>
        <ul>
          {lectures.map((lecture) => (
            <li key={lecture.lecture_id}>{lecture.lecture_title}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default BlockComponent;