import React from "react";
import "./EmployeePageAccess.css";
import { CFormLabel, CFormSwitch } from "@coreui/react";

const EmployeePageAccess = ({ selectedEmployee, setSelectedEmployee }) => {
  const handleSwitch = (e) => {
    const { name, checked } = e.target;
    const newEmployee = { ...selectedEmployee };
    checked ? (newEmployee[name] = 1) : (newEmployee[name] = 0);
    setSelectedEmployee(newEmployee);
  };
  return (
    <div className="EmployeePageAccessContainer">
      <CFormLabel htmlFor="employeePackageAccess">
        EMPLOYEE PACKAGE ACCESS
      </CFormLabel>
      <div className="checksContainer">
        <CFormSwitch
          label="Homepage"
          id="homepage"
          name="homepage"
          checked={selectedEmployee.homepage}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Settings"
          id="settings"
          name="settings_page"
          checked={selectedEmployee.settings_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Packages Page"
          id="packages_page"
          name="packages_page"
          checked={selectedEmployee.packages_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Packages Requests"
          id="packages_request"
          name="package_requests_page"
          checked={selectedEmployee.package_requests_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Menu Page"
          id="menu_page"
          name="menu_page"
          checked={selectedEmployee.menu_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Order Summary"
          id="order_summary_page"
          name="order_summary_page"
          checked={selectedEmployee.order_summary_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Delivery Page"
          id="delivery_page"
          name="delivery_page"
          checked={selectedEmployee.delivery_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Delivery Management Page"
          id="delivery_management_page"
          name="delivery_management_page"
          checked={selectedEmployee.delivery_management_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Customers"
          id="customers_page"
          name="customers_page"
          checked={selectedEmployee.customers_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Add Customer"
          id="add_customer_page"
          name="add_customer_page"
          checked={selectedEmployee.add_customer_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Customer Orders"
          id="customer_orders_page"
          name="customer_orders_page"
          checked={selectedEmployee.customer_orders_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Order Manager"
          id="order_manager_page"
          name="order_manager_page"
          checked={selectedEmployee.order_manager_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Team"
          id="team_page"
          name="team_page"
          checked={selectedEmployee.team_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="All Subscriptions"
          id="all_subscriptions_page"
          name="all_subscriptions_page"
          checked={selectedEmployee.all_subscriptions_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Team Settings"
          id="team_settings_page"
          name="team_settings_page"
          checked={selectedEmployee.team_settings_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Promotions"
          id="promotions_page"
          name="promotions_page"
          checked={selectedEmployee.promotions_page}
          onChange={handleSwitch}
        />
        <CFormSwitch
          label="Locations"
          id="locations_page"
          name="locations_page"
          checked={selectedEmployee.locations_page}
          onChange={handleSwitch}
        />
      </div>
    </div>
  );
};

export default EmployeePageAccess;
