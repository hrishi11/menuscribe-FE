import React from "react";
import "./GeneralSettings.css";
import {
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
} from "@coreui/react";

const GeneralSettings = ({ selectedEmployee, setSelectedEmployee }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newEmployee = { ...selectedEmployee };
    newEmployee.UserVendor[name] = value;
    setSelectedEmployee(newEmployee);
  };
  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    const newEmployee = { ...selectedEmployee };
    newEmployee.role = value;
    setSelectedEmployee(newEmployee);
  };
  const handleAccountAccessChange = (e) => {
    const { name, checked } = e.target;
    const newEmployee = { ...selectedEmployee };
    newEmployee.status = checked ? 1 : 0;
    setSelectedEmployee(newEmployee);
  };
  console.log(selectedEmployee);
  return (
    <div className="my-20x">
      <CFormLabel> General Settings</CFormLabel>
      <div className="generalSettingsFieldsContainer">
        <div>
          <CFormLabel htmlFor="firstName"> First Name </CFormLabel>
          <CFormInput
            type="text"
            id="firstName"
            name="first_name"
            value={selectedEmployee.UserVendor.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <CFormLabel htmlFor="lastName"> Last Name </CFormLabel>
          <CFormInput
            type="text"
            id="lastName"
            name="last_name"
            value={selectedEmployee.UserVendor.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <CFormLabel htmlFor="role"> Role</CFormLabel>
          <CFormSelect
            id="role"
            name="role"
            value={selectedEmployee.role}
            onChange={handleRoleChange}
          >
            <option value="OWNER">OWNER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="SERVER">SERVER</option>
            <option value="DRIVER">DRIVER</option>
          </CFormSelect>
        </div>
        <div>
          <CFormLabel htmlFor="email"> Email </CFormLabel>
          <CFormInput
            type="text"
            id="email"
            name="email"
            value={selectedEmployee.UserVendor.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <CFormLabel htmlFor="account_access"> Account Access </CFormLabel>
          <CFormSwitch
            id="formSwitchCheckDefault"
            checked={selectedEmployee.status === 1}
            name="status"
            onChange={handleAccountAccessChange}
          />
        </div>
        <div>
          <CFormLabel htmlFor="phone"> Phone </CFormLabel>
          <CFormInput
            type="text"
            id="phone"
            name="phone"
            value={selectedEmployee.UserVendor.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
