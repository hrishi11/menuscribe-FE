import { CFormLabel, CFormSelect } from "@coreui/react";
import React from "react";

const SelectAnLocation = ({
  selectedLocation,
  setSelectedLocation,
  allLocations,
}) => {
  const handleLocationChange = (e) => {
    try {
      setSelectedLocation(
        allLocations.find((item) => item.id == e.target.value)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[200px] flex flex-col ">
        <div htmlFor="selectLocation">Select Location</div>
        <CFormSelect
          id="selectLocation"
          name="vendor_location_id"
          className=""
          value={selectedLocation?.id}
          onChange={handleLocationChange}
        >
          <option className="w-[200px]" value="0">
            Select
          </option>
          {allLocations.map((location) => (
            <option value={location.id} key={location.id}>
              {location.address}, {location.CitiesAll.city}
            </option>
          ))}
        </CFormSelect>
      </div>
    </div>
  );
};
export default SelectAnLocation;
