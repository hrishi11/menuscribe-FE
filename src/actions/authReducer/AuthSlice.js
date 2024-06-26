import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: [], authErrors: [], pageAccess: {} },
  reducers: {
    signIn(state, action) {
      localStorage.setItem(
        "menuScribe",
        JSON.stringify({ ...action?.payload })
      );
      console.log(action.payload);
      state.authData = action?.payload;
      state.authErrors = [];
    },
    logOut(state) {
      localStorage.removeItem("menuScribe");
      state.authData = [];
    },
    setErrors(state, action) {
      state.authErrors = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const selectAuthData = (state) => state.auth.authData;
// export const selectPageAccess = (state) => state.auth.pageAccess;
export default authSlice;
