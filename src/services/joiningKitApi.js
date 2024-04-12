import axios from "axios";

// const BASE_URL = "https://ems-app-cmw3.onrender.com/api/v1/users";
const token = localStorage.getItem("token");

const BASE_URL = "http://localhost:8088/api/v1/users";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getKitDetails = async (userId) => {
  const response = await api.get(`welcomeKit/${userId}`);
  return response.data;
};
