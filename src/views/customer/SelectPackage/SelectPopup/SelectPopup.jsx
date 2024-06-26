import { CButton, CCloseButton } from "@coreui/react";
import SelectItem from "../SelectItem/SelectItem";
import "./SelectPopup.css";
import { convertToAmPm } from "../../../../utils/Helper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOrder } from "../../../../actions/customerReducer/CustomerActions";
import { Toast } from "../../../../components/app/Toast";

const SelectPopup = ({
  packge,
  popup,
  setPopup,
  // handleDeliveryCheck,
  // handlePickupCheck,
  // handleTimeSlotChange,
}) => {
  const [pack, setpack] = useState(packge);
  const [orderItems, setOrderItems] = useState([]);
  const packId = popup.packageId;
  const dispatch = useDispatch();

  const handlePickupCheck = (id) => {
    setpack({
      ...pack,
      pickup_delivery: 1,
      delivery_time_slot: null,
    });
  };
  const handleDeliveryCheck = (id) => {
    setpack({
      ...pack,
      pickup_delivery: 2,
      delivery_time_slot: null,
    });
  };
  const handleTimeSlotChange = (slot, id, str) => {
    if (str === "pickup") {
      setpack({ ...pack, pickup_time_slot: slot });
    } else if (str === "delivery") {
      setpack({ ...pack, delivery_time_slot: slot });
    }
    // console.log(slot, temp_id);
  };
  console.log(pack);
  const DefaultOrderItemsCheck = () => {
    const orders = [];
    pack.VendorPackageDefaultItems.map((item) => {
      if (item.VendorPackageMenuItems.length > 0) {
        return orders.push({
          name: item.item_name,
          VendorpackageMenuItemsId: item.VendorPackageMenuItems[0].id,
          VendorPackageDefaultItemsId: item.id,
        });
      }
      return orders.push({
        name: item.item_name,
        VendorpackageMenuItemsId: null,
        VendorPackageDefaultItemsId: item.id,
      });
    });
    setOrderItems(orders);
  };
  console.log(orderItems);
  useEffect(() => {
    DefaultOrderItemsCheck();
  }, []);
  // Distructuring
  const {
    id,
    image,
    VendorPackageDefaultItems,
    VendorPackageSlots,
    VendorLocation,
    CustomerDeliveryAddress,
    pickup,
    delivery,
    pickup_delivery,
    delivery_time_slot,
  } = pack;

  const handleConfirmOrder = async () => {
    let pickup_delivery = true;
    // let frequency_selected = true;
    let time_slot_selected = true;
    console.log(pack);
    if (!pack.pickup_delivery || pack.pickup_delivery === 0) {
      pickup_delivery = false;
    } else if (pack.pickup_delivery !== 0 && !pack.delivery_time_slot) {
      time_slot_selected = false;
    }
    if (!pickup_delivery) {
      Toast({
        message: "Please select the package Pickup or Delivery",
        type: "warning",
      });
      return;
    }
    // else if (!frequency_selected) {
    //   Toast({
    //     message: "Please select the a frequency",
    //     type: "warning",
    //   });
    //   return;
    // }
    else if (!time_slot_selected) {
      Toast({
        message: "Please select a time slot.",
        type: "warning",
      });
      return;
    }
    try {
      const res = await dispatch(setOrder({ pack, orderItems }));
      console.log(res);
      setPopup({ show: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popupContainer selectPackage">
      <div className="popupMainContainer">
        {/* ----------close btn--------- */}
        <div className="flex justify-end SelectPackagePopupCloseBtnContainer">
          <CCloseButton onClick={() => setPopup({ show: false })} />
        </div>
        {/* --------------Content-------[] */}
        <div className="popup text-center">
          {/* -------Left row------- */}
          <div className="selectPackagePopupLeft">
            <h4 className="font-semibold">Package yea</h4>
            <div className="selectPackagePopupImg">
              <img
                className="w-full h-full object-cover"
                src={
                  image
                    ? image
                    : "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"
                }
                alt=""
              />
            </div>
            <p className="text-gray">
              {VendorPackageDefaultItems.map(
                (item, i) =>
                  `${item.item_name} ${
                    i !== VendorPackageDefaultItems.length - 1 ? "+" : ""
                  } `
              )}
            </p>
            <h4>Delivery or Pickup</h4>
            <div className="frequency-delivery-pickup">
              {delivery === 1 && (
                <a
                  className={`delivery cursor-pointer ${
                    pickup_delivery === 2 && "active"
                  }`}
                  onClick={() => handleDeliveryCheck(id)}
                >
                  DELIVERY
                </a>
              )}
              {pickup === 1 && (
                <a
                  className={`pickup cursor-pointer ${
                    pickup_delivery === 1 && "active"
                  } `}
                  onClick={() => handlePickupCheck(id)}
                >
                  PICKUP
                </a>
              )}
            </div>
            <div className="time-slots mt-3">
              {VendorPackageSlots.map((slot) => {
                return slot.pickup_delivery == pickup_delivery ? (
                  // return slot.pickup_delivery == 2 ? (
                  <span
                    key={slot.id}
                    className={`timeSlot ${
                      delivery_time_slot?.id === slot.id && "active"
                    } cursor-pointer`}
                    onClick={() => handleTimeSlotChange(slot, id, "delivery")}
                  >
                    {convertToAmPm(slot.start_time)}-
                    {convertToAmPm(slot.end_time)}
                  </span>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
          {/* --------Right Row-------- */}
          <div className="selectPackagePopupRight flex flex-col justify-between">
            <div>
              {/*Package Items */}
              <div>
                {VendorPackageDefaultItems.map((dItem) => {
                  if (dItem?.VendorPackageMenuItems?.length > 0) {
                    return (
                      <div key={dItem.id} className="my-20x">
                        <h6>Select from the following:</h6>
                        {dItem.VendorPackageMenuItems.map((vpItem) => (
                          <SelectItem
                            key={vpItem.id}
                            dItem={dItem}
                            item_data={vpItem}
                            orderItems={orderItems}
                            setOrderItems={setOrderItems}
                          />
                        ))}
                      </div>
                    );
                  }
                  return (
                    <div key={dItem.id} className="my-20x">
                      <h6>Select from the following:</h6>
                      <SelectItem
                        dItem={dItem}
                        orderItems={orderItems}
                        setOrderItems={setOrderItems}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              {/* Location */}
              <div className="text-left my-10x">
                {/* -----Pickup Location-- */}
                {pickup_delivery === 1 && (
                  <div>
                    <span className="font-semibold">Pickup From:</span>
                    <br />
                    {VendorLocation
                      ? `${VendorLocation.address}, ${VendorLocation.location_name}, ${VendorLocation.CitiesAll.city}`
                      : "N/A"}
                  </div>
                )}
                {/* -----Delivery Location-- */}
                {pickup_delivery === 2 && (
                  <div>
                    <span className="font-semibold">Delivery to:</span>
                    <br />
                    {CustomerDeliveryAddress
                      ? `${CustomerDeliveryAddress.address}, ${CustomerDeliveryAddress.CitiesAll.city}, ${CustomerDeliveryAddress.postal} (${CustomerDeliveryAddress.address_type})`
                      : "N/a"}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <CButton onClick={handleConfirmOrder}>DONE</CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPopup;
