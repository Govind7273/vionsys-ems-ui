import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";

const { id } = getUserIdRole();

export const createAttendance = async ({ user, time, timeTag, note }) => {
  let payload =
    timeTag === "login" ? { loginTime: time } : { logoutTime: time };
  const response = await api.post("/attendance", {
    user,
    note,
    ...payload,
  });
  return response.data;
};

export const getAttendance = async () => {
  const response = await api.get(`/attendance/${id}`);
  return response.data;
};

export const getAllAttendance = async () => {
  const response = await api.get(`/attendance`);
  return response.data;
};

export const updateAttendanceApi = async ({ time, timeTag, user }) => {
  let payload =
    timeTag === "login" ? { loginTime: time } : { logoutTime: time };

  const response = await api.put(`/attendance/${user}`, {
    user,
    ...payload,
  });
  return response.data;
};

export const getExcelData = async (Format_startDate, Format_endDate) => {
  const data={
    Format_startDate,
    Format_endDate
  }
  console.log(Format_startDate, Format_endDate);
  const responce = await api.post("/attendance/Excel/getExcel",data);
  return responce.data;
};
