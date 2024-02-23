import React, { useState, useRef, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { UserContext } from "../UserContext/UserContext";
import "./../../css/dashboard.css"; // Import the same CSS file

const Filters: React.FC<any> = ({ onFilterChange }) => {
  const [postTypes, setPostTypes] = useState([false, false, false]);
  const [course, setCourse] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const courseRef = useRef<HTMLSelectElement>(null);
  const tagsRef = useRef<HTMLSelectElement>(null);

  const [activeLink, setActiveLink] = useState(""); // Default active link

  const { setCurrentUser } = useContext(UserContext);
  const currentUser = useContext(UserContext);

  const handleSetActiveLink = (link: any) => {
    setActiveLink(link);
  };

  const handlePostTypeChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPostTypes = [...postTypes];
    updatedPostTypes[index] = event.target.checked;
    setPostTypes(updatedPostTypes);
  };

  const handleCourseBlur = () => {
    if (courseRef.current) {
      setCourse(courseRef.current.value);
    }
  };

  const handleTagBlur = () => {
    if (tagsRef.current) {
      setTags(
        Array.from(tagsRef.current.selectedOptions, (option) => option.value)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilterChange({ postTypes, course, tags });
  };

  return (
    <div className="col-md-4 col-lg-3 bg-light d-flex flex-column sidebars" style={{ overflow: 'auto' }}>
      <div className="text-center py-4">
        <h3>Filters</h3>
      </div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="postType">
              <Form.Label>Post Type</Form.Label>
              <div
                key="postType"
                className="d-flex flex-column align-items-start"
              >
                {["Discussion", "Q&A", "Announcements"].map((type, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={type}
                    checked={postTypes[index]}
                    onChange={handlePostTypeChange(index)}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                ref={courseRef}
                onBlur={handleCourseBlur}
              >
                <option value="">All Courses</option>
                <option value="algorithm">Algorithm</option>
                <option value="cpp">C++</option>
                <option value="compiler">Compiler</option>
                <option value="java">JAVA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                as="select"
                multiple
                ref={tagsRef}
                onBlur={handleTagBlur}
              >
                <option value="python">python</option>
                <option value="xv6">xv6</option>
                <option value="ISD">ISD</option>
                <option value="java">java</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Filter
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <button className="btn blue-button m-2">Apply Filters</button>
    </div>
  );
};

export default Filters;
