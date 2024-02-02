import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CourseViewSections from "./CourseViewSections";
import CategoryItem from "./CategoryItem";
import api from "../../api/GeneralAPI";
import { Spinner } from "react-bootstrap";
import "../../css/CoursePage/CourseHome.css";

const CoursesPageHome = () => {
  const [categories, setCategories] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/courses/categories");
        setCategories(res.data);
      } catch (err) {
        alert("Error occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const [popularCourses, setPopularCourses] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/courses/popular");
        setPopularCourses(res.data);
		    //console.log(res.data);
      } catch (err) {
        alert("Error occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const [recommendedCourses, setRecommendedCourses] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/courses/recommended");
        setRecommendedCourses(res.data);
      } catch (err) {
        alert("Error occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-6 bg-light m-2" style={{ overflowY: "auto" }}>
          <h4 style={{ marginBottom: "10px" }}>
            <i
              className="bi bi-journal-text"
              style={{ marginRight: "1px" }}
            ></i>
            Courses By Categories
          </h4>

          {categories ? (
            categories.map((category: any) => (
              <CategoryItem key={category.category_id} category={category} />
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </div>
        <div className="col-5 mt-2 mb-2 mr-3" style={{ overflowY: "auto" }}>
          <CourseViewSections
            title="Popular Courses"
            courses={popularCourses ? popularCourses : []}
          />
          <CourseViewSections
            title="Courses By Preferences"
            courses={recommendedCourses ? recommendedCourses : []}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPageHome;
