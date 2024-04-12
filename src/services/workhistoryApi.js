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

export const getWorkHistory = async (userId) => {
  const response = await api.get(`/workHistory/${userId}`);
  return response?.data;
};

export const addWorkHistory = async (data) => {
  const responce = await api.post("/workHistory", { ...data });
  return responce?.data;
};

export const deleteWorkHistory = async (id) => {
  const responce = await api.delete(`/workHistory/${id}`);
  return responce?.data;
};
