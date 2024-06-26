import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cencelCustomerOrder,
  getCustomerOrder,
  getVendorMenuItems,
  getVendorOrders,
  setConfrimOrderPickup,
  setCustomerOrderItem,
  setNonConfrimOrderPickup,
} from "../../actions/vendorReducers/VendorActions";
import { toast } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { cilCheck } from "@coreui/icons";
import { getQrvalue } from "../../actions/customerReducer/CustomerSlice";
import { useNavigate } from "react-router-dom";
import PickupTable from "./Pickup/Comp/Table";

const Pickups = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState();
  const [popup, setPopup] = useState(false);
  const [addItem, setAddItem] = useState({ status: false, item: { id: "" } });
  const [allOrders, setAllOrders] = useState([]);
  const [trigerChange, setTrigerChange] = useState(false);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qrValue = useSelector(getQrvalue);
  const fetchAllOrder = async () => {
    try {
      const response = await dispatch(getVendorOrders());
      console.log(response.response);
      setAllOrders(response.response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCustomerOrder = async (id) => {
    if (id) {
      if (id === "") {
        toast.warn("Please provide a valid Customer Order number");
        return;
      }
      try {
        const res = await dispatch(getCustomerOrder(id));
        setOrder(res.data);
      } catch (error) {
        console.log("Error Fetching Customer Order");
      }
    } else {
      if (orderId === "") {
        toast.warn("Please provide a valid Customer Order number");
        return;
      }
      try {
        const res = await dispatch(getCustomerOrder(orderId));
        setOrder(res.data);
      } catch (error) {
        console.log("Error Fetching Customer Order");
      }
    }
  };
  const fetchVendorMenuItems = async () => {
    try {
      const res = await dispatch(getVendorMenuItems());
      setItems(res.data);
    } catch (error) {
      console.log("Error Fetching vendor menu items");
    }
  };
  useEffect(() => {
    if (qrValue.length > 0) {
      setOrderId(qrValue);
      fetchCustomerOrder(qrValue);
    }
  }, [qrValue]);

  useEffect(() => {
    fetchAllOrder();
  }, [trigerChange]);

  useEffect(() => {
    fetchVendorMenuItems();
  }, []);

  const handleVieworder = () => {
    fetchCustomerOrder();
  };
  const handleConfrimPickup = async () => {
    try {
      const res = await dispatch(setConfrimOrderPickup(orderId));
      fetchCustomerOrder();
      console.log(res);
    } catch (error) {
      console.log("Error handling confrim pickup");
    }
  };
  const handleNonConfrimPickup = () => {
    setPopup(true);
  };
  const handlePopupClick = async (str) => {
    if (str === "yes") {
      try {
        const res = await dispatch(setNonConfrimOrderPickup(orderId));
        fetchCustomerOrder();
        console.log(res);
      } catch (error) {
        console.log("Error handling confrim pickup");
      }
      setPopup(false);
    } else {
      console.log("NO");
      setPopup(false);
    }
  };
  const handleAddItem = async () => {
    try {
      const reqObj = {
        orderId,
        itemId: addItem.item.id,
      };
      const res = await dispatch(setCustomerOrderItem(reqObj));
    } catch (error) {
      console.log("Error handling add item");
    } finally {
      setAddItem({ status: false, item: { id: "" } });
      fetchCustomerOrder();
    }
  };
  const handleItemChange = (e) => {
    const clickedItem = items.filter(
      (item) => item.id === parseInt(e.target.value)
    )[0];
    setAddItem({ ...addItem, item: clickedItem });
  };
  const handleCencelOrder = async () => {
    try {
      const res = await dispatch(cencelCustomerOrder(order.id));
      console.log(res, order.id);
    } catch (error) {
      console.log("Error handling cancelled order");
    }
  };

  return (
    <div className=" gap-3 flex justify-center relative">
      {/* Order Lookup */}
      <div className="w-[30%]">
        <p className="text-[28px]">Order lookup</p>
        <div className="w-full bg-white px-10x py-10x ">
          <h6 className="text-blue text-center">SELECT YOUR ORDER</h6>
          <p className="m-0 text-center">
            Please enter the order number of scan the QR code
          </p>
          <div>
            <CFormLabel className=""> Order number</CFormLabel>
            <div className="flex gap-5x">
              <div>
                <CFormInput
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <button
                className="border-none outline-none"
                onClick={() => navigate("/manage/qr-scanner")}
              >
                <img
                  src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=1024x1024&w=is&k=20&c=J3NoWzg4Y5x8x8tPjB-oscJ48ITem2axmKcX5lMusSU="
                  alt=""
                  width={40}
                />
              </button>
            </div>
            <CButton
              color="secondary"
              className="w-full my-10x text-white"
              onClick={handleVieworder}
            >
              View Order
            </CButton>

            {order?.is_delivered !== 1 && (
              <CButton className={`w-full`} onClick={handleConfrimPickup}>
                Confirm Pickup
              </CButton>
            )}

            {order?.is_delivered === 1 && (
              <CButton
                className={`w-full bg-green border-none`}
                onClick={handleNonConfrimPickup}
              >
                <CIcon icon={cilCheck} />
                Picked up
              </CButton>
            )}
          </div>
          {order && (
            <div className="mt-3">
              <h5 className="m-0">
                {order?.UserCustomer?.first_name}{" "}
                {order?.UserCustomer?.last_name}
              </h5>
              <span>Order#{order.id}</span>

              <h6 className="my-10x">Order Items:</h6>
              <ul>
                {order.CustomerOrderItems?.length > 0 ? (
                  order.CustomerOrderItems.map((order) => (
                    <li key={order.id}>{order.VendorMenuItem?.item_name}</li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>
              <button
                className="text-blue bg-transparent border-none outline-none"
                onClick={() => setAddItem({ ...addItem, status: true })}
              >
                Add item
              </button>

              {addItem.status && (
                <div className="flex">
                  <CFormSelect
                    value={addItem.item.id}
                    onChange={(e) => handleItemChange(e)}
                  >
                    <option value="">Select</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.item_name}{" "}
                      </option>
                    ))}
                  </CFormSelect>
                  <CButton onClick={handleAddItem}> Add </CButton>
                </div>
              )}
              <div className="text-center flex justify-center">
                <button
                  className=" my-20x text-blue bg-transparent border-none outline-none"
                  onClick={handleCencelOrder}
                >
                  {order.status === 2 ? "Order Cancelled" : "Cancel Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pickup */}
      <div className="w-[65%]">
        <p className="text-[28px]">Pickup</p>
        <div className="w-full bg-white">
          {/* {
            allOrders &&
          } */}
          <PickupTable
            orders={allOrders}
            setOrders={setAllOrders}
            setTrigerChange={setTrigerChange}
          />
        </div>
      </div>

      {popup && (
        <div className="popupContainer">
          <div className="popup">
            <p> This will mark the order as Not picked up. Continue? </p>
            <div className="flex justify-between gap-10x">
              <CButton className="col" onClick={() => handlePopupClick("yes")}>
                Yes
              </CButton>
              <CButton className="col" onClick={() => handlePopupClick("no")}>
                No
              </CButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pickups;
