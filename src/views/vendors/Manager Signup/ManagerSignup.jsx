import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "./Form";
import { Button, Input, Textarea } from "@nextui-org/react";
import Checkbox from "@mui/material/Checkbox";

import { useDispatch } from "react-redux";
import { getResturantDetails } from "../../../actions/customerReducer/CustomerActions";
import Detail from "../../pages/ResturantDetails/Detail/Detail";
import img from "../../../assets/images/login-image.jpg";
import logo from "../../../assets/menuscribe-logo.png";
import { EyeSlashFilledIcon } from "./svgs/svg1";
import { EyeFilledIcon } from "./svgs/svg2";
import { IoIosPhonePortrait } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  checkVendorEmail,
  getCities,
  getPostalRegions,
  setNewVendorLocation,
  setVendorLocation,
  setVendorStoreInfo,
  submintManager,
  verifyManagerOtp,
} from "../../../actions/vendorReducers/VendorActions";
import { Toast } from "../../../components/app/Toast";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import TextField from "@mui/material/TextField";

import { GOOGLE_MAPS_API_KEY } from "../../../constants";
import { HeartIcon } from "./svgs/svg3";
import { Autocomplete as AutoComp } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Select } from "antd";

const libraries = ["places"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ManagerSignup() {
  const [resturantDetails, setResturantDetails] = useState({});
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
  const [postalRegion, setPostalRegion] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pickupOption, setPickupOption] = useState();
  const [deliveryOption, setDeliveryOption] = useState();

  //   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  //   const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    fetchResturantDetails();
    fetchPostalRegions();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const step = localStorage.getItem("step");
    if (userInfo && step) {
      console.log("step", typeof step);
      setCurrentIndex(parseInt(step));
      setFormData({ ...userInfo });
    }
    if (step) {
      setCurrentIndex(parseInt(step));
    }
  }, []);

  const handleInputChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;
    setOTP(newOTP);

    if (event.target.value !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const fetchPostalRegions = async () => {
    try {
      const response = await dispatch(getPostalRegions());
      const info = response.data.map((item) => {
        return {
          value: `${item.CITY}-${item.POSTAL_CODE}`,
          label: `${item.CITY}-${item.POSTAL_CODE}`,
          postal_region_id: item.id,
        };
      });

      setPostalRegion(info);
    } catch (error) {
      console.log(error);
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

  const fetchResturantDetails = async () => {
    try {
      const res = await dispatch(
        getResturantDetails({ resturantPublicUrl: "taj-mahal" })
      );
      setResturantDetails(res.data);
    } catch (error) {
      console.error("Error fetching Resturant Details:", error);
    }
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
      setStoreInfo((pre) => ({ ...pre, phone: inputPhoneNumber }));
    }
  };

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handleEmailSave = async (e) => {
    e.preventDefault();
    if (formData.email) {
      const response = await dispatch(
        checkVendorEmail({ email: formData.email })
      );
      console.log(response);
      if (response.message === "User Already Existed") {
        Toast({ message: response.message, type: "error" });
      } else if (
        response.message === "User Already Existed but verification is required"
      ) {
        setCurrentIndex(3);

        Toast({ message: response.message, type: "error" });
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };
  const handleSaveManager = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(submintManager(formData));
      if (response.response && response.response.data.error.status == 400) {
        Toast({ message: "Invalid number", type: "error" });
        return;
      } else {
        console.log("helo0000");
        localStorage.setItem("userInfo", JSON.stringify(formData));
        localStorage.setItem("step", 3);
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
        verifyManagerOtp({
          verification_code: otp.join(""),
          email: formData.email,
        })
      );
      if (response.status) {
        localStorage.setItem("VendorEmployeeId", response.id);
        Toast({ message: response.message, type: "success" });
        setCurrentIndex((pre) => pre + 1);
        localStorage.setItem("step", 4);
        console.log(response.type);
        // navigate("/admin-login");
      } else {
        Toast({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  function convertToUrlFormat(inputString) {
    let urlFriendlyString = inputString.toLowerCase();

    urlFriendlyString = urlFriendlyString.replace(/'/g, "");

    urlFriendlyString = urlFriendlyString.replace(/\s+/g, "-");

    urlFriendlyString = urlFriendlyString.replace(/[^a-z0-9-]/g, "");

    return urlFriendlyString;
  }

  const fetchData = async () => {
    try {
      const [CitiesResponse] = await Promise.all([dispatch(getCities())]);

      const data = CitiesResponse.data.map((item) => ({
        label: `${item.city}`,
        id: item.id,
      }));
      setCities(data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

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

    setStoreInfo((prevData) => ({
      ...prevData,
      address,
      postal: postal ? postal : "",
      city,
      city_id: city_id?.id,
      latitude: lat,
      longitude: lng,
      unit_number: unit_number?.short_name ? unit_number?.short_name : null,
    }));
  };
  const handleSaveStoreInfo = async (e) => {
    try {
      e.preventDefault();
      if (pickupOption || deliveryOption) {
        if (deliveryOption && locations.length == 0) {
          Toast({
            message: "Location checkbox select atleast 1 location",
            type: "error",
          });

          return;
        }
        await dispatch(
          setVendorStoreInfo({
            ...storeInfo,
            email: formData.email,
            postalRegions: locations,
          })
        );

        localStorage.removeItem("step");
        localStorage.removeItem("userInfo");
        navigate("/admin-login");
      } else {
        Toast({
          message:
            "At least 1 option must be selected (pickup, delivery, or both)",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSave = async () => {
    try {
      console.log(locations);
      const response = await dispatch(
        setNewVendorLocation({ postalRegious: locations })
      );
    } catch (error) {
      console.log(`error on seving location ${savingLocation.id}`, error);
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-full h-screen flex justify-center items-center">
        <Carousel setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}>
          {/* ADD EMAIL */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={handleEmailSave}
              className="justify-center flex flex-col gap-4 items-center"
            >
              <p className="text-[32px]"> Enter your email to continue</p>
              <p className="text-gray-400 text-center w-[500px]">
                Getting your store up and running is quick and simple, no
                commitments, contracts and cancel anytime.
              </p>
              <Input
                type="email"
                className="w-[450px]"
                label="Email"
                errorMessage="Email must be required"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, email: e.target.value }))
                }
                isRequired={true}
              />
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
          {/* ADD PASSWORD */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={nextSlide}
              className="justify-center flex flex-col gap-4 items-center"
            >
              <p className="text-[24px]"> Enter your password to signup</p>
              <p className="text-gray-400 text-center w-[500px]">
                Enter your password to start creating your store.
              </p>
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
              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-[#9D32AE] font-semibold text-white w-[450px]"
              >
                Signup
              </Button>
            </form>
          </div>
          {/* ADD NUMBER */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={handleSaveManager}
              className="justify-center flex flex-col gap-4 items-center h-full"
            >
              <p className="text-[24px]"> Enter your phone number</p>
              <p className="text-gray-400 text-center w-[500px]">
                Verify your phone number so you never miss an order alert from
                your customers.
              </p>

              <div className="flex w-[450px]  justify-center">
                <PhoneInput
                  country={"ca"}
                  enableSearch={true}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "5px",
                    height: "55px",
                  }}
                  //   inputProps={{
                  //     name: "phone",
                  //     required: true,
                  //     autoFocus: true,
                  //   }}
                  //   dropdownStyle={{ width: "450px" }}
                  //   buttonStyle={{ width: "450px" }}
                  //   searchStyle={{ width: "90%" }}
                  value={formData.phone}
                  onChange={handlePhoneNumberChange}
                  required={true}
                />
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
          {/* VERIFICATION CODE */}
          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={verifyOtp}
              className="justify-center flex flex-col gap-4 items-center h-full"
            >
              <p className="text-[24px]"> Enter OTP for verification</p>
              <p className="text-gray-400 text-center w-[500px]">
                Please enter the six-digit verification code we sent to your
                number +{formData.phone}
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
                <span className="text-purple-500">
                  Click here to send again
                </span>
              </span>
              <Button
                size="md"
                radius="sm"
                type="submit"
                className="bg-[#9D32AE] font-semibold text-white w-[450px]"
              >
                Verify
              </Button>
            </form>
          </div>

          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentIndex((pre) => pre + 1);
              }}
              className="justify-center flex flex-col gap-4 items-center h-full"
            >
              <p className="text-[24px]"> What is your store called?</p>
              <p className="text-gray-400 text-center w-[500px]">
                Create a catchy name or use your business name
              </p>
              <div className="flex flex-col items-center w-[450px] justify-center">
                <div className="flex flex-col gap-4 justify-center items-center ">
                  <Input
                    type="text"
                    isRequired={true}
                    label="Store name"
                    labelPlacement="outside"
                    className="w-[450px] "
                    placeholder="Your store name"
                    value={storeInfo.storeName}
                    onChange={(e) =>
                      setStoreInfo((pre) => ({
                        ...storeInfo,
                        storeName: e.target.value,
                        storeURL: convertToUrlFormat(e.target.value),
                      }))
                    }
                  />
                  <span className="flex flex-col gap-2">
                    <Input
                      type="text"
                      isRequired={true}
                      label="Store URL"
                      labelPlacement="outside"
                      className="w-[450px] "
                      placeholder="Your store URL"
                      value={storeInfo.storeURL}
                      onChange={(e) =>
                        setStoreInfo((pre) => ({
                          ...storeInfo,
                          storeURL: e.target.value,
                        }))
                      }
                    />
                    <p>menuscribe.com/{storeInfo.storeURL}</p>
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

          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentIndex((pre) => pre + 1);
              }}
              className="justify-center mt-20 flex flex-col gap-2 items-center h-full"
            >
              <p className="text-[24px]"> What is your store address?</p>
              {/* <p className="text-gray-400 text-center w-[500px]">
                Create a catchy name or use your business name
              </p> */}
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
                        value={storeInfo.address}
                        onChange={(e) =>
                          setStoreInfo((pre) => ({
                            ...storeInfo,
                            address: e.target.value,
                          }))
                        }
                      />
                    </Autocomplete>
                  </LoadScript>
                  {/* Unit number */}
                  <span className="flex flex-col gap-2">
                    <Input
                      type="text"
                      label="Unit number (Optional)"
                      labelPlacement="outside"
                      className="w-[450px] "
                      placeholder="unit number"
                      value={storeInfo.unit_number}
                      onChange={(e) =>
                        setStoreInfo((pre) => ({
                          ...storeInfo,
                          unit_number: e.target.value,
                        }))
                      }
                    />
                  </span>
                  {/* Postal code */}
                  <span>
                    <CFormLabel className="font-14">Postal</CFormLabel>
                    <Input
                      className="w-[450px]"
                      isRequired={true}
                      type="text"
                      name="postal"
                      required={true}
                      onChange={(e) =>
                        setStoreInfo((pre) => ({
                          ...pre,
                          postal: e.target.value,
                        }))
                      }
                      value={storeInfo.postal}
                    />
                  </span>
                  <span className="w-[450px]">
                    <CFormLabel className="font-14">City</CFormLabel>
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
                    </CFormSelect>
                  </span>
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
                      value={storeInfo.phone}
                      onChange={handleStoreNumberChange}
                      required={true}
                    />
                  </span>

                  {/* instructions */}
                  <span>
                    <p className="text-gray-400">
                      Describe the general area that would help customers
                      identify if they are close by. This could be an
                      intersection or neighbourhood name.
                    </p>
                    {/* <p>Pickup Instructions (Optional)</p> */}
                    <Textarea
                      label="Pickup Instructions (Optional)"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="Leave instructions so that delivery drivers and/or customers can find where to pick up their order"
                      className="w-[450px]"
                    />
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

          <div className="justify-center flex flex-col gap-4 items-center h-full">
            <form
              onSubmit={handleSaveStoreInfo}
              className="justify-center flex flex-col gap-2 items-center h-full"
            >
              <p className="text-[24px]"> How do you serve customers?</p>
              {/* <p className="text-gray-400 text-center w-[500px]">
                Create a catchy name or use your business name
              </p> */}
              <div className="flex flex-col items-center w-[450px] justify-center">
                <div className="flex flex-col gap-3 justify-center items-center ">
                  {/* Delivery */}
                  <div>
                    <div className="flex bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg">
                      <span>
                        <h4>Delivery (powered by Cookin)</h4>
                        <p>
                          Cookin will connect you and your customers through our
                          3rd party driver network. Deliver like restaurant.
                        </p>
                      </span>
                      <Checkbox
                        {...label}
                        // value={}
                        onChange={(e) =>
                          setDeliveryOption(e.target.checked ? 1 : 0)
                        }
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                      />
                    </div>
                    {deliveryOption == 1 && (
                      <div className="border flex flex-col items-center justify-center">
                        <span className="py-5 flex flex-col items-center justify-center">
                          <h5>Select the cities that you deliver</h5>
                          <p>You can change this at any time</p>
                          <div className="relative flex justify-center">
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "400px" }}
                              placeholder="Please select"
                              // defaultValue={["a10", "c12"]}
                              onChange={(e, val) => {
                                console.log("values", val, e);
                                return setLocations(val);
                              }}
                              options={postalRegion}
                            />
                            {/* <AutoComp
                              multiple
                              id="checkboxes-tags-demo"
                              className=""
                              options={postalRegion}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              //   defaultValue={[
                              //     ...locations.VendorLocationPostalRegions,
                              //   ]}
                              onChange={(e, val) => {
                                // const filterData=
                                console.log("values", val, e);
                                return setLocations(val);
                              }}
                              renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                  <Checkbox
                                    icon={
                                      <CheckBoxOutlineBlankIcon fontSize="small" />
                                    }
                                    checkedIcon={
                                      <CheckBoxIcon fontSize="small" />
                                    }
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
                            {/* <CButton
                            className="my-10x"
                            onClick={() => handleLocationSave()}
                          >
                            SAVE
                          </CButton> */}
                          </div>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pickup */}
                  <div className="flex bg-gray-200 py-4 px-3 rounded-lg">
                    <span>
                      <h4>Pick up</h4>
                      <p>
                        Customers will only be given your address and pick up
                        instructions after you accept their orders.
                      </p>
                    </span>
                    <Checkbox
                      {...label}
                      onChange={(e) =>
                        setPickupOption(e.target.checked ? 1 : 0)
                      }
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                    />
                  </div>
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
        </Carousel>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full h-screen">
        <section
          className="w-[100%] h-[90%] bg-cover bg-center flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url("${img}")`,
          }}
        >
          <img
            className="border-1 border-white rounded-[20px] bg-white p-2"
            src={logo}
            alt=""
            width={300}
          />

          <Detail
            title={"About us"}
            desc={
              "We provide food delivery service to most cities. We have a variety of food options to choose from. The food is prepared by the best chefs who have 10 years of combined experience. We have many customers who enjoy our food across the region and are looking forward to serving you."
            }
          />

          <Detail
            title={"Our food"}
            desc={
              "Our food is delicious and highly rated amongst our customers. We hope you enjoy our food too."
            }
          />

          <Detail
            title={"Our service areas"}
            desc={
              "We service Brampton, Mississauga, Hamilton, Toronto, Oakville, Scarborough, and Caledon."
            }
          />

          <footer className="absolute w-[50%] flex flex-col justify-center items-center gap-0 z-10 bg-black text-white text-[14px] h-[10%] bottom-0">
            <span>CONTACT TAJ MAHAL</span>
            <span>PHONE: 234234234</span>
            <span>EMAIL: public@mail.com</span>
          </footer>
        </section>
      </div>
    </div>
  );
}
