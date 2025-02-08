import React from "react";
import { useState } from "react";
import { uploadFile } from "../api";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadFile(file);
        alert("File uploaded successfully");
      } catch (error) {
        alert("File upload failed!");
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
