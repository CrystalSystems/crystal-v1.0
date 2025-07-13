import { createSlice } from "@reduxjs/toolkit";

const sideMenuMobileSlice = createSlice({

  name: "SideMenuMobile",
  initialState: {
    showSideMenuMobile: false,
    showSideMenuMobileBackground: false,
    sideMenuMobileFadeOut: false,
  },

  reducers: {
    setShowSideMenuMobile: (state, action) => {
      state.showSideMenuMobile = action.payload;
    },
    setShowSideMenuMobileBackground: (state, action) => {
      state.showSideMenuMobileBackground = action.payload;
    },
    setSideMenuMobileFadeOut: (state, action) => {
      state.sideMenuMobileFadeOut = action.payload;
    },
  },

});

export const {
  setShowSideMenuMobile,
  setShowSideMenuMobileBackground,
  setSideMenuMobileFadeOut,
} = sideMenuMobileSlice.actions;
export const sideMenuMobileReducer = sideMenuMobileSlice.reducer;
