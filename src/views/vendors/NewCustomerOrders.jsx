import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormLabel,
  CRow,
} from "@coreui/react";
import {
  getCustomerOrders,
  getCustomersByOrderDate,
  updateCustomerOrder,
} from "../../actions/vendorReducers/VendorActions";
import { saveAllCustomerOrders } from "../../actions/customerReducer/CustomerActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDateFromString } from "../../utils/Helper";
import { handleUserRole } from "../../utils/Helper";
const NewCustomerOrder = () => {
  const dispatch = useDispatch();
  const [customerOrders, setCustomerOrders] = useState([]);

  // const [vendorPackageList, setVendorPackageList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    handleUserRole(["Owner", "Manager"]);
  }, []);
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  const fetchData = async () => {
    try {
      const date = new Date();
      console.log("date", date);
      setSelectedDate(date);
      const response = await dispatch(
        getCustomersByOrderDate({
          selected_date: getDateFromString(date),
        })
      );
      setCustomerOrders(response);

      // const currentDate = new Date();
      // const dateObject = new Date(currentDate);

      // const isoString = dateObject.toISOString().split("T")[0];

      // console.log(isoString);
      // const orders = response.filter((order) => {
      //   const date = order.order_date.split("T")[0];
      //   return date === isoString; // Replace specificDate with the desired date object
      // });
      console.log(orders);
      setCustomerOrders(orders);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  const handleSelectedDate = async (date) => {
    try {
      setSelectedDate(date);
      console.log(date);
      const response = await dispatch(
        getCustomersByOrderDate({ selected_date: getDateFromString(date) })
      );
      const currentDate = new Date(date);
      const dateObject = new Date(currentDate);

      const isoString = dateObject.toISOString().split("T")[0];

      console.log(response);
      const orders = response;
      console.log("ord", orders);
      setCustomerOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOnClickFinalize = async () => {
  //     console.log(customerOrders, 'customerOrders');
  //     let dataToSend = [];
  //     for(let i=0; i < customerOrders.length ; i++) {
  //         for(let j=0; j < customerOrders[i].CustomerPackages.length; j++) {
  //             dataToSend.push(customerOrders[i].CustomerPackages[i]);
  //         }
  //     }
  //     try {
  //         const response = await dispatch(saveAllCustomerOrders(dataToSend));
  //         console.log(response);

  //     } catch (error) {
  //           console.log(error)
  //     }
  // }

  const handleIsReady = async (val, id) => {
    try {
      const isReady = val ? 1 : 0;
      console.log(val, isReady);
      const res = await dispatch(
        updateCustomerOrder({ is_ready: isReady, id })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>New Customer Orders</h3>
              <div>
                <CRow>
                  <CCol className="col-6">
                    <CButton
                      className="btn"
                      // onClick={handleOnClickFinalize}
                    >
                      Finalize order{" "}
                    </CButton>
                  </CCol>

                  <CCol className="col-2">
                    <CFormLabel className="mt-2" htmlFor="postal_code">
                      Date
                    </CFormLabel>
                  </CCol>
                  <CCol className="col-4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => handleSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control w-100"
                    />
                  </CCol>
                </CRow>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {customerOrders &&
                customerOrders.map((item, index) => (
                  <CCol key={index} className="order-box col-2 px-2 py-2">
                    <h5 className="text-capitalize fw-bold">{`${
                      item.UserCustomer
                        ? item.UserCustomer.first_name
                        : "Unknown"
                    } ${
                      item.UserCustomer ? item.UserCustomer.last_name : ""
                    }`}</h5>
                    <p className="text-danger my-0">
                      {item.Package
                        ? item.Package.VendorPackage.Package_name
                        : "Not Provided"}
                    </p>
                    <p className="fw-bold  my-0">Order ID : {item.id}</p>
                    <p className="fw-bold  my-0">
                      {item.UserCustomer
                        ? item.UserCustomer.phone
                        : "no number provided"}
                    </p>
                    {item.CustomerOrderItems.length > 0 ? (
                      item.CustomerOrderItems.map(
                        (oitem, index) => (
                          <div key={index}>
                            {/* <p className="my-0 text-gray" key="id">
                              Order Id:
                            </p> */}

                            <p className="my-0 text-gray">
                              {oitem.VendorMenuItem ? (
                                <>✔ {oitem.VendorMenuItem.item_name}</>
                              ) : (
                                "Name not provided"
                              )}
                            </p>
                          </div>
                        )
                        // <h1 key="index">index</h1>
                      )
                    ) : (
                      <>no order yet</>
                    )}
                    <div className="d-flex justify-content-between">
                      <p>Mark as Ready</p>
                      <CFormCheck
                        className="order-check"
                        id="flexCheckDefault"
                        defaultChecked={item.is_ready === 1 && true}
                        onChange={(e) =>
                          handleIsReady(e.target.checked, item.id)
                        }
                      />
                      {/* <input
                        type="checkbox"
                        onChange={(e) => console.log(e.target.checked)}
                      /> */}
                    </div>
                  </CCol>
                  // <h1 key={index}>{index}</h1>
                ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    // <h1> Customer Order page</h1>
  );
};

export default NewCustomerOrder;
