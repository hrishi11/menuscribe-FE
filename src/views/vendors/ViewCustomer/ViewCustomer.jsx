import React, { useEffect, useState } from "react";
import {
  getCustomerPaymentLog,
  getSubscriptions,
  getUpcomingOrders,
} from "../../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import UpcommingOrders from "./Deliver/UpcommingOrders";
import { useParams } from "react-router-dom";

import UserInfo from "./UserInfo/UserInfo";
import { Tag } from "antd";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Calendar from "./PackageInfo/Calendar";
import CalendarDate from "./PackageInfo/Calendar";
import RenewCalendar from "./Renew/calendar";
import PaymentLog from "./PaymentLog/PaymentLog";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import DeliveryAddress from "./DeliveryAddresses/DeliveryAddress";
import Orders from "./Orders/Orders";
import {
  getCustomerPackages,
  getVendorCustomerAddress,
  getVendorCustomerOrders,
} from "../../../actions/customerReducer/CustomerActions";

export default function ViewCustomer() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [pending, setPending] = useState(0);
  const [complete, setComplete] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [lastOrder, setLastOrder] = useState();
  const [firstOrder, setFirstOrder] = useState();
  const [subscription, setSubscription] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [changeTrigger, setChangeTrigger] = useState(false);

  const dispatch = useDispatch();

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [paymentLog, setPaymentLog] = useState([]);
  const [paymentData, setPaymentData] = useState({
    tax: "0",
  });
  const [customerId, setCustomerId] = useState("");
  // const [vendorData,setVendorData]=useState()
  const vendorData = JSON.parse(localStorage.getItem("menuScribe"));

  const [customerAddresses, setCustomerAddresses] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchData();
  }, [dispatch, vendorData.id, changeTrigger]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    setSelectedColor(color);
    fetchOrders();
    fetchSubscription();
    fetchCustomerPaymentLog();
  }, []);
  useEffect(() => {
    fetchSubscription();
  }, [updateTrigger]);

  function convertTimeUnit(unit) {
    const singularForms = {
      weekly: "week",
      monthly: "month",
      daily: "day",
    };

    return singularForms[unit] || unit; // Return the corresponding singular form, or the original unit if not found
  }

  const fetchData = async () => {
    try {
      setLoader(true);
      const [userResponse] = await Promise.all([
        dispatch(getVendorCustomerAddress(vendorData.id)),
      ]);
      setCustomerAddresses(userResponse.data);
      +(
        // setCustomerOrders(fetchOrders.data);
        setLoader(false)
      );
      setCustomerId(vendorData.id);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const getOrders = await dispatch(getUpcomingOrders(id));
      setOrders(getOrders.data);
      setPending(
        getOrders.completeOrders.filter((item) => item.is_delivered == 0).length
      );
      setComplete(
        getOrders.completeOrders.filter((item) => item.is_delivered == 1).length
      );
      setUserInfo(getOrders.userInfo);
      const sortOrders = getOrders.completeOrders.sort(
        (a, b) => new Date(a.order_date) - new Date(b.order_date)
      );
      setFirstOrder(sortOrders[0].order_date);
      setLastOrder(sortOrders[sortOrders.length - 1].order_date);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await dispatch(getSubscriptions(id));
      console.log(response);
      setSubscription(response.data.map((item) => ({ ...item, index: 0 })));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCustomerPaymentLog = async () => {
    try {
      const response = await dispatch(getCustomerPaymentLog(id));

      setPaymentLog(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString + " UTC");
    const day = date.getUTCDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `${day}-${month}`;
  }
  function formatDates(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      const timezoneOffset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() + timezoneOffset);
      const options = { day: "2-digit", month: "short" };
      return date.toLocaleDateString("en-US", options).replace(",", "");
    } else {
      return "N/A";
    }
  }

  return (
    <div className="flex justify-between w-full gap-3  max-sm:flex-wrap">
      <div className="flex flex-col w-[68%] max-sm:gap-3">
        <UserInfo
          userInfo={userInfo}
          selectedColor={selectedColor}
          complete={complete}
          pending={pending}
          firstOrder={firstOrder}
          lastOrder={lastOrder}
        />
        <div className="bg-white w-full lg:m-3 max-sm:m-0   p-3">
          <p className="text-[20px] font-semibold">Customer Subscription</p>
          {subscription &&
            subscription?.length > 0 &&
            subscription?.map((item, index) => (
              <div className="border-b-2 pb-6 pt-3 flex flex-col gap-3">
                <div>
                  <div className="flex justify-between pt-2">
                    <div className="flex flex-col ">
                      <span className="font-semibold">
                        {item.id}-{item.VendorPackage?.package_name}
                      </span>
                      <span className="text-red-500">
                        {item.VendorPackagePrice?.method.toUpperCase()}-
                        {item.VendorPackagePrice?.frequency.toUpperCase()}
                      </span>
                      <span className="text-blue-400">
                        ${item.VendorPackagePrice?.cost}/
                        {convertTimeUnit(item.VendorPackagePrice?.frequency)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <Tag className="bg-green-600 text-white">
                        {item.orders.length > 0 &&
                        item.orders.filter((item) => item.is_delivered === 1)
                          .length
                          ? item.orders.length > 0 &&
                            item.orders.filter(
                              (item) => item.is_delivered === 1
                            ).length
                          : 0}{" "}
                        orders completed
                      </Tag>
                      <Tag className="bg-yellow-500 text-white">
                        {item.orders.filter((item) => item.is_delivered === 0)
                          .length > 0
                          ? item.orders.filter(
                              (item) => item.is_delivered === 0
                            ).length
                          : 0}{" "}
                        orders pending
                      </Tag>
                    </div>
                  </div>

                  {/* {show == index ? (
                    <button
                      className="text-blue-600"
                      onClick={() => setShow(-1)}
                    >
                      hide
                    </button>
                  ) : (
                    <button
                      className="text-blue-600"
                      onClick={() => setShow(index)}
                    >
                      show
                    </button>
                  )} */}
                </div>
                <div
                  className={` bg-gray-400 border-2 w-full p-0  flex  items-center`}
                >
                  <div
                    onClick={() =>
                      setSubscription((prevState) =>
                        prevState.map((item, i) =>
                          i === index ? { ...item, index: 0 } : item
                        )
                      )
                    }
                    className={` ${
                      item.index == 0 ? "bg-blue-400" : "bg-gray-400"
                    } px-3 h-full py-2 cursor-pointer font-bold text-white`}
                  >
                    SUBSCRIPTION HISTORY
                  </div>
                  <div className="h-full border bg-white" />
                  <div
                    onClick={() =>
                      setSubscription((prevState) =>
                        prevState.map((item, i) =>
                          i === index ? { ...item, index: 1 } : item
                        )
                      )
                    }
                    className={` ${
                      item.index == 1 ? "bg-blue-400" : "bg-gray-400"
                    } px-3 h-full  py-2 cursor-pointer font-bold text-white`}
                  >
                    ORDERS
                  </div>

                  <div className="h-full border bg-white" />
                  <div
                    onClick={() =>
                      setSubscription((prevState) =>
                        prevState.map((item, i) =>
                          i === index ? { ...item, index: 2 } : item
                        )
                      )
                    }
                    className={` ${
                      item.index == 2 ? "bg-blue-400" : "bg-gray-400"
                    } px-3 h-full  py-2 cursor-pointer font-bold text-white`}
                  >
                    ORDER CALENDAR
                  </div>

                  <div className="h-full border bg-white" />
                  <div
                    onClick={() =>
                      setSubscription((prevState) =>
                        prevState.map((item, i) =>
                          i === index ? { ...item, index: 3 } : item
                        )
                      )
                    }
                    className={` ${
                      item.index == 3 ? "bg-blue-400" : "bg-gray-400"
                    } px-3 h-full cursor-pointer py-2  font-bold text-white`}
                  >
                    RENEW
                  </div>
                </div>
                {/* TABLE */}
                {item.index == 1 ? (
                  <>
                    <Orders
                      orders={item.orders.sort(
                        (a, b) =>
                          new Date(b.order_date) - new Date(a.order_date)
                      )}
                      formatDate={formatDate}
                    />
                  </>
                ) : item.index == 2 ? (
                  <>
                    {" "}
                    <CalendarDate
                      info={item}
                      start_date={
                        item.CustomerOrders?.map(
                          (item) => item.order_date
                        ).sort((a, b) => new Date(a) - new Date(b))[0]
                      }
                      end_date={
                        item.CustomerOrders?.map(
                          (item) => item.order_date
                        ).sort((a, b) => new Date(b) - new Date(a))[0]
                      }
                    />
                    <div className="w-full p-2  bg-gray-300 flex justify-center items-center gap-2 font-semibold">
                      <span className="w-3 h-3 bg-red-600 rounded-full "></span>
                      This indicates an existing customer order for this package
                    </div>
                  </>
                ) : item.index == 3 ? (
                  <>
                    {item && (
                      <RenewCalendar
                        info={item}
                        id={id}
                        setUpdateTrigger={setUpdateTrigger}
                        setSubscription={setSubscription}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Table aria-label="Example static collection table">
                      <TableHeader>
                        <TableColumn>CREATED ON</TableColumn>
                        <TableColumn>SUBSCRIPTION START</TableColumn>
                        <TableColumn>SUBSCRIPTION END</TableColumn>
                        <TableColumn>FIRST ORDER</TableColumn>
                        <TableColumn>LAST ORDER</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {item.CustomerPackageSubscriptions.sort(
                          (a, b) => new Date(b.end_date) - new Date(a.end_date)
                        ).map((item) => (
                          <TableRow key="1" className={"border-b-1"}>
                            <TableCell>
                              {formatDate(`${item.created_date}`.split("T")[0])}
                            </TableCell>
                            <TableCell>{formatDate(item.start_date)}</TableCell>
                            <TableCell>{formatDate(item.end_date)}</TableCell>
                            <TableCell>
                              {formatDates(
                                item.CustomerOrders.map(
                                  (item) => item.order_date
                                ).sort((a, b) => new Date(a) - new Date(b))[0]
                              )}
                            </TableCell>
                            <TableCell>
                              {formatDates(
                                item.CustomerOrders.map(
                                  (item) => item.order_date
                                ).sort((a, b) => new Date(b) - new Date(a))[0]
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="w-[30%] pt-3  max-sm:w-full flex flex-col gap-4">
        <UpcommingOrders
          orders={orders}
          setOrders={setOrders}
          fetchOrders={fetchOrders}
        />
        <div className="bg-white rounded-md ">
          <p className="text-white rounded-tl-lg rounded-tr-lg bg-red-500 text-center py-2 m-0 ">
            {" "}
            Payments
          </p>
          <PaymentLog paymentLog={paymentLog} />
          <PaymentMethod
            id={id}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        </div>

        <DeliveryAddress
          setChangeTrigger={setChangeTrigger}
          changeTrigger={changeTrigger}
          fetchData={fetchData}
          customerAddresses={customerAddresses}
          setCustomerAddresses={setCustomerAddresses}
          loader={loader}
          setLoader={setLoader}
          setCustomerId={setCustomerId}
          customerId={customerId}
          // dispatch={dispatch}
          vendorData={vendorData}
        />
      </div>
    </div>
  );
}
