import { createSlice } from "@reduxjs/toolkit";
const logIn = window.localStorage.getItem("logIn");
const logInStatusSlice = createSlice({
  name: "login",
  initialState: logIn ? true : false,
  reducers: {
    setlogInStatus: (_, action) => action.payload,
  },
});
export const { setlogInStatus } = logInStatusSlice.actions;
export const logInStatusReducer = logInStatusSlice.reducer;