import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CoursesSection from "./CoursesSection";

interface Course {
  course_id: number;
  title: string;
  author: string;
  total_content: number;
  description: string;
}

interface Category {
  category_id: number;
  name: string;
  description: string;
  courses: Course[];
}

interface ApiResponse {
  status: string;
  message: string;
  categories: Category[];
  popular_courses: Course[];
  recommended_courses: Course[];
}

const CoursesPage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div
          className="col-6 bg-light bg-gradient m-2"
          style={{ overflowY: "auto" }}
        >
          <h4 style={{marginBottom:'10px'}}>
            <i className="bi bi-journal-text" style={{ marginRight: '1px' }}></i>
            Courses By Categories
          </h4>
          {data.categories.map((category) => (
            <div
              key={category.category_id}
              onMouseOver={() => setHoveredCategory(category.category_id)}
              onMouseOut={() => setHoveredCategory(null)}
              style={{
                backgroundColor:
                  hoveredCategory === category.category_id
                    ? "#c8ddfa"
                    : "#95bdf5",
              }}
              className="rounded m-2"
            >
              <div
                className="d-flex justify-content-between align-items-center p-3"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.category_id
                      ? null
                      : category.category_id
                  )
                }
              >
                <h5>
                  <i
                    className={
                      selectedCategory === category.category_id
                        ? "bi bi-caret-down-fill"
                        : "bi bi-caret-right-fill"
                    }
                  ></i>{" "}
                  {category.name}
                </h5>
                {selectedCategory !== category.category_id && (
                  <i className="bi bi-arrow-right"></i>
                )}
              </div>
              {selectedCategory === category.category_id && (
                <div className="bg-light p-3 mb-2 rounded">
                  <CoursesSection
                    title={""}
                    courses={category.courses}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="col-5 mt-2 mb-2 mr-3"
          style={{ overflowY: "auto" }}
        >
          <CoursesSection
            title="Popular Courses"
            courses={data.popular_courses}
          />
          <CoursesSection
            title="Courses By Preferences"
            courses={data.recommended_courses}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;