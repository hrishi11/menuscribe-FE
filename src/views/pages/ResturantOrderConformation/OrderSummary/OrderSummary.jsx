import { useRef, useState } from "react";
import { CCol, CRow } from "@coreui/react";
import "./OrderSummary.css";
import { convertToAmPm, getTimeSlot } from "../../../../utils/Helper";

const OrderSummary = ({ selectedPackages, scrollRef }) => {
  const handleEditButtonClick = () => {
    // Scroll to the editable field component
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(scrollRef.current);
    // scrollRef.current.focus();
    const inputField = document.getElementById("addressScroll");
    if (inputField) {
      inputField.focus();
    }
  };

  const getFreqyencyDay = (freObj) => {
    console.log("o", freObj);
    if (freObj.frequency === "weekly") {
      return "7 Days";
    } else if (freObj.frequency === "monthly") {
      return "30 Days";
    } else if (freObj.frequency === "daily") {
      return "1 Days";
    }
  };
  const getSubtotal = () => {
    let Subtotal = 0;
    selectedPackages.forEach((pack) => {
      Subtotal += pack.frequency.cost;
    });
    return Subtotal;
  };

  const getTax = () => {
    const itemsWithTaxCost = selectedPackages.map((item) => {
      const tax_cost =
        (item.frequency.cost * item.VendorLocation.tax_percent) / 100;
      return tax_cost;
    });

    const totalTaxCost = itemsWithTaxCost.reduce((total, item) => {
      return total + item;
    }, 0);
    return totalTaxCost;
  };
  const getTotal = (percent) => {
    let Subtotal = 0;
    selectedPackages.forEach((pack) => {
      Subtotal += pack.frequency.cost;
    });
    // let tax = (Subtotal * percent) / 100;
    let tax = getTax();
    return (Subtotal + tax).toFixed(2);
  };
  const firstLattenUpperCase = (word) => {
    // Check if the word is not empty
    if (word.length === 0) return "";

    // Capitalize the first letter and concatenate it with the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  console.log(selectedPackages);
  return (
    <div className="box px-2 py-2 summaryContainer">
      <h1 className="h4 fw-bold text-info text-center">Confirm Your Order</h1>
      <p className="text-center">
        Confirm your order below and make payment to the vendor.
      </p>
      <CRow>
        <CCol>
          <h4 className="text-uppercase fw-bold h5">Order Summary</h4>
          <table className="table borderless-table">
            <thead>
              <tr>
                <th> Package Name</th>
                <th> Frequency</th>
                <th> Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedPackages &&
                selectedPackages.map((pack) => (
                  <tr key={pack.temp_id}>
                    <td>
                      {pack.package_name}
                      {pack.pickup_delivery === 1 && (
                        <div>
                          <p className="m-0">
                            <span className="text-blue">Pickup from: </span>
                            {pack.VendorLocation
                              ? `${pack.VendorLocation?.address}, ${pack.VendorLocation?.CitiesAll?.city}, ${pack.VendorLocation?.CitiesAll?.state}`
                              : "N/A"}
                          </p>
                          <p className="m-0">
                            <span className="text-blue"> Pickup date: </span>
                            {pack.start_date}
                          </p>
                          <p className="m-0">
                            <span className="text-blue"> Pickup time: </span>
                            {pack.pickup_time_slot && (
                              <span>
                                {convertToAmPm(
                                  pack.pickup_time_slot.start_time
                                )}
                                -{convertToAmPm(pack.pickup_time_slot.end_time)}
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                      {pack.pickup_delivery === 2 && (
                        <div>
                          <p className="m-0">
                            <span className="text-blue">
                              Delivery address:&nbsp;{" "}
                            </span>
                            {/* {pack.customer_delivery_address
                              ? `${pack.customer_delivery_address?.address}, 
                                  ${pack.customer_delivery_address?.CitiesAll?.city}, 
                                  ${pack.customer_delivery_address?.CitiesAll?.state}`
                              : "N/A"} */}
                            <button
                              onClick={handleEditButtonClick}
                              className="text-blue-500"
                              ref={scrollRef}
                            >
                              Enter your Delivery Address
                            </button>
                          </p>
                          <p className="m-0">
                            <span className="text-blue"> Delivery date: </span>
                            {pack.start_date}
                          </p>
                          <p className="m-0">
                            <span className="text-blue">
                              {" "}
                              Delivery time:&nbsp;
                            </span>
                            {pack.delivery_time_slot && (
                              <span>
                                {convertToAmPm(
                                  pack.delivery_time_slot.start_time
                                )}
                                -
                                {convertToAmPm(
                                  pack.delivery_time_slot.end_time
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </td>

                    <td>{firstLattenUpperCase(pack.frequency.frequency)}</td>

                    <td> ${pack.frequency.cost}</td>
                  </tr>
                ))}
              <tr className="border-color-white">
                <td className="w-full flex justify-between">
                  <span>Subtotal</span>
                </td>
                <td></td>
                <td>
                  <span> ${getSubtotal()}</span>
                </td>
              </tr>

              {selectedPackages.map((item) => (
                <tr className="border-color-white">
                  <td className="w-full flex justify-between">
                    <span>
                      {item.package_name} - Tax(
                      {/* {selectedPackages.map((item) => ( */}
                      <span>{item.VendorLocation.tax_percent}% </span>
                      {/* ))} */})
                    </span>
                  </td>
                  <td></td>
                  <td>
                    <span>
                      {" "}
                      $
                      {(
                        (item.VendorLocation.tax_percent / 100) *
                        item.frequency.cost
                      ).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}

              <tr className="border-color-white">
                <td className="w-full flex justify-between">
                  <span>Total</span>
                </td>
                <td></td>
                <td>
                  <span> {getTotal()}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </div>
  );
};

export default OrderSummary;
