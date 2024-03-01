import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel"

export default function TitlePage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/courses");
	};

	return (
		<Carousel />
	);
}
