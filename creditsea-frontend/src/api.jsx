import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/uploads`, formData);
};

export const getReports = () => axios.get(`${API_BASE_URL}/reports`);
