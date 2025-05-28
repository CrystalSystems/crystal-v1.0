import { createSlice } from "@reduxjs/toolkit";

const accessModalSlice = createSlice({

  name: "accessModal",
  initialState: {
    showAccessModal: false,
    switchAccessModal: true,
  },

  reducers: {
    setShowAccessModal: (state, action) => {
      state.showAccessModal = action.payload;
    },
    setSwitchAccessModal: (state, action) => {
      state.switchAccessModal = action.payload;
    },
  },

});

export const { setShowAccessModal, setSwitchAccessModal } = accessModalSlice.actions;
export const accessModalReducer = accessModalSlice.reducer;
