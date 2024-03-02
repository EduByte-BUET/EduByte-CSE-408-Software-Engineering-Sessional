import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Select from "react-select";
import api from "../../api/GeneralAPI";

const Filters: React.FC<any> = () => {
  const navigate = useNavigate();
  const [postTypes, setPostTypes] = useState<
    { value: string; label: string }[]
  >([
    { value: "discussion", label: "Discussion" },
    { value: "qna", label: "Q&A" },
    { value: "announcements", label: "Announcements" },
  ]);
  const [courses, setCourses] = useState<{ value: string; label: string }[]>(
    []
  );
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedPostTypes, setSelectedPostTypes] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/discussion/post/show`);
        if (response.status === 200) {
          const responseData = response.data;
          const courseOptions = responseData.courses.map((course: any) => ({
            value: course.course_id,
            label: course.course_title,
          }));
          setCourses(courseOptions);
          setTags(
            responseData.tags.map((tag: string) => ({ value: tag, label: tag }))
          );
          console.log("Courses fetched successfully!", responseData);
        } else {
          console.error("Failed to fetch courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  const handlePostTypeChange = (selectedOptions: any) => {
    setSelectedPostTypes(selectedOptions);
  };

  const handleCourseChange = (selectedOption: any) => {
    setSelectedCourse(selectedOption);
  };

  const handleTagChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    // Trim the value and label of each tag in the selectedTags array
    const trimmedTags = selectedTags.map(tag => ({
      value: tag.value.trim(),
      label: tag.label.trim(),
    }));
  
    console.log(selectedCourse, trimmedTags, selectedPostTypes);
    navigate("/discussion", {
      state: { selectedCourse, trimmedTags, selectedPostTypes },
    });
    setSelectedCourse(null);
    setSelectedTags([]);
    setSelectedPostTypes([]);
  };

  return (
    <div
      className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars"
      style={{ overflow: "auto" }}
    >
      <div className="text-center py-4">
        <h3>Filters</h3>
      </div>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="postType">
              <Form.Label>Post Type</Form.Label>
              <Select
                isMulti
                options={postTypes}
                onChange={handlePostTypeChange}
                value={selectedPostTypes}
              />
              <button className="btn blue-button m-2" onClick={handleSubmit}>
                Apply Filter
              </button>
            </Form.Group>
            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Select
                options={courses}
                onChange={handleCourseChange}
                value={selectedCourse}
              />
              <button className="btn blue-button m-2" onClick={handleSubmit}>
                Apply Filter
              </button>
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Select
                isMulti
                options={tags}
                onChange={handleTagChange}
                value={selectedTags}
              />
              <button className="btn blue-button m-2" onClick={handleSubmit}>
                Apply Filter
              </button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Filters;
