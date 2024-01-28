import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/homepage.css"



import TitlePage from "./homepage_comp/TitlePage";
import PopularCourses from "./homepage_comp/PopularCourses";
import ContactInfo from "./homepage_comp/ContactInfo";
import Skills from "./homepage_comp/Skills";
import TopBlogs from "./homepage_comp/TopBlogs";
import Footer from "./homepage_comp/Footer";
import Category from "./homepage_comp/Category";
import CourseUpload from "./homepage_comp/CourseUpload";
import Dashboard from "../UserDashboardFolder/Dashboard";

export default function Homepage() {
  return (

    <div>

      {/* <Dashboard/> */}
    {/* <CourseUpload/> */}

     <TitlePage/>
     <Skills/> 
     <PopularCourses/>
     <Category/>
     <TopBlogs/>
     <ContactInfo/>
     <Footer/> 
         
     

    </div>
  );
}

