import { CFormInput, CFormLabel, CFormSwitch } from "@coreui/react";
import { Input } from "antd";
import React from "react";

export default function Controls({
  handleFocusChange,
  vendorSetting,
  handleChange,
  handleSwitch,
}) {
  return (
    <div className="p-6 bg-gray-300 rounded-lg  ">
      <h4>Controls</h4>
      <div className=" flex justify-between  gap-x-28  flex-wrap">
        <div className="flex flex-col ">
          <CFormLabel>No of employees</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              //   label="No of employees"
              className=""
              id="no_of_employees"
              name="no_of_employees"
              checked={vendorSetting?.no_of_employees == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              disabled={vendorSetting?.no_of_employees !== null ? false : true}
              type="number"
              name="no_of_employees"
              onChange={handleChange}
              onBlur={handleFocusChange}
              value={vendorSetting?.no_of_employees}
              className="w-[150px] p-2"
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <CFormLabel>No of locations</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              className=""
              id="no_of_locations"
              name="no_of_locations"
              checked={vendorSetting?.no_of_locations == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              type="number"
              disabled={vendorSetting?.no_of_locations !== null ? false : true}
              name="no_of_locations"
              onChange={handleChange}
              onBlur={handleFocusChange}
              value={vendorSetting?.no_of_locations}
              className="w-[150px] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <CFormLabel>No of customers</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              id="no_of_customers"
              name="no_of_customers"
              checked={vendorSetting?.no_of_customers == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              type="number"
              disabled={vendorSetting?.no_of_customers !== null ? false : true}
              name="no_of_customers"
              value={vendorSetting?.no_of_customers}
              onChange={handleChange}
              onBlur={handleFocusChange}
              className="w-[150px] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <CFormLabel>No of packages</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              //   label="No of employees"
              className=""
              id="no_of_packages"
              name="no_of_packages"
              checked={vendorSetting?.no_of_packages == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              type="number"
              disabled={vendorSetting?.no_of_packages !== null ? false : true}
              name="no_of_packages"
              onChange={handleChange}
              onBlur={handleFocusChange}
              value={vendorSetting?.no_of_packages}
              className="w-[150px] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <CFormLabel>No of menu items</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              //   label="No of employees"
              className=""
              id="no_of_menu_items"
              name="no_of_menu_items"
              checked={vendorSetting?.no_of_menu_items == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              type="number"
              disabled={vendorSetting?.no_of_menu_items !== null ? false : true}
              name="no_of_menu_items"
              onChange={handleChange}
              onBlur={handleFocusChange}
              value={vendorSetting?.no_of_menu_items}
              className="w-[150px] p-2"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <CFormLabel>No of drivers</CFormLabel>
          <div className="flex items-center w-fit gap-2">
            <CFormSwitch
              //   label="No of employees"
              className=""
              id="no_of_drivers"
              name="no_of_drivers"
              checked={vendorSetting?.no_of_drivers == null ? false : true}
              onChange={handleSwitch}
            />
            <Input
              type="number"
              disabled={vendorSetting?.no_of_drivers !== null ? false : true}
              name="no_of_drivers"
              onChange={handleChange}
              onBlur={handleFocusChange}
              value={vendorSetting?.no_of_drivers}
              className="w-[150px] p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
