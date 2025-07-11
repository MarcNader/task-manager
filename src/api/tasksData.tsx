import { v4 as uuidv4 } from "uuid";

import { type Task } from "../types/Tasks.types";
import { store } from "../store/Store";
import { auth } from "../utils/firebaseConfig";
import firebaseAxios from "../utils/axiosClient";

export const createTask = async (task: Task) => {
  try {
    const uid = auth.currentUser?.uid;
    const taskId = uuidv4(); // Generate a unique task ID
    const newTask = { ...task, id: taskId }; // include id inside data
    await firebaseAxios.put(`/Tasks/${uid}/${taskId}.json`, newTask);
  } catch (error: any) {
    alert(error.message);
  }
};

export const getTasks = async () => {
  try {
    const uid = auth.currentUser?.uid;
    const { data } = await firebaseAxios.get(`/Tasks/${uid}.json`);
    return data
      ? Object.entries(data).map(([id, task]) => ({ id, ...(task as Task) }))
      : [];
  } catch (error: any) {
    alert(error.message);
    return [];
  }
};

export const editTask = async (task: Task) => {
  const { userId } = store.getState().authentication;
  try {
    await firebaseAxios.put(`/Tasks/${userId}/${task.id}.json`, task);
  } catch (error: any) {
    alert(error.message);
  }
};

export const deleteTask = async (taskId: string) => {
  const { userId } = store.getState().authentication;
  try {
    await firebaseAxios.delete(`/Tasks/${userId}/${taskId}.json`);
  } catch (error: any) {
    alert(error.message);
  }
};
