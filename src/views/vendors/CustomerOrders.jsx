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
import { getCustomerOrders } from "../../actions/vendorReducers/VendorActions";
import { saveAllCustomerOrders } from "../../actions/customerReducer/CustomerActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDateFromString } from "../../utils/Helper";
import { handleUserRole } from "../../utils/Helper";
import NewCustomerOrder from "./NewCustomerOrders";
const CustomerOrders = () => {
  const dispatch = useDispatch();
  const [customerOrders, setCustomerOrders] = useState([]);

  const [vendorPackageList, setVendorPackageList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    handleUserRole(["Admin", "Manager"]);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          getCustomerOrders({ selected_date: getDateFromString(new Date()) })
        );
        setCustomerOrders(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSelectedDate = async (date) => {
    console.log(getDateFromString(date));
    console.log("In old customers");
    setSelectedDate(date);
    const response = await dispatch(
      getCustomerOrders({ selected_date: getDateFromString(date) })
    );
    setCustomerOrders(response.data);
  };
  const handleOnClickFinalize = async () => {
    console.log(customerOrders, "customerOrders");
    let dataToSend = [];
    for (let i = 0; i < customerOrders.length; i++) {
      for (let j = 0; j < customerOrders[i].CustomerPackages.length; j++) {
        dataToSend.push(customerOrders[i].CustomerPackages[i]);
      }
    }
    try {
      const response = await dispatch(saveAllCustomerOrders(dataToSend));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CRow>
      <CCol>
        <NewCustomerOrder />
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>Customer Packages</h3>
              <div>
                <CRow>
                  <CCol className="col-6">
                    <CButton className="btn" onClick={handleOnClickFinalize}>
                      Finalize order
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
                    <h5 className="text-capitalize fw-bold">{`${item.first_name} ${item.last_name}`}</h5>
                    <p className="text-danger my-0">
                      {item.CustomerPackages[0].VendorPackage.package_name}
                    </p>
                    <p className="fw-bold  my-0">
                      Order ID : id - {item.CustomerPackages[0].id}
                    </p>
                    <p className="fw-bold  my-0">{item.phone}</p>
                    {item.CustomerPackages[0].VendorPackage.VendorPackageDefaultItems.map(
                      (oitem, index) => (
                        <div key={index}>
                          {oitem.VendorPackageMenuItem && (
                            <p className="my-0 text-gray" key={oitem.id}>
                              {oitem.VendorPackageMenuItem.item_name}
                            </p>
                          )}

                          <p className="my-0 text-gray">{oitem.item_name}</p>
                        </div>
                        // <h1 key={index}> {index}</h1>
                      )
                    )}
                    <div className="d-flex justify-content-between">
                      <p>Mark as Ready</p>
                      <CFormCheck
                        className="order-check"
                        id="flexCheckDefault"
                      />
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

export default CustomerOrders;
