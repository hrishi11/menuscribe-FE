import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { IoSendSharp } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import { columns, columns2, users, users2 } from "./data";
import { useDispatch } from "react-redux";
import { getSubscriptionInfo } from "../../actions/vendorReducers/VendorActions";
import { sendRenewPackageMsg } from "../../actions/api/Vendor";
import SendMessagePopup from "../../components/Popup/SendMessagePopup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function AllSubscription() {
  const [subscriptionInfo, setSubscriptionInfo] = useState([]);
  const [sortDir, setSortDir] = useState("asc");
  const [sortCol, setSortCol] = useState("final_order");
  const [CurrentCol, setCurrentCol] = useState("");
  const [change, setChange] = useState("");
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [msgInfo, setMsgInfo] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const fetchSubscriptionInfo = async () => {
    try {
      const response = await dispatch(getSubscriptionInfo({}));
      console.log(response.data);
      setSubscriptionInfo(
        response.data.sort((a, b) => {
          return sorting(
            getMaxDate(a.CustomerOrders.map((item) => item.order_date)),
            getMaxDate(b.CustomerOrders.map((item) => item.order_date))
          );
        })
      );
      setSubscriptionData(response.data);
      // setSortDir("asc");
      // setSortCol("final_order");
    } catch (error) {
      console.log(error);
    }
  };

  function getMaxDateAndDays(arr) {
    const dates = arr.map((dateString) => new Date(`${dateString}T00:00:00`));

    const sortedDates = [...dates].sort((a, b) => a - b); // Sort dates in ascending order
    const maxDate = sortedDates[sortedDates.length - 1]; // Get the last (maximum) date

    // Calculate the total days from the current date
    const currentDate = new Date();
    const totalDays = Math.ceil(
      (maxDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Format the maximum date
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = maxDate.toLocaleDateString("en-US", options);

    return { maxDate: formattedDate, totalDays };
  }

  const renderCell = React.useCallback((info, columnKey) => {
    const cellValue = info[columnKey];
    console.log(cellValue);
    const finalOrder = getMaxDateAndDays(
      info.CustomerOrders.map((item) => item.order_date)
    );
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <span className="text-md">
              {info.CustomerPackage.UserCustomer.first_name}{" "}
              {info.CustomerPackage.UserCustomer.last_name}
            </span>
            <span className="text-bold text-sm capitalize text-default-500">
              {info.CustomerPackage.UserCustomer.phone}
            </span>
          </div>
        );
      case "final_order":
        return (
          <div className="flex flex-col ">
            <span className="text-bold text-md capitalize">
              {finalOrder.maxDate}
            </span>
            <span className="text-bold text-sm capitalize text-default-500">
              In {finalOrder.totalDays} days
            </span>
          </div>
        );
      case "sub_type":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-md capitalize">
              {info.CustomerPackage.VendorPackage.package_name}
            </span>
            {info.CustomerPackage.VendorPackagePrice && (
              <span className="text-bold text-sm capitalize text-default-500">
                {info.CustomerPackage.VendorPackagePrice.frequency}-{" "}
                {info.CustomerPackage.VendorPackagePrice.cost}$
              </span>
            )}
          </div>
        );
      case "reminder":
        return (
          <div className="relative flex items-center justify-start px-5 ">
            <span
              className="text-lg  cursor-pointer active:opacity-50 p-2 text-white bg-blue-500"
              onClick={() =>
                handleIconClick(
                  info.CustomerPackage.UserCustomer.first_name,
                  info.CustomerPackage.VendorPackage.Vendor.vendor_name,
                  finalOrder.maxDate,
                  info.CustomerPackage.UserCustomer.email
                )
              }
            >
              <IoSendSharp />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    if (sortCol === CurrentCol) {
      setSortDir(sortDir === "asc" ? "des" : "asc");
    } else {
      setSortCol(CurrentCol);
      setSortDir("asc");
    }
  }, [change]);
  const getMaxDate = (arr) => {
    const dates = arr.map((dateString) => new Date(`${dateString}T00:00:00`));
    const sortedDates = [...dates].sort((a, b) => a - b); // Sort dates in ascending order
    const maxDate = sortedDates[sortedDates.length - 1]; // Get the last (maximum) date

    return maxDate;
  };
  useEffect(() => {
    let sortedData;
    if (sortCol === "name") {
      sortedData = subscriptionData.sort((a, b) => {
        return sorting(
          a.CustomerPackage.UserCustomer.first_name,
          b.CustomerPackage.UserCustomer.first_name
        );
      });
      setSubscriptionInfo(sortedData);
    } else if (sortCol === "final_order") {
      sortedData = subscriptionData.sort((a, b) => {
        return sorting(
          getMaxDate(a.CustomerOrders.map((item) => item.order_date)),
          getMaxDate(b.CustomerOrders.map((item) => item.order_date))
        );
      });

      console.log("date", sortedData);
      setSubscriptionInfo(sortedData);
    } else if (sortCol === "sub_type") {
      sortedData = subscriptionData.sort((a, b) => {
        return sorting(
          a.CustomerPackage.VendorPackage.package_name,
          b.CustomerPackage.VendorPackage.package_name
        );
      });
      setSubscriptionInfo(sortedData);
    }
  }, [sortCol, sortDir]);
  const sorting = (a, b) => {
    if (sortDir === "asc") {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  };

  const handleSort = async (col_name) => {
    const min = 1;
    const max = 100;
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    if (col_name === "reminder") {
      return;
    }
    setSubscriptionInfo([]);
    setChange(randomInteger);

    setCurrentCol(col_name);
  };

  const handleIconClick = (name, vendorName, lastOrderDate, email) => {
    setMsgInfo({
      name,
      email,
      msg: `${vendorName} is notifying you that your package is up for renewal. Your last order is on ${lastOrderDate}.`,
    });
    onOpen();
    console.log(response);
  };
  const handleSendMessage = async (onClose) => {
    try {
      await dispatch(
        sendRenewPackageMsg({
          name: msgInfo.name,
          email: msgInfo.email,
          msg: msgInfo.msg,
        })
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (onClose) => {
    setMsgInfo({});
    onClose();
  };

  return (
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
                    their package is expiring. You can add custom message below.
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p>Dear {msgInfo.name},</p>
                    <p>{msgInfo.msg}</p>
                    <p>Please click the link below to renew your package </p>
                    <button className="bg-[#1674f0] px-4 py-2 text-white rounded">
                      Renew Package
                    </button>
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
                    onPress={() => handleClose(onClose)}
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
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns2}>
          {(column) => (
            <TableColumn
              key={column.uid}
              onClick={() => {
                console.log("iner", subscriptionInfo);
              }}
              // align={column.uid === "actions" ? "center" : "start"}
            >
              <div className="flex gap-2">
                <span>{column.name}</span>

                <CgArrowsExchangeAltV
                  className="cursor-pointer text-lg"
                  onClick={() => handleSort(column.uid)}
                />
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={subscriptionInfo}>
          {subscriptionInfo &&
            subscriptionInfo.map((item) => {
              const days = getMaxDateAndDays(
                item.CustomerOrders.map((item) => item.order_date)
              ).totalDays;
              if (days < 0) {
                return;
              } else {
                return (
                  <TableRow
                    key={item.id}
                    className={`border-b ${
                      days < 7
                        ? "bg-pink-200"
                        : days < 14 && days >= 7
                        ? "bg-yellow-200"
                        : ""
                    }`}
                  >
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </div>
  );
}
