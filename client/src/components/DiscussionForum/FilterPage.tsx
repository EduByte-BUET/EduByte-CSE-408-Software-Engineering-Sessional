import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/dashboard.css";
import newimage from "../../assets/hero-img.png";
import api from "../../api/GeneralAPI";
import { UserContext } from "../UserContext/UserContext";

const FilterPage = () => {
  const [activeLink, setActiveLink] = useState(""); // Default active link
  const currentUser = React.useContext(UserContext);

  // Function to set the active link and apply the 'active' class
  const handleSetActiveLink = (link: any) => {
    setActiveLink(link);
  };

  // Getting the current user from the context
  const { setCurrentUser } = React.useContext(UserContext);
  const navigate = useNavigate();

 

  return (
    <div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars">
      <div className="text-center py-4">
        <img src={newimage} alt="User" className="img-thumbnail" />
        <h3>Username</h3>
      </div>
     
      <button className="btn blue-button m-3" onClick={() => navigate("/home")}>
        <i className="bi bi-house"></i> Home
      </button>
      <button className="btn blue-button m-3" >
        Logout
      </button>
    </div>
  );
};

export default FilterPage;
