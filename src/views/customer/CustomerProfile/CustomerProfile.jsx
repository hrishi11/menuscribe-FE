import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCities,
  getPackages,
} from "../../../actions/vendorReducers/VendorActions";
import { CFormLabel, CFormSelect } from "@coreui/react";
import {
  deleteCustomerAddress,
  getCustomer,
  getCustomerAddress,
  updateCustomerProfile,
} from "../../../actions/customerReducer/CustomerActions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Alert } from "antd";
import { CustomerDashboardHeader } from "../../../components/CustomerDashboardHeader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Address from "./Address/Address";
import CustomerAddress from "../../../components/app/modals/CustomerAddress";
import CustomerAddressEdit from "../../../components/app/modals/CustomerAddressEdit";
import Popup from "../../../components/Popup/Popup";

export default function CustomerProfile() {
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const vendorData = JSON.parse(localStorage.getItem("menuScribe"));

  const [selectedCity, setSelectedCity] = useState();
  const [citiesData, setCitiesData] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [activeKey, setActiveKey] = useState("2");
  const [myAddress, setMyAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [delErrorData, setDelErrorData] = useState([]);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const [citiesResponse, customerResponse] = await Promise.all([
        dispatch(getCities()),
        dispatch(getCustomer()),
        // dispatch(getCustomerAddress()),
      ]);
      // setMyAddress(addressResponse.data);
      setUserInfo({
        first_name: customerResponse.data.first_name,
        last_name: customerResponse.data.last_name,
        email: customerResponse.data.email,
        phone: customerResponse.data.phone,
      });

      setSelectedState(customerResponse.data.CitiesAll.state);
      const availableCities = citiesResponse.data.filter(
        (city) => city.state === customerResponse.data.CitiesAll.state
      );
      setCitiesData(availableCities);
      setSelectedCity(customerResponse.data.city_id);
      let statesAll = [];
      citiesResponse.data.forEach((city) => statesAll.push(city.state));

      setStates([...new Set(statesAll)]);
      setAllCity(citiesResponse.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  const fetchExistingAddress = async () => {
    try {
      const addressResponse = await dispatch(getCustomerAddress());
      setMyAddress(addressResponse.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchExistingAddress();
  }, [updateTrigger]);
  const handleStateChange = (e) => {
    console.log("enter", e.target.value);
    setSelectedState(e.target.value);
    const availableCities = allCity.filter(
      (city) => city.state === e.target.value
    );
    console.log(availableCities);
    setCitiesData(availableCities);
  };
  function removeEmptyValues(obj) {
    // Iterate over the object's keys
    Object.keys(obj).forEach((key) => {
      // Check if the value is empty (null, undefined, empty string, empty array, empty object)

      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === "" ||
        (Array.isArray(obj[key]) && obj[key].length === 0) ||
        (typeof obj[key] === "object" && Object.keys(obj[key]).length === 0)
      ) {
        // Remove the key-value pair from the object
        delete obj[key];
      }
    });
    return obj;
  }
  const handleSave = async () => {
    try {
      const data = removeEmptyValues({
        ...userInfo,
        city_id: selectedCity,
        state: selectedState,
      });
      const response = await dispatch(updateCustomerProfile(data));
      if (response) {
        alert("User Updated Successfully");
      }
      fetchExistingAddress();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveAddress = () => {
    setAddressId(0);
    setShowAddressModal(true);
  };
  const handleEditAddress = (id) => {
    try {
      setPopup(true);
      setAddressId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAddress = async (id) => {
    const response = await dispatch(deleteCustomerAddress(id));
    if (response.message === "Cannot delete this address") {
      setDelErrorData(response.data);
      onOpen();
      return;
    }
    setUpdateTrigger((prev) => !prev);
    if (response && response.success) {
      Toast({ message: "Item deleted successfully.", type: "success" });
    }
  };

  const handlePopupClick = async (str) => {
    if (str === "yes") {
      setPopup(false);
      setShowUpdateAddressModal(true);
    } else if (str === "no") {
      console.log("no");
      setPopup(false);
    }
  };
  const convertDateFormate = (date) => {
    const newDate = new Date(date);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
  };
  return (
    <div className="w-full flex justify-center items-center">
      {/* MODALS */}
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Address Delete
                </ModalHeader>
                <ModalBody>
                  <p>
                    This address is currently being used on the follwing
                    package:
                  </p>
                  <div className="flex flex-col pl-3">
                    {delErrorData.length > 0 &&
                      delErrorData.map((item) => (
                        <span className="text-[14px]">
                          -{item.data.VendorPackage.package_name} (created on{" "}
                          {convertDateFormate(item.data.created_date)}){" "}
                        </span>
                      ))}
                  </div>
                  <p>
                    Please change the package's delivery address before removing
                    this address from your profile
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Ok
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <CustomerAddress
          showAddressModal={showAddressModal}
          setShowAddressModal={setShowAddressModal}
          addressId={addressId}
          customerId={vendorData.id}
          setUpdateTrigger={setUpdateTrigger}
        />
        <CustomerAddressEdit
          showAddressModal={showUpdateAddressModal}
          setShowAddressModal={setShowUpdateAddressModal}
          addressId={addressId}
          setAddressId={setAddressId}
          customerId={vendorData.id}
          setUpdateTrigger={setUpdateTrigger}
          popup={popup}
          setPopup={setPopup}
        />

        {popup && <Popup handlePopupClick={handlePopupClick} />}
      </div>
      <div
        className="flex flex-col justify-center my-20x"
        // style={{ width: "70%", height: "100vh" }}
        style={{ width: "70%" }}
      >
        {/* <CustomerDashboardHeader
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      /> */}
        <div
          className=" flex justify-center flex-col items-center border bg-light "
          style={{ height: "fit", width: "70%", borderRadius: "20px" }}
        >
          <div className=" p-3 h-full" style={{ borderRadius: "5px" }}>
            <h1 className="fs-3">Edit Profile</h1>
            {/* Fast and Last Name */}
            <span
              className="w-full flex gap-5 p-2 flex-wrap"
              style={{ width: "100%" }}
            >
              <span className=" flex flex-col ">
                <label htmlFor="" className="fs-6">
                  First Name
                </label>
                <input
                  type="text"
                  className=" fs-6 p-2 "
                  style={{ width: "300px", height: "63px" }}
                  placeholder="First Name"
                  value={userInfo.first_name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, first_name: e.target.value })
                  }
                />
              </span>
              <span className=" flex flex-col ">
                <label htmlFor="" className="fs-6">
                  Last Name
                </label>
                <input
                  type="text"
                  className=" fs-6 p-2 "
                  style={{ width: "300px", height: "63px" }}
                  placeholder="Last Name"
                  value={userInfo.last_name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, last_name: e.target.value })
                  }
                />
              </span>
            </span>
            {/* Email and Phone Number */}
            <span
              className="w-full flex gap-5 p-2 flex-wrap"
              style={{ width: "100%" }}
            >
              <span className="  flex flex-col">
                <label htmlFor="" className="fs-6 ">
                  Email
                </label>
                <input
                  type="email"
                  className=" fs-6 p-2 "
                  style={{ width: "300px", height: "63px" }}
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </span>
              <span className=" flex flex-col">
                <label htmlFor="" className="fs-6">
                  Phone
                </label>
                <span className="flex w-full gap-2  items-center">
                  {/* <span className="text-2xl">+1</span>
                  <input
                    type="number"
                    className=" fs-5 w-full"
                    // style={{ width: "60%" }}
                    placeholder="Phone"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                  /> */}
                  <PhoneInput
                    country={"ca"}
                    enableSearch={true}
                    style={{ width: "300px", height: "" }}
                    value={userInfo.phone}
                    onChange={(phone) =>
                      setUserInfo({ ...userInfo, phone: phone })
                    }
                    required
                  />
                </span>
              </span>
            </span>
            {/* City and State */}
            <span className="w-full flex gap-5 p-2 flex-wrap">
              <div className="">
                <CFormLabel htmlFor="city" className="fs-6">
                  State
                </CFormLabel>
                <CFormSelect
                  name="city"
                  aria-label="Default select example"
                  className="  rounded-none"
                  style={{
                    borderColor: "black",
                    borderRadius: "none",
                    width: "300px",
                    height: "63px",
                  }}
                  id="validationCustom07"
                  value={selectedState}
                  onChange={handleStateChange}
                  required
                >
                  <option value=""> Select </option>
                  {states &&
                    states.map((item, id) => (
                      <option key={id} value={item}>
                        {item}
                      </option>
                    ))}
                </CFormSelect>
              </div>

              <div className="">
                <CFormLabel htmlFor="city" className="fs-6">
                  City
                </CFormLabel>
                <CFormSelect
                  name="city"
                  aria-label="Default select example"
                  className="  rounded-none"
                  style={{
                    borderColor: "black",
                    borderRadius: "none",
                    width: "300px",
                    height: "63px",
                  }}
                  id="validationCustom07"
                  defaultValue={selectedCity}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {citiesData &&
                    citiesData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.city}
                      </option>
                    ))}
                </CFormSelect>
              </div>
            </span>
            <span className="w-full flex gap-5 p-4 justify-end">
              <button
                className="px-2  ml-20 fs-4 border-none text-white"
                style={{ backgroundColor: "#3489eb" }}
                onClick={handleSave}
              >
                save
              </button>
            </span>
          </div>
        </div>
        {/* -----------Existing address---------- */}
        <div
          className="border bg-light px-20x py-20x my-10x"
          style={{ height: "fit", width: "70%", borderRadius: "20px" }}
        >
          <div className="flex justify-between w-full m-2">
            <h4>My Addresses</h4>
            <button
              onClick={handleSaveAddress}
              className="bg-blue-500 text-white p-1 px-2"
            >
              Add Address
            </button>
          </div>
          <ul className="addresses-container flex gap-10x flex-wrap">
            {myAddress.map((address) => (
              <Address
                key={address.id}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                address={address}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
