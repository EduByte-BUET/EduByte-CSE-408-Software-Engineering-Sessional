import React, { useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../../css/discussion.css";

import dashboardapi from "../../api/GeneralAPI";
import PostCard from "./PostCard";
import Filters from "./FilterPage";
import CreatePost from "./CreatePost";
const ForumPage = () => {
  const { currentUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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
