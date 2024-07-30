import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addCustomerLink,
  checkExistingUser,
  getVendorLocations,
  saveCustomer,
  saveExistingCustomer,
} from "../../actions/customerReducer/CustomerActions";
import {
  checkVendorPostalRegion,
  getCities,
  getPackages,
  getVendor,
  // getVendorPackageFrequency,
  getVendorPackages,
} from "../../actions/vendorReducers/VendorActions";
import { CiDeliveryTruck } from "react-icons/ci";

import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Autocomplete as TextAuto } from "@mui/material";
import TextField from "@mui/material/TextField";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toast } from "../../components/app/Toast";
import { getDateFromString } from "../../utils/Helper";
import { parseISO } from "date-fns";
import PhoneInput from "react-phone-input-2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import { Select, Tooltip } from "antd";

const AddCustomer = () => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [validated, setValidated] = useState(false);
  const [states, setStates] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [packages, setPackages] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [numberCheck, setNumberCheck] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen2, onOpened, onOpenChange2 } = useDisclosure();
  const [modOpen, setModOpen] = useState(false);
  const [existedUser, setExistedUser] = useState();
  const [orderPackages, setOrderPackagesDetails] = useState([
    {
      package: "",
      start_date: "",
      end_date: "",
      index: 0,
      frequency: "",
      payment: "",
      getFrequencies: [],
      getDeliverySlots: [],
      delivery: 0,
      pickup: 0,
      timeSlotId: "",
      package_name: "",
      pickup_delivery: "",
    },
  ]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: {},
    delivery_instruction: "",
    postal_code: "",
    assign_location: "",
    state: "",
    city: "",
  });
  const libraries = ["places"];
  const [autocomplete, setAutocomplete] = useState(null);
  const [cities, setCities] = useState([]);
  const [vendorLocations, setVendorLocations] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState([]);
  const handleCityChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, address: { ...formData.address, city: value } });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CitiesResponse] = await Promise.all([dispatch(getCities())]);
        console.log("000", CitiesResponse);
        const data = CitiesResponse.data.map((item) => ({
          label: `${item.city}`,
          id: item.id,
        }));
        console.log(data.length);
        setCities(data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchVendorLocations();
    fetchData();
  }, []);
  const handlePlaceSelect = async (place) => {
    const address = place.formatted_address;

    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );

    const postal = postalCodeComponent ? postalCodeComponent.short_name : "";

    const city = cityComponent ? cityComponent.long_name : "";
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const city_id = cities.find(
      (item) => item.label.toLowerCase() === city.toLowerCase()
    );
    let postalError = false;
    const checkPostalCode = await dispatch(
      checkVendorPostalRegion({ postal: postal })
    );
    if (!checkPostalCode.success) {
      postalError = true;
    }
    const unit_number = place.address_components.find(
      (item) => item.types[0] === "subpremise"
    );

    setFormData({
      ...formData,
      address: {
        city: city_id.id ? city_id : {},
        postalError,
        postal,
        address,
        latitude: lat,
        longitude: lng,
        unit_number: unit_number?.short_name,
      },
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: { ...formData.address, address: value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse] = await Promise.all([
          dispatch(getCities()),
          // dispatch(getVendorPackageFrequency()),
        ]);
        let statesAll = [];
        citiesResponse.data.forEach((city) => statesAll.push(city.state));
        setStates([...new Set(statesAll)]);
        setAllCity(citiesResponse.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => {
      // Return only the first occurrence of each item
      return arr.indexOf(item) === index;
    });
  };
  const handlePackageChange = async (index, event) => {
    // console.log(event, index);
    const value = [...orderPackages];
    value[index].package = event.target.value;
    const selectedPackage = packages.filter(
      (pack) => pack.id === parseInt(event.target.value)
    );

    console.log("package selected", selectedPackage);
    value[index].getFrequencies = [];
    value[index].getDeliverySlots = [];
    const getItems = removeDuplicates(
      selectedPackage[0].VendorPackagePrices.map((item) => item.method)
    );
    console.log(getItems);
    if (getItems.includes("delivery")) {
      value[index].delivery = 1;
    } else {
      value[index].delivery = 0;
    }
    if (getItems.includes("pickup")) {
      value[index].pickup = 1;
    } else {
      value[index].pickup = 0;
    }
    setOrderPackagesDetails(value);
  };
  const handleDeliveryChange = (index, event) => {
    const { name, value } = event.target;
    const item = [...orderPackages];
    console.log(value);
    item[index].pickup_delivery = value;

    const selectedPackage = packages.filter(
      (pack) => pack.id === parseInt(item[index].package)
    );
    console.log(selectedPackage);
    let getFrequency;
    if (value == 1) {
      getFrequency = selectedPackage[0].VendorPackagePrices.filter(
        (item) => item.method === "delivery"
      );
    }
    if (value == 2) {
      getFrequency = selectedPackage[0].VendorPackagePrices.filter(
        (item) => item.method === "pickup"
      );
    }
    item[index].getFrequencies = getFrequency;
    // setTimeSlots(selectedPackage[index].VendorPackageSlots);

    setOrderPackagesDetails(item);
  };
  const handleFrequencyChange = async (index, event) => {
    // console.log(event, index);
    const { name, value } = event.target;
    const item = [...orderPackages];
    item[index][name] = value;
    const selectedPackage = packages.filter(
      (pack) => pack.id === parseInt(item[index].package)
    );
    console.log(selectedPackage[0]);
    item[index].getDeliverySlots = selectedPackage[0].VendorPackageSlots;

    setOrderPackagesDetails(item);
  };
  const handleTimeSlotChange = async (index, event) => {
    // console.log(event, index);
    const value = [...orderPackages];
    value[index].timeSlotId = event.target.value;

    setOrderPackagesDetails(value);
  };

  const handlePackageInputChange = async (index, event) => {
    const value = [...orderPackages];
    value[index][event.target.name] = event.target.value;

    setOrderPackagesDetails(value);
  };

  const handlePackageDateChange = async (index, date, dateString) => {
    const value = [...orderPackages];
    value[index][dateString] = date;
    setOrderPackagesDetails(value);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      orderPackages,
    }));
  }, [orderPackages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("save Customer");

      event.stopPropagation();
      setValidated(true);
    } else {
      const response = await dispatch(saveCustomer(formData));
      if (response.message === "postal code not found") {
        setFormData({
          ...formData,
          address: {
            ...formData.address,
            postalError: true,
          },
        });
      } else {
        if (response && response.success) {
          Toast({ message: "Customer added successfully.", type: "success" });
          // navigate("/manage/customers");
        } else {
          Toast({
            message: "Customer did not added there is some problem.",
            type: "error",
          });
        }
      }
    }
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // if (formData.assign_location) {
        const response = await dispatch(
          getVendorPackages(formData.assign_location)
        );
        console.log("helo");
        const data = orderPackages.map((item) => ({
          ...item,
          getDeliverySlots: [],
          getFrequencies: [],
          delivery: 0,
          pickup: 0,
          pickup_delivery: 0,
        }));
        setOrderPackagesDetails(data);
        console.log(response.data);
        setPackages(response.data);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    if (formData.assign_location) {
      fetchPackages();
    }
  }, [formData.assign_location]);
  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkExisting = async () => {
    const response = await dispatch(checkExistingUser(formData));
    if (response.status === false) {
      setFormDisabled(false);
      setNumberCheck(true);
      Toast({
        message:
          "User is not currently a customer. Please enter their details.",
        type: "success",
      });
    } else {
      console.log(response);
      if (response.data) {
        // Toast({
        //   message: "This phone number is already a user",
        //   type: "error",
        // });
        if (response.data.VendorCustomerLink) {
          setModOpen(true);
          return;
        } else {
          setExistedUser(response.data);
          onOpen();
          return;
        }
      }
      setFormDisabled(true);
      setNumberCheck(false);
      setFormData((prevData) => ({
        ...prevData,
        ...response.data,
        address: response.data?.address_1 || "",
        delivery_instruction:
          response.data?.VendorCustomerLink?.delivery_instructions || "",
        package: response.data?.CustomerPackage?.package_id || "",
        start_date: parseISO(response.data?.CustomerPackage?.start_date) || "",
      }));
      Toast({ message: "Number already exist.", type: "success" });
    }
  };

  const handleNewPackage = () => {
    setOrderPackagesDetails([
      ...orderPackages,
      {
        package: "",
        start_date: "",
        end_date: "",
        index: orderPackages.length,
        frequency: "",
        payment: "",
        getFrequencies: [],
        getDeliverySlots: [],
        delivery: 0,
        pickup: 0,
        timeSlotId: "",
        package_name: "",
        pickup_delivery: "",
      },
    ]);
  };

  const handleClose = (id) => {
    const livePackages = orderPackages.filter((pk) => pk.index !== id);
    const newPackages = livePackages.map((pack, i) => {
      return { ...pack, index: i };
    });

    setOrderPackagesDetails(newPackages);
  };

  const handleExistingCustomer = async () => {
    try {
      const response = await dispatch(
        saveExistingCustomer({ phone: formData.phone })
      );
      if (response && response.success) {
        Toast({ message: "Customer added successfully.", type: "success" });
        navigate(`/manage/customers/${response.customer.id}`);
      } else {
        Toast({
          message: "Customer did not added there is some problem.",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCustomer = (onClose) => {
    try {
      const res = dispatch(addCustomerLink({ id: existedUser.id }));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendorLocations = async () => {
    try {
      const response = await dispatch(getVendorLocations());
      console.log("vendorLocation", response.data);
      setVendorLocations(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const { Option } = Select;

  function convertTo12HourFormat(time24) {
    // Split the time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time24.split(":").map(Number);

    // Determine if it's AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Format the time in 12-hour format
    const time12 = `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;

    return time12;
  }
  return (
    <CRow>
      {/* First Model for User exist as well as the existing customer */}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Customer Already Exist
              </ModalHeader>
              <ModalBody>
                <p>
                  This customer is already a user. Whould you like to add them
                  as your customer?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleAddCustomer(onClose)}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* First Model for User exist but on the existing customer */}
      <Modal isOpen={modOpen} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User is already your customer
              </ModalHeader>
              <ModalBody>
                <p>This user is already your customer</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => setModOpen(false)}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CCol xs={8}>
        <CCard className="mb-4">
          <div className="mt-3 ml-3 border-b-2">
            <h3>Add Customer</h3>
            <p>Add a new user as your customer</p>
          </div>
          {/* <CCardHeader>
                        <strong>Add Customer</strong>
                    </CCardHeader> */}
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
              <div className="d-flex">
                {/* <div className="me-2">
                  <h4>+1</h4>
                </div> */}
                <div className="w-100">
                  <PhoneInput
                    country={"ca"}
                    enableSearch={true}
                    value={formData.phone}
                    onChange={(phone) => (formData.phone = phone)}
                    required
                  />
                  {/* <CFormInput
                    type="number"
                    name="phone"
                    placeholder="12345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-auto text-center">
              <CButton
                type="button"
                className="mb-3"
                color="info"
                onClick={() => checkExisting()}
              >
                Continue
              </CButton>
            </div>
            {!numberCheck && (
              <div className="flex flex-col items-center">
                <p className="text-primary fs-4 text-center">
                  This Customer already has a Menuscribe account. Would you like
                  to add them as customer?
                </p>
                <CButton
                  type="button"
                  className="mb-3 px-5 py-3  text-white"
                  color="info"
                  onClick={() => handleExistingCustomer()}
                >
                  Add user as my customer
                </CButton>
              </div>
            )}

            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {/* -------------Names-------- */}
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="First Name">First Name</CFormLabel>
                    <CFormInput
                      name="first_name"
                      placeholder="First name"
                      aria-label="First name"
                      id="validationCustom01"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                      disabled={formDisabled}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="Last Name">Last Name</CFormLabel>
                    <CFormInput
                      name="last_name"
                      placeholder="Last name"
                      aria-label="Last name"
                      id="validationCustom02"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                      disabled={formDisabled}
                    />
                  </CCol>
                </CRow>
              </div>
              {/* -------------Email------- */}
              <div className="mb-3">
                <CCol xs>
                  <CFormLabel htmlFor="Email">Email</CFormLabel>
                  <CFormInput
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    id="validationCustom03"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={formDisabled}
                  />
                </CCol>
              </div>
              {/* ----------Address---------- */}
              {/* <div className="mb-3">
                <CCol xs>
                  <CFormLabel htmlFor="Address">Address (Line 1)</CFormLabel>
                  <CFormInput
                    name="address"
                    placeholder="Address"
                    aria-label="Address"
                    id="validationCustom04"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={formDisabled}
                  />
                </CCol>
              </div> */}
              {/* Delivery Instruction */}
              {/* <div className="mb-3">
                <CCol xs>
                  <CFormLabel htmlFor="delivery_instruction">
                    Delivery Instructions (optional)
                  </CFormLabel>
                  <CFormInput
                    name="delivery_instruction"
                    placeholder="mike.jones@hotmail.com"
                    aria-label="delivery_instruction"
                    id="validationCustom05"
                    value={formData.delivery_instruction}
                    onChange={handleInputChange}
                    required
                    disabled={formDisabled}
                  />
                </CCol>
              </div> */}
              {/*--------- Postal Code ------*/}
              {/* <div className="mb-3">
                <CCol xs>
                  <CFormLabel htmlFor="postal_code">Postal Code</CFormLabel>
                  <CFormInput
                    name="postal_code"
                    placeholder="LSS 2H6"
                    aria-label="postal_code"
                    id="validationCustom06"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    disabled={formDisabled}
                  />
                </CCol>
              </div> */}
              {/*---------------- State & city------- */}
              <div className="mb-3">
                <CCol xs>
                  {/* State */}
                  {/* <div>
                    <CFormLabel htmlFor="city">State</CFormLabel>
                    <CFormSelect
                      name="city"
                      aria-label="Default select example"
                      id="validationCustom07"
                      value={formData.state}
                      onChange={handleStateChange}
                      required
                      disabled={formDisabled}
                    >
                      <option value=""> Select </option>
                      {states &&
                        states.map((item, id) => (
                          <option key={id} value={item}>
                            {item}
                          </option>
                        ))}
                    </CFormSelect>
                  </div> */}

                  {/* City */}
                  {/* <div>
                    <CFormLabel htmlFor="city">City</CFormLabel>
                    <CFormSelect
                      name="city"
                      aria-label="Default select example"
                      id="validationCustom07"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      disabled={formDisabled}
                    >
                      <option value="">Select</option>
                      {citiesData &&
                        citiesData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.city}
                          </option>
                        ))}
                    </CFormSelect>
                  </div> */}
                </CCol>
              </div>
              {/* -------------------Add Packages Section-------------------- */}
              <div className="mb-3">
                <CCard className="mb-4">
                  <CCardHeader className="text-center">
                    <strong>Add Packages</strong>
                  </CCardHeader>
                  <CCardBody>
                    <div className="flex gap-2 max-sm:flex-wrap">
                      <div className="w-[50%]">
                        <label htmlFor="">Address</label>
                        <LoadScript
                          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                          libraries={libraries}
                          className={"flex"}
                          loadingElement={
                            <div className="absolute right-0">Loading...</div>
                          }
                          id="google-maps-script"
                        >
                          <Autocomplete
                            onLoad={(autocomplete) => {
                              setAutocomplete(autocomplete);
                            }}
                            options={{
                              componentRestrictions: { country: "ca" },
                            }}
                            className="lg:w-full  max-sm:w-full"
                            onPlaceChanged={() => {
                              autocomplete?.getPlace() &&
                                handlePlaceSelect(autocomplete.getPlace());
                              google.maps.event.clearInstanceListeners(
                                autocomplete
                              );
                            }}
                          >
                            <CFormInput
                              // className="simple-input"
                              id="F"
                              type="text"
                              name="address"
                              placeholder="Enter your address"
                              className="w-full"
                              // style={{ width: "100%" }}
                              required
                              onChange={handleAddressChange}
                              // value={formData.address.address ? user.address.address : ""}
                            />
                          </Autocomplete>
                        </LoadScript>
                      </div>
                      <div className="w-[25%] max-sm:w-full">
                        <label htmlFor="">Unit Number</label>
                        <CFormInput
                          // className="w-[30%]"
                          // style={{ width: "100%" }}

                          type="text"
                          name="unit_number"
                          placeholder="Enter Unit Number"
                          value={
                            formData.address?.unit_number
                              ? formData.address.unit_number
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                unit_number: e.target.value,
                              },
                            })
                          }
                          // value={user.address.address ? user.address.address : ""}
                        />
                      </div>
                      <div className="w-[25%]">
                        <CCol>
                          <label htmlFor="">Postal Code</label>
                          <Tooltip
                            color="red"
                            title={
                              <div className="">
                                {" "}
                                <CiDeliveryTruck className="text-[20px] bg-yellow-600 rounded-full w-[30px] p-1 h-[30px]" />
                                <p>
                                  The selected package does not deliver to this
                                  customer's postal code area
                                </p>
                              </div>
                            }
                            // trigger="click"
                            open={formData.address.postalError ? true : false}
                          >
                            <CFormInput
                              // className="simple-input"
                              type="text"
                              name="postal"
                              placeholder="Enter your address"
                              required
                              onChange={(e) => {
                                setFormData({
                                  ...formData,

                                  address: {
                                    ...formData.address,
                                    postalError: false,
                                    postal: e.target.value,
                                  },
                                });
                              }}
                              value={formData.address.postal || ""}
                            />{" "}
                          </Tooltip>
                        </CCol>
                      </div>
                    </div>

                    <CCol className="flex gap-2 max-lg:flex-wrap">
                      <div className="w-full">
                        <CFormLabel className="font-20  w-full text-start">
                          City
                        </CFormLabel>
                        <TextAuto
                          disablePortal
                          id="combo-box-demo"
                          options={cities}
                          value={
                            formData.address?.city
                              ? formData.address.city.label
                              : ""
                          }
                          sx={{
                            width: "100%",
                            // display: "inline-block",
                            "& input": {
                              height: 5,
                            },
                          }}
                          onChange={(e, val) =>
                            setFormData({
                              ...formData,
                              address: { ...formData.address, city: val },
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              placeholder="Select City"
                            />
                          )}
                        />
                      </div>

                      <div className="w-full">
                        <CFormLabel className="font-20  w-full text-start">
                          Home or Work
                        </CFormLabel>

                        <TextAuto
                          disablePortal
                          id="combo-box-demo"
                          options={["HOME", "WORK", "OTHER"]}
                          sx={{
                            width: "100%",
                            // display: "inline-block",
                            "& input": {
                              height: 5,
                            },
                          }}
                          onChange={(e, val) =>
                            setFormData({
                              ...formData,
                              address: { ...formData.address, place: val },
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              placeholder="Home or Work"
                            />
                          )}
                        />
                      </div>
                    </CCol>
                    <CCol>
                      <CRow>
                        <CCol></CCol>
                      </CRow>
                    </CCol>
                    <CCol xs className="mt-10">
                      <CFormLabel htmlFor="postal_code">
                        Assign Location
                      </CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        name="assign_location"
                        // disabled={formDisabled}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            assign_location: event.target.value,
                          })
                        }
                        value={formData.assign_location}
                        id="validationCustom08"
                      >
                        <option>Select Location</option>
                        {vendorLocations.length > 0 &&
                          vendorLocations.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.location_name}
                            </option>
                          ))}
                      </CFormSelect>
                    </CCol>
                    {orderPackages.length > 0 &&
                      orderPackages.map((item) => (
                        <div key={item.index} className="my-30x">
                          <CButton
                            className="text-red font-semibold bg-transparent border-none  outline-none hover-text-red"
                            onClick={() => handleClose(item.index)}
                            disabled={orderPackages.length === 1}
                          >
                            X
                          </CButton>
                          <CRow>
                            {/* --------package name-----------*/}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Package name
                              </CFormLabel>
                              <CFormInput
                                aria-label="Default select example"
                                name="package_name"
                                required
                                disabled={formDisabled}
                                id="validationCustom08"
                                onChange={(event) =>
                                  handlePackageInputChange(item.index, event)
                                }
                                value={orderPackages[item.index].package_name}
                              />
                            </CCol>
                            {/* ----Select package------ */}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Assign Package
                              </CFormLabel>
                              <CFormSelect
                                aria-label="Default select example"
                                name="package"
                                required
                                disabled={packages.length > 0 ? false : true}
                                id="validationCustom08"
                                onChange={(event) =>
                                  handlePackageChange(item.index, event)
                                }
                                value={orderPackages[item.index].package}
                              >
                                <option onClick={() => console.log("he")}>
                                  Select Package
                                </option>
                                {packages &&
                                  packages.map((item) => (
                                    <option value={item.id} key={item.id}>
                                      {item.package_name}
                                    </option>
                                  ))}
                              </CFormSelect>
                            </CCol>
                            {/* Delivery*/}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Delivery
                              </CFormLabel>
                              <CFormSelect
                                required
                                aria-label="Default select example"
                                name="pickup_delivery"
                                disabled={
                                  // orderPackages[item.index].pickup == 0 &&
                                  // orderPackages[item.index].delivery == 0
                                  //   ? true
                                  //   : false
                                  formDisabled
                                }
                                id="validationCustom08"
                                onChange={(event) =>
                                  handleDeliveryChange(item.index, event)
                                }
                                value={
                                  orderPackages[item.index].pickup_delivery
                                }
                              >
                                <option value="">Select </option>
                                {orderPackages[item.index].delivery == 1 && (
                                  <option value={1}>Delivery</option>
                                )}
                                {orderPackages[item.index].pickup == 1 && (
                                  <option value={2}>Pickup</option>
                                )}
                              </CFormSelect>
                            </CCol>

                            {/*--------Frequency--------- */}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Frequency
                              </CFormLabel>
                              <CFormSelect
                                aria-label="Default select example"
                                name="frequency"
                                required
                                disabled={
                                  // orderPackages[item.index].getFrequencies
                                  //   .length > 0
                                  //   ? false
                                  //   : true
                                  formDisabled
                                }
                                id="validationCustom08"
                                onChange={(event) =>
                                  handleFrequencyChange(item.index, event)
                                }
                                value={orderPackages[item.index].frequency}
                              >
                                <option>Select Frequency</option>
                                {orderPackages[item.index].getFrequencies &&
                                  orderPackages[item.index].getFrequencies.map(
                                    (item) => (
                                      <option value={item.id} key={item.id}>
                                        {item.frequency}
                                      </option>
                                    )
                                  )}
                              </CFormSelect>
                            </CCol>
                          </CRow>
                          <CRow>
                            {/*--------Time Slots--------- */}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Time Slots
                              </CFormLabel>
                              <div>
                                <CFormSelect
                                  aria-label="Default select example"
                                  name="payment"
                                  required
                                  disabled={
                                    // orderPackages[item.index].getDeliverySlots
                                    //   .length > 0
                                    //   ? false
                                    //   : true
                                    formDisabled
                                  }
                                  id="validationCustom08"
                                  onChange={(event) =>
                                    handleTimeSlotChange(item.index, event)
                                  }
                                  value={orderPackages[item.index].timeSlotId}
                                >
                                  <option value="">Select slot</option>
                                  {orderPackages[item.index].getDeliverySlots
                                    .length > 0 &&
                                    orderPackages[
                                      item.index
                                    ].getDeliverySlots.map((item, index) => (
                                      <option value={item.id} key={item.id}>
                                        {convertTo12HourFormat(item.start_time)}{" "}
                                        to{" "}
                                        {convertTo12HourFormat(item.end_time)}
                                      </option>
                                    ))}
                                </CFormSelect>
                                {/* <DatePicker
                                  selected={orderPackages[item.index].end_date}
                                  onChange={(date) =>
                                    handlePackageDateChange(
                                      item.index,
                                      date,
                                      "end_date"
                                    )
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  className="form-control w-100"
                                  value={orderPackages[item.index].end_date}
                                  disabled={formDisabled}
                                /> */}
                              </div>
                            </CCol>
                            {/* Payment Status */}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Payment Status
                              </CFormLabel>
                              <CFormSelect
                                required
                                aria-label="Default select example"
                                name="payment"
                                disabled={formDisabled}
                                id="validationCustom08"
                                onChange={(event) =>
                                  handlePackageInputChange(item.index, event)
                                }
                                value={orderPackages[item.index].payment}
                              >
                                <option value="">Select</option>
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                              </CFormSelect>
                            </CCol>

                            {/* ------Start Date-------- */}
                            <CCol xs>
                              <CFormLabel htmlFor="postal_code">
                                Package Start
                              </CFormLabel>
                              <div>
                                <DatePicker
                                  required
                                  selected={
                                    orderPackages[item.index].start_date
                                  }
                                  onChange={(date) =>
                                    handlePackageDateChange(
                                      item.index,
                                      date,
                                      "start_date"
                                    )
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  className="form-control w-100"
                                  value={orderPackages[item.index].start_date}
                                  disabled={formDisabled}
                                />
                              </div>
                            </CCol>
                          </CRow>
                        </div>
                      ))}
                    <div className="w-full flex justify-center">
                      <CButton
                        type="button"
                        className="mb-3 mt-3"
                        color="secondary"
                        onClick={(e) => handleNewPackage()}
                        disabled={
                          orderPackages[orderPackages.length - 1].start_date ===
                            "" ||
                          orderPackages[orderPackages.length - 1].package === ""
                        }
                      >
                        add packages
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-auto">
                <CButton
                  type="submit"
                  className="mb-3"
                  color="secondary"
                  // disabled={formDisabled}
                >
                  Save
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddCustomer;
