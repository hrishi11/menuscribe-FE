// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthData } from "./actions/authReducer/AuthSlice";
import CustomerLayout from "./layout/CustomerLayout";
const ProtectedRoute = ({ element }) => {
  const authData = useSelector(selectAuthData);
  const storedAuthData = JSON.parse(localStorage.getItem("menuScribe"));
  const isAuthenticated =
    authData.length || (storedAuthData && storedAuthData.token);

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
