import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import {
  checkDeletedTimeSlots,
  deletePackageTimeSlot,
  deleteVendorPackageCity,
  getAllDefaultItems,
  getPackageTimeSlots,
  getServingMeasurements,
  getVendorCategories,
  savePackageDays,
  updateDeliveryStatus,
  updateVendorPackageDefaultItems,
} from "../../actions/vendorReducers/VendorActions";
import { useEffect, useState } from "react";
import { InputNumber, Modal, Switch, TimePicker, Tooltip } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import { Radio, RadioGroup } from "@nextui-org/react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { OtherHouses } from "@mui/icons-material";
import { Toast } from "../app/Toast";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaSort } from "react-icons/fa";

const DefaultItem = ({
  packageId,
  setDates,
  defItems,
  dates,
  packagesData,
  packageDeactivated,
  pickUpDisabled,
  visible,
  setVisible,
  formData,
  handlePickUp,
  vendorPackagePrice,
  // handleInputChange,
  handledeleteDefaultItem,
  handleDelivery,
  deliveryDisabled,
  setFormData,
  fetchData,
  setUpdateTrigger,
  isSlotModalOpen,
  setIsSlotModalOpen,
}) => {
  const [measurements, setMeasurements] = useState([]);
  const [categories, setCategories] = useState([]);

  const [getCustomers, setGetCustomers] = useState([]);
  const [deliveryCustomers, setDeliveryCustomers] = useState([]);
  // const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [delSlot, setDelSlot] = useState({});
  const [sortDirection, setSortDirection] = useState("asc");
  const [defaultItems, setDefaultItems] = useState(
    packagesData.VendorPackageDefaultItems
  );

  useEffect(() => {
    setDefaultItems(packagesData.VendorPackageDefaultItems);
  }, [packagesData.VendorPackageDefaultItems]);

  const [popup, setPopup] = useState({
    show: false,
    // item: { item_name: "" },

    item_name: "",
    quantity: "",
    measurement: "",
    vendor_category: "",
  });
  const [today, setToday] = useState();

  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setConformDelete(false);
  };
  const handleDeleteOk = () => {
    setConformDelete(false);
  };
  const handleSlotOk = () => {
    setIsSlotModalOpen(false);
  };
  const handleInputChange = async (event) => {
    const { name, value, type, checked } = event.target;
    const FormD = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    const response = await dispatch(savePackageDays(FormD));
    if (response.success) {
      Toast({ message: "Days change saved successfully", type: "success" });
    } else {
      Toast({
        message: "Days change not saved. Package ID not found",
        type: "error",
      });
    }
    setFormData(FormD);
  };

  const handleItemClick = (item) => {
    console.log(item);
    setPopup({
      show: true,
      ...item,
      vendor_category: item.vendor_category_id,
    });
  };
  const handleItemInputChange = (e) => {
    setPopup({ ...popup, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    try {
      const res = await dispatch(
        updateVendorPackageDefaultItems({ ...popup, package_id: formData.id })
      );
      setPopup({
        show: false,
        item_name: "",
        // item: { item_name: "" },
        quantity: "",
        measurement: "",
        vendor_category: "",
      });
      fetchData();
    } catch (error) {
      console.log("Error saving default ite ");
    }
  };

  const fetchMeasurements = async (req, res) => {
    try {
      const res = await dispatch(getServingMeasurements());
      setMeasurements(res.data);
    } catch (error) {
      console.log("Error Fetching measurements");
    }
  };
  const fetchVendorCategories = async (req, res) => {
    try {
      const res = await dispatch(getVendorCategories());
      console.log("0000res", res.data);
      setCategories(res.data);
    } catch (error) {
      console.log("Error Fetching measurements");
    }
  };

  useEffect(() => {
    fetchMeasurements();
    fetchVendorCategories();
    const today = new Date();

    // Extract year, month, and day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(today.getDate()).padStart(2, "0");

    // Format the date
    const formattedDate = `${year}-${month}-${day}`;
    setToday(formattedDate);
  }, []);

  const handleDeletePackageCity = async (id) => {
    try {
      const data = { id: id, packageId: packagesData.id };
      const response = await dispatch(deleteVendorPackageCity(data));
      if (response.message === "can not delete this city") {
        console.log("data", response.data);
        const data = response.data.map((item) => {
          return {
            data: item.data.UserCustomer,
            futureOrder: item.futureOrders,
          };
        });

        setGetCustomers(data);

        setIsModalOpen(true);
        return;
      }
      setUpdateTrigger((prev) => !prev);
    } catch (error) {
      console.log("00000000000", error);
    }
  };

  const handleCustomerClick = (id) => {
    // navigate(`/manage/customers/${id}`);
    window.open(`http://localhost:5173/manage/customers/${id}`, "_blank");
  };

  const handleAddSlot = (data) => {
    setDates([...dates, data]);
  };

  const handleDeleteSlots = async (id, dumyNum) => {
    try {
      if (id) {
        try {
          // const check = dispatch(checkDeletedTimeSlots(id));
          const response = await dispatch(deletePackageTimeSlot(id));
          if (response.message === "Customer package with this slot") {
            setDeliveryCustomers(response.customers);
            setIsSlotModalOpen(true);
            setConformDelete(false);
            return;
          }

          setConformDelete(false);
          setUpdateTrigger(response);
        } catch (error) {
          console.log("error", error);
        }
      }
      if (dumyNum) {
        const data = dates.filter((item) => item.dumyNum !== dumyNum);
        console.log("dates", data);
        setDates(data);
        setConformDelete(false);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  const convertTimeSlot = (time) => {
    // Create a Date object and set the time
    const date = new Date();
    const [hours, minutes, seconds] = time.split(":");
    date.setHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    );

    // Convert the time to a formatted string
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };
  const handleToggleChange = async (e, status, method) => {
    console.log("event", e);
    const response = await dispatch(
      updateDeliveryStatus({
        id: packageId,
        data: { status: e, frequency: status, method },
      })
    );
    setUpdateTrigger(response);
  };
  const frequencyOrder = {
    daily: 1,
    weekly: 2,
    monthly: 3,
  };
  const sortByFrequency = (a, b) => {
    return frequencyOrder[a.frequency] - frequencyOrder[b.frequency];
  };

  const sortDefaultItems = () => {
    let sortedData;
    setDefaultItems([]);
    if (sortDirection === "asc") {
      sortedData = defaultItems.sort((a, b) => {
        return b.item_name.localeCompare(a.item_name);
      });
      setSortDirection("des");
    }
    if (sortDirection === "des") {
      sortedData = defaultItems.sort((a, b) => {
        return b.item_name.localeCompare(a.item_name);
      });
      setSortDirection("asc");
    }
    setDefaultItems(sortedData);
  };

  return (
    <div className="mb-3">
      {/* City Delete Erorr Model */}
      {/* <Modal
        title="Customers orders pending in this city"
        open={isSlotModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          There are customers who live in this city who currently have ACTIVE
          orders. Please click on customer blow to visit there customer profile.
          So you can canel their order.
        </p>
        <p>
          {getCustomers.length > 0 &&
            getCustomers.map((item) => {
              return (
                <button
                  onClick={() => handleCustomerClick(item.data.id)}
                  className="text-primary flex flex-col"
                >
                  {item.data.first_name} {item.data.last_name} (
                  {item.futureOrder.length} future orders)
                </button>
              );
            })}
        </p>
      </Modal> */}

      {/*  Conform Delete Slot Model */}
      {delSlot && (
        <Modal
          title="Conform Delete Delivery Slot"
          open={conformDelete}
          onOk={() => handleDeleteSlots(delSlot.id, delSlot.dumyNum)}
          onCancel={handleDeleteCancel}
        >
          <p>Please confirm you would like to delete this timeslot</p>
          <p className="text-blue-500 text-center">
            {delSlot.start_time ? convertTimeSlot(delSlot.start_time) : ""} -{" "}
            {delSlot.start_time ? convertTimeSlot(delSlot.end_time) : ""}
          </p>
        </Modal>
      )}

      {/* Delivery Slot Delete Erorr Model */}
      <Modal
        title="Customers packages with this Delivery Slot"
        open={isSlotModalOpen}
        // onOk={handleSlotOk}
        // onCancel={handleSlotCancel}
        cancelText={" "}
        footer={
          <button
            onClick={handleSlotOk}
            className="px-4 py-2 bg-blue-500 rounded-md text-white"
          >
            OK
          </button>
        }
      >
        {deliveryCustomers.length > 0 && (
          <>
            <p>
              There are currently {deliveryCustomers.length} customers scheduled
              for this timeslot. Please reschedule those customers before
              deleting this timeslot.
            </p>
            {/* <p>
              This timeslot '{delSlot.session}' cannot be deleted because there
              are customers currently on this timeslot. Please migrate the
              following customers to a new timeslot to proceed.
            </p>
            <p>
              <ul className="pl-5">
                {deliveryCustomers.length > 0 &&
                  deliveryCustomers.map((item) => {
                    return (
                      <li className="list-disc">
                        <button
                          onClick={() =>
                            handleCustomerClick(item.UserCustomer.id)
                          }
                          className="text-primary flex flex-col"
                        >
                          {item.UserCustomer.first_name}{" "}
                          {item.UserCustomer.last_name} -{" "}
                          {item.VendorPackage.package_name} (
                          {item.VendorPackageSlot.session})
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </p> */}
          </>
        )}
      </Modal>

      <p className="uppercase">Default Items</p>
      <CRow className=" max-sm:flex max-sm:gap-3 max-sm:flex-col">
        {/* Items */}
        <CCol className="col-6 border-end col-6-custome background">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="flex gap-2 items-center ">
                ITEM <FaSort onClick={sortDefaultItems} />
              </TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {defaultItems &&
                defaultItems.map((item) => (
                  <TableRow key="1">
                    <TableCell onClick={() => handleItemClick(item)}>
                      {item.item_name}{" "}
                      {item.VendorDefaultItem && (
                        <span>({item.VendorDefaultItem.name})</span>
                      )}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {!packageDeactivated && (
                        <>
                          {item.VendorPackageMenuItems?.length ? (
                            item.VendorPackageMenuItems.filter(
                              (item) => item.menu_date > today
                            ).length > 0 ? (
                              <Tooltip
                                title="This Package item is currently affiliated with items in the menu. Please delete the affiliated items from the menu first by visiting the Menu page"
                                color={"black"}
                              >
                                <AiOutlineInfoCircle className="" />
                              </Tooltip>
                            ) : (
                              <strong
                                className="text-danger cursor-pointer"
                                onClick={() => handledeleteDefaultItem(item.id)}
                              >
                                X
                              </strong>
                            )
                          ) : (
                            <strong
                              className="text-danger cursor-pointer"
                              onClick={() => handledeleteDefaultItem(item.id)}
                            >
                              X
                            </strong>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* {packagesData &&
            packagesData.VendorPackageDefaultItems &&
            packagesData.VendorPackageDefaultItems.map((item) => (
              <CRow key={item.id}>
                <CCol>
                  <CButton
                    className="bg-transparent text-black border-none outline-none"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.item_name}{" "}
                    {item.VendorDefaultItem && (
                      <span>({item.VendorDefaultItem.name})</span>
                    )}
                  </CButton>
                </CCol>

                <CCol className="flex-0">
                  {!packageDeactivated && (
                    <>
                      {item.VendorPackageMenuItems?.length ? (
                        item.VendorPackageMenuItems.filter(
                          (item) => item.menu_date > today
                        ).length > 0 ? (
                          <Tooltip
                            title="This Package item is currently affiliated with items in the menu. Please delete the affiliated items from the menu first by visiting the Menu page"
                            color={"black"}
                          >
                            <AiOutlineInfoCircle className="" />
                          </Tooltip>
                        ) : (
                          <strong
                            className="text-danger cursor-pointer"
                            onClick={() => handledeleteDefaultItem(item.id)}
                          >
                            X
                          </strong>
                        )
                      ) : (
                        <strong
                          className="text-danger cursor-pointer"
                          onClick={() => handledeleteDefaultItem(item.id)}
                        >
                          X
                        </strong>
                      )}
                    </>
                  )}
                </CCol>
              </CRow>
            ))} */}

          <CCol className="text-center mt-3">
            {!packageDeactivated && (
              <p
                className="cursor-pointer fw-bold h6 text-primary"
                // onClick={() => setVisible(!visible)}
                onClick={() =>
                  setPopup({
                    show: true,
                    item_name: "",
                    default_item_id: 0,
                    quantity: "",
                    measurement: "",
                    vendor_category: "",
                  })
                }
              >
                Add Item
              </p>
            )}
          </CCol>
          {/*------------Popup ----------------- */}
          {popup.show && (
            <CCol className="mt-3">
              {/*------------Title and Close Btn ----------------- */}

              <div className="flex justify-between">
                <h5> Modal title</h5>
                <CButton
                  color="danger"
                  className="text-white"
                  onClick={() => setPopup({ ...popup, show: false })}
                >
                  X
                </CButton>
              </div>
              <CFormLabel className="font-12">Default Item</CFormLabel>
              <CFormSelect
                className="simple-input"
                name="default_item_id"
                required
                value={popup.default_item_id}
                onChange={handleItemInputChange}
              >
                <option value={0}>Select</option>
                {defItems.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </CFormSelect>
              {/*------------Item Name ----------------- */}
              <CFormInput
                className="simple-input mt-3"
                type="text"
                name="item_name"
                required
                value={popup.item_name}
                onChange={handleItemInputChange}
              />

              {/* -------Quantity------- */}
              <div>
                <CFormLabel> Quantity </CFormLabel>
                <div className="flex gap-10x">
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="quantity"
                    required
                    value={popup.quantity}
                    //disabled={packageDeactivated}
                    onChange={handleItemInputChange}
                  />
                  <CFormSelect
                    value={popup.measurement}
                    onChange={handleItemInputChange}
                    name="measurement"
                  >
                    <option value="">Select</option>
                    {measurements.map((measurement) => (
                      <option key={measurement.id} value={measurement.plural}>
                        {measurement.plural}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              </div>
              {/* -------Category------- */}
              <div>
                <CFormLabel> Category </CFormLabel>

                <CFormSelect
                  value={popup.vendor_category}
                  onChange={handleItemInputChange}
                  name="vendor_category"
                >
                  <option value="">Select</option>
                  {categories.map((catogory) => (
                    <option key={catogory.id} value={catogory.id}>
                      {catogory.Category.category_plural}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              {/* -------Action Buttons------- */}
              <div className="flex justify-end gap-10x mt-3">
                <CButton
                  color="secondary"
                  onClick={() => setPopup({ ...popup, show: false })}
                >
                  Close
                </CButton>
                <CButton onClick={handleSave}> Save Changes</CButton>
              </div>
            </CCol>
          )}
        </CCol>
        {/* Available Days */}
        <CCol className="border-end">
          <CCol>
            <CFormSwitch
              name="sun"
              label="Sunday"
              onChange={handleInputChange}
              checked={formData.sun ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="mon"
              label="Monday"
              onChange={handleInputChange}
              checked={formData.mon ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="tue"
              label="Tuesday"
              onChange={handleInputChange}
              checked={formData.tue ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="wed"
              label="Wednesday"
              onChange={handleInputChange}
              checked={formData.wed ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="thu"
              label="Thursday"
              onChange={handleInputChange}
              checked={formData.thu ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="fri"
              label="Friday"
              onChange={handleInputChange}
              checked={formData.fri ? true : false}
              disabled={packageDeactivated}
            />
            <CFormSwitch
              name="sat"
              label="Saturday"
              onChange={handleInputChange}
              checked={formData.sat ? true : false}
              disabled={packageDeactivated}
            />
          </CCol>
        </CCol>
      </CRow>

      <CRow className="mt-3 flex flex-wrap max-sm:flex-col p-2 border-top background">
        {/* Time Slots */}
        {/* <CCol className="w-[50%] border-2 border-red-600"> */}
        <CCol className="border-r-2">
          <CCol>
            <h5>Delivery/Pickup Timeslots</h5>
          </CCol>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimeField", "TimeField"]}>
              <div className="flex flex-col  lg:w-[600px] ">
                {/* ----------------------------Delivery Date Slots----------------------------- */}

                <p className="w-full  text-[18px]  flex gap-2 items-center pl-3 font-semibold pt-2 pb-2 bg-gray-200">
                  <CFormSwitch
                    label="Delivery"
                    name="delivery"
                    onChange={handleDelivery}
                    checked={formData.delivery}
                    disabled={packageDeactivated}
                  />
                </p>
                <div className="flex flex-col  mb-3">
                  {/* ----Frequency with price----- */}
                  <div className="flex gap-3 items-center">
                    <div className="w-full  flex flex-col items-center ">
                      {vendorPackagePrice
                        .filter((item) => item.method === "delivery")
                        .sort(sortByFrequency)
                        .map((item) => (
                          <div className="flex gap-5 justify-between w-[300px] ">
                            <p className="font-semibold p-1 flex gap-2 items-center">
                              <Switch
                                disabled={
                                  deliveryDisabled || packageDeactivated
                                }
                                defaultChecked
                                onChange={(e) =>
                                  handleToggleChange(
                                    e,
                                    item.frequency,
                                    "delivery"
                                  )
                                }
                                checked={item.status == 0 ? false : true}
                              />
                              {item.frequency}
                            </p>
                            <div>
                              <input
                                type="number"
                                name={`delivery_${item.frequency}`}
                                disabled={
                                  deliveryDisabled || packageDeactivated
                                }
                                min={0}
                                onChange={handleInputChange}
                                value={formData[`delivery_${item.frequency}`]}
                                className="border-1 disabled:bg-gray-200 border-gray-500 w-[100px] p-1"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* --------TimeSLots------ */}
                  {dates.length > 0 &&
                    dates.map((item, index) => (
                      <>
                        {item.pickup_delivery == 2 && (
                          <CCol className="" key={item.id}>
                            <h5 className="text-blue-400 ">Delivery Slot:</h5>

                            <div
                              className={`flex gap-3  max-sm:flex-wrap border-b-1 pb-3   justify-center`}
                            >
                              {/* ---------Delivery Slot Name ---------*/}
                              <div className="flex flex-col  ">
                                <label className="font-semibold">
                                  Delivery Slot Name
                                </label>
                                <input
                                  type="text"
                                  value={item.session}
                                  onChange={(e) => {
                                    let data = [...dates];
                                    data[index] = {
                                      ...data[index],
                                      session: e.target.value,
                                    };
                                    return setDates(data);
                                  }}
                                  disabled={deliveryDisabled}
                                  placeholder="E.g: Morning"
                                  className="border-1 disabled:bg-gray-200 border-gray-300 p-3 text-[20px]  w-[140px] h-[56px] text-black focus:outline-none"
                                />
                              </div>
                              {/* ---------Delivery Start ---------*/}

                              <div className="">
                                <div className="flex flex-col">
                                  <label className="font-semibold">
                                    Delivery Start
                                  </label>

                                  <TimeField
                                    className="w-[140px]"
                                    style={{ margin: "0px" }}
                                    value={dayjs(
                                      new Date(`1970-01-01T${item.start_time}`)
                                    )}
                                    disabled={deliveryDisabled}
                                    onChange={(newValue) => {
                                      let data = dates;
                                      data[index] = {
                                        ...data[index],
                                        start_time:
                                          dayjs(newValue).format("HH:mm:ss"),
                                      };
                                      return setDates(data);
                                    }}
                                  />
                                </div>
                              </div>
                              {/* ---------Delivery End ---------*/}

                              <div className="">
                                <div className="flex flex-col ">
                                  <label className="font-semibold">
                                    Delivery End
                                  </label>

                                  <TimeField
                                    className="w-[140px]"
                                    style={{ margin: "0px" }}
                                    value={dayjs(
                                      new Date(`1970-01-01T${item.end_time}`)
                                    )}
                                    disabled={deliveryDisabled}
                                    onChange={(newValue) => {
                                      let data = dates;
                                      data[index] = {
                                        ...data[index],
                                        end_time:
                                          dayjs(newValue).format("HH:mm:ss"),
                                      };
                                      return setDates(data);
                                    }}
                                  />
                                </div>
                              </div>
                              {/* ---------Delete Time Slot ---------*/}

                              <div className=" flex items-end text-[32px] ">
                                <RxCrossCircled
                                  className="h-[56px] text-blue-500"
                                  onClick={() => {
                                    setDelSlot({
                                      dumyNum: item.dumyNum,
                                      id: item.id,
                                      session: item.session,
                                      // start_time: item.start_time,
                                      // end_time: item.end_time,
                                    });
                                    setConformDelete(true);
                                  }}
                                />
                              </div>
                            </div>
                          </CCol>
                        )}
                      </>
                    ))}
                  {/* --------Add Time Slot Button------ */}

                  <div className="flex gap-2 justify-center font-semibold items-center  text-[20px] p-2">
                    <IoIosAddCircle
                      className="text-[32px] text-blue-500 cursor-pointer"
                      onClick={() =>
                        handleAddSlot({
                          package_id: packageId,
                          // start_time: "",
                          pickup_delivery: 2,
                          // end_time: "",
                          dumyNum: Math.floor(1 + Math.random() * (1 - 100000)),
                        })
                      }
                    />
                    Add Delivery Slot
                  </div>
                </div>

                {/* ----------------------------Pickup Date Slots----------------------------- */}
                <p className="w-full text-[18px]  flex gap-2 items-center  pl-3 font-semibold pt-2 pb-2 bg-gray-200">
                  <CFormSwitch
                    label="Pickup"
                    name="pickup"
                    onChange={handlePickUp}
                    checked={formData.pickup}
                    disabled={packageDeactivated}
                  />
                </p>
                <div className="flex flex-col">
                  {/* ----Frequency with price----- */}
                  <div className="flex gap-3 items-center">
                    <div className="w-full  flex flex-col items-center ">
                      {vendorPackagePrice
                        .filter((item) => item.method === "pickup")
                        .sort(sortByFrequency)
                        .map((item) => (
                          <div className="flex gap-5 justify-between w-[300px] ">
                            <p className="font-semibold p-1 flex gap-2">
                              {" "}
                              <Switch
                                defaultChecked
                                onChange={(e) =>
                                  handleToggleChange(
                                    e,
                                    item.frequency,
                                    "pickup"
                                  )
                                }
                                value={item.status == 0 ? false : true}
                                disabled={pickUpDisabled || packageDeactivated}
                              />
                              {item.frequency}
                            </p>
                            <div>
                              <input
                                type="number"
                                name={`pickup_${item.frequency}`}
                                onChange={handleInputChange}
                                min={0}
                                value={formData[`pickup_${item.frequency}`]}
                                disabled={pickUpDisabled || packageDeactivated}
                                className="border-1 disabled:bg-gray-200 border-gray-500 w-[100px] p-1"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* --------TimeSLots------ */}

                  {dates.map((item, index) => (
                    <>
                      {item.pickup_delivery == 1 && (
                        <CCol className="border-b-2 py-3" key={item.id}>
                          <h5 className="text-blue-400">Pickup Slot:</h5>

                          <div
                            className={`flex gap-3 max-sm:flex-wrap   justify-center`}
                          >
                            {/* ---------Pickup Slot Name ---------*/}
                            <div className="flex flex-col  ">
                              <label className="font-semibold">
                                Pickup Slot Name
                              </label>
                              <input
                                type="text"
                                value={item.session}
                                onChange={(e) => {
                                  let data = dates;
                                  data[index] = {
                                    ...data[index],
                                    session: e.target.value,
                                  };

                                  return setDates(data);
                                }}
                                disabled={pickUpDisabled}
                                placeholder="E.g: Morning"
                                className="border-1  border-gray-300 disabled:bg-gray-200 p-3 text-[20px]  w-[140px] h-[56px] text-black focus:outline-none"
                              />
                            </div>
                            {/* ---------Delivery Start ---------*/}

                            <div className="">
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  Pickup Start
                                </label>

                                <TimeField
                                  className="disabled:bg-gray-200 w-[140px] "
                                  style={{ margin: "0px" }}
                                  value={dayjs(
                                    new Date(`1970-01-01T${item.start_time}`)
                                  )}
                                  disabled={pickUpDisabled}
                                  onChange={(newValue) => {
                                    let data = dates;
                                    data[index] = {
                                      ...data[index],
                                      start_time:
                                        dayjs(newValue).format("HH:mm:ss"),
                                    };
                                    return setDates(data);
                                  }}
                                />
                              </div>
                            </div>
                            {/* ---------Delivery End ---------*/}

                            <div className="">
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  Pickup End
                                </label>

                                <TimeField
                                  className="disabled:bg-gray-200 w-[140px]"
                                  disabled={pickUpDisabled}
                                  style={{ margin: "0px" }}
                                  value={dayjs(
                                    new Date(`1970-01-01T${item.end_time}`)
                                  )}
                                  onChange={(newValue) => {
                                    let data = dates;
                                    data[index] = {
                                      ...data[index],
                                      end_time:
                                        dayjs(newValue).format("HH:mm:ss"),
                                    };
                                    return setDates(data);
                                  }}
                                />
                              </div>
                            </div>

                            <div className=" flex items-end text-[32px] ">
                              <RxCrossCircled
                                className="h-[56px] text-blue-500"
                                onClick={() => {
                                  setDelSlot({
                                    dumyNum: item.dumyNum,
                                    id: item.id,
                                    session: item.session,
                                    // start_time: item.start_time,
                                    // end_time: item.end_time,
                                  });
                                  setConformDelete(true);
                                }}
                              />
                            </div>
                          </div>
                        </CCol>
                      )}
                    </>
                  ))}

                  {/* --------Add Time Slot Button------ */}

                  <div className="flex gap-2 justify-center font-semibold items-center  text-[20px] p-2">
                    <IoIosAddCircle
                      className="text-[32px] text-blue-500 cursor-pointer"
                      onClick={() =>
                        handleAddSlot({
                          package_id: packageId,
                          // start_time: "09:00:00",
                          pickup_delivery: 1,
                          // end_time: "09:00:00",
                          dumyNum: Math.floor(1 + Math.random() * (1 - 100000)),
                        })
                      }
                    />
                    Add Pickup Slot
                  </div>
                </div>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </CCol>
        {/* </CCol> */}

        {/* Prices*/}
        <CCol className="mt-5 col-6-custome hidden background">
          {formData.pickup == 1 ? (
            <CRow>
              {/* <CCol>
                <CCol>
                  <CFormSwitch
                    label="Pick Up"
                    name="pickup"
                    checked={formData.pickup}
                    onChange={handlePickUp}
                    disabled={packageDeactivated}
                  />
                </CCol>
                <CRow>
                  <CCol>
                    <CFormLabel className="font-12">From</CFormLabel>
                    <DatePicker
                      selected={FormData.pickup_from}
                      onChange={(time) => handleTime("pickup_from", time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      className="simple-input border"
                      name="pickup_from"
                      value={formData.pickup_from}
                      disabled={pickUpDisabled || packageDeactivated}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="font-12">Untl</CFormLabel>
                    <DatePicker
                      selected={FormData.pickup_until}
                      onChange={(time) => handleTime("pickup_until", time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      timeCaption="Time"
                      className="simple-input  border"
                      name="pickup_until"
                      value={formData.pickup_until}
                      disabled={pickUpDisabled || packageDeactivated}
                    />
                  </CCol>
                </CRow>
              </CCol> */}

              <CCol>
                <p>Pick up Price</p>
                {/*packagesData && packagesData.VendorPackagePrices && packagesData.VendorPackagePrices.map((item, index) => (
                                        item.method === 'pickup' && (
                                            <CCol className='d-flex justify-content-between' key={index}>
                                                <div className='me-3'>
                                                    <CFormLabel className='font-12'>{item.frequency}</CFormLabel>
                                                </div>
                                                <div>
                                                    <CFormInput
                                                        className='simple-input'
                                                        type="number"
                                                        name={`${item.method}_${item.frequency}`}
                                                        required
                                                        value={formData[`${item.method}_${item.frequency}`]}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </CCol>
                                        )
                                        ))*/}

                <CCol className="d-flex justify-content-between">
                  <div className="me-3">
                    <CFormLabel className="font-12">Single</CFormLabel>
                  </div>
                  <div>
                    <CFormInput
                      className="simple-input"
                      type="number"
                      name="pickup_daily"
                      value={formData.pickup_daily}
                      onChange={handleInputChange}
                      disabled={packageDeactivated}
                    />
                  </div>
                </CCol>
                <CCol className="d-flex justify-content-between">
                  <div className="me-3">
                    <CFormLabel className="font-12">Weekly</CFormLabel>
                  </div>
                  <div>
                    <CFormInput
                      className="simple-input"
                      type="number"
                      name="pickup_weekly"
                      value={formData.pickup_weekly}
                      onChange={handleInputChange}
                      disabled={packageDeactivated}
                    />
                  </div>
                </CCol>
                <CCol className="d-flex justify-content-between">
                  <div className="me-3">
                    <CFormLabel className="font-12">Monthly</CFormLabel>
                  </div>
                  <div>
                    <CFormInput
                      className="simple-input"
                      type="number"
                      name="pickup_monthly"
                      value={formData.pickup_monthly}
                      onChange={handleInputChange}
                      disabled={packageDeactivated}
                    />
                  </div>
                </CCol>
              </CCol>
            </CRow>
          ) : (
            <></>
          )}
          {formData.delivery == 1 ? (
            <>
              <CRow>
                {/* <CCol>
              <CCol>
                <CFormSwitch
                  label="Delivery"
                  name="delivery"
                  onChange={handleDelivery}
                  checked={formData.delivery}
                  disabled={packageDeactivated}
                />
              </CCol>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">From</CFormLabel>
                  <DatePicker
                    selected={FormData.delivery_from}
                    onChange={(time) => handleTime("delivery_from", time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    className="simple-input border"
                    name="delivery_from"
                    value={formData.delivery_from}
                    disabled={deliveryDisabled || packageDeactivated}
                  />
                </CCol>
                <CCol>
                  <CFormLabel className="font-12">Untl</CFormLabel>
                  <DatePicker
                    selected={FormData.delivery_until}
                    onChange={(time) => handleTime("delivery_until", time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    className="simple-input border"
                    name="delivery_until"
                    value={formData.delivery_until}
                    disabled={deliveryDisabled || packageDeactivated}
                  />
                </CCol>
              </CRow>
            </CCol> */}
                <CCol>
                  <p>Delivery Price</p>
                  {/* {packagesData && packagesData.VendorPackagePrices && packagesData.VendorPackagePrices.map((item, index) => (
                                      item.method === 'delivery' && (
                                          <CCol className='d-flex justify-content-between' key={index}>
                                              <div className='me-3'>
                                                  <CFormLabel className='font-12'>{item.frequency}</CFormLabel>
                                              </div>
                                              <div>
                                                  <CFormInput
                                                      className='simple-input'
                                                      type="number"
                                                      name={`${item.method}_${item.frequency}`}
                                                      required
                                                      value={formData[`${item.method}_${item.frequency}`]}
                                                      onChange={handleInputChange}
                                                  />
                                              </div>
                                          </CCol>
                                      )
                                  ))} */}

                  <CCol className="d-flex justify-content-between">
                    <div className="me-3">
                      <CFormLabel className="font-12">Single</CFormLabel>
                    </div>
                    <div>
                      <CFormInput
                        className="simple-input"
                        type="number"
                        name="delivery_daily"
                        value={formData.delivery_daily}
                        onChange={handleInputChange}
                        disabled={packageDeactivated}
                      />
                    </div>
                  </CCol>
                  <CCol className="d-flex justify-content-between">
                    <div className="me-3">
                      <CFormLabel className="font-12">Weekly</CFormLabel>
                    </div>
                    <div>
                      <CFormInput
                        className="simple-input"
                        type="number"
                        name="delivery_weekly"
                        value={formData.delivery_weekly}
                        onChange={handleInputChange}
                        disabled={packageDeactivated}
                      />
                    </div>
                  </CCol>
                  <CCol className="d-flex justify-content-between">
                    <div className="me-3">
                      <CFormLabel className="font-12">Monthly</CFormLabel>
                    </div>
                    <div>
                      <CFormInput
                        className="simple-input"
                        type="number"
                        name="delivery_monthly"
                        value={formData.delivery_monthly}
                        onChange={handleInputChange}
                        disabled={packageDeactivated}
                      />
                    </div>
                  </CCol>
                </CCol>
              </CRow>
            </>
          ) : (
            <></>
          )}
        </CCol>

        {/* Citites */}
        {/* <CCol>
          <CCol>
            <CCol>
              <h5>Cities</h5>
              
            </CCol>
            <CCol>
              {packagesData &&
                packagesData.VendorPackageCities &&
                packagesData.VendorPackageCities.map((item, index) => (
                  <CRow key={index}>
                    <CCol className="mt-3">
                      <p className="my-0">
                        {item?.VendorPackageCities?.state}-
                        {item?.VendorPackageCities?.city || showCity(item)}
                      </p>
                     
                    </CCol>
                    <CCol className="mt-3 flex-0">
                      {!packageDeactivated && (
                        <strong
                          className="text-danger cursor-pointer"
                          onClick={() => handleDeletePackageCity(item.id)}
                        >
                          X
                        </strong>
                      )}
                    </CCol>
                  </CRow>
                ))}

              <CCol className="text-center mt-3">
                {!packageDeactivated && (
                  <p
                    className="cursor-pointer h6 text-primary"
                    onClick={() => setShowCityModal(true)}
                  >
                    Add City
                  </p>
                )}
              </CCol>
            </CCol>
          </CCol>
        </CCol> */}
      </CRow>

      {/*-------------------------------- Delivery Time Slots---------------------------------- */}
      <CRow className="mt-3  p-2 border-top background">
        <CCol></CCol>
      </CRow>
    </div>
  );
};

export default DefaultItem;
