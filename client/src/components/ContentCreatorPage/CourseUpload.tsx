import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Button.css";
import api from "../../api/GeneralAPI";
import uploadFile from "./UploadToFirebase";

interface Lecture {
  lecture_id: number;
  title: string;
}

interface Block {
  block_id: number;
  title: string;
  lectures: Lecture[];
}

interface Course {
  course_id: number;
  course_title: string;
  blocks: Block[];
}

export default function CourseUpload() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [selectedBlock, setSelectedBlock] = useState("");
  const [blockTitle, setBlockTitle] = useState("");
  const [blockDescription, setBlockDescription] = useState("");

  const [selectedLecture, setSelectedLecture] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filetype, setFiletype] = useState("");

  const getCourseTitle = (selCourseid: any) => {
    const course = courses.find(
      (course) => course.course_id === parseInt(selCourseid)
    );
    if (course === undefined) return "";
    return course.course_title;
  };
  const getBlockTitle = (selBlockid: any) => {
    const block = blocks.find(
      (block) => block.block_id === parseInt(selBlockid)
    );
    if (block === undefined) return "";
    return block.title;
  };
  const getLectureTitle = (selLectureid: any) => {
    const lecture = lectures[parseInt(selLectureid)];
    if (lecture === undefined) return "";
    return lecture.title;
  };
  // Fetch courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("/content-create/upload/view-all-courses");
        setCourses(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCourse === "") return;

      try {
        const result = await api.get(
          `/content-create/upload/view-all-blocks?course_id=${selectedCourse}`
        );
        setBlocks(result.data.blocks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedBlock === "") return;

      const selectedBlockIndex = blocks.findIndex(
        (block) => block.block_id === parseInt(selectedBlock)
      );

      setLectures(blocks[selectedBlockIndex].lectures);
    };
    fetchData();
  }, [selectedBlock]);

  // ------------------------------------------------

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // upload the file to firebase
    const file_url = await uploadFile(
      courseTitle,
      blockTitle,
      lectureTitle,
      lessonTitle,
      file
    );
    if (file_url === null) return;

    // send the file_url to the server
    // ------------------------------------------- creator id change korte hobe (done) --------------------------
    const data = {
      course_id: selectedCourse,
      course_title: courseTitle,
      course_description: courseDescription,
      block_id: selectedBlock,
      block_title: blockTitle,
      block_description: blockDescription,
      lecture_id: selectedLecture,
      lecture_title: lectureTitle,
      lecture_description: lectureDescription,
      lesson_title: lessonTitle,
      lesson_description: lessonDescription,
      file_url: file_url,
      file_type: filetype,
    };
    console.log(data);

    try {
      const result = await api.post("/content-create/upload/add-lesson", data);
      alert(result.data.message);
      navigate("/home");
      // result.data.message => title already is in use or successfully added the lesson to the course
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  const resetCourseFields = () => {
    setSelectedCourse("");
    setCourseTitle("");
    setCourseDescription("");
  };

  const resetBlockFields = () => {
    setSelectedBlock("");
    setBlockTitle("");
    setBlockDescription("");
  };

  const resetLectureFields = () => {
    setSelectedLecture("");
    setLectureTitle("");
    setLectureDescription("");
  };
  // ------------------------------------------------

  const handleCreateNewCourse = () => {
    resetCourseFields();
    resetBlockFields();
    resetLectureFields();
  };

  const handleCreateNewBlock = () => {
    resetBlockFields();
    resetLectureFields();
  };

  const handleCreateNewLecture = () => {
    resetLectureFields();
  };

  const css: React.CSSProperties = {
    marginTop: "10px",
    marginBottom: "20px",
    textAlign: "left",
    color: "crimson",
    fontWeight: "bold",
    borderBottom: "2px solid black",
    paddingBottom: "10px",
  };

  return (
    <div className="container">
      <div className="row">
        {/* Select Course and Description in left column */}
        <div className="col-md-6">
          <h3 style={css}>
            <i className="fa-solid fa-circle-question"></i> Course Content
            Information
          </h3>
          {/* course selection */}
          <div className="row" style={{ marginBottom: "10px" }}>
            {/* Label */}
            <div className="col-md-4">
              <label htmlFor="courseSelect" className="form-label">
                Select Course
              </label>
            </div>

            {/* Dropdown */}
            <div className="col-md-5">
              <select
                id="courseSelect"
                className="form-control"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setCourseTitle(getCourseTitle(e.target.value));
                }}
              >
                <option value="" disabled hidden>
                  Select a course
                </option>
                {courses.map((course, index) => (
                  <option key={index} value={course.course_id}>
                    {course.course_title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn green-button"
                onClick={handleCreateNewCourse}
              >
                Create New
              </button>
            </div>
          </div>
          {/* Course Description */}
          {selectedCourse === "" && (
            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-md-4">
                <label htmlFor="courseTitle" className="form-label">
                  Course Title
                </label>
              </div>
              <div className="col-md-8">
                <textarea
                  id="courseTitle"
                  className="form-control"
                  placeholder="Enter course title here..."
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  rows={1}
                />
              </div>

              {/* Description */}
              <div className="col-md-4"></div>
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
          )}

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
              <div className="col-md-5">
                <select
                  id="blockSelect"
                  className="form-control  custom-select"
                  value={selectedBlock}
                  onChange={(e) => {
                    setSelectedBlock(e.target.value);
                    setBlockTitle(getBlockTitle(e.target.value));
                  }}
                >
                  <option value="" disabled hidden>
                    Select a Block
                  </option>
                  {blocks.map((block, index) => (
                    <option key={index} value={block.block_id}>
                      {block.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn green-button"
                  onClick={handleCreateNewBlock}
                >
                  Create New
                </button>
              </div>
            </div>
            {/* Block Description */}
            {selectedBlock === "" && (
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-md-4">
                  <label htmlFor="blockTitle" className="form-label">
                    Block Title
                  </label>
                </div>
                <div className="col-md-8">
                  <textarea
                    id="blockTitle"
                    className="form-control"
                    placeholder="Enter block title here..."
                    value={blockTitle}
                    onChange={(e) => setBlockTitle(e.target.value)}
                    rows={1}
                  />
                </div>

                {/* Description */}
                <div className="col-md-4"></div>
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
            )}
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
              <div className="col-md-5">
                <select
                  id="lectureSelect"
                  className="form-control  custom-select"
                  value={selectedLecture}
                  onChange={(e) => {
                    setSelectedLecture(e.target.value);
                    setLectureTitle(getLectureTitle(e.target.value));
                  }}
                >
                  <option value="" disabled hidden>
                    Select a Lecture
                  </option>
                  {lectures.map((lecture, index) => (
                    <option key={index} value={lecture.lecture_id}>
                      {lecture.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn green-button"
                  onClick={handleCreateNewLecture}
                >
                  Create New
                </button>
              </div>
            </div>
            {/* Lecture Description */}
            {selectedLecture === "" && (
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-md-4">
                  <label htmlFor="lectureTitle" className="form-label">
                    Lecture Title
                  </label>
                </div>
                <div className="col-md-8">
                  <textarea
                    id="LectureTitle"
                    className="form-control"
                    placeholder="Enter lecture title here..."
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    rows={1}
                  />
                </div>

                {/* Description */}
                <div className="col-md-4"></div>
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
            )}
          </div>
        </div>

        {/* Right Column: Template Upload */}
        <div className="col-md-6">
          <h3 style={css}>
            <i className="fa-solid fa-upload"></i> Content Upload - Lessons
          </h3>

          <div
            className="row"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            {/* Lesson Title */}
            <div className="col-md-4">
              <label htmlFor="lessonTitle" className="form-label">
                Lesson Title
              </label>
            </div>
            <div className="col-md-8">
              <textarea
                id="LessonTitle"
                className="form-control"
                placeholder="Enter lesson title here..."
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                rows={1}
              />
            </div>

            {/* Description */}
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <textarea
                id="lessonDescription"
                className="form-control"
                placeholder="Enter description here..."
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="fileUpload" className="form-label">
                Add Video or PDF
              </label>
            </div>
            <div className="col-md-8">
              <input
                type="file"
                id="fileUpload"
                className="form-control"
                onChange={(event: any) => setFile(event.target.files[0])}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label htmlFor="fileTyleSelect" className="form-label">
                Set File Type
              </label>
            </div>
            <div className="col-md-5 mb-5">
              <select
                id="filetypeselect"
                className="form-control"
                value={filetype}
                onChange={(e: any) => {
                  setFiletype(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Select file type
                </option>
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
              </select>
            </div>

            <p style={{ color: "crimson", textAlign: "left" }}>
              <i className="fa-solid fa-info-circle"></i> You may select a video
              or a pdf file per lesson. <br />
              <i className="fa-solid fa-info-circle"></i> You should not re-use
              titles for any content, as it may cause confusion for the
              learners.
            </p>
          </div>

          {/* Submit Button */}
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-md-7"></div>
            <div className="col-md-5 form-group">
              <button
                type="button"
                className="btn blue-button mt-3"
                onClick={handleSubmit}
              >
                Submit for Reviewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
