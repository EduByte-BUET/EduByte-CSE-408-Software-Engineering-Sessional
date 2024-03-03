import { useNavigate } from "react-router-dom";

const BlockComponent = (props: any) => {
	const { course_id, course_name, block_id, index, blockName, lectures } =
		props;

	const navigate = useNavigate();
	const handleBlockClick = () => {
		navigate(`/courses/lectures`, {
			state: {
				course_id: course_id,
				course_name: course_name,
				block_id: block_id,
				block_name: blockName,
				block_index: index,
			},
		});
	};

	const handleLectureClick = (
		lecture_index: number,
		lecture_id: number,
		lecture_title: string
	) => {
		navigate(`/courses/lectures/info`, {
			state: {
				course_id: course_id,
				course_name: course_name,
				block_id: block_id,
				block_name: blockName,
				block_index: index,
				lecture_index: lecture_index,
				lecture_id: lecture_id,
				lecture_title: lecture_title,
			},
		});
	};

	return (
		<div className="row-border mt-2 rounded p-3 text-start block-effect">
			<b key={block_id} onClick={handleBlockClick}>
				Block {index} &nbsp; | &nbsp; {blockName}
			</b>
			<ul style={{ listStyleType: "none" }}>
				{lectures.map((lecture: any, index: number) => (
					<li
						key={lecture.lecture_id}
						onClick={handleLectureClick.bind(
							this,
							index + 1,
							lecture.lecture_id,
							lecture.title
						)}
						style={{
							cursor: "pointer",
							marginTop: "5px",
							transition: "transform 0.3s",
							fontWeight: "normal",
						}}
						onMouseEnter={(e: any) => {
							e.target.style.fontWeight = "bolder";
							e.target.style.transform = "translate(-5px)";
						}}
						onMouseLeave={(e: any) => {
							e.target.style.fontWeight = "normal";
							e.target.style.transform = "translate(0)";
						}}
					>
						Lec {index + 1} &nbsp; | &nbsp;
						{lecture.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default BlockComponent;
