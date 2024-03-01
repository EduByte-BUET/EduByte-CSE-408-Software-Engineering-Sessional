import Carousel from "react-bootstrap/Carousel";
import image from "../../assets/home_background.jpg";

function CarouselComponent() {
	return (
		<Carousel controls indicators className="carousel">
			<Carousel.Item interval={2000}>
				<img
					className="d-block"
					src={image}
					alt="First slide"
					height={"500px"}
					width={"80%"}
					style={{ margin: "auto", color: "transparent" }} // Center the image
				/>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block"
					src={image}
					alt="Second slide"
					height={"500px"}
					width={"80%"}
					style={{ margin: "auto" }} // Center the image
				/>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block"
					src={image}
					alt="Third slide"
					height={"500px"}
					width={"80%"}
					style={{ margin: "auto" }} // Center the image
				/>
			</Carousel.Item>
		</Carousel>
	);
}

export default CarouselComponent;
