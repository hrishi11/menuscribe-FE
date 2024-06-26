import { API } from "./index";
// Auth
export const signIn = async (loginData) => API.post(`auth-admin`, loginData);
export const logOut = async (loginData) => API.post(`logout-user`, loginData);
export const customerLogin = async (data) => API.post(`customer-login`, data);
export const sendForgetPasswordMsg = async (data) =>
  API.post(`send-verification-password`, data);
export const verifyLink = async (data) =>
  API.post(`verify-forget-passwor-link`, data);
export const resetForgetPassword = async (data) =>
  API.post(`reset-forget-password`, data);

export const customerLogout = async (data) => API.post(`customer-logout`, data);
