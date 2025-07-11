import { useState, useEffect } from "react";
import { Task } from "../types/Tasks.types";
import { getTasks, createTask, deleteTask, editTask } from "../api/tasksData";
import { setTasksData } from "../store/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "../store/Store";

export const useTasks = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: MainState) => state.authentication.userId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getTasks();
    dispatch(setTasksData(response));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  const TriggerCreateTask = async (task: Task) => {
    if (task.title && task.description) {
      await createTask(task);
      fetchData();
    } else {
      alert("Title and description are required fields.");
    }
  };
  const TriggerDeleteTask = async (task: Task) => {
    await deleteTask(task.id);
    fetchData();
  };

  const TriggerEditTask = async (task: Task) => {
    await editTask(task);
    fetchData();
  };
  return {
    TriggerEditTask,
    TriggerDeleteTask,
    isLoading,
    TriggerCreateTask,
  };
};
