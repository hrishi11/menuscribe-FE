import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addDriver,
  getVendorCities,
  getVendorDrivers,
} from "../../actions/vendorReducers/VendorActions";
import { Button, Modal } from "antd";
import { Input } from "@nextui-org/react";
import { CFormLabel, CFormSelect } from "@coreui/react";

export default function DeliveryManager() {
  const [info, setInfo] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddCountry = () => {
    console.log(selectedKeys);
    const find = selectedKeys.map((name) => {
      const item = cities.find(
        (val) => val.VendorLocation.CitiesAll.city === name
      );
      return item;
    });

    setSelectedCities(find);
  };

  const getVendorDriver = async () => {
    try {
      const res = await dispatch(getVendorDrivers());
      setInfo(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getVendorDriver();
    const fetchData = async () => {
      try {
        const response = await dispatch(getVendorCities());

        setCities(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, []);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (email && firstName && lastName && phoneNo) {
      const response = await dispatch(
        addDriver({
          firstName,
          lastName,
          email,
          phoneNo,
          cities: selectedCities,
        })
      );

      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNo("");
      setSelectedKeys([]);
      setSelectedCities([]);
      setOpen(false);
    } else {
      setErrorMsg("Field Cannot Be Null");
    }
  };
  const handleCancel = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNo("");
    setSelectedKeys([]);
    setSelectedCities([]);
    setOpen(false);
  };

  const handleRemoveCity = (id) => {
    console.log("id", id);
    const result = selectedKeys.filter((item) => item !== `${id}`);
    console.log(result);
    const find = result.map((id) => {
      const item = cities.find((val) => val.VendorLocation.CitiesAll.id == id);
      return item;
    });

    setSelectedCities(find);
    setSelectedKeys(result);
  };
  return (
    <div>
      <h2>Requests</h2>
      <div className="p-2">
        <div className=" d-flex justify-content-end " style={{ width: "100%" }}>
          <button
            onClick={showModal}
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add Driver
          </button>
          <Modal
            title="Add Driver"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            width={"40%"}
            onCancel={handleCancel}
          >
            {errorMsg && <p className="text-danger fs-3">{errorMsg}</p>}
            <div className=" flex flex-wrap justify-center ">
              <span
                className="w-full flex gap-5 p-2 "
                style={{ width: "100%" }}
              >
                <span className="w-full flex flex-col">
                  <label htmlFor="" className="fs-6">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="fs-5"
                    //
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </span>
                <span className="w-full flex flex-col">
                  <label htmlFor="" className="fs-6">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className=" fs-5 w-full"
                    //
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </span>
              </span>
              <span
                className="w-full flex gap-5 p-2 "
                style={{ width: "100%" }}
              >
                <span className="w-full  flex flex-col">
                  <label htmlFor="" className="fs-6 ">
                    Email
                  </label>
                  <input
                    type="email"
                    className=" fs-5 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
                <span className="w-full flex flex-col">
                  <label htmlFor="" className="fs-6">
                    Phone
                  </label>
                  <span className="flex w-full gap-2  items-center">
                    <span className="text-2xl">+1</span>
                    <input
                      type="number"
                      className=" fs-5 w-full"
                      // style={{ width: "60%" }}
                      placeholder="Phone"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </span>
                </span>
              </span>
              <span className="w-full flex flex-col  p-2 items-center">
                {selectedCities.length > 0 && (
                  <>
                    {" "}
                    <h2 className="pt-4" style={{ width: "50%" }}>
                      Cities
                    </h2>
                    {selectedCities.map((item) => (
                      <span
                        className="fs-4 flex justify-between "
                        style={{ width: "50%" }}
                      >
                        <p>{item.VendorLocation.CitiesAll.city}</p>{" "}
                        <p
                          className="cursor-pointer"
                          style={{ color: "red" }}
                          onClick={() =>
                            handleRemoveCity(item.VendorLocation.CitiesAll.id)
                          }
                        >
                          X
                        </p>
                      </span>
                    ))}
                  </>
                )}

                <span
                  className="d-flex justify-between align-items-end"
                  style={{ width: "50%" }}
                >
                  <span className="">
                    <CFormLabel className=" fs-4">Cities</CFormLabel>
                    <CFormSelect
                      className="simple-input w-52"
                      style={{ width: "200px" }}
                      type="text"
                      name="city_id"
                      required
                      onChange={(e) => {
                        if (selectedKeys.includes(e.target.value)) {
                          return;
                        }
                        setSelectedKeys([...selectedKeys, e.target.value]);
                      }}
                    >
                      <option value="">Select</option>
                      {cities &&
                        cities.map((city) => {
                          if (city) {
                            return (
                              <option
                                disabled={
                                  selectedKeys.includes(
                                    city.VendorLocation.CitiesAll.city
                                  )
                                    ? true
                                    : false
                                }
                                key={city.id}
                                value={city.VendorLocation.CitiesAll.city}
                              >
                                {city.VendorLocation.CitiesAll.state}-
                                {city.VendorLocation.CitiesAll.city}
                              </option>
                            );
                          }
                        })}
                    </CFormSelect>
                  </span>
                  <button
                    onClick={handleAddCountry}
                    type="button"
                    className="border-none text-white  px-4"
                    style={{ height: "40px", backgroundColor: "#5190fc" }}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Add
                  </button>
                </span>
              </span>
            </div>
          </Modal>
        </div>
        <h5 className="fw-bold">My Drivers</h5>

        <div className="d-flex flex-col gap-3">
          {info.length > 0 && info.map((info) => <DetailCard info={info} />)}
        </div>
      </div>
    </div>
  );
}

const DetailCard = (props) => {
  const [info, setInfo] = useState(props.info);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [date, setDate] = useState();
  const [deliveries, setDeliveries] = useState([]);
  const [earning, setEarning] = useState(0);
  useEffect(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    setInfo(props.info);
    const complete = props.info.CustomerOrders.filter(
      (data) => data.is_ready === 1 && data.is_delivered === 1
    ).length;
    setCompleted(complete);
    setPending(
      props.info.CustomerOrders.filter(
        (data) => data.is_ready === 1 && data.is_delivered === 0
      ).length
    );

    setEarning(props.info.delivery_cost * complete);

    setDeliveries(props.info.CustomerOrders);
  }, [props.info]);

  useEffect(() => {
    if (date) {
      const data = props.info.CustomerOrders.filter(
        (data) => data.order_date === date
      );
      const complete = data.filter(
        (data) => data.is_ready === 1 && data.is_delivered === 1
      ).length;
      setCompleted(complete);
      setPending(
        data.filter((data) => data.is_ready === 1 && data.is_delivered === 0)
          .length
      );
      setEarning(complete * props.info.delivery_cost);
      setDeliveries(data);
    }
  }, [date]);
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="mainDiv border  w-full border-dark-subtle p-3 bg-white">
      {/* Top bar */}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex  flex-col py-4 fw-bold fs-5">
          <span className="d-flex gap-3">
            <FaTruck className="fs-2" />
            <span className="text-success">{props.info.driver_name}</span>
          </span>
          <span className="d-flex gap-2">
            <p className="text-success ">{completed} Completed</p>
            <p className="text-warning">({pending} Pending)</p>
          </span>
        </div>

        {/* mini cards */}
        <div className="d-flex flex-col gap-2 align-items-end">
          <input
            type="date"
            value={date}
            style={{ width: "150px" }}
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="d-flex gap-2">
            <p
              className="d-flex flex-col align-items-center fs-1  border border-none bg-success px-3 text-white"
              style={{ height: "110px" }}
            >
              {deliveries.length} <span className="fs-3">DELIVERIES</span>
            </p>
            <p
              className="d-flex flex-col align-items-center fs-1 border border-none bg-primary px-4 text-white "
              style={{ height: "110px" }}
            >
              ${earning.toFixed(2)} <span className="fs-3">EARNED</span>
            </p>
          </span>
        </div>
      </div>

      <div className={`py-3`}>
        {deliveries &&
          deliveries.map((item) => (
            <div className={`fs-4 d-flex justify-content-between ${"fs-6"}`}>
              <h5 className={`${isMobile && "fs-6 "} w-25`}>
                {item.UserCustomer
                  ? `${item.UserCustomer.first_name} ${item.UserCustomer.last_name}`
                  : "Unknown"}
              </h5>
              <p className={`text-primary  ${isMobile && "fs-6"} w-25`}>
                {item.UserCustomer?.address_1
                  ? `${item.UserCustomer.address_1}`
                  : "address not found"}
              </p>
              {item.is_delivered === 0 ? (
                <p className={`text-warning ${isMobile && "fs-6 "} w-25`}>
                  Pending
                </p>
              ) : (
                <p className={`text-success ${isMobile && "fs-6 "} w-25`}>
                  Completed
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

const Popup = () => {
  return (
    <div className="">
      <div
        className="modal fade position-absolute top-0"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
