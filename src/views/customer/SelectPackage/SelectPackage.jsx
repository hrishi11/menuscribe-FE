import { useEffect, useState } from "react";
import Dates from "./Dates/Dates";
import "./SelectPackage.css";
import Package from "./Package/Package";
import SelectPopup from "./SelectPopup/SelectPopup";
import { useDispatch } from "react-redux";
import { getVendorPackageByDate } from "../../../actions/customerReducer/CustomerActions";

const SelectPackage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [packages, setPackages] = useState([]);
  const [popup, setPopup] = useState({ show: false });
  const dispatch = useDispatch();

  const getVendorPackages = async () => {
    try {
      const res = await dispatch(
        getVendorPackageByDate({ date: selectedDate })
      );
      setPackages(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePickupCheck = (id) => {
    console.log(id);
    setPackages(
      packages.map((pro) =>
        pro.id === id
          ? {
              ...pro,
              pickup_delivery: 1,
              delivery_time_slot: null,
            }
          : pro
      )
    );
  };
  const handleDeliveryCheck = (id) => {
    console.log(id);
    setPackages(
      packages.map((pro) =>
        pro.id === id
          ? {
              ...pro,
              pickup_delivery: 2,
              delivery_time_slot: null,
            }
          : pro
      )
    );
  };
  const handleTimeSlotChange = (slot, id, str) => {
    if (str === "pickup") {
      setPackages(
        packages.map((pro) =>
          pro.id === id ? { ...pro, pickup_time_slot: slot } : pro
        )
      );
    } else if (str === "delivery") {
      setPackages(
        packages.map((pro) =>
          pro.id === id ? { ...pro, delivery_time_slot: slot } : pro
        )
      );
    }
    // console.log(slot, temp_id);
  };

  useEffect(() => {
    selectedDate?.day && getVendorPackages();
  }, [selectedDate]);

  return (
    <div className="selectPage-outer-Container">
      <div className="container mx-auto py-20x">
        {/* --------Dates----------- */}
        <Dates selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {/* ------------------Packages----------------- */}
        <div className="select-packages-container py-20x">
          {packages.map((pack) => (
            <Package
              pack={pack}
              key={pack.id}
              popup={popup}
              setPopup={setPopup}
            />
          ))}
        </div>
        {/* ----------------Select Popup----------- */}
        {popup.show && (
          <SelectPopup
            packge={packages.find((p) => p.id === popup.packageId)}
            popup={popup}
            setPopup={setPopup}
            // handleDeliveryCheck={handleDeliveryCheck}
            // handlePickupCheck={handlePickupCheck}
            // handleTimeSlotChange={handleTimeSlotChange}
          />
        )}
      </div>
    </div>
  );
};

export default SelectPackage;
