import { CButton, CRow } from "@coreui/react/dist";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  deleteCustomerAddress,
  getCustomerPackages,
} from "../../../../actions/customerReducer/CustomerActions";
import CustomerAddress from "../../../../components/app/modals/CustomerAddress";

import { Toast } from "../../../../components/app/Toast";
import { Spin } from "antd/es";
import CustomerAddressEdit from "../../../../components/app/modals/CustomerAddressEdit";
import Popup from "../../../../components/Popup/Popup";
export default function DeliveryAddress({
  changeTrigger,
  setChangeTrigger,
  fetchData,
  customerAddresses,
  setCustomerAddresses,
  loader,
  setLoader,
  setCustomerId,
  customerId,
  vendorData,
  //   dispatch,
}) {
  const dispatch = useDispatch();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressId, setAddressId] = useState("");

  const [delErrorData, setDelErrorData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [popup, setPopup] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);

  const handleAddressEdit = (id) => {
    try {
      setPopup(true);
      setAddressId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
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
  //   const fetchData = async () => {
  //     try {
  //       setLoader(true);
  //       const [userResponse] = await Promise.all([
  //         dispatch(getCustomerPackages(vendorData.id)),
  //       ]);
  //       console.log(
  //         "userResponse.data.CustomerAddress0,",
  //         userResponse.data.CustomerAddress
  //       );
  //       setCustomerAddresses(userResponse.data.CustomerAddress);
  //       setLoader(false);
  //       setCustomerId(vendorData.id);
  //     } catch (error) {
  //       console.error("Error fetching packages:", error);
  //     }
  //   };

  const handleDeleteAddress = async (id) => {
    const response = await dispatch(deleteCustomerAddress(id));
    if (response.message === "Cannot delete this address") {
      setDelErrorData(response.data);
      onOpen();
      return;
    }
    setLoader(true);
    setChangeTrigger((prev) => !prev);
    if (response && response.success) {
      Toast({ message: "Item deleted successfully.", type: "success" });
    }
  };
  const convertDateFormate = (date) => {
    const newDate = new Date(date);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
  };

  const handleAddress = (id) => {
    setAddressId(id);
    setShowAddressModal(true);
  };

  return (
    <div>
      <>
        {popup && <Popup handlePopupClick={handlePopupClick} />}
        <CustomerAddress
          showAddressModal={showAddressModal}
          setShowAddressModal={setShowAddressModal}
          addressId={addressId}
          customerId={customerId}
          setUpdateTrigger={setChangeTrigger}
        />
        <CustomerAddressEdit
          showAddressModal={showUpdateAddressModal}
          setShowAddressModal={setShowUpdateAddressModal}
          addressId={addressId}
          setAddressId={setAddressId}
          customerId={customerId}
          setUpdateTrigger={setChangeTrigger}
          popup={popup}
          setPopup={setPopup}
        />
      </>
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
      <div className="bg-white rounded-md ">
        <p className="text-white rounded-tl-lg rounded-tr-lg bg-red-500 text-center py-2 m-0 ">
          {" "}
          Delivery Address
        </p>
        <div className="col-10 bg-white rounded py-20x">
          <h3 className="text-center"> My Delivery Address</h3>

          <p className="text-center">Add your delivery addresses below</p>
          {customerAddresses && !loader ? (
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
            ))
          ) : (
            <span className="w-full flex justify-center">
              <Spin />
            </span>
          )}
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
    </div>
  );
}
