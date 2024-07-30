import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
} from "@coreui/react";
import {
  getCustomers,
  getVendorSettings,
  setPaymentStatus,
} from "../../actions/vendorReducers/VendorActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  getDateFromString,
  handleUserRole,
} from "../../utils/Helper";
import { Toast } from "../../components/app/Toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  cancelCustomerPackage,
  getOrderCancelationDates,
  getOrderCreationDates,
  renewPckageSubscription,
} from "../../actions/customerReducer/CustomerActions";
import OrderCreationPopup from "../../components/Popup/OrderCreationPopup";
import CancelPopup from "../../components/Popup/CancelPopup";
import { useDisclosure } from "@nextui-org/react";
import LimitModal from "../../components/Modals/LimitModal";
const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customersData, setCustomersData] = useState([]);
  const [nestedPackages, setNestedPackages] = useState({
    customer_id: 0,
    packages: [],
  });
  const [popup, setPopup] = useState({
    show: false,
    dates: [],
    customer_name: "",
  });

  const [cancelPopup, setCancelPopup] = useState({
    show: false,
    dates: [],
    customer_name: "",
  });

  const [reqObj, setReqObj] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [limit, setLimit] = useState();
  useEffect(() => {
    handleUserRole("Owner");
  }, []);

  const fetchData = async () => {
    try {
      const response = await dispatch(getCustomers());
      setCustomersData(response.data);

      // console.log(response.temp);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const getValidDate = (dateStr) => {
    if (dateStr.length < 5) return "N/A";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateStr + "T00:00:00");
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handlePaymentStatus = async (userId, customer_package, value) => {
    if (!customer_package) {
      return Toast({
        message: "There is no package added to this user.",
        type: "error",
      });
    }
    const response = await dispatch(
      setPaymentStatus({ value, userId, customer_package })
    );
    if (response.success) {
      Toast({ message: "Payment status updated.", type: "success" });
    } else {
      Toast({
        message: "There is some error while updating payment status.",
        type: "error",
      });
    }
  };

  const handleAddCustomer = async () => {
    const checkLimit = await dispatch(getVendorSettings());

    if (
      (checkLimit.data.no_of_customers ||
        checkLimit.data.no_of_customers == 0) &&
      customersData.length >= checkLimit.data.no_of_customers
    ) {
      setLimit(checkLimit.data.no_of_customers);
      onOpen();
    } else {
      navigate(`/manage/add-customer`);
    }
  };
  const handleEditCustomer = (id) => {
    navigate(`/manage/customers/${id}`);
  };
  // console.log(nestedPackages);

  const handleShowPackage = (customer_id) => {
    if (nestedPackages.customer_id === 0) {
      const allPackages = customersData
        .filter((cus) => cus.id === customer_id)[0]
        .CustomerPackages.map((pack) => {
          return {
            ...pack,
            increseCount: 30,
            increseStart: new Date().toISOString().split("T")[0],
          };
        });

      setNestedPackages({ customer_id, packages: allPackages });
    } else {
      setNestedPackages({ customer_id: 0, packages: [] });
    }
  };

  const handlePackageIncreseCountChange = (e, id) => {
    if (e.target.value > 60 || e.target.value < 1) return;
    const updatedPackages = nestedPackages.packages.map((pack) =>
      pack.id === id ? { ...pack, increseCount: e.target.value } : pack
    );
    setNestedPackages({ ...nestedPackages, packages: updatedPackages });
  };
  const handleIncreaseDate = (date, id) => {
    const updatedPackages = nestedPackages.packages.map((pack) =>
      pack.id === id ? { ...pack, increseStart: getDateFromString(date) } : pack
    );
    setNestedPackages({ ...nestedPackages, packages: updatedPackages });
  };
  const handleCreatePackage = async (id, customer) => {
    const clickedPackage = nestedPackages.packages.filter(
      (pack) => pack.id === id
    );
    let tempReqObj;

    clickedPackage.forEach((pack) => {
      // Saving the end date of the package
      const start_date = pack.increseStart;
      const date = new Date(start_date + "T00:00:00");
      // Add the specified number of days
      date.setDate(date.getDate() + (parseInt(pack.increseCount) - 1));
      // Format the result as yyyy-mm-dd
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const end_date = `${year}-${month}-${day}`;
      const { id, package_id } = pack;
      tempReqObj = {
        customer_package_id: id,
        package_id,
        start_date,
        end_date,
      };
    });
    setReqObj(tempReqObj);

    try {
      const res = await dispatch(
        getOrderCreationDates({
          customer_id: nestedPackages.customer_id,
          ...tempReqObj,
        })
      );
      setPopup({
        show: true,
        dates: res.data,
        customer_name: `${customer.first_name}`,
      });
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };
  const handleCancelPackage = async (id, customer) => {
    const clickedPackage = nestedPackages.packages.filter(
      (pack) => pack.id === id
    );
    let tempReqObj;

    clickedPackage.forEach((pack) => {
      const { id, package_id } = pack;
      tempReqObj = {
        customer_package_id: id,
        package_id,
      };
    });
    setReqObj(tempReqObj);

    try {
      const res = await dispatch(
        getOrderCancelationDates({
          customer_id: nestedPackages.customer_id,
          ...tempReqObj,
        })
      );
      setCancelPopup({
        show: true,
        dates: res.data,
        customer_name: `${customer.first_name}`,
      });
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const handlePopupClick = async (str) => {
    if (str === "Confirm") {
      try {
        const res = await dispatch(
          renewPckageSubscription({
            customer_id: nestedPackages.customer_id,
            packages: reqObj,
          })
        );
        setPopup({
          show: false,
          dates: [],
          customer_name: "",
        });
        // fetchData();
        // handleShowPackage(nestedPackages.customer_id);
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

  const handleCancelPopupClick = async (str, reason, dates) => {
    if (str === "Confirm") {
      try {
        console.log("Confirm");
        const res = await dispatch(
          cancelCustomerPackage({
            customer_id: nestedPackages.customer_id,
            reason: reason,
            dates,
            ...reqObj,
          })
        );
        setCancelPopup({
          show: false,
          dates: [],
          customer_name: "",
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    setCancelPopup({
      show: false,
      dates: [],
      customer_name: "",
    });
  };

  return (
    <CRow>
      <CCol>
        <LimitModal
          name={"customers"}
          limit={limit}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>Customers</h3>
              <CButton
                className="float-end text-white"
                color="info"
                onClick={handleAddCustomer}
              >
                Add Customer
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <table className="table striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Package</th>
                  <th>Added on</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customersData &&
                  customersData.map((item, index) => (
                    <>
                      {/* Customer Data */}
                      <tr key={item.id}>
                        <td>
                          {item.first_name}&nbsp;
                          <button
                            className="bg-blue border-none outline-none px-10x rounded text-lg text-white"
                            onClick={() => handleShowPackage(item.id)}
                          >
                            {nestedPackages.customer_id === item.id ? "-" : "+"}
                          </button>
                        </td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          {item.CustomerPackage &&
                            item?.CustomerPackage?.VendorPackage?.package_name}
                        </td>
                        <td>{getDateFromString(item.created_date)}</td>
                        {/* --------------Payment Dropdown---------------- */}
                        <td>
                          <CFormSelect
                            name="payment_status"
                            value={item.payment_status}
                            onChange={(e) =>
                              handlePaymentStatus(
                                item.id,
                                item?.CustomerPackage?.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="1">Paid</option>
                            <option value="0">Un-Paid</option>
                          </CFormSelect>
                        </td>
                        <td>
                          <CButton onClick={() => handleEditCustomer(item.id)}>
                            Edit
                          </CButton>
                        </td>
                      </tr>
                      {/* Customer packages Data */}
                      {nestedPackages.customer_id === item.id && (
                        <tr className="">
                          <td colSpan="8">
                            <div className="">
                              <table className="table striped">
                                <thead>
                                  <tr>
                                    <th> Package Name</th>
                                    <th> Upcoming Orders</th>
                                    <th> Subscription Expiry</th>
                                    <th> Renew</th>
                                    <th> </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {nestedPackages.packages.length >= 0 &&
                                    nestedPackages.packages.map((pack) => (
                                      <tr key={pack.id}>
                                        <td>
                                          {pack.VendorPackage.package_name}
                                        </td>
                                        <td>{pack.order_count}</td>
                                        <td>{getValidDate(pack.order_end)}</td>
                                        <td>
                                          Renew for &nbsp;
                                          <input
                                            type="number"
                                            name="renewDayCount"
                                            id=""
                                            min="1"
                                            max="60"
                                            value={pack.increseCount}
                                            onChange={(e) => {
                                              handlePackageIncreseCountChange(
                                                e,
                                                pack.id
                                              );
                                            }}
                                          />
                                          &nbsp; days from
                                          <div className="inline-block">
                                            <DatePicker
                                              // selected={pack.increseStart}
                                              selected={
                                                new Date(
                                                  pack.increseStart +
                                                    "T00:00:00"
                                                )
                                              }
                                              onChange={(date) =>
                                                handleIncreaseDate(
                                                  date,
                                                  pack.id
                                                )
                                              }
                                              dateFormat="yyyy-MM-dd"
                                              className="form-control w-100 mt-2"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <CButton
                                            onClick={() =>
                                              handleCreatePackage(pack.id, item)
                                            }
                                          >
                                            Create
                                          </CButton>
                                          <CButton
                                            color="danger"
                                            className="text-white mx-5x"
                                            onClick={() =>
                                              handleCancelPackage(pack.id, item)
                                            }
                                          >
                                            Cancel
                                          </CButton>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      {popup.show && (
        <OrderCreationPopup
          dates={popup.dates}
          customer_name={popup.customer_name}
          handlePopupClick={handlePopupClick}
        />
      )}
      {cancelPopup.show && (
        <CancelPopup
          dates={cancelPopup.dates}
          customer_name={cancelPopup.customer_name}
          handlePopupClick={handleCancelPopupClick}
        />
      )}
    </CRow>
  );
};

export default Customers;
