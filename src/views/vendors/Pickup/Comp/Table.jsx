import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import {
  sendMsgForPickupOrder,
  setCustomerOrderStatus,
} from "../../../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import { FaSort } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const PickupTable = ({ orders, setOrders, setTrigerChange }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [msgInfo, setMsgInfo] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const handleRowClick = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (e, item) => {
    const response = dispatch(
      setCustomerOrderStatus({ id: item.id, status: e.target.checked ? 1 : 2 })
    );
    setTrigerChange((pre) => !pre);
    // setOrders((pre) =>
    //   pre.map((data) => {
    //     return data.id === item.id
    //       ? { ...data, status: e.target.checked ? 1 : 2 }
    //       : data;
    //   })
    // );
  };
  const handleSort = () => {
    setOrders(orders.sort);
  };
  const formatTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  const handleIconClick = (item) => {
    setMsgInfo(item);
    console.log(item);
    onOpen();
  };

  const handleSendMessage = async () => {
    try {
      const resposne = dispatch(
        sendMsgForPickupOrder({
          email: msgInfo.UserCustomer.email,
          //   email: "hanzlasadaqatrajput@gmail.com",
          name: msgInfo.UserCustomer.first_name,
          vendor_name: msgInfo.CustomerPackage.VendorPackage.Vendor.vendor_name,
          order_id: msgInfo.id,
          timeSlot: msgInfo.VendorPackageSlot,
          address: `${msgInfo.CustomerPackage?.VendorPackage?.VendorLocation.address}, ${msgInfo.CustomerPackage.VendorPackage.VendorLocation.CitiesAll.city}, ${msgInfo.CustomerPackage.VendorPackage.VendorLocation.CitiesAll.state}`,
          location_name:
            msgInfo.CustomerPackage.VendorPackage.VendorLocation.location_name,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      {/* SEND MESSAGE MODEL */}

      <div>
        <>
          {/* <Button onPress={onOpen} color="secondary">Open Modal</Button> */}
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
                    Modal Title
                  </ModalHeader>
                  <ModalBody className="">
                    <div>
                      A message will be sent to the user letting them know that
                      their order is ready to be picked up.
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p>Dear {msgInfo.UserCustomer.first_name},</p>
                      <p>
                        {
                          msgInfo.CustomerPackage.VendorPackage.Vendor
                            .vendor_name
                        }{" "}
                        is notifiying you that your food order is ready to be
                        picked up. Here are the details:
                      </p>
                      <p>- Order Number: {msgInfo.id} </p>
                      <p>
                        - Pickup Timeslot:{" "}
                        {msgInfo.VendorPackageSlot ? (
                          <>
                            {formatTime(msgInfo.VendorPackageSlot?.start_time)}-
                            {formatTime(msgInfo.VendorPackageSlot?.end_time)}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </p>
                      <p>
                        - Address:{" "}
                        {
                          msgInfo.CustomerPackage.VendorPackage.VendorLocation
                            .location_name
                        }
                        {" - "}
                        {
                          msgInfo.CustomerPackage.VendorPackage.VendorLocation
                            .address
                        }{" "}
                        {
                          msgInfo.CustomerPackage.VendorPackage.VendorLocation
                            .location_name
                        }
                        {", "}
                        {
                          msgInfo.CustomerPackage.VendorPackage.VendorLocation
                            .CitiesAll.city
                        }
                        {", "}
                        {
                          msgInfo.CustomerPackage.VendorPackage.VendorLocation
                            .CitiesAll.state
                        }
                      </p>
                      {/* <button className="bg-[#1674f0] px-4 py-2 text-white rounded">
                        Renew Package
                      </button> */}
                    </div>
                  </ModalBody>
                  <ModalFooter className="w-full">
                    <div>
                      NOTE: To reduce customer spam, you can only send 1
                      notifications total
                    </div>
                    <Button
                      color="foreground"
                      variant="light"
                      className={"bg-white"}
                      onPress={() => onClose()}
                    >
                      Close
                    </Button>
                    <Button
                      className="bg-[#1674f0] px-5 text-white shadow-lg shadow-indigo-500/20"
                      onPress={() => {
                        handleSendMessage();
                        onClose();
                      }}
                    >
                      Send Message
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-2 flex text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name (Order number){" "}
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date and timeslot
            </th>

            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Details
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pick Up
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Renewal Reminder
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders &&
            orders
              .sort((a, b) => new Date(a.order_date) - new Date(b.order_date))
              .map((item) => (
                <React.Fragment key={item.id}>
                  <tr
                    onClick={() => handleRowClick(item.id)}
                    className={`${
                      item.status == 1 ? "bg-green-200" : "hover:bg-gray-100"
                    } cursor-pointer border-b-1`}
                  >
                    <td className="px-6 flex flex-col py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span>
                        {item.UserCustomer?.first_name}{" "}
                        {item.UserCustomer?.last_name} ({item.id})
                      </span>
                      <span className="font-normal">
                        {item.UserCustomer?.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        {item.VendorPackageSlot && (
                          <span className="font-medium">
                            {formatTime(item.VendorPackageSlot?.start_time)}-
                            {formatTime(item.VendorPackageSlot?.end_time)}
                          </span>
                        )}

                        <span className="">{item.order_date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.CustomerPackage?.VendorPackage?.package_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="checkbox"
                        checked={item.status == 1 ? true : false}
                        onClick={(e) => handleStatusChange(e, item)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="p-2 w-fit text-white bg-blue-400">
                        <IoMdSend
                          onClick={() => handleIconClick(item)}
                          className="text-[32px]"
                        />
                      </div>
                    </td>
                  </tr>
                  {expandedRows.includes(item.id) && (
                    <tr className="bg-[#c2c2c2]">
                      <td
                        colSpan="5"
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        <div className="bg-white p-3 rounded-lg overflow-x-auto">
                          <p className="font-medium text-[16px]">
                            Order: {item.id}
                          </p>
                          <table className=" divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {item.CustomerOrderItems.length > 0
                                ? item.CustomerOrderItems.map(
                                    (data) =>
                                      data.VendorPackageMenuItem && (
                                        <tr className="" key={item.id}>
                                          <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-gray-900">
                                            {
                                              data.VendorPackageMenuItem
                                                ?.VendorMenuItem?.item_name
                                            }
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-[16px] text-gray-600">
                                            {
                                              data.VendorPackageMenuItem
                                                ?.VendorMenuItem?.quantity
                                            }
                                          </td>
                                        </tr>
                                      )
                                  )
                                : item.CustomerPackage?.VendorPackage?.VendorPackageDefaultItems.map(
                                    (data) =>
                                      data.VendorDefaultItem && (
                                        <tr key={item.id}>
                                          <td className="px-6 py-4 whitespace-nowrap text-[16px] font-medium text-gray-900">
                                            {data.VendorDefaultItem.name}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-[16px] text-gray-500">
                                            N/A
                                          </td>
                                        </tr>
                                      )
                                  )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickupTable;
