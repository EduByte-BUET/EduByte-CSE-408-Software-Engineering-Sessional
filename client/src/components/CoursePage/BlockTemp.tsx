import { useNavigate } from 'react-router-dom';



const BlockTemp= (props:any) => {
  const {course_id, block_id, index, block_name} = props;

  return (
      <div className="row-border mt-2 rounded hover-effect p-3 text-start">
        <h5>Block {index}</h5>
        <h5>{block_name}</h5>
      </div>
  );
};

export default BlockTemp;