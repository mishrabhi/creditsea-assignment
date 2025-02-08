import React from "react";
import { useState } from "react";
import { uploadFile } from "../api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Please select an XML file.");
    setLoading(true);
    try {
      const data = await uploadFile(file);
      alert("File uploaded successfully");
      onUploadSuccess(data);
    } catch (error) {
      alert("File upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <input
        className="mb-3 block w-full text-gray-700"
        type="file"
        accept=".xml"
        onChange={handleFileChange}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default FileUpload;
