import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/style.css"
//import "../css/animate.css"
//import "../css/bootstrap-5.0.5-alpha.min.css"
import "../css/LineIcons.2.0.css"


import TitlePage from "./homepage_comp/TitlePage";
import PopularCourses from "./homepage_comp/PopularCourses";
import ContactInfo from "./homepage_comp/ContactInfo";
import Skills from "./homepage_comp/Skills";
import TopBlogs from "./homepage_comp/TopBlogs";
import Footer from "./homepage_comp/Footer";
import Category from "./homepage_comp/Category";
export default function Homepage() {
  return (

    <div>
     
 
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

