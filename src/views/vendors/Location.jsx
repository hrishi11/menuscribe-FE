import { CButton, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
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
  getVendorSettings,
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
import { Autocomplete as TextAuto } from "@mui/material";

import { LoadScript, Autocomplete } from "@react-google-maps/api";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Select } from "antd";
import { useDisclosure } from "@nextui-org/react";
import LimitModal from "../../components/Modals/LimitModal";
import { GOOGLE_MAPS_API_KEY } from "../../constants";
const libraries = ["places"];

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [limit, setLimit] = useState();
  const [autocomplete, setAutocomplete] = useState({});

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    handleUserRole("Owner");
    fetchPostalRegions();
  }, []);

  const handleAddAnotherLocation = async () => {
    const checkLimit = await dispatch(getVendorSettings());

    if (
      (checkLimit.data.no_of_locations ||
        checkLimit.data.no_of_locations == 0) &&
      locations.length >= checkLimit.data.no_of_locations
    ) {
      setLimit(checkLimit.data.no_of_locations);
      onOpen();
    } else {
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
      setLocations([
        ...locations,
        { ...newLocation, VendorLocationPostalRegions: [] },
      ]);
    }
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
    setLocations(
      locations.map((location) =>
        location.id === locationId
          ? { ...location, [e.target.name]: e.target.value }
          : location
      )
    );
  };

  const handleLocationSave = async (locationId) => {
    const savingLocation = locations.find((loca) => loca.id === locationId);
    // const filteredAreasLocations = savingLocation[0].service_area.filter(item => (item.city_id !== null));
    //savingLocation[0].service_area = filteredAreasLocations;
    const removeZerosIdValues = savingLocation.service_area.filter(
      (item) => item.city_id !== 0
    );
    console.log("location00000", savingLocation);
    savingLocation.service_area = removeZerosIdValues;
    try {
      const data = locations.find((item) => item.id === locationId);
      const res = await dispatch(
        setVendorLocation({
          locationData: { ...savingLocation },
          postalData: data.VendorLocationPostalRegions,
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
      for (let i = 0; i < LocationsArr.length; i++) {
        LocationsArr[i].service_area = res.data.areas[LocationsArr[i].id];
      }
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

  const handlePlaceSelect = (place, locationId) => {
    console.log("add");
    const address = place.name;
    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const postal = postalCodeComponent?.short_name
      ? postalCodeComponent.short_name
      : "";
    const city = cityComponent ? cityComponent.long_name : "";

    let city_id = null;
    if (city) {
      city_id = cities.find(
        (item) => item.city.toLowerCase() === city.toLowerCase()
      ).id;
      console.log("city", city_id);
    }

    const unit_number = place.address_components.find(
      (item) => item.types[0] === "subpremise"
    );

    setLocations(
      locations.map((location) =>
        location.id === locationId
          ? {
              ...location,
              address: address,
              postal: postal ? postal : "",
              city,
              city_id: city_id,
              latitude: lat,
              longitude: lng,
              unit_number: unit_number?.short_name,
            }
          : location
      )
    );
  };

  const handleFormData = (event, locationId) => {
    const { name, value } = event.target;
    setLocations(
      locations.map((location) =>
        location.id === locationId
          ? {
              ...location,
              [name]: value,
            }
          : location
      )
    );
  };

  const onLoad = useCallback((locationId, autocompleteInstance) => {
    setAutocomplete((prev) => ({
      ...prev,
      [locationId]: autocompleteInstance,
    }));
  }, []);

  const onPlaceChanged = useCallback(
    (locationId) => {
      const autocompletes = autocomplete[locationId];
      if (autocompletes) {
        const place = autocompletes.getPlace();
        if (place) {
          handlePlaceSelect(place, locationId);
        } else {
          console.log("Place is undefined for location", locationId);
        }
      } else {
        console.log("Autocomplete is not initialized for location", locationId);
      }
    },
    [autocomplete, handlePlaceSelect]
  );

  return (
    <div>
      <LimitModal
        name={"locations"}
        limit={limit}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="bg-white my-10x">
        <p className="border-b p-16"> MY LOCATIONS</p>
        {/* locations */}
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={libraries}
          loadingElement={<div>Loading...</div>}
          id="google-maps-script"
        >
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
                      <div className="flex gap-5x flex-col">
                        <div>
                          <CFormLabel htmlFor="address"> ADDRESS</CFormLabel>{" "}
                          <br />
                          <Autocomplete
                            onLoad={(autocompleteInstance) =>
                              onLoad(location.id, autocompleteInstance)
                            }
                            options={{
                              componentRestrictions: { country: "ca" },
                            }}
                            onPlaceChanged={() => onPlaceChanged(location.id)}
                          >
                            <CFormInput
                              // className="simple-input"
                              type="text"
                              name="address"
                              placeholder="Enter your address"
                              required
                              onChange={(e) => handleFormData(e, location.id)}
                              value={location.address || ""}
                            />
                          </Autocomplete>
                          {/* <CFormInput
                          type="text"
                          placeholder="Address"
                          id="address"
                          name="address"
                          className="px-5x py-5x"
                          value={location.address}
                          onChange={(e) =>
                            handleLocationsInputChange(e, location.id)
                          }
                        /> */}
                        </div>

                        {/* City */}
                        <div>
                          <CFormLabel htmlFor="city_id"> City</CFormLabel>{" "}
                          <br />
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

                        {/* Unit Number */}
                        <div>
                          <CFormLabel className="font-12">
                            Unit Number
                          </CFormLabel>
                          <CFormInput
                            className="w-full"
                            // style={{ width: "full" }}
                            type="text"
                            name="unit_number"
                            placeholder="Enter Unit Number"
                            value={location.unit_number}
                            onChange={(e) =>
                              handleLocationsInputChange(e, location.id)
                            }
                          />
                        </div>

                        {/* Postal */}
                        <div>
                          <CFormLabel className="font-12">Postal</CFormLabel>
                          <CFormInput
                            // className="simple-input"
                            type="text"
                            name="postal"
                            placeholder="Enter your address"
                            // disabled
                            required
                            onChange={(e) => handleFormData(e, location.id)}
                            value={location.postal || ""}
                          />
                        </div>

                        {/* Delivery Instructions */}
                        <div>
                          <CFormLabel className="font-12">
                            Delivery Instructions
                          </CFormLabel>
                          <CFormInput
                            className="simple-input"
                            type="text"
                            name="delivery_instructions"
                            required
                            onChange={(e) => handleFormData(e, location.id)}
                            value={location.delivery_instructions || ""}
                          />
                        </div>
                        {/* Pickup Instructions */}
                        <div>
                          <CFormLabel className="font-12">
                            Pickup Instructions
                          </CFormLabel>
                          <CFormInput
                            className="simple-input"
                            type="text"
                            name="pickup_instructions"
                            required
                            onChange={(e) => handleFormData(e, location.id)}
                            value={location.pickup_instructions || ""}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ------Right Section------ */}
                    <div className=" flex flex-col items-center serviceAreaContainer">
                      {/* <p className="text-sm w-full"> SERVICE AREAS</p>
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
                      </CButton> */}

                      <div className="relative">
                        {/* <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "250px" }}
                          placeholder="Please select"
                          defaultValue={location.VendorLocationPostalRegions?.map(
                            (item) => item.title
                          )}
                          onChange={(e, val) => {
                            // const filterData=
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
                        /> */}
                        <TextAuto
                          multiple
                          id="checkboxes-tags-demo"
                          className=""
                          options={postalRegion}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.title}
                          defaultValue={[
                            ...location?.VendorLocationPostalRegions,
                          ]}
                          onChange={(e, val) => {
                            // const filterData=
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
                        />
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
        </LoadScript>

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
