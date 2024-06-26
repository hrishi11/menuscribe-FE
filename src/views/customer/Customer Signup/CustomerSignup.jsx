import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "./Form";
import { Button, Input, Textarea, select } from "@nextui-org/react";
import Checkbox from "@mui/material/Checkbox";
// import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import img from "../../../assets/images/login-image.jpg";
import logo from "../../../assets/menuscribe-logo.png";
import { EyeSlashFilledIcon } from "./svgs/svg1";
import { EyeFilledIcon } from "./svgs/svg2";
import { IoIosPhonePortrait } from "react-icons/io";
import "react-phone-input-2/lib/style.css";
import {
  addCustomerAddress,
  customerSignup,
  getCities,
  getVendorPackageForCustomer,
  resendCustomerOtp,
  setInitCustomerPackageRequest,
  updateCustomerInfo,
  updateCustomerPhone,
  verifyCustomerOtp,
} from "../../../actions/vendorReducers/VendorActions";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { CFormInput, CFormLabel, CFormSelect } from "@coreui/react";

import { GOOGLE_MAPS_API_KEY } from "../../../constants";

import { Select } from "antd";
import { Toast } from "../../../components/app/Toast";
import PhoneInput from "react-phone-input-2";

const libraries = ["places"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { TextField } from "@mui/material";
import { Autocomplete as TextAuto } from "@mui/material";
import Package from "./PackageInfo/Package";
import CreditCardForm from "./CreditCard/CreditCardForm";

export default function CustomerSignup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cities, setCities] = useState();
  const [autocomplete, setAutocomplete] = useState(null);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(30);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [allPackages, setAllPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [creditCard, setCreditCard] = useState({
    first_name: "",
    last_name: "",
    card_number: "",
    expiry_date: "",
    cvv: "",
  });

  //   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  //   const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const step = localStorage.getItem("step");
    const selectedPkg = JSON.parse(localStorage.getItem("selectedPackages"));
    if (step) {
      setCurrentIndex(parseInt(step));
      setCurrentIndex(parseInt(step));
    } else {
      localStorage.setItem("step", 0);
    }

    if (selectedPkg) {
      console.log("selectedPkg", selectedPkg);

      setSelectedPackages(selectedPkg);
    }

    if (userInfo) {
      setFormData({ ...userInfo });
    }
  }, []);

  useEffect(() => {
    if (formData.city_id && formData.address) {
      fetchPackages();
    }
  }, [formData.city_id]);

  useEffect(() => {
    let countdown;
    if (!canResend) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 30;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [canResend]);

  const handleInputChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;
    setOTP(newOTP);

    if (event.target.value !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleInputPaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const newOTP = pastedData.split("").slice(0, 6);
    setOTP(newOTP);

    otpInputs.current[5].focus();
  };

  const handleInputFocus = (index) => {
    otpInputs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e;
    const regex = /^[0-9\b]+$/;

    if (inputPhoneNumber === "" || regex.test(inputPhoneNumber)) {
      setFormData((pre) => ({ ...pre, phone: inputPhoneNumber }));
    }
  };
  const handleStoreNumberChange = (e) => {
    const inputPhoneNumber = e;
    const regex = /^[0-9\b]+$/;

    if (inputPhoneNumber === "" || regex.test(inputPhoneNumber)) {
      setFormData((pre) => ({ ...pre, phone: inputPhoneNumber }));
    }
  };
  const updatePhoneNumber = (e) => {
    const inputPhoneNumber = e;
    const regex = /^[0-9\b]+$/;

    if (inputPhoneNumber === "" || regex.test(inputPhoneNumber)) {
      setFormData((pre) => ({ ...pre, newPhone: inputPhoneNumber }));
    }
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.conform_password) {
        Toast({ message: "Miss match passwords", type: "error" });

        return;
      }
      const response = await dispatch(customerSignup(formData));
      if (response.response && response.response.data.error.status == 400) {
        Toast({ message: "Invalid number", type: "error" });
        return;
      } else if (response.message === "Customer number already exist") {
        Toast({
          message: "Customer already exist with this number",
          type: "error",
        });
        return;
      } else {
        localStorage.setItem("userInfo", JSON.stringify(formData));
        localStorage.setItem("step", 1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(
        verifyCustomerOtp({
          verification_code: otp.join(""),
          phone: formData.phone,
        })
      );
      if (response.status) {
        Toast({ message: response.message, type: "success" });
        setCurrentIndex((pre) => pre + 1);
        localStorage.setItem("step", 2);
        console.log(response.type);
        // navigate("/admin-login");
      } else {
        Toast({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resendOtp = async () => {
    try {
      const response = await dispatch(
        resendCustomerOtp({ phone: formData.phone })
      );
      if (response.message === "Resend code successfully") {
        setOTP(["", "", "", "", "", ""]);
        setCanResend(false);
        Toast({ message: response.message, type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPackages = async () => {
    try {
      const response = await dispatch(
        getVendorPackageForCustomer(formData.city_id)
      );
      setAllPackages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const [CitiesResponse] = await Promise.all([dispatch(getCities())]);

      const data = CitiesResponse.data.map((item) => ({
        label: `${item.city}`,
        value: item.id,
      }));
      setCities(data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleUpdateCustomerPhone = async () => {
    try {
      const response = await dispatch(updateCustomerPhone(formData));
      if (response.message === "Number already exist") {
        Toast({ message: response.message, type: "error" });
      }
      if (response.message === "Phone number updated successfully") {
        setFormData((pre) => ({ ...pre, phone: response.phone }));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.phone = response.phone;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        Toast({
          message: response.message,
          type: "success",
        });
      } else if (response.response.data.error.status == 400) {
        Toast({
          message: "This number is invalid please try another number",
          type: "error",
        });
      } else {
        Toast({
          message: response.message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlaceSelect = (place) => {
    const address = place.formatted_address;

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
    const city_id = cities.find(
      (item) => item.label.toLowerCase() === city.toLowerCase()
    );
    const unit_number = place.address_components.find(
      (item) => item.types[0] === "subpremise"
    );
    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      address,
      postal: postal ? postal : "",
      city,
      show: true,
      city_id: city_id?.id,
      latitude: lat,
      longitude: lng,
      unit_number: unit_number?.short_name ? unit_number?.short_name : null,
    }));
  };
  const handleSubmitUserInfo = async () => {
    try {
      if (formData.order_update != 1 || formData.policy != 1) {
        Toast({
          message: "Please agree to the terms and conditions to proceed.",
          type: "success",
        });
      }
      const response = await dispatch(updateCustomerInfo(formData));
      if (response.message === "Info updated successfully") {
        console.log(response.data.id);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setFormData((pre) => ({ ...pre, id: response.data.id }));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...formData, id: response.data.id })
        );
        localStorage.setItem("step", 3);

        setCurrentIndex((pre) => pre + 1);

        // navigate("/login");
        // localStorage.clear();
        Toast({
          message: "User saved successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAddressInfo = async () => {
    try {
      const response = await dispatch(addCustomerAddress(formData));
      if (response.status) {
        Toast({ message: response.message, type: "success" });
        setCurrentIndex((pre) => pre + 1);
        localStorage.setItem("userInfo", JSON.stringify({ ...formData }));
        localStorage.setItem("step", 4);
        // navigate("/login");
        // localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTax = (pkg) => {
    return pkg.reduce((accumulator, currentValue) => {
      const taxForItem =
        currentValue.VendorPackagePrices.cost *
        (currentValue.tax_percent / 100);
      return accumulator + taxForItem;
    }, 0);
  };
  const submitCustomerPackages = async (e) => {
    try {
      // e.preventDefault();
      const response = await dispatch(
        setInitCustomerPackageRequest({
          id: formData.id,
          packages: selectedPackages,
        })
      );
      if (response.message === "Successful") {
        Toast({ message: "Packages saved successfully", type: "success" });
        navigate("/login");
        localStorage.clear();
      }
      console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-full">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={"p-3"}
        size={"lg"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update number
              </ModalHeader>
              <ModalBody>
                <span className="w-[450px]">
                  <label htmlFor="">Please enter the phone number below</label>
                  <PhoneInput
                    country={"ca"}
                    enableSearch={true}
                    inputStyle={{
                      width: "100%",
                      borderRadius: "5px",
                      height: "55px",
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    dropdownStyle={{
                      width: "450px",
                    }}
                    //   buttonStyle={{ width: "450px" }}
                    searchStyle={{ width: "90%" }}
                    value={formData.newPhone}
                    onChange={updatePhoneNumber}
                    required={true}
                  />
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleUpdateCustomerPhone();
                    setOTP(["", "", "", "", "", ""]);
                    onClose();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* RIGHT SIDE */}
      <div className="w-full h-screen">
        <section
          className="w-[100%] h-full bg-cover bg-center flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url("${img}")`,
          }}
        ></section>
      </div>

      <div className="w-full  h-screen flex justify-center items-center">
        <Carousel
          setCurrentIndex={setCurrentIndex}
          check={"true"}
          currentIndex={currentIndex}
        >
          {/* ADD Detail */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={handleSaveCustomer}
              className="justify-center flex flex-col gap-4 items-center"
            >
              <p className="text-[32px]"> Welcome to Flex</p>
              <p className="text-gray-400 text-center w-[500px]">
                Please Enter your detail for get started
              </p>
              {/* phone */}
              <span className="w-[450px]">
                <PhoneInput
                  country={"ca"}
                  enableSearch={true}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "5px",
                    height: "55px",
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  dropdownStyle={{
                    width: "450px",
                  }}
                  //   buttonStyle={{ width: "450px" }}
                  searchStyle={{ width: "90%" }}
                  value={formData.phone}
                  onChange={handleStoreNumberChange}
                  required={true}
                />
              </span>
              <Input
                isRequired={true}
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, password: e.target.value }))
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-[450px]"
              />
              <Input
                isRequired={true}
                label="Conform Password"
                variant="bordered"
                placeholder="Enter your password"
                value={formData.conform_password}
                onChange={(e) =>
                  setFormData((pre) => ({
                    ...pre,
                    conform_password: e.target.value,
                  }))
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-[450px]"
              />
              <span className="w-[450px] flex flex-col">
                <CFormLabel className="font-14">Location</CFormLabel>
                {/* 
                <CFormSelect
                  className="w-[450px]"
                  type="text"
                  name="city_id"
                  required={true}
                  onChange={(val) =>
                    setStoreInfo((pre) => ({
                      ...pre,
                      city_id: val.target.value,
                    }))
                  }
                  value={storeInfo.city_id}
                >
                  <option value="">Select</option>
                  {cities &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.label}
                      </option>
                    ))}
                </CFormSelect> */}
                <Select
                  showSearch
                  // style={{ width: 200 }}

                  placeholder="Select Location "
                  optionFilterProp="children"
                  className="w-full "
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={cities}
                  onChange={(val) => {
                    console.log("cal", val);
                    setFormData((pre) => ({
                      ...pre,
                      city_id: val,
                    }));
                  }}
                  value={formData.city_id}
                />

                {/* <Select
                  label="Favorite Animal"
                  variant="bordered"
                  placeholder="Select an animal"
                  className="max-w-xs"
                  onChange={(val) =>
                    setStoreInfo((pre) => ({
                      ...pre,
                      city_id: val.target.value,
                    }))
                  }
                  value={storeInfo.city_id}
                >
                  {cities &&
                    cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.label}
                      </SelectItem>
                    ))}
                </Select> */}
              </span>
              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-[#9D32AE] font-semibold text-white w-[450px]"
              >
                Continue
              </Button>
            </form>
          </div>
          {/* VERIFICATION CODE */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={verifyOtp}
              className="justify-center flex flex-col gap-4 items-center h-full"
            >
              <p className="text-[24px]"> Enter OTP for verification</p>
              <p className="text-gray-400 text-center w-[500px]">
                Please enter the six-digit verification code we sent to your
                number +{formData.phone}{" "}
                <span
                  onClick={onOpen}
                  className="text-red-400 underline cursor-pointer"
                >
                  Edit
                </span>
              </p>
              <div className="flex flex-col items-center w-[450px] justify-center">
                <div className="flex justify-center items-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      className="w-12 h-12 text-3xl mx-2 border rounded-lg text-center focus:outline-none focus:border-blue-500"
                      type="text"
                      maxLength="1"
                      value={digit}
                      required={true}
                      onChange={(e) => handleInputChange(index, e)}
                      onPaste={handleInputPaste}
                      onFocus={() => handleInputFocus(index)}
                    />
                  ))}
                </div>
              </div>
              <span className="">
                Don't receive the code?{" "}
                {canResend ? (
                  <span
                    onClick={resendOtp}
                    className="text-red-500 cursor-pointer"
                  >
                    Re-send
                  </span>
                ) : (
                  <span>
                    resend password after 0:{String(timer).padStart(2, "0")}
                  </span>
                )}
              </span>
              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-red-400 font-semibold text-white w-[450px]"
              >
                Verify
              </Button>
            </form>
          </div>

          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitUserInfo();
              }}
              className="justify-center flex flex-col gap-4 items-center h-full"
            >
              <p className="text-[24px]"> About you</p>
              <p className="text-gray-400 text-center w-[500px]">
                Tell us a bit more about yourself
              </p>
              <div className="flex flex-col items-center w-[450px] justify-center">
                <div className="flex flex-col gap-4 justify-center items-center ">
                  <Input
                    type="text"
                    isRequired={true}
                    label="First name"
                    labelPlacement="outside"
                    className="w-[450px] "
                    placeholder="first name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData((pre) => ({
                        ...pre,
                        first_name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    type="text"
                    isRequired={true}
                    label="Last name"
                    labelPlacement="outside"
                    className="w-[450px] "
                    placeholder="last name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData((pre) => ({
                        ...pre,
                        last_name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    type="email"
                    isRequired={true}
                    label="Email"
                    labelPlacement="outside"
                    className="w-[450px]"
                    placeholder="email"
                    value={formData.lastemail_name}
                    onChange={(e) =>
                      setFormData((pre) => ({
                        ...pre,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="pt-3">
                  <span className="flex gap-2 items-center ">
                    <Checkbox
                      {...label}
                      // value={}
                      onChange={(e) =>
                        setFormData((pre) => ({
                          ...pre,
                          order_update: e.target.checked ? 1 : 0,
                        }))
                      }
                      required={true}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                    />
                    <p className="pt-4">
                      Receive order updates and other communications from the
                      Food platform (required)
                    </p>
                  </span>
                  <span className="flex gap-2">
                    <Checkbox
                      {...label}
                      // value={}
                      onChange={(e) =>
                        setFormData((pre) => ({
                          ...pre,
                          policy: e.target.checked ? 1 : 0,
                        }))
                      }
                      required={true}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                    />
                    <p className="pt-4">
                      I agree to the{" "}
                      <span className="text-blue-500">Privacy Policy</span> and{" "}
                      <span className="text-blue-500">Terms & Conditions</span>{" "}
                      (required)
                    </p>
                  </span>
                </div>
              </div>

              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-[#9D32AE] font-semibold text-white w-[450px]"
              >
                Next
              </Button>
            </form>
          </div>

          {/* ADDRESS INFO */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitAddressInfo();
              }}
              className="justify-center mt-20 flex flex-col gap-2 items-center h-full"
            >
              <p className="text-[24px]">
                {" "}
                Nice to meet you, {formData?.first_name}
              </p>
              <p className="w-[300px] text-center">
                Please set your location so we can show options that deliver to
                your area.
              </p>
              <div className="flex flex-col items-center w-[450px] justify-center">
                <div className="flex flex-col gap-3 justify-center items-center ">
                  <LoadScript
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                    libraries={libraries}
                    loadingElement={<div>Loading...</div>}
                    id="google-maps-script"
                  >
                    <Autocomplete
                      className="w-[450px]"
                      onLoad={(autocomplete) => {
                        setAutocomplete(autocomplete);
                      }}
                      onPlaceChanged={() => {
                        autocomplete?.getPlace() &&
                          handlePlaceSelect(autocomplete.getPlace());
                      }}
                    >
                      <CFormInput
                        className="w-[450px]"
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        required={true}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((pre) => ({
                            ...pre,
                            address: e.target.value,
                          }))
                        }
                      />
                    </Autocomplete>
                  </LoadScript>

                  {formData?.show && (
                    <span className="flex flex-col gap-2">
                      <Input
                        type="text"
                        label="Unit number (Optional)"
                        labelPlacement="outside"
                        className="w-[450px] "
                        placeholder="unit number"
                        value={storeInfo.unit_number}
                        onChange={(e) =>
                          setFormData((pre) => ({
                            ...storeInfo,
                            unit_number: e.target.value,
                          }))
                        }
                      />
                    </span>
                  )}
                  {/* Postal Address */}
                  {formData?.show && (
                    <span>
                      <CFormLabel className="font-14">Postal</CFormLabel>
                      <Input
                        className="w-[450px]"
                        isRequired={true}
                        type="text"
                        name="postal"
                        required={true}
                        onChange={(e) =>
                          setFormData((pre) => ({
                            ...pre,
                            postal: e.target.value,
                          }))
                        }
                        value={formData.postal}
                      />
                    </span>
                  )}
                  {/* City */}
                  {formData?.show && (
                    <span className="w-[450px]">
                      <CFormLabel className="font-14">City</CFormLabel>
                      <CFormSelect
                        className="w-[450px]"
                        type="text"
                        name="city_id"
                        required={true}
                        onChange={(val) =>
                          setFormData((pre) => ({
                            ...pre,
                            city_id: val.target.value,
                          }))
                        }
                        value={formData.city_id}
                      >
                        <option value="">Select</option>
                        {cities &&
                          cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.label}
                            </option>
                          ))}
                      </CFormSelect>
                    </span>
                  )}

                  {/* Work or Home */}
                  <div>
                    <CFormLabel className="font-20  w-full text-start">
                      Type of Address
                    </CFormLabel>

                    <TextAuto
                      disablePortal
                      id="combo-box-demo"
                      className="w-[450px]"
                      options={["HOME", "WORK", "OTHER"]}
                      sx={{
                        // width: 300,
                        display: "inline-block",
                        "& input": {
                          height: 5,
                        },
                      }}
                      onChange={(e, val) =>
                        setFormData({ ...formData, address_type: val })
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Home or Work" />
                      )}
                    />
                  </div>

                  <span>
                    {/* <p className="text-gray-400">
                      Describe the general area that would help customers
                      identify if they are close by. This could be an
                      intersection or neighbourhood name.
                    </p> */}
                    <Textarea
                      label="Delivery Instructions (Optional)"
                      variant="bordered"
                      onChange={(e) =>
                        setFormData((pre) => ({
                          ...pre,
                          delivery_instruction: e.target.value,
                        }))
                      }
                      labelPlacement="outside"
                      // placeholder="Leave instructions so that delivery drivers and/or customers can find where to pick up their order"
                      className="w-[450px]"
                    />
                  </span>
                </div>
              </div>

              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-red-400 font-semibold text-white w-[450px]"
              >
                Next
              </Button>
            </form>
          </div>

          {/* Select Package */}
          <div className="justify-center w-full   flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem(
                  "selectedPackages",
                  JSON.stringify(selectedPackages)
                );
                localStorage.setItem("step", currentIndex + 1);
                setCurrentIndex((pre) => pre + 1);
              }}
              className="justify-center w-full  mt-20 flex flex-col gap-2 items-center "
            >
              <div className="flex flex-col  ">
                <p className="text-[24px] text-center"> Select your package</p>
                <p className="w-[300px] text-center">
                  Choose a package to start
                </p>
                <p className="text-center">
                  You can switch to another package any time
                </p>
              </div>
              <div className="flex flex-col items-center w-full justify-center">
                <div className="flex flex-col w-full h-[650px] px-12 overflow-y-scroll gap-2">
                  {allPackages.length > 0 &&
                    allPackages.map((item, index) => (
                      <span
                        className=""
                        onClick={() => {
                          const check = selectedPackages.find(
                            (info) => info.index == index
                          );
                          check
                            ? setSelectedPackages(
                                selectedPackages.filter(
                                  (check) => check.index != index
                                )
                              )
                            : setSelectedPackages((pre) => [
                                ...pre,
                                { ...item, index },
                              ]);
                        }}
                      >
                        <Package
                          info={item}
                          checked={
                            selectedPackages.filter(
                              (check) => check.index == index
                            ).length > 0
                              ? true
                              : false
                          }
                        />
                      </span>
                    ))}
                </div>
              </div>
              <div className="px-14 w-full ">
                <Button
                  size="md"
                  radius="sm"
                  isDisabled={selectedPackages.length > 0 ? false : true}
                  type="submit"
                  className={`bg-green-500 w-full   font-semibold text-white`}
                >
                  Next
                </Button>
              </div>
            </form>
          </div>

          {/* Payment Method with Summary */}
          <div className=" w-full overflow-y-scroll mt-[8%] flex flex-col gap-4 items-center h-[92%]">
            <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   handleSubmitAddressInfo();
              // }}
              className="justify-center w-full   flex flex-col gap-2 items-center "
            >
              <div className="flex flex-col w-full ">
                <p className="text-[34px]  text-blue-400 font-semibold text-center">
                  Confirm Your Plan Details
                </p>
                <div className="flex flex-col w-full">
                  <span className="text-center">
                    Confirm your plan subscriptio details below.
                  </span>
                  <span className="text-center">You can cancel at anytime</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center w-full justify-center">
                {/* Package Total Calculation */}
                <div className="w-3/5">
                  <span className="font-semibold">ORDER SUMMARY</span>
                  {selectedPackages.map((item) => (
                    <div className="flex justify-between gap-2">
                      <p className="flex flex-col">
                        {item.Vendor.vendor_name} - {item.package_name}{" "}
                        <span>${item.VendorPackagePrices.cost}/month</span>
                      </p>
                      <p className="font-medium">
                        ${item.VendorPackagePrices.cost}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <span className="font-semibold">SUBTOTAL</span>
                    <span className="font-semibold">
                      $
                      {selectedPackages.reduce(
                        (acc, cur) => acc + cur.VendorPackagePrices.cost,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">TAX</span>
                    <span className="font-semibold">
                      ${calculateTax(selectedPackages)}
                    </span>
                  </div>
                  <div className="flex justify-between bg-gray-200 p-1">
                    <span className="font-semibold">TOTAL</span>
                    <span className="font-semibold">
                      $
                      {calculateTax(selectedPackages) +
                        selectedPackages.reduce(
                          (acc, cur) => acc + cur.VendorPackagePrices.cost,
                          0
                        )}
                    </span>
                  </div>
                </div>
                {/* Coupon Code section */}
                <div className="flex gap-2 justify-between w-3/5 items-center">
                  <span>
                    Coupon code?{" "}
                    <span className="text-blue-500">Click here</span>
                  </span>
                  <span>
                    <Input
                      type="text"
                      // label="Email"
                      placeholder="Coupon Code"
                      labelPlacement="outside"
                    />
                  </span>
                </div>
                {/* Credit Card Detail */}
                <div>
                  <CreditCardForm
                    creditCard={creditCard}
                    setCreditCard={setCreditCard}
                    submitCustomerPackages={submitCustomerPackages}
                  />
                </div>
              </div>
            </form>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
