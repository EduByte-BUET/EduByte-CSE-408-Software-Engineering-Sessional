import React, { useState } from "react";
import "../../css/courseUpload.css";
import "../../css/Button.css";
import api from "../../api/StoreFiles";

export default function CourseUpload() {
  const [courses, setCourses] = useState([
    { id: "course1", name: "Introduction to React" },
    { id: "course2", name: "Advanced React" },
  ]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [selectedBlock, setSelectedBlock] = useState("");
  const [blockDescription, setBlockDescription] = useState("");

  const [selectedLecture, setSelectedLecture] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");

  const [selectedLesson, setSelectedLesson] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");

  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleTemplateFileChange = (event: any) => {
    setTemplateFile(event.target.files[0]);
  };

  const handleVideoFileChange = async (event: any) => {
    setVideoFile(event.target.files[0]);

    const formData = new FormData();

    if (videoFile === null) return; // don't save if null
    // Append the file to the FormData instance
    formData.append('file', videoFile);
  
    // Send the file to the backend
    try {
      const response = await api.post('/video', formData);
  
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePdfFileChange = async (event: any) => {
    setPdfFile(event.target.files[0]);

    const formData = new FormData();

    if (pdfFile === null) return; // don't save if null
    // Append the file to the FormData instance
    formData.append('file', pdfFile);
  
    // Send the file to the backend
    try {
      const response = await api.post('/pdf', formData);
  
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("hello hello");
    console.log("Template File:", templateFile?.name);
    console.log("Video File:", videoFile?.name);
    console.log("PDF File:", pdfFile?.name);

    console.log("Selected Course:", selectedCourse);
    console.log("CourseDescription:", courseDescription);

    console.log("Selected Block:", selectedBlock);
    console.log("BlockDescription:", blockDescription);

    console.log("Selected Lecture:", selectedLecture);
    console.log("LectureDescription:", lectureDescription);

    console.log("Selected Lesson:", selectedLesson);
    console.log("LessonDescription:", lessonDescription);
  };

  return (
    <div className="course-management">
      <div className="container">
        <h2 style={{ marginBottom: "50px" }}>Course Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            {/* Select Course and Description in left column */}
            <div className="col-md-6">
              {/* course selction */}
              <div style={{ marginBottom: "10px" }}>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/* Label */}
                  <div className="col-md-4">
                    <label htmlFor="courseSelect" className="form-label">
                      Select Course
                    </label>
                  </div>
                  {/* Dropdown */}
                  <div className="col-md-8">
                    <select
                      id="courseSelect"
                      className="form-control"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      {/* Only show this option when no course is selected */}
                      {selectedCourse === "" && (
                        <option value="" disabled hidden>
                          Select a course
                        </option>
                      )}

                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "20px" }}>
                  {/* Description */}

                  <div className="col-md-4">
                    <label htmlFor="courseDescription" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      id="courseDescription"
                      className="form-control"
                      placeholder="Enter course description here..."
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Block Selection */}

              <div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/* Label */}
                  <div className="col-md-4">
                    <label htmlFor="blockSelect" className="form-label">
                      Select Block
                    </label>
                  </div>
                  {/* Dropdown */}
                  <div className="col-md-8">
                    <select
                      id="blockSelect"
                      className="form-control  custom-select"
                      value={selectedBlock}
                      onChange={(e) => setSelectedBlock(e.target.value)}
                    >
                      {/* Only show this option when no course is selected */}
                      {selectedBlock === "" && (
                        <option value="" disabled hidden>
                          Select a Block
                        </option>
                      )}

                      {[...Array(5).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "20px" }}>
                  {/*  Description */}

                  <div className="col-md-4">
                    <label htmlFor="blockDescription" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      id="blockDescription"
                      className="form-control"
                      placeholder="Enter block description here..."
                      value={blockDescription}
                      onChange={(e) => setBlockDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Lecture Selection */}

              <div style={{ marginBottom: "10px" }}>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/* Label */}
                  <div className="col-md-4">
                    <label htmlFor="lectureSelect" className="form-label">
                      Select Lecture
                    </label>
                  </div>
                  {/* Dropdown */}
                  <div className="col-md-8">
                    <select
                      id="lectureSelect"
                      className="form-control  custom-select"
                      value={selectedLecture}
                      onChange={(e) => setSelectedLecture(e.target.value)}
                    >
                      {/* Only show this option when no course is selected */}
                      {selectedLecture === "" && (
                        <option value="" disabled hidden>
                          Select a Lecture
                        </option>
                      )}

                      {[...Array(5).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/*  Description */}

                  <div className="col-md-4">
                    <label htmlFor="lectureDescription" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      id="lectureDescription"
                      className="form-control"
                      placeholder="Enter lecture description here..."
                      value={lectureDescription}
                      onChange={(e) => setLectureDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Selection */}

              <div style={{ marginBottom: "10px" }}>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/* Label */}
                  <div className="col-md-4">
                    <label htmlFor="lessonSelect" className="form-label">
                      Select Lesson
                    </label>
                  </div>
                  {/* Dropdown */}
                  <div className="col-md-8">
                    <select
                      id="lessonSelect"
                      className="form-control  custom-select"
                      value={selectedLesson}
                      onChange={(e) => setSelectedLesson(e.target.value)}
                    >
                      {/* Only show this option when no course is selected */}
                      {selectedLesson === "" && (
                        <option value="" disabled hidden>
                          Select a Lesson
                        </option>
                      )}

                      {[...Array(5).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
                  {/*  Description */}

                  <div className="col-md-4">
                    <label htmlFor="lessonDescription" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <textarea
                      id="lessonDescription"
                      className="form-control"
                      placeholder="Enter lesson description here..."
                      value={lessonDescription}
                      onChange={(e) => setLessonDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Template Upload */}
            <div className="col-md-6">
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-md-4">
                  <label htmlFor="templateUpload" className="form-label">
                    Template
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="file"
                    id="templateUpload"
                    className="form-control"
                    onChange={handleTemplateFileChange}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-md-4">
                  <label htmlFor="videoUpload" className="form-label">
                    Video Lecture
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="file"
                    id="videoUpload"
                    className="form-control"
                    onChange={handleVideoFileChange}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-md-4">
                  <label htmlFor="pdfeUpload" className="form-label">
                    PDF Lecture
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="file"
                    id="pdfUpload"
                    className="form-control"
                    onChange={handlePdfFileChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn blue-button float-right btn-upward">
              Submit for Reviewing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
