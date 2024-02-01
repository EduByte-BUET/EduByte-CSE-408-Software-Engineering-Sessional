import { UserContext } from "../UserContext/UserContext";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/dashboard.css"
import newimage from "../../assets/hero-img.png"
import api from "../../api/GeneralAPI";

const UserProfile = () => {
  const [activeLink, setActiveLink] = useState(""); // Default active link

  // Function to set the active link and apply the 'active' class
  const handleSetActiveLink = (link: any) => {
    setActiveLink(link);
  };

  // Getting the current user from the context
  const { setCurrentUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/logout");

      navigate("/home");
      setCurrentUser(null);
    }
    catch (err) {
      console.error(err);
    }
    
  }

  const handleMyCourses = () => {
    handleSetActiveLink("/courses");
  }

  const handleRecommendations = () => {
    handleSetActiveLink("/recommendations");
  }

  const handleNotifications = () => {
    handleSetActiveLink("/notifications");
  }

  const handleSavedPosts = () => {
    handleSetActiveLink("/savedposts");
  }

  

  return (
    <div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars">
      <div className="text-center py-4">
        <img src={newimage} alt="User" className="img-thumbnail" />
        <h3>Username</h3>
      </div>
      <nav className="nav flex-column">
        <Link
          to="/user/dashboard/mycourses"
          className={`nav-link dash-navlink ${
            activeLink === "/courses" ? "active" : ""
          }`}
          onClick={handleMyCourses}
        >
          Courses
        </Link>
        <Link
          to="/user/dashboard/recommendations"
          className={`nav-link dash-navlink ${
            activeLink === "/recommendations" ? "active" : ""
          }`}
          onClick={handleRecommendations}
        >
          Recommendations
        </Link>
        <Link
          to="/user/dashboard/notifications"
          className={`nav-link dash-navlink ${
            activeLink === "/notifications" ? "active" : ""
          }`}
          onClick={handleNotifications}
        >
          Notifications
        </Link>
        <Link
          to="/user/dashboard/savedposts"
          className={`nav-link dash-navlink ${
            activeLink === "/savedposts" ? "active" : ""
          }`}
          onClick={handleSavedPosts}
        >
          Saved Posts
        </Link>
        <button className="btn blue-button m-3" onClick={() => navigate('/home') }>
              <i className="bi bi-house"></i> Home
      </button>
      <button className="btn blue-button m-3" onClick={handleLogout}>
              Logout
      </button>
      </nav>
    </div>
  );
};

export default UserProfile;
