import React from "react";
import { useState } from "react";
import { uploadFile } from "../api";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an XML file.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await uploadFile(file);
      setMessage("File uploaded successfully");
      navigate("/reports"); //navigate to reports page
    } catch (error) {
      setMessage("File upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload XML File</h2>
      <input
        className="mb-2"
        type="file"
        accept=".xml"
        onChange={handleFileChange}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default FileUpload;
