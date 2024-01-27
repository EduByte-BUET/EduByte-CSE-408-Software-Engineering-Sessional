import { Link } from 'react-router-dom';

interface BlockProps {
  course_id: number | string;
  block_id: number | string;
  block_name: string;
}

interface BlockTempProps extends BlockProps {
  onBlockClick: (blockId: number, blockName: string) => void;
}

const BlockTemp: React.FC<BlockTempProps> = ({ course_id, block_id, block_name, onBlockClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    onBlockClick(Number(block_id), block_name);
  };

  return (
    <Link to={`/courses/${course_id}/blocks/${block_id}`} className="custom-link" onClick={handleClick}>
      <div className="row-border mt-2 rounded hover-effect p-3 text-start">
        <h5>Block {block_id}</h5>
        <h5>{block_name}</h5>
      </div>
    </Link>
  );
};

export default BlockTemp;