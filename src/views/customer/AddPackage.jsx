import React, { useEffect, useState } from "react";
import { getPackages } from "../../actions/vendorReducers/VendorActions";
import {
  getCustomerAddress,
  setPackagesData,
} from "../../actions/customerReducer/CustomerActions";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import { v4 as uuid } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentDate, getDateFromString, getTime } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { CustomerDashboardFooter } from "../../components/DashboardCustomerFooter";
import { CustomerDashboardHeader } from "../../components/CustomerDashboardHeader";
import { CustomerDashboardHeaderWithoutNav } from "../../components/CustomerDashboardHeaderWithoutNav";
import { getAllSelectedPackages } from "../../actions/customerReducer/CustomerSlice";
import Package from "../../components/Package/Package";
import Frequency from "../../components/Frequency/Frequency";

const AddPackage = () => {
  const [packages, setPackages] = useState();
  const [selectedPackages, setSelectedPackages] = useState({});
  const [customerDeliveryAddress, setCustomerDeliveryAddress] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerSelectedPackages } = useSelector((state) => state.customer);

  const [products, setProducts] = useState(customerSelectedPackages);

  const fetchData = async () => {
    try {
      const [packagesResponse] = await Promise.all([dispatch(getPackages())]);
      setPackages(packagesResponse.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  const fetchCustomerAddress = async () => {
    try {
      const res = await dispatch(getCustomerAddress());
      setCustomerDeliveryAddress(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  console.log(packages);

  useEffect(() => {
    fetchData();
    fetchCustomerAddress();
  }, [dispatch]);

  // console.log(packages);
  // console.log(products);

  const handleAddPackage = async (id) => {
    // const isIdAlreadyAdded = products.some((product) => product.temp_id === id);
    const clickedPackage = packages.filter((pk) => pk.id === id);
    let pickup_delivery = 0;
    if (clickedPackage[0].pickup === 1 && clickedPackage[0].delivery === 0) {
      pickup_delivery = 1;
    } else if (
      clickedPackage[0].pickup === 0 &&
      clickedPackage[0].delivery === 1
    ) {
      pickup_delivery = 2;
    } else {
      pickup_delivery = 0;
    }
    setProducts([
      ...products,
      {
        ...clickedPackage[0],
        user_package_name: "",
        frequency: { frequency: "" },
        start_date: getDateFromString(new Date()),
        quantity: "1",
        temp_id: uuid(),
        pickup_delivery,
        customer_delivery_address: { id: "" },
      },
    ]);
    // setSelectedPackages((prevData) => ({
    //   ...prevData,
    //   [[`frequency_` + id]]: "daily",
    //   [[`quantity_` + id]]: "1",
    //   [[`packagename_` + id]]: "",
    //   [[`date_` + id]]: getCurrentDate(),
    // }));
  };

  const handleChange = (event, temp_id) => {
    const { name, value } = event.target;
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, [name]: value } : pro
      )
    );
    // setSelectedPackages((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  const handleFrequencyChange = (e, temp_id) => {
    const { name, value } = e.target;
    const selectedPackage = products.filter((pro) => pro.temp_id === temp_id);
    const selectedFrequency = selectedPackage[0].VendorPackagePrices.filter(
      (pro) => pro.id === parseInt(value)
    );

    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id
          ? { ...pro, frequency: { ...selectedFrequency[0] } }
          : pro
      )
    );
    // console.log(selectedFrequency);
  };

  const setDate = (name, date, temp_id) => {
    const value = getDateFromString(date);
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, [name]: value } : pro
      )
    );
  };

  // console.log(useSelector(getAllSelectedPackages));

  const handleSavePackages = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      console.log("All the fields are required");
    } else {
      try {
        const res = await dispatch(setPackagesData(products));
        navigate("/order-confirmation");
        // console.log(res);
      } catch (error) {
        console.log("error from addPackage.jsx");
      }
    }
  };

  const removePackage = (temp_id) => {
    setProducts(products.filter((product) => product.temp_id !== temp_id));
    // setSelectedPackages((prevData) => ({
    //   ...prevData,
    //   [[`frequency_` + id]]: "",
    //   [[`quantity_` + id]]: "",
    //   [[`packagename_` + id]]: "",
    //   [[`date_` + id]]: "",
    // }));
  };

  const handleDashboard = () => {
    navigate("/");
  };
  const handlePickupCheck = (temp_id) => {
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, pickup_delivery: 1 } : pro
      )
    );
  };
  const handleDeliveryCheck = (temp_id) => {
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, pickup_delivery: 2 } : pro
      )
    );
  };
  const handleCustomerDeliveryAddressChange = (e, temp_id) => {
    const selectedAddress = customerDeliveryAddress.filter(
      (add) => add.id == e.target.value
    )[0];
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id
          ? { ...pro, customer_delivery_address: selectedAddress }
          : pro
      )
    );
  };
  const handleFrequencyInputChange = (event, temp_id) => {
    const { name, value } = event.target;
    setProducts(
      products.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, [name]: value } : pro
      )
    );
  };
  const handleTimeSlotChange = (slot, temp_id, str) => {
    if (str === "pickup") {
      setProducts(
        products.map((pro) =>
          pro.temp_id === temp_id ? { ...pro, pickup_time_slot: slot } : pro
        )
      );
    } else if (str === "delivery") {
      setProducts(
        products.map((pro) =>
          pro.temp_id === temp_id ? { ...pro, delivery_time_slot: slot } : pro
        )
      );
    }
    // console.log(slot, temp_id);
  };

  return (
    <main>
      {/* <CustomerDashboardHeaderWithoutNav /> */}

      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Customer</h1>
          <CRow>
            <CCol className="mt-1">
              <CButton
                className="float-end simple-button text-white"
                color="info"
                onClick={handleDashboard}
              >
                Dashboard
              </CButton>
            </CCol>
          </CRow>
        </div>
        <CRow>
          <CCol className="addPackageBody">
            <div className="left">
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Select Your Package</strong>
                </CCardHeader>
                <CCardBody className="">
                  <div className="mb-3">
                    <div className="row flex-nowrap overflow-auto gap-20x">
                      {packages &&
                        packages.map((item, index) => (
                          <Package
                            key={item.id}
                            item={item}
                            handleAddPackage={handleAddPackage}
                          />
                        ))}
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </div>
            <div className="right">
              <h5 className="text-center">Selected Package</h5>
              <CForm onSubmit={handleSavePackages}>
                <div className="flex flex-col items-center">
                  {products.map((product) => (
                    // <React.Fragment key={product.temp_id}>
                    //   {product.content}
                    // </React.Fragment>
                    // <SelectedPackage key={product.temp_id} product={product} />
                    // <div
                    //   key={product.temp_id}
                    //   className="mb-3 d-flex justify-content-center"
                    // >
                    //   <div className="col-md-6 col-12 d-block box px-2 py-2">
                    //     <div className="d-flex justify-content-between">
                    //       <p>{product.package_name}</p>
                    //       <p
                    //         className="cursor-pointer text-info"
                    //         onClick={() => removePackage(product.temp_id)}
                    //       >
                    //         Remove
                    //       </p>
                    //     </div>
                    //     {/* Pickup & delivery Btns */}
                    //     <div>
                    //       <div className="flex justify-between">
                    //         {product.pickup === 1 && (
                    //           <div>
                    //             <CFormCheck
                    //               type="radio"
                    //               name={`pickup_delivery_${product.temp_id}`}
                    //               id="pickup_delivery"
                    //               label="Pickup"
                    //               required
                    //               inline
                    //               checked={product.pickup_delivery === 1}
                    //               onChange={() =>
                    //                 handlePickupCheck(product.temp_id)
                    //               }
                    //             />
                    //           </div>
                    //         )}
                    //         {product.delivery === 1 && (
                    //           <div>
                    //             <CFormCheck
                    //               type="radio"
                    //               name={`pickup_delivery_${product.temp_id}`}
                    //               id="pickup_delivery"
                    //               label="Delivery"
                    //               required
                    //               inline
                    //               checked={product.pickup_delivery == 2}
                    //               onChange={() =>
                    //                 handleDeliveryCheck(product.temp_id)
                    //               }
                    //             />
                    //           </div>
                    //         )}
                    //       </div>
                    //     </div>
                    //     {/* ---------Delivery address and Time-------------- */}
                    //     {product.pickup_delivery === 2 && (
                    //       <div>
                    //         <CFormSelect
                    //           className=""
                    //           name="delivery_address"
                    //           required
                    //           value={product.customer_delivery_address.id}
                    //           onChange={(e) =>
                    //             handleCustomerDeliveryAddressChange(
                    //               e,
                    //               product.temp_id
                    //             )
                    //           }
                    //         >
                    //           <option value="">Select Delivery</option>
                    //           {customerDeliveryAddress.map((add) => (
                    //             <option key={add.id} value={add.id}>
                    //               {add.address}
                    //             </option>
                    //           ))}
                    //         </CFormSelect>
                    //         <span className="text-blue font-medium">
                    //           Delivery Time
                    //         </span>
                    //         <br />
                    //         <span>9:00 - 2:00</span>
                    //       </div>
                    //     )}

                    //     {/* ---------Pickup location and time */}
                    //     {product.pickup_delivery === 1 && (
                    //       <div>
                    //         <span className="text-blue font-medium">
                    //           Pickup Location
                    //         </span>
                    //         <br />
                    //         <span className="">
                    //           Order should be picked up from:
                    //         </span>
                    //         <br />
                    //         <span className="text-gray">
                    //           350 Bay Street, Toronto, Ontario M3M 2K4
                    //           {product.VendorLocation
                    //             ? `${product.VendorLocation?.address}, ${product.VendorLocation?.CitiesAll?.city}, ${product.VendorLocation?.CitiesAll?.state}`
                    //             : "N/A"}
                    //         </span>
                    //         <br />
                    //         <br />
                    //         <span className="text-blue font-medium">
                    //           Pickup Times
                    //         </span>
                    //         <br />
                    //         <span className="">9:00am-2:00PM</span>
                    //       </div>
                    //     )}

                    //     {/* ------------Freequency ------------- */}
                    //     <CFormSelect
                    //       className="mt-2"
                    //       name="frequency"
                    //       value={product.frequency.id}
                    //       required
                    //       onChange={(e) =>
                    //         handleFrequencyChange(e, product.temp_id)
                    //       }
                    //     >
                    //       <option value="">Select Frequency</option>
                    //       {product.VendorPackagePrices.map((op) => (
                    //         <option key={op.id} value={op.id}>
                    //           {op.frequency} - {op.method}
                    //         </option>
                    //       ))}
                    //     </CFormSelect>
                    //     {/* --------------------Frequency Name---------- */}
                    //     <CFormInput
                    //       className="mt-2"
                    //       name="user_package_name"
                    //       value={product.user_package_name}
                    //       required
                    //       placeholder="Package Name"
                    //       onChange={(e) => handleChange(e, product.temp_id)}
                    //     />
                    //     <CRow>
                    //       {/* -----------------Date Picker------- */}
                    //       <CCol>
                    //         <DatePicker
                    //           selected={
                    //             new Date(product.start_date + "T00:00:00")
                    //           }
                    //           onChange={(date) =>
                    //             setDate(`start_date`, date, product.temp_id)
                    //           }
                    //           dateFormat="yyyy-MM-dd"
                    //           className="form-control w-100 mt-2"
                    //         />
                    //       </CCol>
                    //     </CRow>
                    //     {product.frequency.cost && (
                    //       <p className="text-danger text-center">
                    //         ${product.frequency.cost}&nbsp;
                    //         {product.frequency.frequency}
                    //       </p>
                    //     )}
                    //   </div>
                    // </div>
                    <Frequency
                      key={product.id}
                      product={product}
                      setDate={setDate}
                      customerDeliveryAddress={customerDeliveryAddress}
                      removePackage={removePackage}
                      handlePickupCheck={handlePickupCheck}
                      handleDeliveryCheck={handleDeliveryCheck}
                      handleFrequencyChange={handleFrequencyChange}
                      handleTimeSlotChange={handleTimeSlotChange}
                      handleFrequencyInputChange={handleFrequencyInputChange}
                      handleCustomerDeliveryAddressChange={
                        handleCustomerDeliveryAddressChange
                      }
                    />
                  ))}
                </div>

                <div className="text-center">
                  {products.length > 0 && (
                    <CButton
                      className="px-5"
                      type="submit"
                      onClick={handleSavePackages}
                    >
                      Next
                    </CButton>
                  )}
                </div>
              </CForm>
            </div>
            <CCol></CCol>
          </CCol>
        </CRow>
      </div>
      <CustomerDashboardFooter />
    </main>
  );
};

export default AddPackage;
