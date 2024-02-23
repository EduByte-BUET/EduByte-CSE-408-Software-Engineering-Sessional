import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "bootstrap/dist/css/bootstrap.min.css";


const API_KEY = 'AIzaSyC7U9eH7FCkx-aHYObkzURzrxFPA2Us5nk';

const MODEL_NAME = "gemini-pro-vision";

const AIImage: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.onerror = () => {
      alert("Error reading the image file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!image || !message) {
      alert("Please choose an image and enter a message.");
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    type Part =
      | { text: string }
      | { inlineData: { data: string; mimeType: string } };

    const parts: Part[] = [];
    if (message) parts.push({ text: message });
    if (image) {
      const mimeType = getImageMimeType(image);
      parts.push({ inlineData: { data: image.split(",")[1], mimeType } });
    }

    try {
      const result = await model.generateContent(
        parts.length > 0 ? parts : [{ text: "Hello" }]
      );
      const response = result.response;
      console.log(response.text());
      setResponse(response.text());
      setImage(""); // Clear the image state after successful submission
    } catch (error) {
      console.error(error);
      setResponse("An error occurred. Please try again later.");
    }
  };

  const getImageMimeType = (imageData: string): string => {
    const base64Data = imageData.split(",")[1];
    const binaryData = atob(base64Data);
    const byte = binaryData.charCodeAt(0);

    switch (byte) {
      case 0xff:
        return "image/jpeg";
      case 0x89:
        return "image/png";
      default:
        return "image/png"; // Default to PNG if the type is not recognized
    }
  };

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#c5dafc", borderRadius: "10px" }}
    >
      <h2 className="mb-4 text-start">Edurika</h2>
      <h3 className="text-start">Doubt about Diagram? Ask Here!</h3>
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label className="custom-file-label" htmlFor="customFile">
          <h5 className="text-start">
            AI will assist you in understanding the diagram.
          </h5>
        </label>
      </div>
      <div className="row justify-content-between">
        <div className="col-10 form-group">
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={handleInputChange}
            placeholder="Enter your query about diagram (optional)"
          />
        </div>
        <div className="col-2 d-flex align-items-end justify-content-end">
          <button className="btn blue-button mb-4" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>

      <div
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        {response}
      </div>
    </div>
  );
};

export default AIImage;
