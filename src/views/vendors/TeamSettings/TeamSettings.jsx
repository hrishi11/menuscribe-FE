import React, { useEffect, useState } from "react";
import "./TeamSettings.css";
import SelectAnEmployee from "./SelectAnEmployee/SelectAnEmployee";

import {
  getEmployees,
  validateEmployee,
} from "../../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";

const TeamSettings = () => {
  const [access, setAccess] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({ id: 0 });
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    try {
      const res = await dispatch(getEmployees());

      setAllEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const validateOWNER = async () => {
    try {
      const res = await dispatch(validateEmployee({ role: "Owner" }));
      setAccess(res.access);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    validateOWNER();
  }, []);

  if (!access) {
    return <h2>Sorry. Access to this page is not permitted.</h2>;
  }

  return (
    <div>
      <SelectAnEmployee
        allEmployees={allEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </div>
  );
};

export default TeamSettings;
