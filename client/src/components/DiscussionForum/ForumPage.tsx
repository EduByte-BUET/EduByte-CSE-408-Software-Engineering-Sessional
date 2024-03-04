import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../../css/discussion.css";

import PostCard from "./PostCard";
import Filters from "./FilterPage";
import CreatePost from "./CreatePost";
const ForumPage = () => {

  return (
    <div className="container">
      <div className="row">
        <Filters/>
        <Routes>
          <Route path="/" element={<PostCard />} />
          <Route path="/create_post" element={<CreatePost/>} />
        </Routes>
      </div>
    </div>
  );
};

export default ForumPage;
