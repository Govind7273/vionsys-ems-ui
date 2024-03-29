import { api } from "./authApi";

export const createLeaveRequest = async (data) => {
  const response = await api.post("/leaves/create", data);
  return response.data;
};

export const getUserLeaveHistory = async (userId) => {
  const response = await api.get(`/leaves/leaveHistory/${userId}`);
  return response.data;
};
