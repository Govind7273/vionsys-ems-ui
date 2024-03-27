import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi"

export const createNotification=async(values)=>{
  const {id:userid}= getUserIdRole();
   const response= await api.post("/notification/create",{userid,...values});
   return response.data;
}


export const getNotifications=async()=>{
   const response=await api.get("/notification/get");
   console.log(response.data.notifications)
   return response?.data;
}

export const getNotification=async(id)=>{
   const response=await api.get(`/find/notification/${id}`);
   return response?.data;
}

export const deleteNotification=async(id)=>{
   const response=await api.delete(`/delete/notification/${id}`);
   return response.data;
}