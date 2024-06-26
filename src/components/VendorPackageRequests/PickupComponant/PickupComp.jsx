import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CButton, CFormCheck, CFormSelect } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLocationPin } from "@coreui/icons";
import DatePicker from "react-datepicker";
import "./PickupComp.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  addDaysToDate,
  getCurrentDate,
  getDateFromString,
  getDateFromString2,
  getDateMonthDayBetweenTwoDates,
} from "../../../utils/Helper";
import {
  confirmPaymentRequest,
  packageRequestApprove,
  packageRequestReject,
  packageRequestRemove,
} from "../../../actions/vendorReducers/VendorActions";
import { Input, Modal } from "antd";
import { v4 as uuid } from "uuid";
import { getOrderCreationDates } from "../../../actions/customerReducer/CustomerActions";
import OrderCreationPopup from "../../Popup/OrderCreationPopup";

const PickupComp = ({ data }) => {
  const [request, setRequest] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reason, setReason] = useState();
  const [dates, setDates] = useState({
    show: false,
    start_date: new Date().toISOString().split("T")[0],
    end_date: {
      status: false,
      value: new Date().toISOString().split("T")[0],
    },
    number_of_days: {
      status: false,
      value: "10",
    },
    number_of_orders: {
      status: false,
      value: "5",
    },
  });
  const [meals, setMeals] = useState({
    mealCount: 0,
    meal_start: dates.start_date,
    meal_end: "",
  });
  const [popup, setPopup] = useState({
    show: false,
    dates: [],
    customer_name: "",
  });
  const dispatch = useDispatch();
  const { VendorPackage, UserCustomer, VendorPackagePrice, VendorLocation } =
    request;

  const handleEndDateChange = (name, date) => {
    const value = getDateFromString(date);
    console.log(date);

    const startDate = new Date(dates.start_date + "T00:00:00");
    const endDate = new Date(date);
    console.log(startDate < endDate, date);
    if (startDate < endDate) {
      setDates({
        ...dates,
        end_date: { ...dates.end_date, value },
      });
    } else {
      setDates({
        ...dates,
        end_date: { ...dates.end_date, value: "" },
      });
    }
  };
  const handleNumberOfDaysChange = (e) => {
    const value = e.target.value;
    setDates({ ...dates, number_of_days: { ...dates.number_of_days, value } });
    // console.log(value);
  };
  const handleEndDateCheck = (e) => {
    setDates({
      ...dates,
      number_of_days: { ...dates.number_of_days, status: false },
      number_of_orders: { ...dates.number_of_orders, status: false },

      end_date: { ...dates.end_date, status: true },
    });
  };
  const handleNumberOfOrdersChange = (e) => {
    const value = e.target.value;
    setDates({
      ...dates,
      number_of_orders: { ...dates.number_of_orders, value },
    });
    // console.log(value);
  };

  const handleNumberOfDateCheck = (e) => {
    setDates({
      ...dates,
      number_of_days: { ...dates.number_of_days, status: true },
      number_of_orders: { ...dates.number_of_orders, status: false },
      end_date: { ...dates.end_date, status: false },
    });
  };
  const handleNumberOfOrderCheck = (e) => {
    setDates({
      ...dates,
      number_of_days: { ...dates.number_of_days, status: false },
      number_of_orders: { ...dates.number_of_orders, status: true },
      end_date: { ...dates.end_date, status: false },
    });
  };

  const handleApprove = async () => {
    try {
      const res = await dispatch(
        getOrderCreationDates({
          customer_id: request.user_id,
          package_id: request.package_id,
          start_date: meals.meal_start,
          end_date: meals.meal_end,
        })
      );
      setPopup({
        show: true,
        dates: res.data,
        customer_name: `${request.UserCustomer.first_name}`,
      });
    } catch (error) {
      console.log("Error handling approve");
    }
  };

  const handleRemove = async () => {
    try {
      const res = await dispatch(packageRequestRemove(request));
      console.log(res);
    } catch (error) {
      console.log("Error handling remove");
    }
  };
  const handleReject = async () => {
    try {
      if (!reason) {
        alert("Reason should be required");
        return;
      }
      const res = await dispatch(
        packageRequestReject({ data: request, reason: reason })
      );
      console.log(res);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error handling reject");
    }
  };
  const setMealsAfterCalculating = (startDate, endDate) => {
    const alldates = getDateMonthDayBetweenTwoDates(startDate, endDate);

    const PackageAvailableDays = [];
    if (VendorPackage.mon === 1) {
      PackageAvailableDays.push("mon");
    }
    if (VendorPackage.tue === 1) {
      PackageAvailableDays.push("tue");
    }
    if (VendorPackage.wed === 1) {
      PackageAvailableDays.push("wed");
    }
    if (VendorPackage.thu === 1) {
      PackageAvailableDays.push("thu");
    }
    if (VendorPackage.fri === 1) {
      PackageAvailableDays.push("fri");
    }
    if (VendorPackage.sat === 1) {
      PackageAvailableDays.push("sat");
    }
    if (VendorPackage.sun === 1) {
      PackageAvailableDays.push("sun");
    }

    // Getting the matched days count between the packages available days and customer given days
    let customerOrderCount = [];

    PackageAvailableDays.forEach((d) => {
      alldates.forEach((dateObj) => {
        dateObj.day === d && customerOrderCount.push(dateObj);
      });
    });
    setMeals({
      mealCount: customerOrderCount.length,
      meal_start: startDate,
      meal_end: endDate,
    });
  };

  const countMeals = () => {
    // When the end_date is enable
    if (dates.end_date.status) {
      setMealsAfterCalculating(dates.start_date, dates.end_date.value);
    }
    // When the number of days is enable
    else if (dates.number_of_days.status) {
      const startDate = dates.start_date;
      const endDate = addDaysToDate(startDate, dates.number_of_days.value);
      setMealsAfterCalculating(startDate, endDate);
    } else if (dates.number_of_orders.status) {
      const startDate = dates.start_date;
      const endDate = countDatesOfOrders(
        startDate,
        dates.number_of_orders.value
      );

      setMealsAfterCalculating(startDate, endDate);
    }
  };
  const countDatesOfOrders = (startedDate, orders) => {
    const PackageAvailableDays = [];
    if (VendorPackage.mon === 1) {
      PackageAvailableDays.push("mon");
    }
    if (VendorPackage.tue === 1) {
      PackageAvailableDays.push("tue");
    }
    if (VendorPackage.wed === 1) {
      PackageAvailableDays.push("wed");
    }
    if (VendorPackage.thu === 1) {
      PackageAvailableDays.push("thu");
    }
    if (VendorPackage.fri === 1) {
      PackageAvailableDays.push("fri");
    }
    if (VendorPackage.sat === 1) {
      PackageAvailableDays.push("sat");
    }
    if (VendorPackage.sun === 1) {
      PackageAvailableDays.push("sun");
    }
    const endDate = getDeliveryEndDate(
      startedDate,
      orders,
      PackageAvailableDays
    );
    return endDate;
  };
  function getDeliveryEndDate(startDate, totalOrders, deliveryDays) {
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let date = new Date(startDate);
    let deliveredOrders = 0;

    while (deliveredOrders < totalOrders) {
      const dayName = daysOfWeek[date.getDay()];
      if (deliveryDays.includes(dayName)) {
        deliveredOrders++;
      }
      date.setDate(date.getDate() + 1); // Move to the next day
    }

    // Move one extra day to include one additional day after delivering the last order
    date.setDate(date.getDate());

    // Format the date as 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const getRequestedEndDate = (frequency, start_date) => {
    if (frequency && start_date) {
      const startDate = new Date(start_date.split("T")[0] + "T00:00:00");
      let endDate = new Date(start_date.split("T")[0] + "T00:00:00");
      if (frequency === "daily") {
        endDate.setDate(startDate.getDate() + 0);
      } else if (frequency === "weekly") {
        endDate.setDate(startDate.getDate() + 6);
      } else if (frequency === "monthly") {
        endDate.setDate(startDate.getDate() + 29);
      }
      const endDateString = getCurrentDate(endDate);

      return endDateString;
    }

    return "";
  };

  useEffect(() => {
    countMeals();
  }, [dates]);

  useEffect(() => {
    const start_date = getDateFromString2(request?.start_date);
    const end_date = getRequestedEndDate(
      request?.VendorPackagePrice?.frequency,
      request?.start_date
    );

    setDates({
      show: false,
      start_date: start_date,
      end_date: {
        status: false,
        value: end_date,
      },
      number_of_orders: {
        status: false,
        value: "5",
      },
      number_of_days: {
        status: false,
        value: "10",
      },
    });

    setMealsAfterCalculating(start_date, end_date);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!reason) {
      setErrorMessage("Reason should be required");
      return;
    }
    try {
      const res = await dispatch(
        packageRequestReject({ data: request, reason: reason })
      );
      console.log(res);
      if (res) {
        setReason("");
        setErrorMessage("");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error handling reject");
    }
  };

  const handleCancel = async () => {
    try {
      const res = await dispatch(
        packageRequestReject({ data: request, reason: "" })
      );
      console.log(res);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error handling reject");
    }
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const res = await dispatch(confirmPaymentRequest(request));
      console.log(res);
    } catch (error) {
      console.log("Error handling reject");
    }
  };

  const handleSelectCustomerDates = () => {
    setDates({ ...dates, show: true });
  };

  const handleDefaultCustomerDates = () => {
    setDates({
      show: false,
      start_date: getDateFromString2(request?.start_date),
      end_date: {
        status: false,
        value: getRequestedEndDate(
          request?.VendorPackagePrice?.frequency,
          request?.start_date
        ),
      },
      number_of_orders: {
        status: false,
        value: "5",
      },
      number_of_days: {
        status: false,
        value: "10",
      },
    });
  };

  const handleStartDateChange = (date) => {
    const startDate = new Date(date);
    const endDate = new Date(dates.end_date.value + "T00:00:00");
    if (startDate > endDate) {
      setDates({
        ...dates,
        start_date: getDateFromString(date),
        end_date: { ...dates.end_date, value: "" },
      });
    } else {
      setDates({
        ...dates,
        start_date: getDateFromString(date),
      });
    }
  };
  const handlePopupClick = async (str) => {
    if (str === "Confirm") {
      try {
        const res = await dispatch(
          packageRequestApprove({
            ...request,
            start_date: meals.meal_start,
            end_date: meals.meal_end,
          })
        );
        setPopup({
          show: false,
          dates: [],
          customer_name: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
    setPopup({
      show: false,
      dates: [],
      customer_name: "",
    });
  };
  const uId = uuid();

  return (
    <div className="bg-white border my-10x relative">
      <div className="">
        {/* ---Icon & Details container */}
        <div className="flex items-center gap-10x IconDetailContainer">
          {/* ---------Icon--------- */}
          <div className="package-request-icon">
            <CIcon icon={cilLocationPin} size="3xl" />
          </div>
          {/* ---------Description--------- */}
          <div className="p-20x">
            <h4>
              <span className="text-green">PICKUP: </span>
              {VendorPackage?.package_name} - {UserCustomer?.first_name}
              &nbsp;
              {UserCustomer?.last_name}
            </h4>

            {/* ----Request Details------------- */}
            <div className="flex justify-between gap-10x flex-wrap-on-mobile">
              {/* ---Customer Description--- */}
              <div>
                <span className="font-12">CUSTOMER NAME</span>
                <h6>
                  {UserCustomer?.first_name} {UserCustomer?.last_name}
                </h6>
                <span className=""> {UserCustomer?.phone} </span>
              </div>
              {/* ---Package Name---
              <div>
                <span className="font-12">PACKAGE NAME</span>
                <h6> {request?.user_package_name} </h6>
              </div> */}
              {/* --- Package Requested--- */}
              <div>
                <span className="font-12">PACKAGE REQUESTED</span>
                <h6>
                  {VendorPackage?.package_name} -{VendorPackagePrice?.frequency}
                </h6>
              </div>
              {/* ---Address--- */}
              <div>
                <span className="font-12">PICKUP ADDRESS</span>
                <h6>
                  Pickup from&nbsp;
                  <span className="text-blue">
                    {VendorLocation ? (
                      <a
                        href={`https://www.google.com/maps/dir//
                    ${VendorLocation?.address}, 
                    ${VendorLocation?.CitiesAll?.city}, 
                    ${VendorLocation?.CitiesAll?.state}`}
                        target="_blank"
                      >
                        {VendorLocation?.address},&nbsp;
                        {VendorLocation?.CitiesAll?.city},&nbsp;
                        {VendorLocation?.CitiesAll?.state}&nbsp;
                      </a>
                    ) : (
                      "N/A"
                    )}
                    {/* 200 Main Street, Mississauga, ON, L5N3W4 */}
                  </span>
                </h6>
              </div>
            </div>
            {/* ----------Frequency Date details--------------- */}
            <div className=" mt-20x ">
              <div className="flex justify-between flex-col-on-mobile">
                {/* Frequency */}
                <div className="my-5x">
                  <h6>Frequency</h6>
                  <span>{request?.VendorPackagePrice?.frequency}</span>
                </div>
                {/* Requested Start Date */}
                <div className="my-5x">
                  <h6>Requested Start Date</h6>
                  <span>{dates.start_date.split("-").reverse().join("-")}</span>
                </div>
                {/* Request End Date */}
                <div className="my-5x">
                  <h6>Request End Date</h6>
                  <span>
                    {dates.end_date.value.split("-").reverse().join("-")}
                  </span>
                </div>
              </div>

              {!dates.show && (
                <button
                  className="border-none outline-none text-blue bg-transparent p-0"
                  onClick={handleSelectCustomerDates}
                >
                  Select custom dates
                </button>
              )}
              {dates.show && (
                <button
                  className="border-none outline-none text-blue bg-transparent p-0"
                  onClick={handleDefaultCustomerDates}
                >
                  Set default dates
                </button>
              )}
            </div>
            {/* ----Dates------ */}
            <div className="">
              {dates.show && (
                <div>
                  <div className="flex gap-20x flex-col-on-mobile">
                    {/* ---Start Date---- */}
                    <div className="flex-1">
                      <span className="font-12">START DATE</span>
                      <DatePicker
                        selected={new Date(dates.start_date + "T00:00:00")}
                        onChange={(date) => handleStartDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control w-100 mt-2"
                      />
                    </div>
                    {/* ---End Date---- */}
                    <div className="flex-1">
                      <CFormCheck
                        type="radio"
                        name={uId}
                        id="end_date"
                        label="END DATE"
                        inline
                        checked={dates.end_date.status}
                        onChange={(e) => handleEndDateCheck(e)}
                      />

                      <DatePicker
                        selected={
                          dates.end_date.value.length > 0
                            ? new Date(dates.end_date.value + "T00:00:00")
                            : ""
                        }
                        onChange={(date) =>
                          handleEndDateChange("end_date", date)
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control w-100 mt-2"
                        disabled={!dates.end_date.status}
                      />
                    </div>
                    {/* ---Number of Days---- */}
                    <div className="flex-1">
                      <CFormCheck
                        type="radio"
                        name={uId}
                        id="number_of_days"
                        label="NUMBER OF DAYS"
                        inline
                        checked={dates.number_of_days.status}
                        onChange={(e) => handleNumberOfDateCheck(e)}
                      />
                      <CFormSelect
                        name="number_of_days"
                        onChange={(e) => handleNumberOfDaysChange(e)}
                        value={dates.number_of_days.value}
                        disabled={!dates.number_of_days.status}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                        <option value="60">60</option>
                      </CFormSelect>
                    </div>

                    {/* ---Number of Orders---- */}
                    <div className="flex-1">
                      <CFormCheck
                        type="radio"
                        name={uId}
                        id="number_of_orders"
                        label="NUMBER OF ORDERS"
                        inline
                        checked={dates.number_of_orders.status}
                        onChange={(e) => handleNumberOfOrderCheck(e)}
                      />
                      <CFormSelect
                        name="number_of_orders"
                        onChange={(e) => handleNumberOfOrdersChange(e)}
                        value={dates.number_of_orders.value}
                        disabled={!dates.number_of_orders.status}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                        <option value="60">60</option>
                      </CFormSelect>
                    </div>
                  </div>

                  {/* {dates.end_date.value.length > 0 && ( */}
                  <p className="text-blue text-center p-0 my-5x">
                    {(dates.end_date.status ||
                      dates.number_of_days.status ||
                      dates.number_of_orders.status) &&
                      `This will create ${meals.mealCount} Meals between ${meals.meal_start}
            and ${meals.meal_end}`}
                  </p>
                  {/* )} */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ---------CTA-Action buttons--------- */}
        <div className="CTAButtonsContainer">
          <h6 className="text-white font-lg">Actions</h6>
          <div className="CTAButtons">
            <CButton
              className="text-black "
              style={{ backgroundColor: "yellow" }}
              onClick={handleConfirm}
            >
              Confirm Payment Request
            </CButton>
            <CButton className="" onClick={handleApprove}>
              APPROVE
            </CButton>
            <div className="flex gap-5x my-5x absolute">
              <>
                <Modal
                  title="Reason"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  cancelText="Reject without Message"
                  okText="Reject and Send Message"
                >
                  <p>
                    What is the reason for rejecting the package request? This
                    will be sent to the customer
                  </p>
                  <Input
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  {errorMessage !== "" && (
                    <p className="text-red">{errorMessage}</p>
                  )}{" "}
                </Modal>
              </>
            </div>
            <CButton color="secondary text-white" onClick={handleRemove}>
              REMOVE
            </CButton>
            <CButton color="danger text-white" onClick={showModal}>
              REJECT
            </CButton>
          </div>
        </div>
      </div>
      {popup.show && (
        <OrderCreationPopup
          dates={popup.dates}
          customer_name={popup.customer_name}
          handlePopupClick={handlePopupClick}
        />
      )}
    </div>
  );
};

export default PickupComp;
