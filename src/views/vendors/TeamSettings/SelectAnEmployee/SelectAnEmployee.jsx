import React from "react";
import "./SelectAnEmployee.css";
import { CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const SelectAnEmployee = ({
  allEmployees,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const navigate = useNavigate();
  const handleEmployeeChange = (e) => {
    // const selectedEmp = allEmployees.find((em) => em.id == e.target.value);
    // setSelectedEmployee(selectedEmp);
    navigate(`/manage/team/${e.target.value}`);
  };

  return (
    <div className="">
      <CFormLabel htmlFor="selectAnEmployee"> Select an employee</CFormLabel>
      <CFormSelect
        id="selectAnEmployee"
        name="selectAnEmployee"
        className="selectAnEmployee"
        value={selectedEmployee.id}
        onChange={handleEmployeeChange}
      >
        <option value="0">Select</option>
        {allEmployees.map((employee) => (
          <option value={employee.id} key={employee.id}>
            {employee.UserVendor.first_name}
          </option>
        ))}
      </CFormSelect>
    </div>
  );
};

export default SelectAnEmployee;
