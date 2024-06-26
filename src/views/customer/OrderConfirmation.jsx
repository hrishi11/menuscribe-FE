import { CButton, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPackages,
  saveCustomerOrder,
  savePackagesData,
  setCustomerPackageRequest,
  setPackagesData,
} from "../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
import { CustomerDashboardFooter } from "../../components/DashboardCustomerFooter";
import { CustomerDashboardHeaderWithoutNav } from "../../components/CustomerDashboardHeaderWithoutNav";
import { getCustomerData } from "../../actions/customerReducer/CustomerSlice";
import { convertToAmPm } from "../../utils/Helper";

const OrderConfirmation = () => {
  const { customerSelectedPackages } = useSelector((state) => state.customer);
  const [customerPackages, setCustomerPackages] = useState(
    customerSelectedPackages
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (customerSelectedPackages.length) {
      try {
        console.log("pacas", customerSelectedPackages);
        const res = await dispatch(
          setCustomerPackageRequest(customerSelectedPackages)
        );
        console.log(res);
        const selectedPackage = await dispatch(setPackagesData([]));

        // navigate("/payment-confirmation");
      } catch (error) {
        console.log("Error from Order conformation");
      }
    } else {
      navigate("/payment-confirmation");
    }
  };
  const handleBack = () => {
    navigate("/add-package");
  };

  const getFreqyencyDay = (freObj) => {
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
    customerPackages.forEach((pack) => {
      Subtotal += pack.frequency.cost;
    });
    return Subtotal;
  };
  const getTax = (percent) => {
    let Subtotal = 0;
    customerPackages.forEach((pack) => {
      Subtotal += pack.frequency.cost;
    });
    const tax = (Subtotal * percent) / 100;
    return tax.toFixed(2);
  };
  const getTotal = (percent) => {
    let Subtotal = 0;
    customerPackages.forEach((pack) => {
      Subtotal += pack.frequency.cost;
    });
    let tax = (Subtotal * percent) / 100;
    return (Subtotal + tax).toFixed(2);
  };

  // const calculateTotalPrice = () => {
  //   let totalPrice = 0;

  //   const rows = customerPackages.map((item) => {
  //     let price;

  //     switch (item.frequency) {
  //       case "daily":
  //         price = item.VendorPackage.price_daily;
  //         break;
  //       case "weekly":
  //         price = item.VendorPackage.price_weekly;
  //         break;
  //       case "monthly":
  //         price = item.VendorPackage.price_monthly;
  //         break;
  //       default:
  //         price = 0;
  //     }

  //     totalPrice += price;

  //     return (
  //       <tr key={item.id}>
  //         <td>{`${item.VendorPackage.package_name} - ${item.frequency}`}</td>
  //         {item.frequency === "daily" && (
  //           <td>{item.VendorPackage.price_daily}</td>
  //         )}
  //         {item.frequency === "weekly" && (
  //           <td>{item.VendorPackage.price_weekly}</td>
  //         )}
  //         {item.frequency === "monthly" && (
  //           <td>{item.VendorPackage.price_monthly}</td>
  //         )}
  //       </tr>
  //     );
  //   });

  //   rows.push(
  //     <tr key="total">
  //       <td style={{ paddingTop: "100px" }}>
  //         <strong>Total</strong>
  //       </td>
  //       <td style={{ paddingTop: "100px" }}>{totalPrice}</td>
  //     </tr>
  //   );

  //   return rows;
  // };

  return (
    <main className="flex flex-col justify-between min-h-screen">
      {/* <CustomerDashboardHeaderWithoutNav /> */}

      <div className="mb-3 d-flex justify-content-center">
        <div className="col-md-6 col-12 d-block box px-2 py-2">
          <h1 className="h4 fw-bold text-info text-center">
            Confirm Your Order
          </h1>
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
                  {customerPackages &&
                    customerPackages.map((pack) => (
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
                                <span className="text-blue">
                                  {" "}
                                  Pickup time:{" "}
                                </span>
                                {pack.pickup_time_slot && (
                                  <span>
                                    {convertToAmPm(
                                      pack.pickup_time_slot.start_time
                                    )}
                                    -
                                    {convertToAmPm(
                                      pack.pickup_time_slot.end_time
                                    )}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                          {pack.pickup_delivery === 2 && (
                            <div>
                              <p className="m-0">
                                <span className="text-blue">
                                  Delivery address:&nbsp;
                                </span>
                                {pack.customer_delivery_address
                                  ? `${pack.customer_delivery_address?.address}, 
                                  ${pack.customer_delivery_address?.CitiesAll?.city}, 
                                  ${pack.customer_delivery_address?.CitiesAll?.state}`
                                  : ""}
                              </p>
                              <p className="m-0">
                                <span className="text-blue">
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

                        <td>{getFreqyencyDay(pack.frequency)}</td>

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
                  <tr className="border-color-white">
                    <td className="w-full flex justify-between">
                      <span>Tax(13%)</span>
                    </td>
                    <td></td>
                    <td>
                      <span> ${getTax(13)}</span>
                    </td>
                  </tr>
                  <tr className="border-color-white">
                    <td className="w-full flex justify-between">
                      <span>Total</span>
                    </td>
                    <td></td>
                    <td>
                      <span> ${getTotal(13)}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCol>
            <div className="text-center">
              <CButton
                color="danger"
                onClick={handleBack}
                className="text-white mx-10x"
              >
                Back
              </CButton>
              <CButton
                color="info"
                className="text-white px-5"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </CButton>
            </div>
          </CRow>
        </div>
      </div>

      <CustomerDashboardFooter />
    </main>
  );
};

export default OrderConfirmation;
