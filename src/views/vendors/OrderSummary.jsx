import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
} from "@coreui/react";
import {
  getOrderSummary,
  getPackageOrderSummary,
} from "../../actions/vendorReducers/VendorActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { arrayBufferToBase64, getDateFromString } from "../../utils/Helper";
import { handleUserRole } from "../../utils/Helper";
const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ordersSummaryData, setOrdersSummaryData] = useState([]);
  const [packageSummaryData, setPackageSummaryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");

  useEffect(() => {
    handleUserRole(["Owner", "Manager"]);
    const date = new Date();
    handleSummarySelectedDate(date);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          getOrderSummary({ selected_date: "2024-02-18T00:00:00" })
        );
        setOrdersSummaryData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const getCurrentFormattedDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const handleSelectedDate = async (date) => {
    // console.log(getDateFromString(date)+"T00:00:00")
    setSelectedDate(date);
    const response = await dispatch(
      getOrderSummary({ selected_date: getDateFromString(date) + "T00:00:00" })
    );
    setOrdersSummaryData(response.data);
  };
  const handleSummarySelectedDate = async (date) => {
    console.log(date);
    setSelectedDate2(date);
    const response = await dispatch(
      getPackageOrderSummary({
        selected_date: getDateFromString(date),
      })
    );

    const getPackageSummary = response.data.map((item) => {
      const orderItems = item.CustomerOrders.map((order) => {
        return order.CustomerOrderItems.map((i) => ({ ...i, count: 1 }));
      }).flat();

      const uniqueObjects = orderItems.reduce((accumulator, current) => {
        const existing = accumulator.find(
          (obj) => obj.item_id === current.item_id
        );
        if (existing) {
          existing.count += 1;
        } else {
          accumulator.push({ ...current });
        }
        return accumulator;
      }, []);

      console.log(uniqueObjects);
      return { ...item, UniqueOrders: uniqueObjects };
    });

    console.log(getPackageSummary);
    setPackageSummaryData(getPackageSummary);
  };

  return (
    <CRow className="flex flex-col gap-2">
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>Orders Summary</h3>
              <div>
                <CRow>
                  <CCol className="col-2">
                    <CFormLabel className="mt-2" htmlFor="postal_code">
                      Date
                    </CFormLabel>
                  </CCol>
                  <CCol className="col-8">
                    <DatePicker
                      selected={selectedDate2}
                      onChange={(date) => handleSummarySelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control w-100"
                    />
                  </CCol>
                </CRow>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            {packageSummaryData.map((item) => (
              <>
                <p className="bg-gray-300 p-1 font-bold">
                  {item.package_name} - {item.CustomerOrders.length} Orders
                </p>
                <div>
                  {item.UniqueOrders.map((menuItem) => (
                    <p>
                      {" "}
                      <span className="font-semibold">
                        - {menuItem.count} units{" "}
                      </span>
                      - {menuItem.VendorMenuItem.item_name} (
                      {menuItem.VendorMenuItem.quantity}{" "}
                      {menuItem.VendorMenuItem.units})
                    </p>
                  ))}
                </div>
              </>
            ))}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>Orders Summary</h3>
              <div>
                <CRow>
                  <CCol className="col-2">
                    <CFormLabel className="mt-2" htmlFor="postal_code">
                      Date
                    </CFormLabel>
                  </CCol>
                  <CCol className="col-8">
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
              {ordersSummaryData &&
                ordersSummaryData.map((item, index) => (
                  <CCol
                    key={index}
                    className="col-2 order-box background-yellow"
                  >
                    <CRow>
                      {item.image && item.image.data.length > 0 && (
                        <CCol>
                          <div className="d-flex justify-content-center px-0 mx-0 mt-2">
                            <img
                              width={100}
                              height={75}
                              className="mt-3"
                              src={`data:image/jpeg;base64,${arrayBufferToBase64(
                                item.image.data
                              )}`}
                              alt=""
                            />
                          </div>
                        </CCol>
                      )}
                      <CCol className="px-0 mx-0 ">
                        <h1 className="text-center display-1">{item.count}</h1>
                        <h6 className="text-capitalize text-center">
                          {item.item_name}
                        </h6>
                        <p className="text-center">
                          {" "}
                          {item.quantity} {item.units}
                        </p>
                      </CCol>
                    </CRow>
                  </CCol>
                ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default OrderSummary;
