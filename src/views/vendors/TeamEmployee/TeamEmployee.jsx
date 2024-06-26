import React, { useEffect, useState } from "react";
import "./TeamEmployee.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getEmployees,
  getVendorLocations,
  setEmployee,
  validateEmployee,
} from "../../../actions/customerReducer/CustomerActions";
import GeneralSettings from "../TeamEmployee/GeneralSettings/GeneralSettings";
import EmployeePageAccess from "../TeamEmployee/EmployeePageAccess/EmployeePageAccess";
import EmployeeLocationAccess from "../TeamEmployee/EmployeeLocationAccess/EmployeeLocationAccess";
import { CButton, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import SelectAnEmployee from "./SelectAnEmployee/SelectAnEmployee";
import { Toast } from "../../../components/app/Toast";

const TeamEmployee = () => {
  const [access, setAccess] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({ id: 0 });
  const [allVendorLocations, setAllVendorLocations] = useState([]);
  const [vendorLocations, setVendorLocations] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    try {
      const res = await dispatch(getEmployees());
      console.log("000000", res.data);
      setAllEmployees(res.data);
      const employee = res.data.find((em) => em.id == parseInt(id));
      setSelectedEmployee(employee);
    } catch (error) {
      console.log(error);
    }
  };

  const filterLocation = () => {
    if (!selectedEmployee.VendorEmployeeLocations) {
      return;
    }
    const selectedLocationsIds = selectedEmployee.VendorEmployeeLocations.map(
      (loc) => loc.vendor_location_id
    );
    const selectedLocationsUniqueIds = [...new Set(selectedLocationsIds)];
    const vendorLocationsIds = allVendorLocations.map((Vlo) => Vlo.id);

    const newLocationsIds = vendorLocationsIds.filter(
      (id) => !selectedLocationsUniqueIds.includes(id)
    );

    const newLocation = newLocationsIds.map((id) =>
      allVendorLocations.find((loca) => loca.id === id)
    );
    setVendorLocations(newLocation);
  };

  const fetchVendorLocations = async () => {
    try {
      const res = await dispatch(getVendorLocations());
      setAllVendorLocations(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const validateOWNER = async () => {
    try {
      const res = await dispatch(validateEmployee({ role: "OWNER" }));
      setAccess(res.access);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateOWNER();
    fetchVendorLocations();
  }, []);
  useEffect(() => {
    fetchEmployees();
  }, [id]);

  useEffect(() => {
    selectedEmployee.id !== 0 && filterLocation();
    console.log("filter run");
  }, [selectedEmployee?.VendorEmployeeLocations]);

  const handleSave = async () => {
    try {
      const res = await dispatch(setEmployee(selectedEmployee));
      console.log(res);
      Toast({
        message: "Customer updated successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!access) {
    return <h2>Sorry. This page is only for owners only</h2>;
  }
  return (
    <div>
      <SelectAnEmployee
        allEmployees={allEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />

      {selectedEmployee && selectedEmployee?.id !== 0 && (
        <GeneralSettings
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />
      )}

      {/* ----------- Employee pages and location access------- */}
      <div className="employeePageLocationContainer">
        {selectedEmployee && selectedEmployee.id !== 0 && (
          <EmployeePageAccess
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        )}
        {selectedEmployee && selectedEmployee.id !== 0 && (
          <EmployeeLocationAccess
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            vendorLocations={vendorLocations}
            filterLocation={filterLocation}
          />
        )}
      </div>
      {/* --------Submit Button----- */}
      {selectedEmployee && selectedEmployee.id !== 0 && (
        <div className="text-center my-20x">
          <CButton onClick={handleSave} className="">
            Save
          </CButton>
        </div>
      )}
    </div>
  );
};

export default TeamEmployee;
