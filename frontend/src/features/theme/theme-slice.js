import { createSlice } from "@reduxjs/toolkit";

const userColorTheme = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

const themeSlice = createSlice({
  name: "darkTheme",
  initialState: window.localStorage.getItem("darkTheme")
    ? JSON.parse(window.localStorage.getItem("darkTheme"))
    : userColorTheme,
  reducers: {
    setDarkTheme: (_, action) => action.payload
  },
});

export const { setDarkTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
