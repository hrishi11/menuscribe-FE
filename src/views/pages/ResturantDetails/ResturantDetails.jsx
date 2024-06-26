import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import "./ResturantDetails.css";
import Detail from "./Detail/Detail";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../../../actions/vendorReducers/VendorActions";
import Package from "../../../components/Package/Package";
import Frequency from "../../../components/Frequency/Frequency";
import { getDateFromString } from "../../../utils/Helper";
import { v4 as uuid } from "uuid";
import {
  getPackagesWithoutLoginByVendorId,
  getResturantDetails,
  setPackagesData,
} from "../../../actions/customerReducer/CustomerActions";
import { useNavigate, useParams } from "react-router-dom";
import NewFrequency from "../../../components/NewFrequency/NewFrequency";
import { Toast } from "../../../components/app/Toast";

const ResturantDetails = () => {
  const { resturantPublicUrl } = useParams();
  const params = useParams();
  console.log(params);

  const { customerSelectedPackages } = useSelector((state) => state.customer);
  const [packages, setPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState(
    customerSelectedPackages
  );
  const [resturantDetails, setResturantDetails] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchResturantDetails = async () => {
    try {
      const res = await dispatch(getResturantDetails({ resturantPublicUrl }));
      setResturantDetails(res.data);
    } catch (error) {
      console.error("Error fetching Resturant Details:", error);
    }
  };

  useEffect(() => {
    fetchResturantDetails();
  }, []);
  const fetchPackages = async () => {
    try {
      const [packagesResponse] = await Promise.all([
        dispatch(
          getPackagesWithoutLoginByVendorId({
            vendor_id: resturantDetails.vendor_id,
          })
        ),
      ]);
      console.log(packagesResponse);
      setPackages(packagesResponse ? packagesResponse.data : []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [resturantDetails]);

  const handleSavePackages = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (selectedPackages.length < 1) {
      return Toast({
        message: "Please select at least one package",
        type: "warning",
      });
    }
    let pickup_delivery = true;
    let frequency_selected = true;
    let time_slot_selected = true;

    selectedPackages.forEach((packge) => {
      console.log(packge, "From Selected.forEach");
      if (packge.pickup_delivery === 0) {
        pickup_delivery = false;
      } else if (!packge.frequency.cost) {
        frequency_selected = false;
      } else if (packge.pickup_delivery !== 0 && !packge.delivery_time_slot) {
        time_slot_selected = false;
      }
    });

    if (!pickup_delivery) {
      Toast({
        message: "Please select the package Pickup or Delivery",
        type: "warning",
      });
      return;
    } else if (!frequency_selected) {
      Toast({
        message: "Please select the a frequency",
        type: "warning",
      });
      return;
    } else if (!time_slot_selected) {
      Toast({
        message: "Please select a time slot.",
        type: "warning",
      });
      return;
    }

    if (!form.checkValidity()) {
      alert("All the fields are required");
    } else {
      try {
        const res = await dispatch(setPackagesData(selectedPackages));
        navigate("/taj-mahal/order-confirmation");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddPackage = async (id) => {
    const clickedPackage = packages.filter((pk) => pk.id === id);
    let pickup_delivery = 0;
    if (clickedPackage[0].pickup === 1 && clickedPackage[0].delivery === 0) {
      pickup_delivery = 1;
    } else if (
      clickedPackage[0].pickup === 0 &&
      clickedPackage[0].delivery === 1
    ) {
      pickup_delivery = 2;
    } else {
      pickup_delivery = 0;
    }
    setSelectedPackages([
      ...selectedPackages,
      {
        ...clickedPackage[0],
        user_package_name: "",
        frequency: { frequency: "" },
        start_date: getDateFromString(new Date()),
        quantity: "1",
        temp_id: uuid(),
        pickup_delivery,
        customer_delivery_address: { id: "" },
      },
    ]);
  };
  const removePackage = (temp_id) => {
    setSelectedPackages(
      selectedPackages.filter((pckg) => pckg.temp_id !== temp_id)
    );
  };
  const handlePickupCheck = (temp_id) => {
    setSelectedPackages(
      selectedPackages.map((pro) =>
        pro.temp_id === temp_id
          ? {
              ...pro,
              pickup_delivery: 1,
              frequency: { id: "" },
              delivery_time_slot: null,
            }
          : pro
      )
    );
  };
  const handleDeliveryCheck = (temp_id) => {
    setSelectedPackages(
      selectedPackages.map((pro) =>
        pro.temp_id === temp_id
          ? {
              ...pro,
              pickup_delivery: 2,
              frequency: { id: "" },
              delivery_time_slot: null,
            }
          : pro
      )
    );
  };
  const handleFrequencyChange = (priceId, temp_id) => {
    const selectedTempPackage = selectedPackages.filter(
      (pro) => pro.temp_id === temp_id
    );
    const selectedFrequency = selectedTempPackage[0].VendorPackagePrices.filter(
      (pro) => pro.id === parseInt(priceId)
    );

    setSelectedPackages(
      selectedPackages.map((pro) =>
        pro.temp_id === temp_id
          ? { ...pro, frequency: { ...selectedFrequency[0] } }
          : { ...pro }
      )
    );
  };
  const handleFrequencyInputChange = (event, temp_id) => {
    const { name, value } = event.target;
    setSelectedPackages(
      selectedPackages.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, [name]: value } : pro
      )
    );
  };
  const handleTimeSlotChange = (slot, temp_id, str) => {
    if (str === "pickup") {
      setSelectedPackages(
        selectedPackages.map((pro) =>
          pro.temp_id === temp_id ? { ...pro, pickup_time_slot: slot } : pro
        )
      );
    } else if (str === "delivery") {
      setSelectedPackages(
        selectedPackages.map((pro) =>
          pro.temp_id === temp_id ? { ...pro, delivery_time_slot: slot } : pro
        )
      );
    }
    // console.log(slot, temp_id);
  };

  const setDate = (name, date, temp_id) => {
    const value = getDateFromString(date);
    setSelectedPackages(
      selectedPackages.map((pro) =>
        pro.temp_id === temp_id ? { ...pro, [name]: value } : pro
      )
    );
  };

  return (
    <main className="detailsRootContainer">
      <section className="leftBanner">
        {resturantDetails.logo && (
          <img src={resturantDetails.logo} alt="" width={300} />
        )}
        {resturantDetails.about_title && resturantDetails.about_description && (
          <Detail
            title={resturantDetails.about_title}
            desc={resturantDetails.about_description}
          />
        )}
        {resturantDetails.food_title && resturantDetails.food_description && (
          <Detail
            title={resturantDetails.food_title}
            desc={resturantDetails.food_description}
          />
        )}
        {resturantDetails.service_area_title &&
          resturantDetails.service_area_description && (
            <Detail
              title={resturantDetails.service_area_title}
              desc={resturantDetails.service_area_description}
            />
          )}
        <footer className=" dFooter leftFooter text-sm">
          <span> CONTACT TAJ MAHAL </span> <br />
          {resturantDetails.public_phone && (
            <span>PHONE: {resturantDetails.public_phone} </span>
          )}
          <br />
          {resturantDetails.public_email && (
            <span>EMAIL: {resturantDetails.public_email}</span>
          )}
        </footer>
      </section>
      <section className="rightDetails">
        <h4>
          <span className="text-red">READY TO GET STARTED? </span>
          ORDER YOUR MEAL PACKAGE
        </h4>
        <h6 className="my-20x">STEP 1</h6>
        <h5 className="text-red"> SELECT A PACKAGE</h5>
        <div className="row flex-nowrap overflow-auto gap-20x mx-5x">
          {packages.map((pkg, index) => (
            <Package
              key={pkg.id}
              item={pkg}
              handleAddPackage={handleAddPackage}
            />
          ))}
        </div>
        <div className="step-2-container">
          {selectedPackages.length > 0 && (
            <>
              <h6 className="my-20x">STEP 2</h6>
              <h5 className="text-red"> SELECT YOUR FREQUENCY</h5>
              <CForm onSubmit={handleSavePackages}>
                <div className="selectedPackagesContainer">
                  {selectedPackages.map((pckg) => (
                    <NewFrequency
                      key={pckg.id}
                      product={pckg}
                      setDate={setDate}
                      removePackage={removePackage}
                      handlePickupCheck={handlePickupCheck}
                      handleDeliveryCheck={handleDeliveryCheck}
                      handleFrequencyChange={handleFrequencyChange}
                      handleTimeSlotChange={handleTimeSlotChange}
                      handleFrequencyInputChange={handleFrequencyInputChange}
                    />
                  ))}
                </div>
                <div className="text-center my-10x">
                  {selectedPackages.length > 0 && (
                    <CButton
                      className="px-5"
                      type="submit"
                      // onClick={handleSavePackages}
                    >
                      Next
                    </CButton>
                  )}
                </div>
              </CForm>
            </>
          )}
        </div>
        <footer className="dFooter rightFooter text-sm">
          <span> CONTACT TAJ MAHAL RESTURANT </span> <br />
          {resturantDetails.public_phone && (
            <span>PHONE: {resturantDetails.public_phone} </span>
          )}
          <br />
          {resturantDetails.public_email && (
            <span>EMAIL: {resturantDetails.public_email}</span>
          )}
        </footer>
      </section>
    </main>
  );
};

export default ResturantDetails;
