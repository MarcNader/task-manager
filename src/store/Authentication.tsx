import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AuthState } from "../types/Store.types";

const initialState: AuthState = {
  userId: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
