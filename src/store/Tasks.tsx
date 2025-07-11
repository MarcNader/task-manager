import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "../types/Store.types";
import { Task } from "../types/Tasks.types";

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksData: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasksData } = tasksSlice.actions;

export default tasksSlice.reducer;
