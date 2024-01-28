import React, { useState, useEffect } from 'react';
import "../../css/popularcourses.css"
import newImage from "../../assets/hero-img.png"
export default function PopularCourses() {
  

 const dummyData = [
   {
     course_id: 1,
     course_name: "Data Science Fundamentals",
     cover_photo: "cover_photo_url",
     category: "Data Science",
     instructor: "John Doe",
     taken: 1234,
     estimated_time: "5 hours",
   },
   {
     course_id: 2,
     course_name: "JavaScript for Beginners",
     cover_photo: "cover_photo_url",
     category: "Web Development",
     instructor: "Jane Smith",
     taken: 5678,
     estimated_time: "6 hours",
   },
   {
     course_id: 3,
     course_name: "JavaScript for Intemediate Learners",
     cover_photo: "cover_photo_url",
     category: "Web Development",
     instructor: "Jane Smith",
     taken: 1231,
     estimated_time: "4.2 hours",
   },
   {
     course_id: 4,
     course_name: "Python for Intemediate Learners",
     cover_photo: "cover_photo_url",
     category: "Web Development",
     instructor: "Willium Smith",
     taken: 1000,
     estimated_time: "2.2 hours",
   },
 ];
 
  const [itemChunks, setItemChunks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    chunkData(dummyData);
  }, []); // Dependency array is empty to mimic componentDidMount

  const chunkData = (data) => {
    const chunkSize = 3;
    const chunks = [];

    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }

    setItemChunks(chunks);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % itemChunks.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + itemChunks.length) % itemChunks.length);
  };

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lora&display=swap"
          rel="stylesheet"
        />
      </head>
      <section id="courses" className="course-area pt-140 pb-170 ">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-10 mx-auto">
              <div className="section-title text-center mb-50">
                <h2 className="mb-15 wow fadeInUp" data-wow-delay=".2s">
                  Popular Courses
                </h2>
              </div>
            </div>
          </div>
          <div
            id="carouselExample"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" style={{ padding: "40px" }}>
              {itemChunks.map((chunk, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="row justify-content-center">
                    {chunk.map((item) => (
                      <div key={item.id} className="col-md-3">
                        <div className=" card cardi card-hover ">
                          {/* <a href="../course-single.html">*/}
                          <img
                            src={newImage}
                            alt=""
                            className=" card-img-top card-img-topi"
                          />
                          {/* </a> */}
                          {/* <!-- Card Body --> */}
                          <div className=" card-body card-bodyi ">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span
                                className="badge bg-info-soft"
                                style={{ backgroundColor: "#17a2b8" }}
                              >
                                Intermediate
                              </span>
                              <a href="#" className=" fs-5">
                                <i className="fe fe-heart align-middle"></i>
                              </a>
                            </div>
                            <h4 className="mb-2 text-truncate-line-2 ">
                              <a
                                href="../course-single.html"
                                className="text-inherit"
                                style={{ textDecoration: "none" , fontSize: 'large' }}
                              >
                                {item.course_name}
                              </a>
                            </h4>

                            <small>'By: {item.instructor}'</small>
                            <div className="mt-3 d-flex align-baseline lh-1">
                              <span className="fs-6">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-star-fill text-warning"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </span>
                              <span className="text-warning mx-1">4.5</span>
                            </div>
                            <div style={{ marginTop: "8px" }}>
                              <div style={{ fontSize: "14px", color: "#333" }}>
                                Total Enrolled: {item.taken}
                              </div>
                              <div style={{ fontSize: "14px", color: "#555" }}>
                                Estimated Time: {item.estimated_time}
                              </div>
                            </div>
                          </div>
                          {/* <!-- Card Footer --> */}
                          <div className="card-footer card-footer-pop">
                            <div className="row align-items-center g-0">
                              <div className="col-auto">
                                <a href="#" className="text-inherit ">
                                  <button className="btn blue-button">
                                    <i className="fe fe-shopping-cart text-primary align-middle me-2"></i>
                                    Get Enrolled
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              className="carousel-control-prev"
              role="button"
              onClick={handlePrev}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="false"
              ></span>
            </a>
            <a
              className="carousel-control-next"
              role="button"
              onClick={handleNext}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="false"
              ></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
