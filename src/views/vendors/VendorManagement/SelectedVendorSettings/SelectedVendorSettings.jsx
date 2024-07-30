import { CFormLabel, CFormSwitch } from "@coreui/react/dist";
import React from "react";
import { useDispatch } from "react-redux";
import { setVendorSettings } from "../../../../actions/vendorReducers/VendorActions";

export default function SelectedVendorSettings({
  selectedVendor,
  setVendorSetting,
  vendorSetting,
}) {
  const dispatch = useDispatch();
  const handleSwitch = async (e) => {
    const { name, checked } = e.target;
    const newSettings = { ...vendorSetting };
    checked ? (newSettings[name] = 1) : (newSettings[name] = 0);
    console.log(newSettings);
    await dispatch(
      setVendorSettings({
        page_name: name,
        vendor_id: selectedVendor.id,
        value: newSettings[name],
      })
    );
    setVendorSetting(newSettings);
  };

  return (
    <div>
      <div className="EmployeePageAccessContainer">
        {/* <CFormLabel htmlFor="employeePackageAccess">
          EMPLOYEE PACKAGE ACCESS
        </CFormLabel> */}
        <div className="checksContainer">
          <CFormSwitch
            label="Dashboard Page"
            id="dashboard_page"
            name="dashboard_page"
            checked={vendorSetting?.dashboard_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Get Started Page"
            name="get_started_page"
            checked={vendorSetting?.get_started_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Customers Page"
            id="customers_page"
            name="customers_page"
            checked={vendorSetting?.customers_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Packages Page"
            id="packages_page"
            name="packages_page"
            checked={vendorSetting?.packages_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Package Request Page"
            id="package_requests_page"
            name="package_requests_page"
            checked={vendorSetting?.package_requests_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Upload Users Page"
            id="upload_users_page"
            name="upload_users_page"
            checked={vendorSetting?.upload_users_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Pickup Page"
            id="pickups_page"
            name="pickups_page"
            checked={vendorSetting?.pickups_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Create Menu Page"
            id="create_menu_page"
            name="create_menu_page"
            checked={vendorSetting?.create_menu_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Multiple Menu Editor Page"
            id="multiple_menu_editor_page"
            name="multiple_menu_editor_page"
            checked={vendorSetting?.multiple_menu_editor_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Customer Orders Page"
            id="customer_orders_page"
            name="customer_orders_page"
            checked={vendorSetting?.customer_orders_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Website Setting Page"
            id="website_setting_page"
            name="website_setting_page"
            checked={vendorSetting?.website_setting_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Order Summary Page"
            id="order_summary_page"
            name="order_summary_page"
            checked={vendorSetting?.order_summary_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Order Manager Page"
            id="order_manager_page"
            name="order_manager_page"
            checked={vendorSetting?.order_manager_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Delivery Manager Page"
            id="delivery_manager_page"
            name="delivery_manager_page"
            checked={vendorSetting?.delivery_manager_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Delivery Page"
            id="delivery_page"
            name="delivery_page"
            checked={vendorSetting?.delivery_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="My Team Page"
            id="my_team_page"
            name="my_team_page"
            checked={vendorSetting?.my_team_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="All Subscriptions Page"
            id="all_subscriptions_page"
            name="all_subscriptions_page"
            checked={vendorSetting?.all_subscriptions_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Team Settings Page"
            id="team_settings_page"
            name="team_settings_page"
            checked={vendorSetting?.team_settings_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Promotions page"
            id="promotions_page"
            name="promotions_page"
            checked={vendorSetting?.promotions_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Settings Page"
            id="settings_page"
            name="settings_page"
            checked={vendorSetting?.settings_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Payments Page"
            id="payments_page"
            name="payments_page"
            checked={vendorSetting?.payments_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Billing Page"
            id="billing_page"
            name="billing_page"
            checked={vendorSetting?.billing_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Locations Page"
            id="locations_page"
            name="locations_page"
            checked={vendorSetting?.locations_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Payment Settings Page"
            id="payment_settings_page"
            name="payment_settings_page"
            checked={vendorSetting?.payment_settings_page}
            onChange={handleSwitch}
          />
          <CFormSwitch
            label="Ad Designer_page"
            id="ad_desginer_page"
            name="ad_desginer_page"
            checked={vendorSetting?.ad_desginer_page}
            onChange={handleSwitch}
          />
        </div>
      </div>
    </div>
  );
}
