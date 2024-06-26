import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight, cilMenu } from "@coreui/icons";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addCustomerPackage,
  deleteCustomerAddress,
  filterOrderDates,
  getCustomer,
  getCustomerActivePackages,
  getCustomerAddress,
  getCustomerOrderFromId,
  getCustomerPackages,
  getCustomerWithAddress,
  getOrderCreationDates,
  saveCustomer,
  updateCustomer,
  updateCustomerPackage,
  updateCustomerSubscription,
} from "../../actions/customerReducer/CustomerActions";
import DatePicker from "react-datepicker";
import { getDateFromString, setTimeFormat } from "../../utils/Helper";
import "react-datepicker/dist/react-datepicker.css";
import AddCity from "../../components/app/modals/AddCity";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../components/app/Toast";
import { toast } from "react-toastify";
import {
  getPackageTimeSlots,
  getPackagesWithFrequency,
  sendMessageChangeSlot,
  updatePkgAddress,
  updatePkgSlot,
} from "../../actions/vendorReducers/VendorActions";
import { current } from "@reduxjs/toolkit";
import OrderCreationPopup from "../../components/Popup/OrderCreationPopup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CustomerAddress from "../../components/app/modals/CustomerAddress";
import CustomerAddressEdit from "../../components/app/modals/CustomerAddressEdit";
import Popup from "../../components/Popup/Popup";
const AddPackage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packages, setPackages] = useState();
  const [activePackages, setActivePackages] = useState();
  const [subscription, setSubscription] = useState({
    id: "",
    start_date: "",
    end_date: "",
  });
  // --------Personal Data States-------
  const [personalData, setPersonalData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    vendor_id: 0,
  });

  //-----------form to subscribe to new packages ------------
  const [selectedPackages, setSelectedPackages] = useState({});
  const [packageForm, setPackageForm] = useState({
    package_id: "",
    frequency: "",
    user_package_name: "",
    handling: "",
    payment_status: "",
    delivery_address_id: "",
    vendor_pacakge_price_id: null,
    customer_id: id,
    customer_package_id: "",
  });

  // ---------------form to edit packages -----------------------
  const [selectedUpdatePackages, setSelectedUpdatePackages] = useState({});
  const [currentSlot, setCurrentSlot] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [currentAddress, setCurrentAddress] = useState();
  const [updatePackageForm, setUpdatePackageForm] = useState({
    package_id: "",
    frequency: "",
    user_package_name: "",
    handling: "",
    payment_status: "",
    delivery_address_id: "",
    customer_id: id,
  });
  // --------------Customer Orders----------------------------
  const [orders, setOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [pkgSlots, setPkgSlots] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [sendMessage, setSendMessage] = useState(false);
  //--------------Pop UP functionality--------------------
  // const [popup, setPopup] = useState({
  //   show: false,
  //   orderCount: 0,
  // });
  const [popup, setPopup] = useState({
    show: false,
    dates: [],
    customer_name: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addressOpen, setAddressOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [pkgInfo, setPkgInfo] = useState(null);
  // ----------My Deliveries states --------------
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [customerId, setCustomerId] = useState(id);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [customerAddressEditPopup, setCustomerAddressEditPopup] =
    useState(false);
  // --------Delivary Addres Data States-------
  const fetchUser = async () => {
    try {
      if (id) {
        console.log(id);
        const res = await dispatch(getCustomerWithAddress(id));
        setPersonalData(res.data);
      } else {
        console.log("Id is not found");
      }
    } catch (error) {
      console.log("Error Fetching customer", error);
    }
  };

  const fetchCustomerPackage = async () => {
    try {
      const { data } = await dispatch(getCustomerActivePackages(id));
      // setPackages(data)
      // if(data && data.length>0){
      //     setSelectedPackages(data[0])
      // }
      console.log("da0000", data);
      const sortData = data.sort(
        (a, b) => new Date(b.order_end) - new Date(a.order_end)
      );
      setActivePackages(sortData);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await dispatch(getCustomerOrderFromId(id));

      // Setting the date & Month name according with the base object to show it later
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const finalOrders = [];
      data.forEach((order) => {
        const tempCrr = new Date(order.order_date + "T00:00:00");
        const date = tempCrr.getDate();
        const month = months[tempCrr.getMonth()];
        const finalDate = `${date} ${month}`;
        finalOrders.push({ ...order, dateMonth: finalDate });
      });
      setOrders(finalOrders);

      // Setting the Orders to show
      const fiveOrders = [];
      for (let x = 1; x <= 5; x++) {
        finalOrders[x - 1] && fiveOrders.push(finalOrders[x - 1]);
      }
      setOrdersToShow(fiveOrders);
      setSelectedPage(1);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await dispatch(getPackagesWithFrequency());
      setPackages(data);
      if (data && data.length > 0) {
        setSelectedPackages(data[0]);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const refresh = () => {
    fetchData();
    fetchUser();
    fetchCustomerPackage();
    fetchOrders();
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAddress = (id) => {
    setAddressId(id);
    setShowAddressModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      try {
        const res = await dispatch(updateCustomer(personalData));
        Toast({ message: "User updated successfully", type: "success" });
        // navigate("/manage/customers")
      } catch (error) {
        console.log("Error saving user", error);
      }
    } else {
      console.log("Form.CheckValiity falied");
    }
  };

  const handlePackageChange = (e) => {
    const { value } = e.target;
    const currentPackage = packages.find((item, index) => {
      return item?.id == value;
    });
    if (currentPackage) {
      setSelectedPackages(currentPackage);

      setPackageForm({ ...packageForm, package_id: currentPackage.id });
    }
  };

  const handlePackgeFormInputChange = (event) => {
    const { name, value } = event.target;
    setPackageForm({ ...packageForm, [name]: value });
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      Toast({
        message: "Please Enter the essentials in the form",
        type: "error",
      });
    }
    try {
      const res = await dispatch(addCustomerPackage(packageForm));
      setPackageForm({
        package_id: "",
        frequency: "",
        user_package_name: "",
        handling: "",
        payment_status: "",
        delivery_address_id: "",
        customer_id: id,
      });
      setSelectedPackages({});
      Toast({ message: "Package Subscribed!", type: "success" });
      refresh();
    } catch (error) {
      Toast({ message: error.message, type: "error" });
      console.log("Error saving user", error);
    }
  };

  const handleUpdateUserPackageChange = (e) => {
    const { value } = e.target;
    const currentPackage = personalData.CustomerPackages.find((item, index) => {
      return item?.id == value;
    });
    const currentVendorPackage = packages.find((item, index) => {
      return item?.id == currentPackage.package_id;
    });
    if (currentPackage && currentVendorPackage) {
      setSelectedUpdatePackages({
        ...currentPackage,
        package_name: currentPackage.VendorPackage.package_name,
        VendorPackagePrice: currentVendorPackage.VendorPackagePrice,
        pickup: currentVendorPackage.pickup,
        delivery: currentVendorPackage.delivery,
      });
      console.log("currentFreq", currentPackage);
      setUpdatePackageForm({
        frequency: currentPackage.VendorPackagePrice.frequency,
        user_package_name: currentPackage.user_package_name,
        handling: currentPackage.pickup_delivery,
        payment_status: currentPackage.payment_status,
        delivery_address_id: currentPackage.customer_delivery_address_id,
        customer_id: id,
        package_id: currentPackage.package_id,
        customer_package_id: value,
        package_name: currentVendorPackage.package_name,
      });
    }
  };

  const handleUpdatePackageChange = (e) => {
    const { value } = e.target;
    const currentVendorPackage = packages.find((item, index) => {
      return item?.id == value;
    });
    if (currentVendorPackage) {
      setSelectedUpdatePackages({
        ...currentVendorPackage,
        package_name: currentVendorPackage.package_name,
        VendorPackagePrice: currentVendorPackage.VendorPackagePrice,
        pickup: currentVendorPackage.pickup,
        delivery: currentVendorPackage.delivery,
      });
      setUpdatePackageForm({
        ...updatePackageForm,
        frequency: "",
        handling: "",
        payment_status: "",
        delivery_address_id: "",
        package_id: value,
      });
    }
  };

  const handleUpdatePackgeFormInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatePackageForm({ ...updatePackageForm, [name]: value });
    console.log({ ...updatePackageForm, [name]: value });
  };

  const handleUpdatePackageSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      Toast({
        message: "Please Enter the essentials in the form",
        type: "error",
      });
    }
    try {
      console.log("sending form", updatePackageForm);
      const res = await dispatch(updateCustomerPackage(updatePackageForm));
      setUpdatePackageForm({
        package_id: "",
        frequency: "",
        user_package_name: "",
        handling: "",
        payment_status: "",
        delivery_address_id: "",
        customer_package_id: "",
        customer_id: id,
      });
      setSelectedUpdatePackages({});
      Toast({ message: "Package Updated!", type: "success" });
      refresh();
    } catch (error) {
      Toast({ message: error.message, type: "error" });
      console.log("Error saving user", error);
    }
  };

  const handleUpdateSubscriptionDate = async (pk) => {
    try {
      const reqObj = {
        start_date: subscription.start_date,
        end_date: subscription.end_date,
        package_id: pk.package_id,
        customer_id: id,
        customer_package_id: pk.id,
      };
      const res = await dispatch(getOrderCreationDates(reqObj));
      console.log(res);
      //setPopup({ show: true, orderCount: res.orderDates.length });
      setPopup({
        show: true,
        dates: res.data,
        customer_name: `${personalData.first_name}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupClick = async (str) => {
    if (str === "Confirm") {
      console.log("confrim");
      const res = await dispatch(updateCustomerSubscription(subscription));
      fetchCustomerPackage();
      setSubscription({
        id: "",
        start_date: "",
        end_date: "",
      });
      fetchOrders();
      setPopup({
        show: false,
        dates: [],
        customer_name: "",
      });
    } else {
      setPopup({
        show: false,
        dates: [],
        customer_name: "",
      });
    }
  };
  const handleCustomerAddressEditPopupClick = async (str) => {
    if (str === "yes") {
      setCustomerAddressEditPopup(false);
      setShowUpdateAddressModal(true);
    } else if (str === "no") {
      console.log("no");
      setCustomerAddressEditPopup(false);
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Set",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleDeleteAddress = async (id) => {
    const response = await dispatch(deleteCustomerAddress(id));
    if (response.message === "Cannot delete this address") {
      Toast({ message: "Failed to delete", type: "error" });
      // onOpen();
      return;
    }
    // setUpdateTrigger((prev) => !prev);
    if (response && response.success) {
      Toast({ message: "Item deleted successfully.", type: "success" });
      refresh();
    }
  };
  const handleAddressEdit = (id) => {
    try {
      setCustomerAddressEditPopup(true);
      setAddressId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpiresIn = (date) => {
    const today = new Date();
    const givenDate = new Date(date + "T00:00:00");

    // Calculate the difference in milliseconds
    const differenceMs = givenDate - today;

    // Convert the difference from milliseconds to days
    const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
    // console.log(differenceDays);
  };

  const getValidDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Customer Orders Paginnation functioality
  const numberOfPage = Math.ceil(orders.length / 5);
  const pagesArray = [];
  for (let x = 1; x <= numberOfPage; x++) {
    pagesArray.push(x);
  }
  const handleOrderPage = (str) => {
    if (str === "prev") {
      setSelectedPage(selectedPage - 1);
      const currentPage = selectedPage - 2;
      const fiveOrders = [];
      for (let x = 5 * currentPage + 1; x <= 5 * (currentPage + 1); x++) {
        orders[x - 1] && fiveOrders.push(orders[x - 1]);
        // console.log(x)
      }
      setOrdersToShow(fiveOrders);
      // console.log(fiveOrders)
    } else if (str === "next") {
      setSelectedPage(selectedPage + 1);
      const currentPage = selectedPage;
      const fiveOrders = [];
      for (let x = 5 * currentPage + 1; x <= 5 * (currentPage + 1); x++) {
        orders[x - 1] && fiveOrders.push(orders[x - 1]);
      }
      setOrdersToShow(fiveOrders);
    }
  };
  const fetchCustomerAddresses = async (id) => {
    try {
      const response = await dispatch(getCustomerAddress(id));
      console.log("0000000r-", response.data);
      setAddresses(response.data);
      setAddressOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("upd", updatePackageForm);
  }, [updatePackageForm]);

  const convertTimeFormat = (time) => {
    const parsedTime = new Date(`1970-01-01T${time}`);
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const period = hours < 12 ? "AM" : "PM";

    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes}${period}`;

    return formattedTime;
  };
  const handleClose = (onClose) => {
    // setCurrentSlot({});
    setSelectedSlot(null);
    setSendMessage(false);

    onClose();
  };
  const handleEditTimeSlot = async (pkg) => {
    setCurrentSlot(pkg.VendorPackageSlot);
    setPkgInfo(pkg);
    const pkgSlots = await dispatch(getPackageTimeSlots(pkg.package_id));
    const filterSlots = pkgSlots.data.filter(
      (item) => item.id != pkg.VendorPackageSlot.id
    );
    setPkgSlots(filterSlots);

    onOpenChange();
  };
  const handleSaveSlot = async (slot) => {
    try {
      console.log(slot);
      const changeSlot = await dispatch(
        updatePkgSlot({ id: slot.id, customer_package_id: pkgInfo.id })
      );
      fetchCustomerPackage();
      setCurrentSlot(changeSlot.data);
      // const pkgSlots = await dispatch(
      //   getPackageTimeSlots(changeSlot.data.package_id)
      // );
      // // const filterSlots = pkgSlots.data.filter(
      // //   (item) => item.id != changeSlot.data.VendorPackageSlot.id
      // // );
      // console.log("filterSlots", changeSlot);
      Toast({ message: "Time slot successfully changed", type: "success" });

      // setPkgSlots(pkgSlots);
      setSelectedSlot(null);

      setSendMessage(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeSlots = async (slot) => {
    setSelectedSlot(slot);
  };

  const handleSendMessage = async () => {
    console.log("msg", currentSlot);
    const sendMsg = await dispatch(
      sendMessageChangeSlot({
        name: pkgInfo.UserCustomer.first_name,
        email: pkgInfo.UserCustomer.email,
        vendor_name: pkgInfo.VendorPackage.Vendor.vendor_name,
        VendorPackageSlot: pkgInfo.VendorPackageSlot,
      })
    );
    setSendMessage(false);
  };

  const handleEditAddress = (info) => {
    try {
      setCurrentAddress(info.CustomerDeliveryAddress);
      setPkgInfo(info);
      fetchCustomerAddresses(info.UserCustomer.id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeAddress = (address) => {
    setSelectedAddress(address);
  };
  const handleAddressClose = () => {
    setSelectedAddress(null);

    setAddressOpen(false);
  };
  const handleSaveAddress = async () => {
    try {
      const updateAddress = await dispatch(
        updatePkgAddress({
          id: pkgInfo.id,
          customer_delivery_address_id: selectedAddress.id,
        })
      );
      fetchCustomerPackage();
      setSelectedAddress(null);
      setAddressOpen(false);
    } catch (error) {
      console.log(erro);
    }
  };
  return (
    <CRow className="flex-col-package relative">
      {/*----------------------------- Edit Package Address Model---------------------------- */}
      <>
        <Modal
          backdrop="opaque"
          className="text-black"
          isOpen={addressOpen}
          size={"xl"}
          radius="lg"
          classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#e1e2e3] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] bg-[#94d8ff]",
            footer: "border-t-[1px] bg-[#94d8ff]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Switch Address
              </ModalHeader>
              <ModalBody className="">
                {/* timeSlot handle */}
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex flex-col items-center">
                    <p>Current Address</p>
                    {currentAddress && (
                      <button className="px-3 py-1 rounded-3xl bg-orange-400 text-white">
                        {currentAddress.address}
                        {", "}
                        {currentAddress.CitiesAll?.city}{" "}
                        {currentAddress.CitiesAll?.state}
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Addresses</p>
                    <div className="flex gap-2 flex-wrap justify-center">
                      {addresses.map((item) => (
                        <button
                          className={`${
                            selectedAddress?.id == item.id
                              ? "bg-orange-400"
                              : "bg-blue-500"
                          } ${
                            currentAddress?.id == item.id ? "hidden" : ""
                          } px-3 py-1 rounded-3xl bg-blue-500 text-white`}
                          onClick={() => handleChangeAddress(item)}
                        >
                          {item.address}
                          {", "}
                          {item.CitiesAll?.city} {item.CitiesAll?.state}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedAddress && (
                  <>
                    <div>
                      A message will be sent to the user letting them know that
                      their timeslot is being switched. You can add customer
                      message below.
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p>Dear {pkgInfo.UserCustomer.first_name},</p>
                      <p className="flex flex-col">
                        {pkgInfo.VendorPackage.Vendor.vendor_name} has switched
                        your address to a new address. Your meal delivery will
                        now be delivered to the following address:
                        <span className="font-semibold">
                          {selectedAddress.address}
                          {", "}
                          {selectedAddress.CitiesAll?.city}{" "}
                          {selectedAddress.CitiesAll?.state}
                        </span>
                      </p>
                      {selectedAddress.delivery_instrucitons && (
                        <p>
                          Delivery Instructions:{" "}
                          {selectedAddress.delivery_instrucitons}
                        </p>
                      )}

                      <p className="flex flex-col">
                        {" "}
                        <span>
                          Please contact the vendor if you have any questions.
                        </span>
                      </p>

                      <button className="bg-[#1674f0] px-4 py-2 text-white rounded">
                        My Package
                      </button>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter className="w-full">
                <div>
                  Press "Send Message" to send the message to the customer
                </div>
                {selectedAddress ? (
                  <>
                    <Button
                      color="foreground"
                      variant="light"
                      className={"bg-white"}
                      onPress={() => handleAddressClose()}
                    >
                      Close
                    </Button>
                    <Button
                      className="bg-[#1674f0] px-5 text-white shadow-lg shadow-indigo-500/20"
                      onPress={() => {
                        handleSaveAddress();
                      }}
                    >
                      Send Message
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="bg-[#1674f0] px-5 text-white shadow-lg shadow-indigo-500/20"
                      onPress={() => {
                        setAddressOpen(false);
                        setSelectedAddress(null);
                      }}
                    >
                      Close
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
      {/*----------------------------- Edit Package Delivery SLot Model---------------------------- */}
      <>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="text-black"
          size={"xl"}
          radius="lg"
          classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#e1e2e3] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] bg-[#94d8ff]",
            footer: "border-t-[1px] bg-[#94d8ff]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Switch Timeslot
                </ModalHeader>
                <ModalBody className="">
                  {/* timeSlot handle */}
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col items-center">
                      <p>Current Timeslot</p>
                      {currentSlot && (
                        <button className="px-3 py-1 rounded-3xl bg-orange-400 text-white">
                          {currentSlot.session} (
                          {convertTimeFormat(currentSlot.start_time)}-{" "}
                          {convertTimeFormat(currentSlot.end_time)})
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <p>Timeslot</p>
                      <div className="flex gap-2">
                        {pkgSlots.map((item) => (
                          <button
                            className={`px-3 py-1 rounded-3xl ${
                              selectedSlot?.id == item.id
                                ? "bg-orange-400"
                                : "bg-blue-500"
                            } ${
                              currentSlot.id == item.id ? "hidden" : ""
                            }  text-white`}
                            onClick={() => handleChangeSlots(item)}
                          >
                            {item.session} ({convertTimeFormat(item.start_time)}
                            - {convertTimeFormat(item.end_time)})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {selectedSlot && (
                    <>
                      <div>
                        A message will be sent to the user letting them know
                        that their timeslot is being switched. You can add
                        customer message below.
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p>Dear {pkgInfo?.UserCustomer?.first_name},</p>
                        <p>
                          {pkgInfo?.VendorPackage.Vendor.vendor_name} is
                          notifying you that your order's timeslot has changed.
                        </p>
                        <p className="flex flex-col">
                          {" "}
                          <span className="font-semibold">
                            Your timeslot is now{" "}
                            {convertTimeFormat(selectedSlot?.start_time)}
                            {"-"}
                            {convertTimeFormat(selectedSlot?.end_time)}
                          </span>{" "}
                          <span>
                            Please contact the vendor if you have any questions.
                          </span>
                        </p>

                        <button className="bg-[#1674f0] px-4 py-2 text-white rounded">
                          Renew Package
                        </button>
                      </div>
                    </>
                  )}
                </ModalBody>
                <ModalFooter className="w-full">
                  <div>
                    NOTE: To reduce customer spam, you can only send 1
                    notifications total
                  </div>
                  {selectedSlot ? (
                    <>
                      <Button
                        color="foreground"
                        variant="light"
                        className={"bg-white"}
                        onPress={() => handleClose(onClose)}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-[#1674f0] px-5 text-white shadow-lg shadow-indigo-500/20"
                        onPress={() => {
                          handleSaveSlot(selectedSlot);
                          onClose();
                        }}
                      >
                        Send Message
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="bg-[#1674f0] px-5 text-white shadow-lg shadow-indigo-500/20"
                        onPress={() => {
                          onClose();
                        }}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>

      <CCol>
        <CCard>
          <CCardBody>
            <CForm onSubmit={handleUserSubmit}>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm"> FIRST NAME </CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="first_name"
                    value={personalData.first_name}
                    onChange={handleInputChange}
                    required
                    // disabled={packageDeactivated}
                  />
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> LAST NAME </CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="last_name"
                    value={personalData.last_name}
                    onChange={handleInputChange}
                    required
                    // disabled={packageDeactivated}
                  />
                </div>
              </div>
              <div className="">
                <CFormLabel className="text-sm"> Phone (required) </CFormLabel>
                {/* <CFormInput
                  className="simple-input"
                  type="text"
                  name="phone"
                  value={personalData.phone}
                  onChange={handleInputChange}
                  required
                  // disabled={packageDeactivated}
                /> */}
                <PhoneInput
                  country={"ca"}
                  enableSearch={true}
                  style={{ width: "300px", height: "" }}
                  value={personalData.phone}
                  onChange={(phone) =>
                    setPersonalData({ ...personalData, phone: phone })
                  }
                  required
                />
              </div>
              <div className="">
                <CFormLabel className="text-sm"> EMAIL </CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="email"
                  value={personalData.email}
                  onChange={handleInputChange}
                  required
                  // disabled={packageDeactivated}
                />
              </div>
              <div className="flex jusfity-center my-10x">
                <CButton type="submit"> SAVE </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="my-20x">
          <CCardBody>
            <CForm>
              <div className="">
                <CFormLabel className="text-sm"> Delivery Address </CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="delivery_address"
                  value={"200 Main Street"}
                  // value={formData.package_name}
                  // onChange={handleInputChange}
                  required
                  // disabled={packageDeactivated}
                />
              </div>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm"> POSTAL CODE </CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="postal_code"
                    value={"L5S 256"}
                    // value={formData.package_name}
                    // onChange={handleInputChange}
                    required
                    // disabled={packageDeactivated}
                  />
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> CITY </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="city"
                    required
                    // disabled={packageDeactivated}
                  >
                    <option>Select</option>
                    <option value="london">London</option>
                    <option value="italy">Italy</option>
                    <option value="australia">Australia</option>
                  </CFormSelect>
                </div>
              </div>

              <div className="">
                <CFormLabel className="text-sm">
                  Delivary Instruction (optional)
                </CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="first_name"
                  value={"Leave at front door"}
                  // value={formData.package_name}
                  // onChange={handleInputChange}
                  // disabled={packageDeactivated}
                />
              </div>
              <div className="flex jusfity-center my-10x">
                <CButton> SAVE </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>

        {/* -----------Edit Packages---------------- */}
        <CCard>
          <CCardBody>
            <CForm onSubmit={handleUpdatePackageSubmit}>
              <h6 className="text-center font-bold"> EDIT PACKAGES</h6>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm">
                    CUSTOMER'S PACKAGES
                  </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="package"
                    required
                    // disabled={packageDeactivated}

                    onChange={handleUpdateUserPackageChange}
                    value={updatePackageForm.customer_package_id}
                  >
                    <option value={""}>Please Select a Package</option>
                    {personalData.CustomerPackages
                      ? personalData.CustomerPackages.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.user_package_name ?? ""}
                          </option>
                        ))
                      : null}
                  </CFormSelect>
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> PACKAGE NAME </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="package_name"
                    required
                    // disabled={
                    //     !selectedPackages.VendorPackageFrequencies
                    //     ||
                    //     selectedPackages.VendorPackageFrequencies.length == 0
                    //          }
                    onChange={handleUpdatePackageChange}
                    value={updatePackageForm.package_id}
                  >
                    <option value={""}></option>
                    {packages
                      ? packages.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.package_name}
                          </option>
                        ))
                      : null}
                  </CFormSelect>
                </div>
              </div>
              <div className="">
                <CFormLabel className="text-sm">
                  {" "}
                  User Package Name (give this order a custome name){" "}
                </CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="user_package_name"
                  value={updatePackageForm.user_package_name}
                  // value={formData.package_name}
                  onChange={handleUpdatePackgeFormInputChange}
                  required
                  // disabled={packageDeactivated}
                />
              </div>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm"> Handling </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="handling"
                    required
                    // disabled={!(selectedPackages.delivery || selectedPackages.pickup)}
                    onChange={handleUpdatePackgeFormInputChange}
                    value={updatePackageForm.handling}
                  >
                    <option value={""}>Please Select a Handler</option>
                    {selectedUpdatePackages?.delivery ? (
                      <option value="2">Delivery</option>
                    ) : null}
                    {selectedUpdatePackages?.pickup ? (
                      <option value="1">Pickup</option>
                    ) : null}
                  </CFormSelect>
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> Payment Status </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="payment_status"
                    required
                    // disabled={packageDeactivated}
                    onChange={handleUpdatePackgeFormInputChange}
                    value={updatePackageForm.payment_status}
                  >
                    <option value={""}>Please Select a Payment Status</option>
                    <option value="1">Paid</option>
                    <option value="0">UnPaid</option>
                  </CFormSelect>
                </div>
              </div>
              <div className="">
                <CFormLabel className="text-sm"> Delivery Address </CFormLabel>
                <CFormSelect
                  className="simple-input"
                  name="delivery_address_id"
                  required
                  onChange={handleUpdatePackgeFormInputChange}
                  value={updatePackageForm.delivery_address_id}
                >
                  <option value={""}></option>
                  {personalData.CustomerDeliveryAddresses
                    ? personalData.CustomerDeliveryAddresses.map(
                        (item, index) => (
                          <option key={index} value={item.id}>
                            {item.address}
                          </option>
                        )
                      )
                    : null}
                </CFormSelect>
              </div>
              <div className="">
                <CFormLabel className="text-sm"> FREQUENCY </CFormLabel>
                <CFormSelect
                  className="simple-input"
                  name="frequency"
                  required
                  // disabled={
                  //     !selectedPackages.VendorPackageFrequencies
                  //     ||
                  //     selectedPackages.VendorPackageFrequencies.length == 0
                  //          }
                  onChange={handleUpdatePackgeFormInputChange}
                  value={updatePackageForm.frequency}
                >
                  <option value={""}>Please Select a Frequency</option>
                  {selectedUpdatePackages?.VendorPackagePrice
                    ? selectedUpdatePackages.VendorPackagePrice.map(
                        (item, index) => (
                          <option key={index} value={item.frequency}>
                            {item.frequency}
                          </option>
                        )
                      )
                    : null}
                </CFormSelect>
              </div>
              <div className="flex jusfity-center my-10x">
                <CButton type="submit"> SAVE </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol>
        {/* -----------Active Packages---------------- */}
        <CCard>
          <CCardBody>
            <h6 className="text-center font-bold"> ACTIVE PACKAGES</h6>

            {activePackages &&
              activePackages.map((pk) => (
                <div key={pk.id} className="my-20x">
                  <div className="flex">
                    <div className="col">
                      <p className="m-0">
                        <strong> {pk.VendorPackage.package_name}</strong>
                        <span>
                          {" "}
                          (${pk.VendorPackagePrice?.cost}{" "}
                          {pk.VendorPackagePrice?.frequency})
                        </span>
                      </p>
                      <p className="m-0">
                        Expires on{" "}
                        {pk.CustomerSubscriptions.length === 1
                          ? getValidDate(pk.order_end)
                          : "N/A"}
                        <span className="text-red">
                          {" "}
                          {pk.CustomerSubscriptions.length === 1 &&
                          getExpiresIn(pk.order_end) > 0
                            ? `(Expiring in ${getExpiresIn(pk.order_end)} days)`
                            : `(Expired ${Math.abs(
                                getExpiresIn(pk.order_end)
                              )} days ago)`}
                        </span>
                      </p>
                      <p className="text-gray m-0">
                        Started on{" "}
                        {pk.CustomerSubscriptions.length === 1
                          ? getValidDate(pk.order_start)
                          : "N/A"}
                      </p>
                      {/*========== Edit timeslot======= */}
                      <p className="flex gap-3 items-center">
                        {pk.VendorPackageSlot ? (
                          <span>
                            {pk.VendorPackageSlot?.session &&
                              pk.VendorPackageSlot.session}{" "}
                            (
                            {convertTimeFormat(
                              pk.VendorPackageSlot?.start_time
                            )}
                            {"-"}
                            {convertTimeFormat(pk.VendorPackageSlot?.end_time)})
                          </span>
                        ) : (
                          <>N/A</>
                        )}
                        <button
                          onClick={() => handleEditTimeSlot(pk)}
                          className="p-2 px-3 text-white rounded-3xl bg-blue-500"
                        >
                          Edit
                        </button>
                      </p>

                      {/*========== Edit Address======= */}
                      <p className="flex gap-3 items-center">
                        {pk.CustomerDeliveryAddress ? (
                          <span>
                            {pk.CustomerDeliveryAddress?.address &&
                              pk.CustomerDeliveryAddress?.address}
                            {", "}
                            {pk.CustomerDeliveryAddress?.CitiesAll?.city}{" "}
                            {pk.CustomerDeliveryAddress?.CitiesAll?.state}
                          </span>
                        ) : (
                          <>N/A</>
                        )}
                        <button
                          onClick={() => handleEditAddress(pk)}
                          className="p-2 px-3 text-white rounded-3xl bg-blue-500"
                        >
                          Edit
                        </button>
                      </p>
                    </div>
                    {/* ----Edit Button---- */}
                    {pk.CustomerSubscriptions.length === 1 && (
                      <div>
                        <button
                          className=" border-none outline-none bg-transparent text-blue cursor-pointer"
                          onClick={() =>
                            setSubscription({
                              id: pk.CustomerSubscriptions[0].id,
                              start_date:
                                pk.CustomerSubscriptions[0].start_date,
                              end_date: pk.CustomerSubscriptions[0].end_date,
                            })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                  {/* -------Date Pickers------------- */}
                  {subscription.id === pk.CustomerSubscriptions[0]?.id && (
                    <div className="flex gap-10x">
                      <DatePicker
                        selected={
                          new Date(subscription.start_date + "T00:00:00")
                        }
                        onChange={(date) =>
                          setSubscription({
                            ...subscription,
                            start_date: getDateFromString(date),
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control w-100 mt-2"
                      />
                      <DatePicker
                        selected={new Date(subscription.end_date + "T00:00:00")}
                        onChange={(date) =>
                          // console.log(date)
                          setSubscription({
                            ...subscription,
                            end_date: getDateFromString(date),
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control w-100 mt-2"
                      />

                      <CButton onClick={() => handleUpdateSubscriptionDate(pk)}>
                        Create
                      </CButton>
                    </div>
                  )}
                </div>
              ))}
          </CCardBody>
        </CCard>

        {/* -----------Expired Packages---------------- */}
        <CCard className="my-20x">
          <CCardBody>
            <h6 className="text-center font-bold"> EXPIRED PACKAGES</h6>
            <div className="flex my-20x">
              <div className="col text-gray">
                <p className="m-0 ">
                  <strong> Red Packages</strong>
                  <span> ($200/week)</span>
                </p>
                <p className="m-0">Expired: 24-10-23 (expiring in 5 days)</p>
                <p className="text-gray m-0">Started on 24-10-2022</p>
              </div>
              {/* ----Edit Button---- */}
              <div>
                <button className=" border-none outline-none bg-transparent text-blue cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex my-20x">
              <div className="col text-gray">
                <p className="m-0 ">
                  <strong> Red Packages</strong>
                  <span> ($200/week)</span>
                </p>
                <p className="m-0">Expired: 24-10-23 (expiring in 5 days)</p>
                <p className="text-gray m-0">Started on 24-10-2022</p>
              </div>
              {/* ----Edit Button---- */}
              <div>
                <button className=" border-none outline-none bg-transparent text-blue cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* -----------Customer Orders---------------- */}
        <CCard className="my-20x">
          <CCardBody>
            <h6 className="text-center font-bold"> Customer Orders</h6>
            <table className="table striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Package Name</th>
                  <th>Status</th>
                  <th>Delivery/Pickup</th>
                </tr>
              </thead>
              <tbody>
                {ordersToShow.map((order) => (
                  <tr key={order.id}>
                    <td>{order.dateMonth}</td>
                    <td>{order.VendorPackage.package_name}</td>
                    <td>Pending</td>
                    <td>Delivery</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* --------Pagination-------------- */}
            <div>
              <button
                className="border-none"
                onClick={() => handleOrderPage("prev")}
                disabled={selectedPage === 1}
              >
                <CIcon icon={cilCaretLeft} size="lg" />
              </button>
              {pagesArray.map((num) => (
                <span key={num}> {num} </span>
              ))}
              <button
                className="border-none"
                onClick={() => handleOrderPage("next")}
                disabled={numberOfPage === 0 || selectedPage === numberOfPage}
              >
                <CIcon icon={cilCaretRight} size="lg" />
              </button>
            </div>
          </CCardBody>
        </CCard>

        {/* -----------Delivery address---------------- */}
        <CCard className="my-20x">
          <CCardBody>
            <div className="d-flex justify-content-center border-2x-graish">
              <div className="col-10 bg-white rounded py-20x">
                <h3 className="text-center">My Delivery Address</h3>

                <p className="text-center">Add your delivery addresses below</p>
                {personalData.CustomerDeliveryAddresses &&
                  personalData.CustomerDeliveryAddresses.map((address) => (
                    <CRow key={address.id}>
                      <div className="d-flex items-center border-bottom">
                        <CButton
                          color=""
                          className="font-medium text-red"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          X
                        </CButton>
                        <p className="m-0">
                          {`${address.address}, 
                              ${address.CitiesAll && address.CitiesAll.city}, 
                              ${address.CitiesAll && address.CitiesAll.state}, 
                              ${address.postal}
                              `}
                        </p>
                        <button
                          color="info"
                          className="border-none outline-none text-blue bg-transparent mx-5x"
                          onClick={() => handleAddressEdit(address)}
                        >
                          Edit
                        </button>
                      </div>
                    </CRow>
                  ))}
                <div className="d-flex justify-content-center my-1">
                  <CButton
                    color="info"
                    className="mx-1 text-white rounded-0 btn-sm"
                    onClick={() => handleAddress(0)}
                  >
                    Add Address
                  </CButton>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* -----------Add Packages---------------- */}
        <CCard className="my-20x">
          <CCardBody>
            <CForm onSubmit={handlePackageSubmit}>
              <h6 className="text-center font-bold"> ADD PACKAGES</h6>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm"> PACKAGE NAME </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="package"
                    required
                    // disabled={packageDeactivated}

                    onChange={handlePackageChange}
                    value={packageForm.package_id}
                  >
                    <option value={""}>Please Select a Package</option>
                    {packages
                      ? packages.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.package_name}
                          </option>
                        ))
                      : null}
                  </CFormSelect>
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> FREQUENCY </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="vendor_package_price_id"
                    required
                    // disabled={
                    //     !selectedPackages.VendorPackageFrequencies
                    //     ||
                    //     selectedPackages.VendorPackageFrequencies.length == 0
                    //          }
                    onChange={handlePackgeFormInputChange}
                    value={packageForm.vendor_package_price_id}
                  >
                    <option value={""}>Please Select a Frequency</option>
                    {selectedPackages?.VendorPackagePrice
                      ? selectedPackages.VendorPackagePrice.map(
                          (item, index) => (
                            <option
                              key={index}
                              value={item.vendor_package_price_id}
                            >
                              {item.frequency}
                            </option>
                          )
                        )
                      : null}
                  </CFormSelect>
                </div>
              </div>
              <div className="">
                <CFormLabel className="text-sm">
                  User Package Name (give this order a custome name)
                </CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="user_package_name"
                  value={packageForm.user_package_name}
                  // value={formData.package_name}
                  onChange={handlePackgeFormInputChange}
                  required
                  // disabled={packageDeactivated}
                />
              </div>
              <div className="flex gap-10x">
                <div className="w-50">
                  <CFormLabel className="text-sm"> Handling </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="handling"
                    required
                    // disabled={!(selectedPackages.delivery || selectedPackages.pickup)}
                    onChange={handlePackgeFormInputChange}
                    value={packageForm.handling}
                  >
                    <option value={""}>Please Select a Handler</option>
                    {selectedPackages?.delivery ? (
                      <option value="2">Delivery</option>
                    ) : null}
                    {selectedPackages?.pickup ? (
                      <option value="1">Pickup</option>
                    ) : null}
                  </CFormSelect>
                </div>
                <div className="w-50">
                  <CFormLabel className="text-sm"> Payment Status </CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="payment_status"
                    required
                    // disabled={packageDeactivated}
                    onChange={handlePackgeFormInputChange}
                    value={packageForm.payment_status}
                  >
                    <option value={""}>Please Select a Payment Status</option>
                    <option value="1">Paid</option>
                    <option value="0">UnPaid</option>
                  </CFormSelect>
                </div>
              </div>
              <div className="">
                <CFormLabel className="text-sm"> Delivery Address </CFormLabel>
                <CFormSelect
                  className="simple-input"
                  name="delivery_address_id"
                  required
                  // disabled={
                  //     !personalData.CustomerDeliveryAddresses
                  //     ||
                  //     personalData.CustomerDeliveryAddresses.length === 0
                  //     }
                  onChange={handlePackgeFormInputChange}
                  value={packageForm.delivery_address_id}
                >
                  <option value={""}></option>
                  {personalData.CustomerDeliveryAddresses
                    ? personalData.CustomerDeliveryAddresses.map(
                        (item, index) => (
                          <option key={index} value={item.id}>
                            {item.address}
                          </option>
                        )
                      )
                    : null}
                </CFormSelect>
              </div>
              <div className="flex jusfity-center my-10x">
                <CButton type="submit"> SAVE </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CustomerAddress
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
        addressId={addressId}
        customerId={customerId}
        setUpdateTrigger={setUpdateTrigger}
      />
      <CustomerAddressEdit
        showAddressModal={showUpdateAddressModal}
        setShowAddressModal={setShowUpdateAddressModal}
        addressId={addressId}
        setAddressId={setAddressId}
        customerId={customerId}
        setUpdateTrigger={setUpdateTrigger}
        popup={customerAddressEditPopup}
        setPopup={setCustomerAddressEditPopup}
      />
      {customerAddressEditPopup && (
        <Popup handlePopupClick={handleCustomerAddressEditPopupClick} />
      )}

      {/* Creating Order POPUP */}
      {popup.show && (
        <OrderCreationPopup
          dates={popup.dates}
          customer_name={popup.customer_name}
          handlePopupClick={handlePopupClick}
        />
      )}
    </CRow>
    // <h1> Customer edit page</h1>
  );
};

export default AddPackage;
