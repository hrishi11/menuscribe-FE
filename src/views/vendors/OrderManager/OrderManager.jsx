import React, { useEffect, useState } from "react";
import "./OrderManager.css";
import Header from "./Header/Header";
import Prepare from "./Prepare/Prepare";
import Deliver from "./Deliver/Deliver";
import Completed from "./Completed/Completed";
import { useDispatch } from "react-redux";
import {
  getOrdersByDate,
  getVendorLocations,
} from "../../../actions/customerReducer/CustomerActions";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const OrderManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prepare, setPrepare] = useState([]);
  const [deliver, setDeliver] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [locations, setLocations] = useState([]);

  const dispatch = useDispatch();
  const fetchOrders = async () => {
    try {
      const res = await dispatch(
        getOrdersByDate({
          order_date: selectedDate,
          vendor_location_id: selectedLocation.id,
        })
      );
      const pre = [];
      const del = [];
      const com = [];
      if (res.data.length > 0) {
        res.data.forEach((item) => {
          if (item.is_ready === 0 && item.is_delivered === 0) {
            pre.push(item);
          } else if (item.is_ready === 1 && item.is_delivered === 0) {
            del.push(item);
          } else if (item.is_delivered === 1) {
            com.push(item);
          }
        });
      }
      setPrepare(pre);
      setDeliver(del);
      setCompleted(com);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLocation = async () => {
    try {
      const locationData = await dispatch(getVendorLocations());
      setLocations(
        locationData.data.map((item) => ({
          label: item.location_name,
          value: item.location_name,
          id: item.id,
        }))
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedDate, selectedLocation]);
  useEffect(() => {
    fetchLocation();
    const loca = localStorage.getItem("location");
    setSelectedLocation(JSON.parse(loca));
  }, []);

  const getDateFormate = (dateStr) => {
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const newDate = new Date(dateStr + "T00:00:00");
    const day = days[newDate.getDay()];
    const date = newDate.getDate().toString().padStart(2, "0");
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();
    const today = new Date();
    const isToday =
      newDate.getDate() === today.getDate() &&
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear();
    return `${date} ${month} ${year}`;
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const dataWithHeaders = [];
    prepare.map((pre) => {
      const { CustomerPackage } = pre;
      const newPrepareData = {
        "Customer Name": `${pre.UserCustomer?.first_name} ${pre.UserCustomer?.last_name}`,
        "Order Number": pre.id,
        "Order Date": getDateFormate(pre.order_date),
        Phone: pre.UserCustomer?.phone,
        Address:
          CustomerPackage.pickup_delivery === 1
            ? CustomerPackage?.VendorLocation
              ? `${CustomerPackage?.VendorLocation?.location_name}`
              : "N/A"
            : CustomerPackage?.CustomerDeliveryAddress
            ? `${CustomerPackage?.CustomerDeliveryAddress?.address}, ${
                CustomerPackage?.CustomerDeliveryAddress?.unit_number
                  ? CustomerPackage?.CustomerDeliveryAddress?.unit_number + ","
                  : ""
              } ${CustomerPackage?.CustomerDeliveryAddress?.CitiesAll?.city} ${
                CustomerPackage?.CustomerDeliveryAddress?.CitiesAll?.state
              } ${CustomerPackage?.CustomerDeliveryAddress?.postal} (${
                CustomerPackage?.CustomerDeliveryAddress?.delivery_instructions
              })`
            : "N/A",
      };
      const items = [];
      const { VendorPackage } = pre;
      // -----Extracting Items as requirment-----
      VendorPackage.DefaultItemsWithExistingOrders.map((item) => {
        if (item.CustomerOrderItem) {
          items.push(
            item.CustomerOrderItem.VendorPackageMenuItem?.menu_item_name
          );
          return;
        } else if (item.VendorPackageMenuItems.length > 1) {
          const newItemStr = item.VendorPackageMenuItems.map(
            (mi, i) =>
              `${mi.menu_item_name}${
                i !== item.VendorPackageMenuItems.length - 1 ? "/" : ""
              }`
          );
          items.push(newItemStr.join(""));
          return;
        } else if (item.VendorPackageMenuItems.length > 0) {
          const newItemStr = item.VendorPackageMenuItems.map(
            (mi, i) =>
              `${mi.menu_item_name}${
                i !== item.VendorPackageMenuItems.length - 1 ? "/" : ""
              }`
          );
          items.push(newItemStr.join(""));

          return;
        } else {
          items.push(item.item_name);
          return;
        }
      });
      newPrepareData.Items = items.join(", ");

      dataWithHeaders.push(newPrepareData);
    });
    console.log(dataWithHeaders);
    // Convert data with headers to sheet
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Create workbook and add sheet with data
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    // Write workbook to buffer in xlsx format
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert buffer to Blob with specified MIME type
    const data = new Blob([excelBuffer], { type: fileType });

    // Save data as a file with specified filename
    FileSaver.saveAs(data, "fileName" + fileExtension);
  };

  return (
    <div>
      <Header
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        locations={locations}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="ordersContainer my-20x">
        <Prepare
          prepare={prepare}
          setPrepare={setPrepare}
          fetchOrders={fetchOrders}
          exportToExcel={exportToExcel}
        />
        <Deliver
          deliver={deliver}
          setDeliver={setDeliver}
          fetchOrders={fetchOrders}
        />
        <Completed
          completed={completed}
          setCompleted={setCompleted}
          fetchOrders={fetchOrders}
        />
      </div>
    </div>
  );
};

export default OrderManager;
