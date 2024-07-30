import { CButton, CRow, CTabContent, CTabPane } from "@coreui/react";
import { Table, Space, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import {
  getCustomerPackages,
  deleteCustomerAddress,
  getCustomerAddress,
  updateCustomerPackageFromCustomer,
  getCustomerActiveSubscriptions,
} from "../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
import { customerLogout } from "../../actions/authReducer/AuthActions";
import { formatTime, getCurrentWeekDays } from "../../utils/Helper";
import CancelConfirm from "../../components/app/modals/CancelConfirm";
import CustomerAddress from "../../components/app/modals/CustomerAddress";
import { Toast } from "../../components/app/Toast";
import { CustomerDashboardFooter } from "../../components/DashboardCustomerFooter";
import { CustomerDashboardHeader } from "../../components/CustomerDashboardHeader";
import { getDefaultItems } from "../../actions/api/Vendor";
import CustomerPackage from "../../components/CustomerDashboard/CustomerPackage";
import Popup from "../../components/Popup/Popup";
import CustomerAddressEdit from "../../components/app/modals/CustomerAddressEdit";
import {
  getCustomerPackageRequestOne,
  getCustomerPackageRequests,
} from "../../actions/vendorReducers/VendorActions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const DashboardCustomer = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [customerPackages, setCustomerPackages] = useState();
  const [daysData, setDaysData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorData = JSON.parse(localStorage.getItem("menuScribe"));
  const [vendorSetting, setVendorSetting] = useState();
  const [vendor, setVendor] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [address, setAddress] = useState({
    package_id: "",
    current_address_id: 0,
  });
  const [popup, setPopup] = useState(false);
  const [subscriptions, setSubscriptions] = useState();
  const [packageRequestInfo, setPackageRequestInfo] = useState([]);
  const [delErrorData, setDelErrorData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModel, setOpenModel] = useState(false);

  const handleAddressEdit = (id) => {
    try {
      setPopup(true);
      setAddressId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerRequest();
  }, []);

  const handleMenuButton = () => {
    navigate("/menu");
  };
  const handleCancelButton = (id) => {
    setCancelId(id);
    setShowConfirmModal(true);
  };
  const handleAddressButton = (address) => {
    var googleMapsUrl =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);
    window.open(googleMapsUrl, "_blank");
  };

  const fetchData = async () => {
    try {
      const [userResponse] = await Promise.all([
        dispatch(getCustomerPackages(vendorData.id)),
        // dispatch(getCustomerAddress(vendorData.id)),
      ]);
      getAllDefaultItems(userResponse.data.results);
      setCustomerPackages(userResponse.data.results);
      setVendorSetting(userResponse.data.vendorSetting);
      setVendor(userResponse.data.vendor);
      setCustomerAddresses(userResponse.data.CustomerAddress);
      setCustomerId(vendorData.id);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, vendorData.id, updateTrigger, address]);
  const getAllDefaultItems = async (data) => {
    const tempDays = [];
    for (let i = 0; i < data.length; i++) {
      const res = await getDefaultItems(data[i].package_id);
      tempDays.push({ id: data[i].package_id, data: res.data.data });
    }
    setDaysData(tempDays);
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
  const convertDateFormate = (date) => {
    const newDate = new Date(date);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
  };

  const handleAddPackage = () => {
    navigate("/add-package");
  };

  const handleAddress = (id) => {
    setAddressId(id);
    setShowAddressModal(true);
  };

  const handleItemsDisplay = (itemlist, days, day) => {
    return days?.find((item) => item.id === itemlist[0]?.package_id)?.data;
  };

  const PackagesItemJSX = (item) => {
    let dataToShow = [];
    // for (let i = 0; i < 7; i++) {
    //   const d = new Date();
    //   let current_date = d.setDate(d.getDate() + i);
    //   let day = new Date(current_date).toLocaleDateString("en", {
    //     weekday: "short",
    //   });
    //   if (item.VendorPackage[day.toLocaleLowerCase()] === 1) {
    //     const dayData = {
    //       date: new Date(current_date),
    //       listItems: handleItemsDisplay(item.VendorPackage.VendorPackageDefaultItems, daysData, day),
    //     };
    //     dataToShow.push(dayData);
    //   }
    // }
    if (daysData) {
      return handleItemsDisplay(
        item?.VendorPackage?.VendorPackageDefaultItems,
        daysData
      );
    } else {
      return dataToShow;
    }
  };

  const handleAddressUpdate = async () => {
    try {
      const res = await dispatch(
        updateCustomerPackageFromCustomer({
          id: address.customer_package_id,
          customer_delivery_address_id: address.current_address_id,
        })
      );
      if (
        res.message ===
        "Sorry, This package don't deliver to the selected address"
      ) {
        setOpenModel(true);
        Toast({ message: res.message, type: "error" });
        return;
      }
      setAddress({ package_id: "", current_address_id: "" });
    } catch (error) {
      console.log("Error from dashboard", error);
    }
  };

  // console.log(customerPackages);
  // console.log(address);

  const handlePopupClick = async (str) => {
    if (str === "yes") {
      setPopup(false);
      setShowUpdateAddressModal(true);
    } else if (str === "no") {
      console.log("no");
      setPopup(false);
    }
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      date
    ); // Get month abbreviation
    return `${day}-${month}`;
  }

  const columns = [
    {
      title: "Creation Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Subscription Period",
      dataIndex: "subscriptionPeriod",
      render: (_, record) => (
        <Space size="middle">
          <Row className="flex flex-col">
            <p>{formatDate(record.start_date)}</p>
            <p>{formatDate(record.end_date)}</p>
            <h5>{record.CustomerOrders.length} Meals</h5>
          </Row>
        </Space>
      ),
    },
    {
      title: "Package Name",
      dataIndex: "user_package_name",
      key: "user_package_name",
      render: (_, recode) => (
        <p>{recode.CustomerPackage.VendorPackage.package_name}</p>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      render: (_, record) => (
        <Space size="middle">
          <Row>
            <span
              style={{
                color: record.payment_date ? "black" : "black",
                backgroundColor: record.payment_date
                  ? "lightgreen"
                  : "lightcoral",
                borderColor: record.payment_date ? "green" : "red",
                borderWidth: 1,
                borderStyle: "solid",
                padding: "1px 8px",
                borderRadius: 4,
              }}
            >
              {record.payment_date ? "PAID" : "UNPAID"}
            </span>
            <span>
              {record.payment_date
                ? moment(record.payment_date).format("DD-MM-YYYY")
                : ""}
            </span>
          </Row>
        </Space>
      ),
    },
    // {
    //   title: "Meals added",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   render: (_, record) => <p>{record.CustomerOrders.length}</p>,
    // },
  ];
  const fetchCustomerRequest = async () => {
    try {
      const res = await dispatch(getCustomerPackageRequestOne());
      setPackageRequestInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCustomerActiveSubscriptions());
        setSubscriptions(response.sub);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  function convertTimeTo12HourFormat(timeString) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Determine whether it's AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to the 12-hour format
    const twelveHourFormat = hours % 12 || 12;

    // Pad minutes with leading zeros if necessary
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted time string
    return `${twelveHourFormat}:${paddedMinutes}${period}`;
  }

  function formatDate(inputDate) {
    const parts = inputDate.split("-"); // Split the input date string by '-'
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Construct the formatted date string in 'dd-mm-yyyy' format
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  return (
    <main className="min-h-screen flex flex-col justify-between relative">
      <Modal isOpen={openModel}>
        <ModalContent>
          {openModel && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Address Issue
              </ModalHeader>
              <ModalBody>
                <p>Sorry, This package don't deliver to the selected address</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setOpenModel(false)}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Address Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  This address is currently being used on the following package:
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
                  this address from your profile.
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

      <div className="text-gray-700 container">
        <div className="">
          {/* <CustomerDashboardHeader
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          /> */}
          <CTabContent>
            {/* ---------Packages table---------------- */}
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab-pane"
              visible={activeKey === 1}
            >
              <div className="customer-dashboard-body-divider my-20x">
                {/* <CRow>
                  <CCol className="mt-1"></CCol>
                </CRow> */}
                <CRow className="left ">
                  {/* < className=""> */}
                  {customerPackages &&
                    customerPackages.map(
                      (item) =>
                        item.VendorPackage && (
                          <CustomerPackage
                            key={item.id}
                            item={item}
                            vendor={vendor}
                            address={address}
                            setAddress={setAddress}
                            customerAddresses={customerAddresses}
                            handleAddressUpdate={handleAddressUpdate}
                            PackagesItemJSX={PackagesItemJSX}
                          />
                        )
                    )}
                  {/* </CCol> */}
                </CRow>

                <div className="right">
                  <CRow className="d-flex justify-content-center border-2x-graish">
                    <div className="col-10 bg-white rounded py-20x">
                      <h3 className="text-center"> My Delivery Address</h3>

                      <p className="text-center">
                        Add your delivery addresses below
                      </p>
                      {customerAddresses &&
                        customerAddresses.map((address) => (
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
                  </CRow>

                  <CRow className="d-flex justify-content-center border-2x-graish mt-3">
                    <div className="col-10 flex flex-col gap-3 bg-white rounded py-20x">
                      <h3 className="text-center">Package Requests</h3>
                      {packageRequestInfo.length > 0 &&
                        packageRequestInfo.map((requestData) => (
                          <div
                            key={requestData.id}
                            className="flex flex-col gap-3 border-1 p-1"
                          >
                            <span className="font-semibold">
                              {requestData.VendorPackage?.Vendor?.vendor_name}-{" "}
                              {requestData.VendorPackage.package_name}
                            </span>
                            {requestData.VendorLocation &&
                              requestData.VendorLocation.location_name && (
                                <div className=" flex flex-col">
                                  <span className="font-semibold ">
                                    Location
                                  </span>
                                  <span className="">
                                    {requestData.VendorLocation.location_name}
                                  </span>
                                </div>
                              )}
                            <div className=" flex flex-col">
                              <span className="font-semibold ">
                                Pickup/Delivery
                              </span>
                              <span className="">
                                {requestData.pickup_delivery == 1
                                  ? "Pickup"
                                  : requestData.pickup_delivery == 2
                                  ? "Delivery"
                                  : "N/A"}
                              </span>
                            </div>
                            <div className=" flex flex-col">
                              <span className="font-semibold ">
                                Delivery Time
                              </span>
                              {requestData.VendorPackageSlot ? (
                                <span className="">
                                  {convertTimeTo12HourFormat(
                                    requestData.VendorPackageSlot?.start_time
                                  )}
                                  -{" "}
                                  {convertTimeTo12HourFormat(
                                    requestData.VendorPackageSlot.end_time
                                  )}
                                </span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </div>

                            <div className=" flex flex-col">
                              <span className="font-semibold ">Frequency</span>
                              <span className="">
                                {requestData.VendorPackageFrequency
                                  ? requestData.VendorPackageFrequency
                                      .frequency_name
                                  : "N/A"}
                              </span>
                            </div>
                            <div className=" flex flex-col">
                              <span className="font-semibold ">
                                Requested Start Date
                              </span>
                              <span className="">
                                {requestData.start_date
                                  ? formatDate(
                                      requestData.start_date.split("T")[0]
                                    )
                                  : "N/A"}
                              </span>
                            </div>

                            <div className=" flex flex-col">
                              <span className="font-semibold ">Cost</span>
                              {requestData.VendorPackagePrice ? (
                                <span className="">
                                  {requestData.VendorPackagePrice.cost}$/
                                  {requestData.VendorPackagePrice.frequency}
                                </span>
                              ) : (
                                "N/A"
                              )}
                            </div>
                            <div className=" flex flex-col">
                              <span className="font-semibold ">
                                Payment Status
                              </span>
                              <span className="">
                                {requestData.payment_status == 1
                                  ? "Paid"
                                  : "Unpaid - Payment only required once Vendor approved your request"}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CRow>

                  <CRow className="d-flex justify-content-center border-2x-graish mt-3">
                    <div className="col-10 bg-white rounded py-20x">
                      <h3 className="text-center">Active Subscriptions</h3>
                    </div>
                    <div className="overflow-auto">
                      <Table
                        columns={columns}
                        dataSource={subscriptions}
                        rowKey="id"
                        pagination={true}
                      />
                    </div>
                  </CRow>
                </div>
              </div>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab-pane"
              visible={activeKey === 2}
            >
              Food
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab-pane"
              visible={activeKey === 3}
            >
              Etsy
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 3}
            >
              Etsy
            </CTabPane>
          </CTabContent>

          <div className="flex flex-start my-5x">
            <CButton
              className="float-end simple-button text-white"
              color="info"
              onClick={handleAddPackage}
            >
              Add Package
            </CButton>
          </div>
        </div>
        <CRow>
          <CancelConfirm
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            packageId={cancelId}
            customerId={customerId}
            updateTrigger={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}
          />
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
            popup={popup}
            setPopup={setPopup}
          />
        </CRow>
      </div>
      {popup && <Popup handlePopupClick={handlePopupClick} />}
      <CustomerDashboardFooter />
    </main>
  );
};

export default DashboardCustomer;
