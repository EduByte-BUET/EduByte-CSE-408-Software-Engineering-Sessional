import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/homepage.css";

import TitlePage from "./TitlePage";
import PopularCourses from "./PopularCourses";
import ContactInfo from "./ContactInfo";
import Skills from "./Skills";
import TopBlogs from "./SiteAI";
import Footer from "./Footer";
import Category from "./Category";

export default function Homepage() {
	return (
		<div>
			<TitlePage />
			<Skills />
			<PopularCourses />
			<Category />
			<TopBlogs />
			<ContactInfo />
			<Footer />
		</div>
	);
}
