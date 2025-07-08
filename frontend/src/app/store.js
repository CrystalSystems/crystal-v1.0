import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../features/theme/theme-slice";
import { logInStatusReducer } from "../features/auth/logInStatusSlice";
import { accessModalReducer } from "../features/accessModal/accessModalSlice";
import { sideMenuMobileReducer } from "../features/sideMenuMobile/sideMenuMobileSlice";

export const store = configureStore({
  reducer: {
    darkThemeStatus: themeReducer,
    logInStatus: logInStatusReducer,
    accessModal: accessModalReducer,
    sideMenuMobile: sideMenuMobileReducer
  },
});
