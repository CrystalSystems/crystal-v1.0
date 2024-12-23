import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../features/theme/theme-slice";
import { logInStatusReducer } from "../features/access/logInStatusSlice";
import { accessModalReducer } from "../features/accessModal/accessModalSlice";
import { sideMenuMobileReducer } from "../features/SideMenuMobile/sideMenuMobileSlice";
export const store = configureStore({
  reducer: {
    darkThemeStatus: themeReducer,
    logInStatus: logInStatusReducer,
    accessModal: accessModalReducer,
    sideMenuMobile: sideMenuMobileReducer
  },
});
