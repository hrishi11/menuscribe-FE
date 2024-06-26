import { CButton, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteLocation,
  getActivePromotions,
  getCities,
  getCouponTypes,
  getInactivePromotions,
  getPackages,
  getPostalRegions,
  getVendor,
  getVendorPackagesForVendorLocation,
  setVendorLocation,
} from "../../actions/vendorReducers/VendorActions";
import "./Settings/Settings.css";

import { handleUserRole } from "../../utils/Helper";
// import { setPackagesData } from "../../../actions/customerReducer/CustomerActions";
import PaymentMethods from "../../components/PaymetMethods/PaymentMethods";
import { Toast } from "../../components/app/Toast";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { top100Films } from "./data";
import { Select } from "antd";

export default function Location() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [locations, setLocations] = useState([]);
  const [postalRegion, setPostalRegion] = useState([]);
  const [postalData, setPostalData] = useState();
  // -------------Delete Popups-------------
  const [deleteWarn, setDeleteWarn] = useState({
    show: false,
    packages: [],
  });
  const [deletePopup, setDeletePopup] = useState({ show: false, location: {} });
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    handleUserRole("Admin");
    fetchPostalRegions();
  }, []);
  console.log(deleteWarn);

  const handleAddAnotherLocation = () => {
    // console.log("clicked")
    // console.log(useId(),'useId()')
    const newLocation = {
      id: makeUniqueId(6),
      location_name: "",
      address: "",
      city_id: 0,
      vendor_id: vendor.id,
      service_area: [
        {
          city_id: 0,
          vendor_id: vendor.id,
          id: makeUniqueId(6),
        },
      ],
    };
    setLocations([...locations, newLocation]);
  };
  const makeUniqueId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const handleLocationsInputChange = (e, locationId) => {
    // setVendor({
    //   ...vendor,
    //   locations: Object.entries(vendor.locations).map(([key, innerObj]) =>
    //   innerObj.id === locationId
    //       ? { ...innerObj, [e.target.name]: e.target.value }
    //       : innerObj
    //   ),
    // });

    setLocations(
      locations.map((location) =>
        location.id === locationId
          ? { ...location, [e.target.name]: e.target.value }
          : location
      )
    );
  };

  const handleLocationSave = async (locationId) => {
    const savingLocation = locations.filter((loca) => loca.id === locationId);
    // const filteredAreasLocations = savingLocation[0].service_area.filter(item => (item.city_id !== null));
    //savingLocation[0].service_area = filteredAreasLocations;
    console.log(locations);
    const removeZerosIdValues = savingLocation[0].service_area.filter(
      (item) => item.city_id !== 0
    );
    savingLocation[0].service_area = removeZerosIdValues;
    try {
      const data = locations.filter((item) => item.id === locationId);
      console.log("casz", data);
      const res = await dispatch(
        setVendorLocation({
          locationData: { ...savingLocation[0] },
          postalData: data[0].VendorLocationPostalRegions,
        })
      );
      Toast({ message: "Location updated sucessfully", type: "success" });
    } catch (error) {
      console.log(`error on seving location ${savingLocation.id}`, error);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await dispatch(getCities());
      setCities(res.data);
      // console.log(res.data)
    } catch (error) {
      console.log("Error Fetching Cities", error);
    }
  };
  const fetchVendor = async () => {
    try {
      const res = await dispatch(getVendor());
      setVendor(res.data);
      const LocationsArr = Object.entries(res.data.locations).map(
        ([key, property]) => property
      );
      // console.log(Locations)
      for (let i = 0; i < LocationsArr.length; i++) {
        LocationsArr[i].service_area = res.data.areas[LocationsArr[i].id];
      }
      console.log("LocationsArr", LocationsArr);
      setLocations(LocationsArr);
    } catch (error) {
      console.log("Error from Settings.js", error);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchVendor();
  }, []);

  const handleRemovecity = (location, serviceArea) => {
    const tempLocations = locations;
    const locationIndex = tempLocations.findIndex(
      (item) => item.id === location.id
    );
    if (locationIndex > -1) {
      const serviceAreaIndex = tempLocations[
        locationIndex
      ].service_area.findIndex((item) => item.id === serviceArea.id);
      if (serviceAreaIndex > -1) {
        tempLocations[locationIndex].service_area[serviceAreaIndex].city_id =
          null;
      }
    }
    setLocations([...tempLocations]);
  };
  const handleAddCityToLocation = (location) => {
    const tempLocations = locations;
    const locationIndex = tempLocations.findIndex(
      (item) => item.id === location.id
    );
    if (locationIndex > -1) {
      tempLocations[locationIndex]?.service_area.push({
        city_id: 0,
        vendor_id: vendor.id,
        id: makeUniqueId(6),
      });
    }
    setLocations([...tempLocations]);
  };
  const handleAreaInputChange = (e, location, areaTOadd) => {
    const tempLocations = locations;
    const locationIndex = tempLocations.findIndex(
      (item) => item.id === location.id
    );
    if (locationIndex > -1) {
      const areaIndex = tempLocations[locationIndex].service_area.findIndex(
        (area) => area.id === areaTOadd.id
      );
      if (areaIndex > -1) {
        tempLocations[locationIndex].service_area[areaIndex].city_id =
          e.target.value;
      }
    }
    setLocations([...tempLocations]);
  };
  // ------Delete location functions-------------

  const handleDeletePopup = async () => {
    try {
      const res = await dispatch(deleteLocation(deletePopup.location));
      fetchVendor();
      setDeletePopup({ show: false, location: {} });
      toast.success("Address deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // ------Delete location functions-------------
  const handleDeleteLocation = async (location) => {
    try {
      const res = await dispatch(getVendorPackagesForVendorLocation(location));
      console.log(res.data);
      if (res.data.length > 0) {
        setDeleteWarn({ show: true, packages: res.data });
      } else {
        setDeletePopup({ show: true, location });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPostalRegions = async () => {
    try {
      const response = await dispatch(getPostalRegions());
      const info = response.data.map((item) => {
        return {
          value: `${item.CITY}-${item.POSTAL_CODE}`,
          label: `${item.CITY}-${item.POSTAL_CODE}`,
          title: `${item.CITY}-${item.POSTAL_CODE}`,
          postal_region_id: item.id,
        };
      });

      setPostalRegion(info);
      console.log("res", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-white my-10x">
        <p className="border-b p-16"> MY LOCATIONS</p>
        {/* locations */}
        {locations.length > 0
          ? locations.map((location, index) => (
              <div
                key={location.id}
                className="locationContainer my-30x border-b p-16"
              >
                <div className=" gap-10x flex justify-between flex-col-package pr-30-on-md ">
                  {/* ------Left Section------ */}
                  <div className="addressContainer">
                    <CFormLabel htmlFor="location_name">
                      LOCATION NAME
                    </CFormLabel>
                    <br />
                    <CFormInput
                      type="text"
                      placeholder="Location Name"
                      id="location_name"
                      name="location_name"
                      className="px-5x py-5x"
                      value={location.location_name}
                      onChange={(e) =>
                        handleLocationsInputChange(e, location.id)
                      }
                    />
                    {/* -------Address and City------------ */}
                    <div className="flex gap-5x">
                      <div>
                        <CFormLabel htmlFor="address"> ADDRESS</CFormLabel>{" "}
                        <br />
                        <CFormInput
                          type="text"
                          placeholder="Address"
                          id="address"
                          name="address"
                          className="px-5x py-5x"
                          value={location.address}
                          onChange={(e) =>
                            handleLocationsInputChange(e, location.id)
                          }
                        />
                      </div>
                      <div>
                        <CFormLabel htmlFor="city_id"> City</CFormLabel> <br />
                        <CFormSelect
                          name="city_id"
                          id="city_id"
                          className=""
                          value={location.city_id}
                          onChange={(e) =>
                            handleLocationsInputChange(e, location.id)
                          }
                        >
                          <option value="0">Select city</option>
                          {cities.length > 0 &&
                            cities.map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.state} - {city.city}
                              </option>
                            ))}
                        </CFormSelect>
                      </div>
                    </div>
                  </div>
                  {/* ------Right Section------ */}
                  <div className=" flex flex-col items-center serviceAreaContainer">
                    <p className="text-sm w-full"> SERVICE AREAS</p>
                    {location?.service_area?.map((item) => (
                      <div key={item.id}>
                        {item.city_id !== null && (
                          <div className="flex gap-10x my-5x w-full">
                            <CFormSelect
                              name="city_id"
                              id="city_id"
                              className=""
                              value={item.city_id}
                              onChange={(e) =>
                                handleAreaInputChange(e, location, item)
                              }
                            >
                              <option value="0">Select city</option>
                              {cities.length > 0 &&
                                cities.map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.state} - {city.city}
                                  </option>
                                ))}
                            </CFormSelect>
                            <CButton
                              onClick={() => handleRemovecity(location, item)}
                              className="text-red border-none outline-none font-semibold bg-transparent hover-text-red"
                            >
                              X
                            </CButton>
                          </div>
                        )}
                      </div>
                    ))}

                    <CButton
                      onClick={() => handleAddCityToLocation(location)}
                      className="text-blue font-semibold border-none outline-none bg-transparent hover-text-blue"
                    >
                      Add city
                    </CButton>

                    <div className="relative">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "250px" }}
                        placeholder="Please select"
                        defaultValue={location.VendorLocationPostalRegions?.map(
                          (item) => item.title
                        )}
                        onChange={(e, val) => {
                          // const filterData=
                          console.log(val);
                          return setLocations(
                            locations.map((locationItem, idx) => {
                              if (idx === index) {
                                return {
                                  ...locationItem,
                                  VendorLocationPostalRegions: val,
                                };
                              }
                              return locationItem;
                            })
                          );
                        }}
                        options={postalRegion}
                      />
                      {/* <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        className=""
                        options={postalRegion}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...location.VendorLocationPostalRegions]}
                        onChange={(e, val) => {
                          // const filterData=
                          console.log(val);
                          return setLocations(
                            locations.map((locationItem, idx) => {
                              if (idx === index) {
                                return {
                                  ...locationItem,
                                  VendorLocationPostalRegions: val,
                                };
                              }
                              return locationItem;
                            })
                          );
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.title}
                          </li>
                        )}
                        style={{ width: 250 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Checkboxes"
                            placeholder="Favorites"
                          />
                        )}
                      /> */}
                      <CButton
                        className="my-10x"
                        onClick={() => handleLocationSave(location.id)}
                      >
                        SAVE
                      </CButton>
                    </div>
                  </div>

                  {/* ------------Payment Methods-------- */}
                  <PaymentMethods
                    VendorPaymentMethods={location?.PaymentMethods}
                    locationId={location.id}
                  />
                </div>
                <div className="flex justify-end">
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => handleDeleteLocation(location)}
                  >
                    Delete
                  </CButton>
                </div>
              </div>
              // <h1> {location.id}</h1>
            ))
          : ""}
        <div className="flex justify-center w-100 pb-16">
          <CButton className="" onClick={handleAddAnotherLocation}>
            + ADD ANOTHER LOCATION
          </CButton>
        </div>
      </div>
      {/* -------------Delete Location popups---------- */}

      {/* Warning popup */}

      {deleteWarn?.show && (
        <div className="popupContainer">
          <div className="popup">
            <p>The location currently has the following active packages:</p>
            <ul>
              {deleteWarn.packages.map((pack) => (
                <li key={pack.id}>
                  -
                  <Link
                    to={`http://localhost:5173/manage/add-package/${pack.id}`}
                  >
                    {pack.package_name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Please deactivate the package or re-assign it to another location
              before deleting the location
            </p>
            <div className="flex justify-between gap-10x">
              <CButton
                className="col"
                onClick={() => setDeleteWarn({ show: false, packages: [] })}
              >
                OK
              </CButton>
            </div>
          </div>
        </div>
      )}

      {/* Final popup */}
      {deletePopup?.show && (
        <div className="popupContainer">
          <div className="popup">
            <p>This will delete the location. Would you like to continue?</p>
            <div className="flex justify-between gap-10x">
              <CButton
                className="col"
                onClick={() => setDeletePopup({ show: false, location: {} })}
              >
                No
              </CButton>
              <CButton className="col" onClick={handleDeletePopup}>
                Yes
              </CButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
