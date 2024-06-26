import { createSlice } from "@reduxjs/toolkit";
import { adjustData } from "../../utils/Helper";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerData: [],
    customerSelectedPackages: [],
    qrValue: "",
    pageAccess: {},
  },
  reducers: {
    signIn(state, action) {
      state.customerData = [];
    },
    selectedPackages(state, action) {
      // console.log(action)
      state.customerSelectedPackages = action.payload;
    },
    setQrValue(state, action) {
      state.qrValue = action.payload;
    },
    setPageAccess(state, action) {
      state.pageAccess = action.payload;
    },
  },
});

export const customerActions = customerSlice.actions;

export const getAllSelectedPackages = (state) =>
  state.customer.customerSelectedPackages;

export const getCustomerData = (state) => state.customer.customerData;
export const getQrvalue = (state) => state.customer.qrValue;
export const getPageAccess = (state) => state.customer.pageAccess;

export default customerSlice;
