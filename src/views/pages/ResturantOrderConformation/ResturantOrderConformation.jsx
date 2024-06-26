import React, { useEffect, useRef, useState } from "react";
import "./ResturantOrderConformation.css";
import OrderSummary from "./OrderSummary/OrderSummary";
import CreateAccount from "./CreateAccount/CreateAccount";
import DeliveryAddress from "./DeliveryAddress/DeliveryAddress";
import { CButton } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  createPackageRequensts,
  createUserFromOrderConformation,
  getCustomerAddress,
  setPackagesData,
} from "../../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Toast } from "../../../components/app/Toast";
import CustomerAddressEdit from "../../../components/app/modals/CustomerAddressEdit";
import Popup from "../../../components/Popup/Popup";
import PickupAddress from "./PickupAddress/PickupAddress";
import {
  getSettingInfo,
  getSettingsInfo,
} from "../../../actions/vendorReducers/VendorActions";
import { IoIosArrowBack } from "react-icons/io";
import SignIn from "./SignIn/SignIn";
import CustomerDeliveryAddress from "./CustomerDelivsryAddress/CustomerDeliveryAddress";
import CustomerAddress from "../../../components/app/modals/CustomerAddress";
import AccountPopup from "../../../components/Popup/AccountPopup";
import { customerLogin } from "../../../actions/authReducer/AuthActions";

const ResturantOrderConformation = () => {
  const { customerSelectedPackages } = useSelector((state) => state.customer);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [error, setError] = useState("");
  const [alreadyHaveAnAccount, setAlreadyHaveAnAccount] = useState({
    status: false,
  });
  const [loggedIn, setLoggedIn] = useState({ status: false });
  const subscriptionRef = useRef(null);
  const scrollRef = useRef(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: {},
    password: "",
    confirm_password: "",
    user_exists: false,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [type, setType] = useState();
  // Address related states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [popup, setPopup] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [deliveryPickup, setDeliveryPickup] = useState([]);
  const [settingInfo, setSettingInfo] = useState();
  const [accountPopup, setAccountPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manageOrderItemCookie = async () => {
    if (customerSelectedPackages && customerSelectedPackages.length > 0) {
      localStorage.setItem(
        "menuscribe-order-items",
        JSON.stringify(customerSelectedPackages)
      );
      const check = customerSelectedPackages.map((item) =>
        item.pickup_delivery == 1
          ? "Pickup"
          : item.pickup_delivery == 2
          ? "Delivery"
          : ""
      );

      setDeliveryPickup(check);
      setSelectedPackages(customerSelectedPackages);
    } else {
      const cookieSPackages = JSON.parse(
        localStorage.getItem("menuscribe-order-items")
      );
      const res = await dispatch(setPackagesData(cookieSPackages));

      const check = cookieSPackages.map((item) =>
        item.pickup_delivery == 1
          ? "Pickup"
          : item.pickup_delivery == 2
          ? "Delivery"
          : ""
      );

      setDeliveryPickup(check);
      setSelectedPackages(cookieSPackages ? cookieSPackages : []);
    }
  };

  useEffect(() => {
    manageOrderItemCookie();
    fetchVendorSettingInfo();
  }, []);
  useEffect(() => {
    getAddress();
  }, [showAddressModal]);

  const handleSubmit = async () => {
    setError("");
    // Validation
    if (
      !user.first_name.length > 0 ||
      !user.last_name.length > 0 ||
      !user.email.length > 0 ||
      !user.password.length > 0 ||
      !user.phone.length > 0
    ) {
      setError("Please fill all the fields.");
      return;
    } else if (user.password.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      setError("Please provide a valid email");
      return;
    } else if (user.user_exists) {
      setError("Email already exists");
      return;
    } else if (!/[a-zA-Z]/.test(user.password)) {
      setError("Password should contain at least one letter.");
      return;
    } else if (!/[0-9]/.test(user.password)) {
      setError("Password should contain at least one number.");
      return;
    } else if (user.password !== user.confirm_password) {
      setError("Password and confirm password did not match");
      return;
    } else if (!subscriptionRef.current.checked) {
      subscriptionRef.current.focus();
      setError("Please checkmark the subscription checkbox");
      return;
    }
    // Checking if the user already exists or not

    const checkEmailRes = await dispatch(checkEmail({ email: user.email }));
    if (checkEmailRes.found) {
      setAccountPopup(true);
      setAlreadyHaveAnAccount({
        status: true,
        email: user.email,
        password: user.password,
        addressId: 0,
        CustomerDeliveryAddress: [],
      });
      return;
    }
    setAlreadyHaveAnAccount({ status: false });
    const reqObj = {
      user,
      packages: customerSelectedPackages,
    };

    try {
      const res = await dispatch(createUserFromOrderConformation(reqObj));
      if (res.message === "double-address_type") {
        setType(res.type);
        onOpen();
        return;
      }
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
      });
      alert(
        "Package Request Confirmed. Your package request has been submitted successfully. The vendor will get in touch with you shortly."
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const response = await dispatch(
        customerLogin({
          email: alreadyHaveAnAccount.email,
          password: alreadyHaveAnAccount.password,
        })
      );
      if (response && response.success) {
        setCustomerId(response.id);
        const addressResponse = await dispatch(getCustomerAddress());
        console.log(addressResponse);
        setAlreadyHaveAnAccount({
          ...alreadyHaveAnAccount,
          CustomerDeliveryAddress: addressResponse.data,
        });
        setLoggedIn({ status: true });
        Toast({ message: "Loggedin successfully", type: "success" });
        return;
      }
      alert("Login failed");
    }
  };
  const handleSignupLogin = () => {
    setAlreadyHaveAnAccount({
      status: true,
      email: "",
      password: "",
      addressId: 0,
      CustomerDeliveryAddress: [],
    });
  };
  const handleSubmitOrderRequest = async () => {
    if (alreadyHaveAnAccount.addressId === 0) {
      Toast({
        message: "Please select a valid delivery address.",
        type: "warning",
      });
      return;
    }
    const { CustomerDeliveryAddress, ...otherInfo } = alreadyHaveAnAccount;
    const reqObj = {
      // user,
      packages: customerSelectedPackages,
      ...otherInfo,
    };

    // Creating the package requests.
    try {
      const res = await dispatch(createPackageRequensts(reqObj));
      console.log(res);
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
      });
      setAlreadyHaveAnAccount({ status: false });
      alert(
        "Package Request Confirmed. Your package request has been submitted successfully. The vendor will get in touch with you shortly."
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getAddress = async () => {
    try {
      const addressResponse = await dispatch(getCustomerAddress());

      setAlreadyHaveAnAccount({
        ...alreadyHaveAnAccount,
        CustomerDeliveryAddress: addressResponse.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddress = (id) => {
    setAddressId(id);
    setShowAddressModal(true);
  };
  const handleAddressEdit = (id) => {
    setPopup(true);
    setAddressId(id);
  };

  const handlePopupClick = async (str) => {
    if (str === "yes") {
      setPopup(false);
      setShowUpdateAddressModal(true);
    } else if (str === "no") {
      setPopup(false);
    }
  };
  const fetchVendorSettingInfo = async () => {
    try {
      const fetchSettingInfo = await dispatch(getSettingsInfo());
      setSettingInfo(fetchSettingInfo.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccountPopupClick = () => {
    setAccountPopup(false);
  };

  return (
    <main className="OrderConformationContainer relative">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Duplicate Address Type
              </ModalHeader>
              <ModalBody>
                <p>You can only have one {type} address</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="conformationLeft flex flex-col gap-3">
        <div className=" px-2 py-2  w-full flex justify-center items-center">
          <IoIosArrowBack
            className="text-[50px]"
            onClick={() => navigate(`/${settingInfo.public_url}`)}
          />
          {settingInfo?.logo && (
            <span className="w-full flex  justify-center">
              <img src={settingInfo?.logo} className="h-[100px]" alt="" />
            </span>
          )}
        </div>
        <OrderSummary
          selectedPackages={selectedPackages}
          scrollRef={scrollRef}
        />
      </div>

      <div className="conformationRight">
        {!alreadyHaveAnAccount.status && (
          <>
            {deliveryPickup.includes("Delivery") && (
              <DeliveryAddress
                user={user}
                setUser={setUser}
                scrollRef={scrollRef}
              />
            )}
            {deliveryPickup.includes("Pickup") && (
              <PickupAddress
                info={selectedPackages.find(
                  (item) => item.pickup_delivery == 1
                )}
              />
            )}

            <CreateAccount
              user={user}
              setUser={setUser}
              subscriptionRef={subscriptionRef}
            />
            <p className="font-semibold">
              Already a Customer?{" "}
              <button className="text-blue" onClick={handleSignupLogin}>
                Log in
              </button>
            </p>
          </>
        )}
        {alreadyHaveAnAccount.status && (
          <>
            <SignIn
              alreadyHaveAnAccount={alreadyHaveAnAccount}
              setAlreadyHaveAnAccount={setAlreadyHaveAnAccount}
            />
            <CustomerDeliveryAddress
              alreadyHaveAnAccount={alreadyHaveAnAccount}
              loggedIn={loggedIn}
              setAlreadyHaveAnAccount={setAlreadyHaveAnAccount}
              handleAddressEdit={handleAddressEdit}
              handleAddress={handleAddress}
            />
          </>
        )}

        <p className="text-red font-semibold text-center">{error}</p>
        {!alreadyHaveAnAccount.status && (
          <CButton
            className="w-full text-white createAccountBtn"
            onClick={handleSubmit}
          >
            Create account on menuscribe
          </CButton>
        )}
        {alreadyHaveAnAccount.status && !loggedIn.status && (
          <CButton
            className="w-full text-white createAccountBtn"
            onClick={handleLogin}
          >
            Sign in
          </CButton>
        )}
        {loggedIn.status && (
          <CButton
            className="w-full text-white createAccountBtn"
            onClick={handleSubmitOrderRequest}
          >
            Confirm Order
          </CButton>
        )}
      </div>
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
      {popup && <Popup handlePopupClick={handlePopupClick} />}
      {accountPopup && (
        <AccountPopup handlePopupClick={handleAccountPopupClick} />
      )}
    </main>
  );
};

export default ResturantOrderConformation;
