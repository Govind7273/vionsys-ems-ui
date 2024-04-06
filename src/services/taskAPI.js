import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";

export const createTask = async (values) => {
    const response = await api.post('/task/create', values);
    return response.data;
}

export const updateTaskCompleted = async (id) => {
    const response = await api.patch(`/task/completed/${id}`);
    return response.data;
}

export const updateTaskStarted = async (id) => {
    const response = await api.patch(`/task/started/${id}`);
    return response.data;
}

export const getTasksFromUserId = async () => {
    const { id } = getUserIdRole();
    const response = await api.get(`/task/getAll/${id}`);
    return response.data.data;
}

export const updateStartTask = async (id) => {
    const response = await api.patch(`/task/started/${id}`);
    return response.data;
}

export const updateCompletedTask = async (id) => {
    const response = await api.patch(`/task/completed/${id}`);
    return response.data;
}

export const getAllTasks = async () => {
    const response = await api.get("/task/getAll");
    return response.data.data;
}