import React, { useEffect, useState, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CLink,
  CNavGroup,
  CRow,
} from "@coreui/react";
import { Toast } from "../../components/app/Toast";
import {
  cilMagnifyingGlass,
  cilPhone,
  cilPaperPlane,
  cilLoopCircular,
  cilCamera,
  cilCheck,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getDeliveriesByCreatedDate,
  setCustomerOrderDelivery,
  setOrderIsDelivered,
} from "../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import { handleUserRole } from "../../utils/Helper";
import CameraModal from "../../components/Camera";
import { uploadDeliveryImage } from "../../actions/api/Vendor";
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import { optimizeRoutes } from "../../actions/customerReducer/CustomerActions";
import { MapGoogle } from "../../components";

const Delivery = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sorted, setSorted] = useState(false);
  const [showRightPopup, setShowRightPopup] = useState(false);
  const [showLeftPopup, setShowLeftPopup] = useState(false);

  const [deliveries, setDeliveries] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [prevX, setPrevX] = useState(null);

  const [draggedElementId, setDraggedElementId] = useState(null);

  //camera setup start
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  //camera setup end

  //map setup start
  const [mapVisible, setMapVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  //map setup end

  const dispatch = useDispatch();
  useEffect(() => {
    handleUserRole(["Admin", "Manager", "Rider"]);
  }, []);
  const fetchOrders = async () => {
    try {
      const res = await dispatch(
        getDeliveriesByCreatedDate({ created_date: new Date().toString() })
      );
      console.log(res.data);
      setDeliveries(res.data);
      setSorted(false);
    } catch (error) {
      console.log("error from delivery page", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleClickStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event, id, str) => {
    if (isDragging) {
      const newX = str === "mouse" ? event.clientX : event.touches[0].clientX;
      const deltaX = prevX !== null ? newX - prevX : 0;
      if (deltaX >= 40) {
        setIsDragging(false);
        // console.log("Show the popup")
        setPosition({
          x: 0,
          y: 0,
        });
        setPrevX(null);
        // console.log(id)
        setDraggedElementId(id);
        setShowRightPopup(true);
        return;
      } else if (deltaX <= -40) {
        setIsDragging(false);
        // console.log("Show the popup")
        setPosition({
          x: 0,
          y: 0,
        });
        setPrevX(null);
        // console.log(id)
        setDraggedElementId(id);
        setShowLeftPopup(true);
        return;
      }
      setPosition((prevPosition) => ({
        x: deltaX,
        y: prevPosition.y,
      }));
      setPrevX(newX);
    }
  };

  const handleClickEnd = () => {
    setIsDragging(false);
    setPrevX(null);
  };

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SET",
    "OCT",
    "NOV",
    "DEC",
  ];

  const handleSelectedDate = async (date) => {
    console.log(date.toString());
    try {
      const res = await dispatch(
        getDeliveriesByCreatedDate({ created_date: date.toString() })
      );

      setDeliveries(res.data);
      setSorted(false);
    } catch (error) {
      console.log("Error re-fetching orders by date", error);
    } finally {
      setSelectedDate(date);
    }
  };
  const handleOrderDelivered = async (str) => {
    try {
      if (str === "yes") {
        const res = await dispatch(
          setCustomerOrderDelivery({ id: draggedElementId, is_delivered: 1 })
        );
        // console.log(res.data);
        setDeliveries(
          deliveries.map((del) =>
            del.id == draggedElementId ? { ...del, is_delivered: 1 } : del
          )
        );
        setSorted(false);
      }
    } catch (error) {
      console.log("Error from Right popup function", error);
    } finally {
      setShowRightPopup(false);
    }
  };
  const handleOrderUndelivered = async (str) => {
    try {
      if (str === "yes") {
        const res = await dispatch(
          setCustomerOrderDelivery({ id: draggedElementId, is_delivered: 0 })
        );
        // console.log(res.data);
        setDeliveries(
          deliveries.map((del) =>
            del.id == draggedElementId ? { ...del, is_delivered: 0 } : del
          )
        );
        setSorted(false);
      }
    } catch (error) {
      console.log("Error from Left popup function", error);
    } finally {
      setShowLeftPopup(false);
    }
  };

  let today = new Date();
  const topBarText =
    typeof selectedDate === "object"
      ? selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getFullYear() === today.getFullYear()
        ? "TODAY"
        : ""
      : "SELECT A DATE";

  const getPrevDate = `${
    months[selectedDate.getMonth()]
  } ${selectedDate.getDate()}`;

  const handleCameraClick = (id) => {
    console.log("Camera Button clicked");
    setSelectedDelivery(id);
    setCameraModalIsOpen(true);
  };
  const handleImageUpload = async (imageSrc) => {
    if (selectedDelivery == "") {
      Toast({
        message: "Unable to upload image, Please try again!",
        type: "error",
      });
      return;
    }
    const formData = new FormData();
    // Append the captured image as a file to the FormData object
    formData.append("image", dataURItoBlob(imageSrc));
    formData.append("deliveryId", selectedDelivery);
    const response = await uploadDeliveryImage(formData);
    if (!response?.data?.success) {
      Toast({
        message: "Unable to upload image, Please try again!",
        type: "error",
      });
      return;
    }
    Toast({
      message: "Image upload successful!",
      type: "success",
    });
    await fetchOrders();
  };
  // Function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const closeModal = () => {
    setCameraModalIsOpen(false);
    setSelectedDelivery("");
  };
  const handleCallClick = (number) => {
    // var phoneNumber = "+1234567890"; // Replace this with the phone number you want to call
    var link = "tel:" + number;
    window.location.href = link;
  };

  const handleDeliveryStateChange = async (order) => {
    try {
      const res = await dispatch(setOrderIsDelivered(order));
      const updatedOrder = {
        ...order,
        is_delivered: order.is_delivered === 1 ? 0 : 1,
      };
      setDeliveries(
        deliveries.map((delivery) =>
          delivery.id === order.id ? updatedOrder : delivery
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const OptimiseOrders = async () => {
    if (sorted) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const payload = {
            origin: {
              location: {
                latLng: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              },
            },
            intermediates: deliveries.map((delivery) => ({
              location: {
                latLng: {
                  latitude: Number(delivery?.CustomerDeliveryAddress?.latitude),
                  longitude: Number(
                    delivery?.CustomerDeliveryAddress?.longitude
                  ),
                },
              },
            })),
            travelMode: "DRIVE",
            optimizeWaypointOrder: true,
          };
          const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "routes.optimizedIntermediateWaypointIndex",
          };
          const response = await dispatch(optimizeRoutes(payload, headers));
          const newOrder =
            response.routes[0].optimizedIntermediateWaypointIndex.map(
              (index) => deliveries[index]
            );
          setDeliveries(newOrder);
          setSorted(true);
          let routes = [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ];
          routes = routes.concat(
            deliveries.map((delivery) => ({
              latitude: Number(delivery?.CustomerDeliveryAddress?.latitude),
              longitude: Number(delivery?.CustomerDeliveryAddress?.longitude),
            })),
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          );
          console.log("route1232", JSON.stringify(routes));
          setRoutes(routes);
          setMapVisible(true);
        },
        (error) => {
          console.error(error);
          Toast({
            message: "Unable Optimise Route!",
            type: "error",
          });
        }
      );
    } else {
      Toast({
        message: "Unable Optimise Route!",
        type: "error",
      });
    }
  };
  console.log(deliveries);

  return (
    <div className="relative no-Selecting-on-md">
      {/* ----------TOP bar date section-------- */}
      <div className="bg-blue flex justify-between items-center text-white rounded py-5x px-10x">
        <span> {getPrevDate}</span>
        <span> {topBarText}</span>
        <div className="flex justify-end DatePicker">
          <CRow>
            <CCol className="">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control w-100"
              />
            </CCol>
          </CRow>
          {/* <CButton className="bg-transparent border-none outline-none"
                    // onClick={getNextDate}
                    >
                        <CIcon icon={cilCaretRight} />
                    </CButton> */}
        </div>
      </div>
      <div className="flex justify-between my-10x">
        <h4> {deliveries.length} Meals</h4>
        <div className="icons">
          <CButton className="bg-transparent text-black outline-none border-none">
            <CIcon icon={cilMagnifyingGlass} size="xl" />
          </CButton>
          <CButton
            className="bg-transparent text-black outline-none border-none"
            onClick={OptimiseOrders}
          >
            <CIcon icon={cilLoopCircular} size="xl" />
          </CButton>
        </div>
      </div>
      {/* ---------Container------------- */}
      <div className="">
        {deliveries.length >= 1 &&
          deliveries.map((d) => (
            <div
              key={d.id}
              className={`rounded ${
                d.is_delivered == 1 ? "bg-light-green" : "bg-gray-500"
              } px-10x py-10x flex justify-between items-center gap-10x my-10x`}
              onMouseDown={handleClickStart}
              onMouseMove={(e) => handleDrag(e, d.id, "mouse")}
              onMouseUp={handleClickEnd}
              onTouchStart={handleClickStart}
              onTouchMove={(e) => handleDrag(e, d.id, "touch")}
              onTouchEnd={handleClickEnd}
            >
              {/*----- Left----- */}
              <div className="LeftSectionOfEachDelivery">
                <p className="text-lg my-0 font-medium">
                  {d.UserCustomer.first_name} {d.UserCustomer.last_name}
                  <span className="text-sm text-red">
                    {/* {d.VendorPackage.package_name} */}
                  </span>
                </p>
                <p className="my-0"> Order ID: {d.id}</p>
                <p className="my-0"> {d.UserCustomer.phone}</p>
                {d.CustomerDeliveryAddress ? (
                  <p className="my-0">
                    {" "}
                    {d.CustomerDeliveryAddress.address},{" "}
                    {d.CustomerDeliveryAddress.CitiesAll.city}
                  </p>
                ) : (
                  <p>N/A</p>
                )}
                <div className=" my-0">
                  <input
                    type="checkbox"
                    checked={d.is_delivered == 1}
                    name="delivered"
                    onChange={() => handleDeliveryStateChange(d)}
                  />
                  <span> {d.is_delivered == 1 ? "Delivered" : "Pending"}</span>
                </div>
              </div>
              {/*----- Right----- */}
              <div className="RightSectionOfEachDelivery flex flex-col items-center gap-10x">
                <div className="flex gap-5x">
                  <CButton
                    className="border-none outline-none bg-green rounded-full"
                    onClick={() => handleCallClick(d.UserCustomer.phone)}
                  >
                    <CIcon icon={cilPhone} size="xl" />
                  </CButton>
                  <CLink
                    className="border-none outline-none bg-blue rounded-full px-10x flex justify-center items-center"
                    target="_blank"
                    href="https://www.google.com/maps/dir/350+Bay+St.,+Toronto,+ON+M5H+2S6/@43.6504424,-79.3838431,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x882b34cd3ee09915:0xa4c57051b71c3b84!2m2!1d-79.3812682!2d43.6504424?entry=ttu"
                  >
                    <CIcon
                      icon={cilPaperPlane}
                      size="xl"
                      className="text-white"
                    />
                  </CLink>
                </div>
                {d.delivery_img ? (
                  <CLink target="_blank" href={d.delivery_img}>
                    <CButton className="border-none outline-none bg-green rounded-full">
                      <CIcon icon={cilCheck} size="xl" />
                    </CButton>
                  </CLink>
                ) : (
                  <CButton
                    className="border-none outline-none bg-blue rounded-full"
                    onClick={() => handleCameraClick(d.id)}
                  >
                    <CIcon icon={cilCamera} size="xl" />
                  </CButton>
                )}
              </div>
            </div>
          ))}
      </div>
      {/* Dragged right POPUP */}
      {showRightPopup && (
        <div className="popupContainer">
          <div className="popup">
            <p> Mark as delivered and notify the customer?</p>
            <div className="flex justify-between gap-10x">
              <CButton
                className="col"
                onClick={() => handleOrderDelivered("yes")}
              >
                Yes
              </CButton>
              <CButton
                className="col"
                onClick={() => handleOrderDelivered("no")}
              >
                {" "}
                No
              </CButton>
            </div>
          </div>
        </div>
      )}
      {/* Dragged Left popup */}
      {showLeftPopup && (
        <div className="popupContainer">
          <div className="popup">
            <p> Mark as undelivered ?</p>
            <div className="flex justify-between gap-10x">
              <CButton
                className="col"
                onClick={() => handleOrderUndelivered("yes")}
              >
                {" "}
                Yes
              </CButton>
              <CButton
                className="col"
                onClick={() => handleOrderUndelivered("no")}
              >
                {" "}
                No
              </CButton>
            </div>
          </div>
        </div>
      )}
      <CameraModal
        isOpen={cameraModalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleImageUpload}
      />
      {mapVisible && <MapGoogle coordinates={routes} />}
    </div>
  );
};

export default Delivery;
