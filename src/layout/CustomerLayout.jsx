import React from "react";
import { Outlet } from "react-router-dom";
import { CustomerDashboardHeader } from "../components/CustomerDashboardHeader";

const CustomerLayout = ({ children }) => {
  return (
    <div>
      <CustomerDashboardHeader />
      {children}
    </div>
  );
};

export default CustomerLayout;
