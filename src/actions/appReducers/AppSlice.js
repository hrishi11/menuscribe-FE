import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebarShow: true,
    unfoldable: false,
  },
  reducers: {
    // Create a reducer function for the 'set' action
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload;
    },
    sidebarUnfoldable: (state, action) => {
      state.unfoldable = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice;
