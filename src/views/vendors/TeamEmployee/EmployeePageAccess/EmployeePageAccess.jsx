import React from "react";
import "./EmployeePageAccess.css";
import { CFormLabel, CFormSwitch } from "@coreui/react";

const EmployeePageAccess = ({
  selectedEmployee,
  setSelectedEmployee,
  vendorSetting,
}) => {
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
        {vendorSetting.dashboard_page == 1 && (
          <CFormSwitch
            label="Dashboard"
            id="dashboard_page"
            name="dashboard_page"
            checked={selectedEmployee.dashboard_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.settings_page == 1 && (
          <CFormSwitch
            label="Settings"
            id="settings"
            name="settings_page"
            checked={selectedEmployee.settings_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.packages_page == 1 && (
          <CFormSwitch
            label="Packages Page"
            id="packages_page"
            name="packages_page"
            checked={selectedEmployee.packages_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.package_requests_page == 1 && (
          <CFormSwitch
            label="Packages Requests"
            id="packages_request"
            name="package_requests_page"
            checked={selectedEmployee.package_requests_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.create_menu_page == 1 && (
          <CFormSwitch
            label="Menu Page"
            id="create_menu_page"
            name="create_menu_page"
            checked={selectedEmployee.create_menu_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.order_summary_page == 1 && (
          <CFormSwitch
            label="Order Summary"
            id="order_summary_page"
            name="order_summary_page"
            checked={selectedEmployee.order_summary_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.delivery_page == 1 && (
          <CFormSwitch
            label="Delivery Page"
            id="delivery_page"
            name="delivery_page"
            checked={selectedEmployee.delivery_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.delivery_manager_page == 1 && (
          <CFormSwitch
            label="Delivery Management Page"
            id="delivery_manager_page"
            name="delivery_manager_page"
            checked={selectedEmployee.delivery_manager_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.customers_page == 1 && (
          <CFormSwitch
            label="Customers"
            id="customers_page"
            name="customers_page"
            checked={selectedEmployee.customers_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.customers_page == 1 && (
          <CFormSwitch
            label="Add Customer"
            id="add_customer_page"
            name="add_customer_page"
            checked={selectedEmployee.add_customer_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.customer_orders_page == 1 && (
          <CFormSwitch
            label="Customer Orders"
            id="customer_orders_page"
            name="customer_orders_page"
            checked={selectedEmployee.customer_orders_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.order_manager_page == 1 && (
          <CFormSwitch
            label="Order Manager"
            id="order_manager_page"
            name="order_manager_page"
            checked={selectedEmployee.order_manager_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.my_team_page == 1 && (
          <CFormSwitch
            label="Team"
            id="my_team_page"
            name="my_team_page"
            checked={selectedEmployee.my_team_page}
            onChange={handleSwitch}
          />
        )}

        {vendorSetting.all_subscriptions_page == 1 && (
          <CFormSwitch
            label="All Subscriptions"
            id="all_subscriptions_page"
            name="all_subscriptions_page"
            checked={selectedEmployee.all_subscriptions_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.team_settings_page == 1 && (
          <CFormSwitch
            label="Team Settings"
            id="team_settings_page"
            name="team_settings_page"
            checked={selectedEmployee.team_settings_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.promotions_page == 1 && (
          <CFormSwitch
            label="Promotions"
            id="promotions_page"
            name="promotions_page"
            checked={selectedEmployee.promotions_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.locations_page == 1 && (
          <CFormSwitch
            label="Locations"
            id="locations_page"
            name="locations_page"
            checked={selectedEmployee.locations_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.get_started_page == 1 && (
          <CFormSwitch
            label="Get Started Page"
            id="get_started_page"
            name="get_started_page"
            checked={selectedEmployee.get_started_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.upload_users_page == 1 && (
          <CFormSwitch
            label="Upload User Page"
            id="upload_users_page"
            name="upload_users_page"
            checked={selectedEmployee.upload_users_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.multiple_menu_editor_page == 1 && (
          <CFormSwitch
            label="Muliple Menu Editor Page"
            id="multiple_menu_editor_page"
            name="multiple_menu_editor_page"
            checked={selectedEmployee.multiple_menu_editor_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.website_setting_page == 1 && (
          <CFormSwitch
            label="Website Setting Page"
            id="website_setting_page"
            name="website_setting_page"
            checked={selectedEmployee.website_setting_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.payments_page == 1 && (
          <CFormSwitch
            label="Payments Page"
            id="payments_page"
            name="payments_page"
            checked={selectedEmployee.payments_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.billing_page == 1 && (
          <CFormSwitch
            label="Billing Page"
            id="billing_page"
            name="billing_page"
            checked={selectedEmployee.billing_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.payment_settings_page == 1 && (
          <CFormSwitch
            label="Payment Setting Page"
            id="payment_settings_page"
            name="payment_settings_page"
            checked={selectedEmployee.payment_settings_page}
            onChange={handleSwitch}
          />
        )}
        {vendorSetting.ad_desginer_page == 1 && (
          <CFormSwitch
            label="Ad Designer Page"
            id="ad_desginer_page"
            name="ad_desginer_page"
            checked={selectedEmployee.ad_desginer_page}
            onChange={handleSwitch}
          />
        )}

        {/* {vendorSetting.settings_page == 1 && ()} */}
      </div>
    </div>
  );
};

export default EmployeePageAccess;
