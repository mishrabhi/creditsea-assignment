import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Upload failed");
  }
};
