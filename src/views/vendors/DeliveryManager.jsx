import React, { useEffect, useState } from "react";

import { FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addDriver,
  getVendorCities,
  getVendorDrivers,
  getVendorSettings,
} from "../../actions/vendorReducers/VendorActions";
import { Button, Modal, Select } from "antd";
import { Input, useDisclosure } from "@nextui-org/react";
import { CFormLabel, CFormSelect } from "@coreui/react";
import LimitModal from "../../components/Modals/LimitModal";
import PhoneInput from "react-phone-input-2";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Toast } from "../../components/app/Toast";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  const [options, setOptions] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [limit, setLimit] = useState();
  const handleAddCountry = () => {
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
      setInfo(res.data.VendorEmployees);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getVendorDriver();
    const fetchData = async () => {
      try {
        const response = await dispatch(getVendorCities());
        const opt = response.data.map((city) => ({
          id: city.id,
          // label: `${city.VendorLocation?.CitiesAll?.city}-${city.VendorLocation?.PostalRegion?.POSTAL_CODE}`,
          // value: `${city.VendorLocation.CitiesAll.city}-${city.VendorLocation?.PostalRegion?.POSTAL_CODE}`,
          label: `${city.VendorLocation?.location_name}`,
          value: `${city.VendorLocation.location_name}`,
        }));
        setOptions(opt);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, []);
  const showModal = async () => {
    const checkLimit = await dispatch(getVendorSettings());

    if (
      (checkLimit.data.no_of_drivers || checkLimit.data.no_of_drivers == 0) &&
      info.length >= checkLimit.data.no_of_drivers
    ) {
      setLimit(checkLimit.data.no_of_drivers);
      onOpen();
    } else {
      setOpen(true);
    }
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
      if (response.success) {
        getVendorDriver();

        setEmail("");
        setFirstName("");
        setLastName("");
        setPhoneNo("");
        setSelectedKeys([]);
        setSelectedCities([]);
        Toast({ message: response.message, type: "success" });
        setOpen(false);
      }
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

  useEffect(() => {
    console.log("selectedCities", selectedCities);
  }, [selectedCities]);
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
      <LimitModal
        name={"packages"}
        limit={limit}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
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
            width={"60%"}
            onCancel={handleCancel}
          >
            {errorMsg && <p className="text-danger fs-3">{errorMsg}</p>}
            <div className=" flex flex-wrap justify-center ">
              <span
                className="w-full flex gap-5 p-2 "
                style={{ width: "100%" }}
              >
                <span className="w-full flex flex-col">
                  <TextField
                    type="text"
                    label="First Name"
                    className="rounded-md fs-5 w-full"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </span>
                <span className="w-full flex flex-col">
                  <TextField
                    type="text"
                    label="Last Name"
                    className="rounded-md fs-5 w-full"
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
                  <TextField
                    type="email"
                    label="Email"
                    className="rounded-md fs-5 w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
                <span className="w-full flex flex-col">
                  {/* <label htmlFor="" className="fs-6">
                    Phone
                  </label> */}
                  <PhoneInput
                    country={"ca"}
                    enableSearch={true}
                    inputStyle={{ width: "100%", height: "54px" }}
                    value={phoneNo}
                    onChange={(phone) => setPhoneNo(phone)}
                    required
                  />
                </span>
              </span>
              <span className="w-full flex flex-col  p-2 items-center">
                <span
                  className="d-flex gap-2 justify-between"
                  // style={{ width: "50%" }}
                >
                  <span className="flex flex-col">
                    <p className="font-semibold fs-5">
                      {" "}
                      Assign Driver Location
                    </p>
                    <p className="font-semibold">
                      Which locations does the driver work for?
                    </p>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={options}
                      disableCloseOnSelect
                      value={selectedCities.map((item) => ({
                        label: `${item.VendorLocation?.location_name}`,
                        value: `${item.VendorLocation.location_name}`,
                        id: item.id,
                      }))}
                      onChange={(e, value) => {
                        const data = value.map((item) => {
                          const city = cities.find((val) => val.id === item.id);
                          return city;
                        });
                        setSelectedCities(data);
                      }}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                          <li key={key} {...optionProps}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.label}
                          </li>
                        );
                      }}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Checkboxes"
                          placeholder="Favorites"
                        />
                      )}
                    />

                    <p>
                      Onec you select a location, the delivery postal codes will
                      be automatically be populated on the right. You can remove
                      areas they don't deliver to by removing specific postal
                      codes.
                    </p>
                  </span>
                  <span>
                    {selectedCities.length > 0 && (
                      <span>
                        <span className="font-semibold text-[16px]">
                          Assign Delivery Areas
                        </span>
                        {selectedCities.map((city, index) => (
                          <div className="flex flex-col gap-2">
                            <span className="font-semibold text-[14px]">
                              {city.VendorLocation.location_name}:
                            </span>
                            <span className="flex flex-col gap-1 items-end">
                              <span
                                onClick={() =>
                                  setSelectedCities((pre) =>
                                    pre.filter(
                                      (item, ind) => ind != index && { ...item }
                                    )
                                  )
                                }
                                className="cursor-pointer text-red-500"
                              >
                                REMOVE
                              </span>
                              <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={city.VendorLocation.VendorLocationPostalRegions.map(
                                  (item) => ({
                                    label: item.PostalRegion.POSTAL_CODE,
                                    value: item.PostalRegion.POSTAL_CODE,
                                    id: item.id,
                                  })
                                )}
                                value={city.VendorLocation.VendorLocationPostalRegions.map(
                                  (item) => ({
                                    label: item.PostalRegion.POSTAL_CODE,
                                    value: item.PostalRegion.POSTAL_CODE,
                                    id: item.id,
                                  })
                                )}
                                disableCloseOnSelect
                                onChange={(e, value) => {
                                  const ids = value.map((item) => item.id);

                                  const postalCodes = selectedCities[
                                    index
                                  ].VendorLocation.VendorLocationPostalRegions.filter(
                                    (item) => ids.includes(item.id)
                                  );
                                  setSelectedCities((pre) =>
                                    pre.map((item, ind) =>
                                      ind == index
                                        ? {
                                            ...item,
                                            VendorLocation: {
                                              ...item.VendorLocation,
                                              VendorLocationPostalRegions:
                                                postalCodes,
                                            },
                                          }
                                        : { ...item }
                                    )
                                  );
                                }}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option, { selected }) => {
                                  const { key, ...optionProps } = props;
                                  return (
                                    <li key={key} {...optionProps}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                      />
                                      {option.label}
                                    </li>
                                  );
                                }}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Checkboxes"
                                    placeholder="Favorites"
                                  />
                                )}
                              />
                            </span>
                          </div>
                        ))}
                      </span>
                    )}
                  </span>
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
            <span className="text-gray-600">
              {props.info.UserVendor.first_name}{" "}
              {props.info.UserVendor.last_name}
            </span>
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
