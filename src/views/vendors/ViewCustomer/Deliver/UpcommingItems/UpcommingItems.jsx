import React, { useEffect, useState } from "react";
import "./UpcommingItems.css";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilArrowThickRight,
  cilArrowRight,
  cilActionUndo,
  cilPhone,
} from "@coreui/icons";
import { getTimeSlot } from "../../../../../utils/Helper";
import { useDispatch } from "react-redux";
import { manageOrder } from "../../../../../actions/customerReducer/CustomerActions";

const UpcommingItems = ({ itemKey, item, fetchOrders }) => {
  const { id, UserCustomer, VendorPackage, CustomerPackage } = item;
  const dispatch = useDispatch();
  const handleMakePrepare = async () => {
    try {
      const res = await dispatch(manageOrder({ ...item, is_ready: 0 }));
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const handleMakeCompleted = async () => {
    try {
      const res = await dispatch(manageOrder({ ...item, is_delivered: 1 }));
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
  function formatTime(timeString) {
    const timeStr = timeString.split("T")[1];
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
    return `${hour}:${minutes} ${period}`;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    return `${day} ${month}`;
  }
  return (
    <div>
      <CAccordionItem itemKey={itemKey}>
        <div className="flex items-center gap-5x px-5x">
          <CButton color="warning" className="" onClick={handleMakePrepare}>
            {formatDate(item.order_date)}
            {/* <CIcon icon={cilActionUndo} /> */}
          </CButton>
          <CAccordionHeader className="DeliveryItem"></CAccordionHeader>
          <div className="flex-1 px-10x py-10x">
            <h6 className="m-0">
              {UserCustomer?.first_name} {UserCustomer?.last_name}
            </h6>
            <span className="text-gray text-sm flex flex-col">
              #{id} - {VendorPackage?.package_name}{" "}
              {getTimeSlot(CustomerPackage, VendorPackage)} -
              {CustomerPackage?.pickup_delivery === 1 ? "PICKUP" : "DELIVERY"} -
              {/* {CustomerPackage?.VendorPackagePrice?.frequency} */}
              <span className={`${"text-green-500"}`}>
                {item.delivered_time ? (
                  CustomerPackage?.pickup_delivery === 1 ? (
                    `Picked up at ${formatTime(item.delivered_time)}`
                  ) : (
                    `Delivered at ${formatTime(item.delivered_time)}`
                  )
                ) : (
                  <span className="text-orange-500">Pending</span>
                )}
              </span>
            </span>
          </div>
          {/* <CButton color="warning" className="" onClick={handleMakeCompleted}>
            <CIcon icon={cilArrowThickRight} className="font-semibold" />
          </CButton> */}
        </div>
        <CAccordionBody>
          <p className="m-0  font-semibold">{VendorPackage.package_name}:</p>
          <ul className="itemsContainer">
            {VendorPackage.DefaultItemsWithExistingOrders.map((item) => {
              if (item.CustomerOrderItem) {
                return (
                  <li key={item.id}>
                    {
                      item.CustomerOrderItem.VendorPackageMenuItem
                        ?.menu_item_name
                    }
                  </li>
                );
                // } else if (item.VendorPackageMenuItems.length > 1) {
                //   return (
                //     <div className="multiple-items-container" key={item.id}>
                //       {item.VendorPackageMenuItems.map((mi, i) => (
                //         <span key={mi.id} className="text-gray">
                //           {mi.menu_item_name}
                //           {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                //         </span>
                //       ))}
                //     </div>
                //   );
                // } else if (item.VendorPackageMenuItems.length > 0) {
                //   return (
                //     <div className="multiple-items-container" key={item.id}>
                //       {item.VendorPackageMenuItems.map((mi, i) => (
                //         <span key={mi.id}>
                //           {mi.menu_item_name}
                //           {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                //         </span>
                //       ))}
                //     </div>
                //   );
              } else {
                return <li key={item.id}> {item.item_name}</li>;
              }
            })}
          </ul>
          <span>
            <CIcon icon={cilPhone} /> {UserCustomer.phone}{" "}
          </span>
        </CAccordionBody>
      </CAccordionItem>
    </div>
  );
};

export default UpcommingItems;
