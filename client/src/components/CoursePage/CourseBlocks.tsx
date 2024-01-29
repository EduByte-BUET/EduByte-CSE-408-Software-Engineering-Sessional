import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BlockTemp from "./BlockTemp";
import BlockComponent from "./BlockComponent";
import api from "../../api/CourseInfo";
import { Spinner } from "react-bootstrap";

interface Block {
	block_id: number;
	block_name: string;
	total_lectures: number;
	total_quizzes: number;
	lectures: Array<{
		lecture_id: number;
		lecture_title: string;
		duration_minutes: number;
	}>;
}

interface Course {
	course_id: number;
	course_name: string;
	total_lectures: number;
	total_quizzes: number;
	blocks: Block[];
}

interface ApiResponse {
	status: string;
	message: string;
	course: Course;
}
interface CourseBlocksProps {
	onBlockData: (data: { block_id: number; blockName: string }) => void;
}

const CourseBlocks: React.FC<CourseBlocksProps> = ({ onBlockData }) => {
	const [course, setCourse] = useState<Course | null>(null);
	const { course_id } = useParams<Record<string, string>>();

	const handleBlockClick = (block_id: number, blockName: string) => {
		onBlockData({ block_id: block_id, blockName: blockName });
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.getBlockList(course_id);
				
				setCourse(response.data.course);
				// status: 200
			} catch (err) {
				// status: 409 (conflict)
				console.error(err);
			}
		};

		fetchData();
	}, [course_id]);

	if (!course) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col-5 m-2">
					<div className="text-start mt-3">
						<h3>{course.course_name}</h3>
						<p>
							<b>
								{course.total_lectures} Lectures, {course.total_quizzes} Quizzes
							</b>
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{course.blocks.map((block,index) => (
							<BlockTemp
								key={block.block_id}
								course_id={course.course_id}
								block_id={index+1}
								block_name={block.block_name}
								onBlockClick={handleBlockClick}
							/>
						))}
					</div>
				</div>
				<div className="col-6 m-2" style={{ overflowY: "auto" }}>
					<div className="text-start mt-3">
						<p>
							<i className="bi bi-house"></i>.{course.course_name}
						</p>
					</div>
					<div style={{ overflowY: "auto" }}>
						{course.blocks.map((block, index) => (
							<BlockComponent
								key={block.block_id}
								course_id={course.course_id}
								block_id={index+1}
								blockName={block.block_name}
								lectures={block.lectures}
								onBlockClick={handleBlockClick}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseBlocks;
