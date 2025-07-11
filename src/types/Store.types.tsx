import { Task } from "./Tasks.types";

export type AuthState = {
  userId: string;
  userName: string;
};

export type TasksState = {
  tasks: Task[];
};
