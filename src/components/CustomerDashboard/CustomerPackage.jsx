import {
  CButton,
  CCard,
  CCol,
  CNav,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane,
  CFormCheck,
} from "@coreui/react";
import Order from "./Order";
import { useEffect } from "react";
import "./CustomerPackage.css";
import { convertToAmPm } from "../../utils/Helper";

const CustomerPackage = ({
  item,
  vendor,
  address,
  setAddress,
  customerAddresses,
  handleAddressUpdate,
  PackagesItemJSX,
}) => {
  const getTime = (item) => {
    const TimeSlot = item.VendorPackage.VendorPackageSlots.find(
      (slot) => slot.pickup_delivery === item.pickup_delivery
    );
    if (TimeSlot) {
      const start_time = convertToAmPm(TimeSlot.start_time);
      const end_time = convertToAmPm(TimeSlot.end_time);
      return `${start_time} - ${end_time}`;
    }
    // if (dateString === null) {
    //   return "N/A";
    // }
    // var date = new Date(dateString);

    // // Get hours and minutes
    // var hours = date.getHours();
    // var minutes = date.getMinutes();

    // // Convert hours to AM/PM format
    // var ampm = hours >= 12 ? "PM" : "AM";

    // // Convert hours from 24-hour to 12-hour format
    // hours = hours % 12;
    // hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

    // // Add leading zero to minutes if necessary
    // minutes = minutes < 10 ? "0" + minutes : minutes;

    // // Construct the time string
    // var timeString = hours + ":" + minutes + " " + ampm;

    return "N/A";
  };

  return (
    <CCol
      md={12}
      className="card border-2x-graish p-16 bg-light br-4 rounded-4 mb-16x rounded-xl"
      key={item.id}
    >
      {/* Top container */}
      <div className="flex justify-between my-10x">
        <div className="">
          <h5 className="font-semibold">
            {vendor && vendor[0].vendor_name}
            <span className="font-14">
              - ({item.VendorPackage.package_name})
            </span>
          </h5>

          {/* <i className="text-danger">{`${
                                  item.VendorPackage.delivery && "Delivery"
                                }`}</i> */}
          {item.pickup_delivery === 1 ? (
            <h6>
              Pickup Location: &nbsp;
              {item.VendorLocation ? (
                <span className="text-gray">
                  {item.VendorLocation?.address}, &nbsp;
                  {item.VendorLocation?.CitiesAll.city}, &nbsp;
                  {item.VendorLocation?.CitiesAll.state}
                </span>
              ) : (
                "N/A"
              )}
            </h6>
          ) : (
            <h6>
              Delivery to &nbsp;
              {item.CustomerDeliveryAddress ? (
                <span className="text-gray">
                  {item.CustomerDeliveryAddress?.address}, &nbsp;
                  {item.CustomerDeliveryAddress?.CitiesAll.city}, &nbsp;
                  {item.CustomerDeliveryAddress?.CitiesAll.state}, &nbsp;
                  {item.CustomerDeliveryAddress?.postal}.
                </span>
              ) : (
                "N/A"
              )}
            </h6>
          )}

          <p className="m-0 mb-4 font-semibold">Package Includes:</p>
        </div>
        <div className="flex flex-col items-right">
          <div className="flex gap-10x">
            <p className="font-medium text-right">
              {item.pickup_delivery === 1 ? "Pickup time" : "Delivery time"}{" "}
              <br />
              {/* {getTime(item.start_date)} - {getTime(item.end_date)} */}
              {getTime(item)}
            </p>
            {item.VendorPackage.pause === 1 && (
              <CButton className="bg-red px-10x border-none outline-none font-medium block">
                Pause Package
              </CButton>
            )}
          </div>

          {item.pickup_delivery === 2 && item.CustomerDeliveryAddress && (
            <p className="text-gray text-right">
              <span className="text-black font-medium">Delivery Address:</span>
              <br />
              {item.CustomerDeliveryAddress.address},
              {item.CustomerDeliveryAddress.unit_number},
              {item.CustomerDeliveryAddress.CitiesAll &&
                item.CustomerDeliveryAddress.CitiesAll.city}
              ,
              {item.CustomerDeliveryAddress.CitiesAll &&
                item.CustomerDeliveryAddress.CitiesAll.state}
              ,{item.CustomerDeliveryAddress.postal}
              <button
                className="text-blue border-none outline-none"
                onClick={() =>
                  setAddress({
                    package_id: item.id,
                    current_address_id: item.customer_delivery_address_id,
                  })
                }
              >
                Change
              </button>
            </p>
          )}
          {address.package_id === item.id && (
            <div className="w-100 flex gap-5x ">
              <CFormSelect
                className="simple-input"
                type="text"
                name="city_id"
                value={address.current_address_id}
                // required
                onChange={(e) =>
                  setAddress({
                    ...address,
                    customer_package_id: item.id,
                    current_address_id: parseInt(e.target.value),
                  })
                }
              >
                <option value="0">Select</option>
                {customerAddresses &&
                  customerAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.address},{address.unit_number},
                      {address.CitiesAll && address.CitiesAll.city},
                      {address.CitiesAll && address.CitiesAll.state},
                      {address.postal}
                    </option>
                  ))}
              </CFormSelect>
              <button
                className="text-blue border-none outline-none"
                onClick={handleAddressUpdate}
              >
                Update
              </button>

              <button
                className=" border-none outline-none"
                onClick={() =>
                  setAddress({
                    package_id: "",
                    current_address_id: "",
                  })
                }
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <CRow>
        <div className="customer-dashboard-orders-container">
          {item.CustomerOrders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      </CRow>
    </CCol>
  );
};

export default CustomerPackage;
