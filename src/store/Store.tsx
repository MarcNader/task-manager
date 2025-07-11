import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./Authentication";
import tasksSlice from "./Tasks";
import themeReducer from "./Theme";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    authentication: authSlice,
    tasksData: tasksSlice,
  },
});

export type MainState = ReturnType<typeof store.getState>;
