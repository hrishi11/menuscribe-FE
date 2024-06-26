import React from "react";
import "./EmployeeLocationAccess.css";
import { CFormLabel, CFormSelect } from "@coreui/react";
import { useDispatch } from "react-redux";
import {
  deleteEmployeeLocation,
  setEmployeeLocation,
} from "../../../../actions/customerReducer/CustomerActions";

const EmployeeLocationAccess = ({
  selectedEmployee,
  setSelectedEmployee,
  vendorLocations,
  filterLocation,
}) => {
  const dispatch = useDispatch();

  const handleLocationChange = async (e) => {
    try {
      const selectedLocation = vendorLocations.find(
        (loca) => loca.id == e.target.value
      );
      const reqObj = {
        VendorEmployeeId: selectedEmployee.id,
        location: selectedLocation,
      };
      const res = await dispatch(setEmployeeLocation(reqObj));
      const newLocations = [
        ...selectedEmployee.VendorEmployeeLocations,
        { ...res.data, VendorLocation: selectedLocation },
      ];
      setSelectedEmployee({
        ...selectedEmployee,
        VendorEmployeeLocations: newLocations,
      });
      // console.log(newLocations);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLocationDelete = async (location) => {
    try {
      const res = await dispatch(deleteEmployeeLocation(location));
      const newLocations = selectedEmployee.VendorEmployeeLocations.filter(
        (loca) => loca.id !== location.id
      );
      setSelectedEmployee({
        ...selectedEmployee,
        VendorEmployeeLocations: newLocations,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EmployeeLocationAccess">
      <CFormLabel htmlFor="employeePackageAccess">
        EMPLOYEE LOCATION ACCESS
      </CFormLabel>
      <div className="locationsMainContainer">
        <CFormSelect id="role" name="role" onChange={handleLocationChange}>
          <option value="">Select</option>
          {vendorLocations.map((lo) => (
            <option key={lo.id} value={lo.id}>
              {lo.address}
            </option>
          ))}
        </CFormSelect>
        <ul className="addedLocationsContainer">
          {selectedEmployee.VendorEmployeeLocations &&
            selectedEmployee.VendorEmployeeLocations.length > 0 &&
            selectedEmployee.VendorEmployeeLocations.map((location, i) => (
              <li className="locationItem" key={i}>
                <button
                  className="border-none outline-none bg-transparent text-red"
                  onClick={() => handleLocationDelete(location)}
                >
                  X
                </button>
                <span>{location.VendorLocation?.address}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeLocationAccess;
