import React from "react";
import "./CompletedItem.css";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilActionUndo, cilPhone } from "@coreui/icons";
import { getTimeSlot } from "../../../../../utils/Helper";
import { useDispatch } from "react-redux";
import { manageOrder } from "../../../../../actions/customerReducer/CustomerActions";

const CompletedItem = ({ itemKey, item, fetchOrders }) => {
  const { id, UserCustomer, VendorPackage, CustomerPackage } = item;

  const dispatch = useDispatch();
  const handleMakeDeliver = async () => {
    try {
      const res = await dispatch(manageOrder({ ...item, is_delivered: 0 }));
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CAccordionItem itemKey={itemKey}>
        <div className="flex items-center gap-5x px-5x">
          <CButton
            color="success"
            className="text-white"
            onClick={handleMakeDeliver}
          >
            <CIcon icon={cilActionUndo} />
          </CButton>
          <CAccordionHeader className="CompletedItem"></CAccordionHeader>
          <div className="flex-1 px-10x py-10x">
            <h6 className="m-0">
              {UserCustomer?.first_name} {UserCustomer?.last_name}{" "}
            </h6>
            <span className="text-gray text-sm">
              #{id} - {VendorPackage?.package_name}(
              {getTimeSlot(CustomerPackage, VendorPackage)}) -
              {CustomerPackage?.pickup_delivery === 1 ? "PICKUP" : "DELIVERY"} -
              {CustomerPackage?.VendorPackagePrice?.frequency}
            </span>
            <br />
            <span className="text-gray text-sm">
              {CustomerPackage.pickup_delivery === 1
                ? CustomerPackage?.VendorLocation
                  ? `Pickup from ${CustomerPackage?.VendorLocation?.location_name}`
                  : "N/A"
                : CustomerPackage?.CustomerDeliveryAddress
                ? `${CustomerPackage?.CustomerDeliveryAddress?.address}, ${
                    CustomerPackage?.CustomerDeliveryAddress?.unit_number
                      ? CustomerPackage?.CustomerDeliveryAddress?.unit_number +
                        ","
                      : ""
                  } ${
                    CustomerPackage?.CustomerDeliveryAddress?.CitiesAll?.city
                  } ${
                    CustomerPackage?.CustomerDeliveryAddress?.CitiesAll?.state
                  } ${CustomerPackage?.CustomerDeliveryAddress?.postal} (${
                    CustomerPackage?.CustomerDeliveryAddress
                      ?.delivery_instructions
                  })`
                : "N/A"}
            </span>
          </div>
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
              } else if (item.VendorPackageMenuItems.length > 1) {
                return (
                  <div className="multiple-items-container" key={item.id}>
                    {item.VendorPackageMenuItems.map((mi, i) => (
                      <span key={mi.id} className="text-gray">
                        {mi.menu_item_name}
                        {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                      </span>
                    ))}
                  </div>
                );
              } else if (item.VendorPackageMenuItems.length > 0) {
                return (
                  <div className="multiple-items-container" key={item.id}>
                    {item.VendorPackageMenuItems.map((mi, i) => (
                      <span key={mi.id}>
                        {mi.menu_item_name}
                        {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                      </span>
                    ))}
                  </div>
                );
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

export default CompletedItem;