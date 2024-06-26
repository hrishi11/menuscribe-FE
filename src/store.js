// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./actions/authReducer/AuthSlice";
import customerSlice from "./actions/customerReducer/CustomerSlice";
import appSlice from "./actions/appReducers/AppSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    app: appSlice.reducer,
    // Add other reducers here if you have more slices
  },
});

export default store;
