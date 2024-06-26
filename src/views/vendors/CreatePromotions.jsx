import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState, useId } from "react";
import { useDispatch } from "react-redux";
import {
  deleteLocation,
  deletePromotion,
  getActivePromotions,
  getCouponTypes,
  getInactivePromotions,
  getPackages,
  getVendor,
  setPromotions,
  setVendorReducer,
} from "../../actions/vendorReducers/VendorActions";
import "./Settings/Settings.css";
import { Toast } from "../../components/app/Toast";
import { handleUserRole } from "../../utils/Helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
export default function CreatePromotions() {
  const dispatch = useDispatch();
  const [couponTypes, setCouponTypes] = useState([]);
  const [rawPackages, setRawPackages] = useState([]);
  const [packages, setPackages] = useState([]);
  const [promotion, setPromotion] = useState({
    coupon_code: "",
    coupon_type: { id: "", coupon_type: "", coupon_description: "" },
    start_date: new Date(),
    end_date: new Date(),
    repeat_redemption: 0,
  });
  const [activePromotions, setActivePromotions] = useState([]);
  const [inactivePromotions, setInactivePromotions] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
  });

  const [deletePopup, setDeletePopup] = useState({ show: false, location: {} });

  useEffect(() => {
    handleUserRole("Admin");
  }, []);

  const fetchVendor = async () => {
    try {
      const res = await dispatch(getVendor());
      setVendor(res.data);
      const LocationsArr = Object.entries(res.data.locations).map(
        ([key, property]) => property
      );
    } catch (error) {
      console.log("Error from Settings.js", error);
    }
  };
  const fetchCouponTypes = async () => {
    try {
      const res = await dispatch(getCouponTypes());
      setCouponTypes(res.data);
    } catch (error) {
      console.log("Error fetching coupon types");
    }
  };
  const fetchActivePromotions = async () => {
    try {
      const res = await dispatch(getActivePromotions());
      setActivePromotions(res.data);
      // console.log(res);
    } catch (error) {
      console.log("Error fetching coupon types");
    }
  };
  const fetchInactivePromotions = async () => {
    try {
      const res = await dispatch(getInactivePromotions());
      setInactivePromotions(res.data);
      // console.log(res);
    } catch (error) {
      console.log("Error fetching coupon types");
    }
  };

  const fetchPackages = async () => {
    try {
      const { data } = await dispatch(getPackages());

      const finalPackages = [];
      data.forEach((pack) => {
        for (const price of pack.VendorPackagePrices) {
          finalPackages.push({
            ...price,
            package_name: pack.package_name,
            selected: false,
          });
        }
      });
      setPackages(finalPackages);
      setRawPackages(finalPackages);
    } catch (error) {
      console.log("Error fetching coupon types");
    }
  };

  useEffect(() => {
    fetchVendor();
    fetchCouponTypes();
    fetchActivePromotions();
    fetchInactivePromotions();
    fetchPackages();
  }, []);

  const handleCouponTypeChange = (e) => {
    const { value } = e.target;
    const selectedType = couponTypes.filter(
      (type) => type.id === parseInt(value)
    )[0]; // Returning an object

    setPromotion({ ...promotion, coupon_type: selectedType });
  };
  const handleSelectedPackageChange = (e, id) => {
    setPackages(
      packages.map((pack) =>
        pack.id === id ? { ...pack, selected: e.target.checked } : pack
      )
    );
  };
  const handlePromotionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      Toast({
        message: "Please Enter the essentials fields in the form",
        type: "error",
      });
    } else {
      const selectedpackages = packages.filter((pack) => {
        if (pack.selected) {
          return true;
        } else if (pack.vendor_coupon_package_id) {
          return true;
        } else {
          return false;
        }
      });
      const reqObj = {
        ...promotion,
        prices: selectedpackages,
      };

      try {
        const res = await dispatch(setPromotions(reqObj));
        setPromotion({
          repeat_redemption: 0,
          start_date: new Date(),
          end_date: new Date(),
          coupon_code: "",
          coupon_type: { id: "", coupon_type: "", coupon_description: "" },
        });
        Toast({
          message: "Promotion saved successfully",
          type: "success",
        });
        fetchPackages();
        fetchActivePromotions();
        fetchInactivePromotions();
      } catch (error) {
        console.log("Error setting promotions");
      }
    }
  };

  const handlePopupClick = (str) => {
    if (str === "yes") {
      console.log("YES");
      setPopup({ show: false });
    } else if (str === "no") {
      console.log("NO");
      setPopup({ show: false });
    }
  };

  const handleEditPromotion = (promo) => {
    const {
      id,
      CouponType,
      VendorCouponPackages,
      coupon_code,
      coupon_type_id,
      start_date,
      end_date,
      repeat_redemption,
    } = promo;
    console.log(promo);

    const selectedType = couponTypes.filter(
      (type) => type.id === parseInt(coupon_type_id)
    )[0]; // Returning an object
    // console.log(promotion);
    setPromotion({
      repeat_redemption,
      start_date: new Date(start_date + "T00:00:00"),
      end_date: end_date ? new Date(end_date + "T00:00:00") : new Date(),
      coupon_code,
      coupon_type: selectedType,
      id,
    });

    // Setting the selected packages
    const subIds = VendorCouponPackages
      ? VendorCouponPackages.map((item) => item.vendor_package_price_id)
      : [];
    let packagesWithoutSelectedPackages = rawPackages.map((pack) => {
      if (subIds.includes(pack.id)) {
        const vendor_coupon_package = VendorCouponPackages.filter(
          (pk) => pk.vendor_package_price_id == pack.id
        )[0];
        // console.log(vendor_coupon_package, pack);
        return {
          ...pack,
          selected: true,
          vendor_coupon_package_id: vendor_coupon_package.id,
        };
      } else {
        return pack;
      }
    });
    setPackages(packagesWithoutSelectedPackages);
  };

  const handleDeletePromotion = async (id) => {
    try {
      const res = await dispatch(deletePromotion(id));
      fetchActivePromotions();
      fetchInactivePromotions();
    } catch (error) {
      console.log("Error Deleting promotion");
    }
  };
  // ------Delete location functions-------------

  const handleSelectedDate = (name, date) => {
    setPromotion({ ...promotion, [name]: date });
  };
  const formatDate = (dateStr) => {
    // Split the date string into year, month, and day parts
    var parts = dateStr.split("-");
    // Months array for converting month number to month name
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract day and month from parts
    var day = parts[2];
    var month = months[parseInt(parts[1]) - 1]; // Month numbers are 0-indexed in JavaScript Date

    // Return formatted date
    return day + " " + month;
  };

  return (
    <div>
      <CRow className="bg-white px-10x py-10x rounded">
        <CCol>
          <h5>CREATE PROMOTIONS</h5>
          <CForm
            className="row g-3 mt-3 needs-validation"
            noValidate
            // validated={validated}
            onSubmit={handlePromotionSubmit}
          >
            {/* Coupon Name & Coupon code */}
            <CRow>
              <CCol>
                <CFormLabel className="">COUPON TYPE</CFormLabel>
                <CFormSelect
                  className="simple-input"
                  name="item_category"
                  required
                  value={promotion.coupon_type.id}
                  onChange={(e) => handleCouponTypeChange(e)}
                >
                  <option value="">Select</option>
                  {couponTypes.length > 0 &&
                    couponTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.coupon_type}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
              {/* Coupon Code*/}
              <CCol>
                <CFormLabel className="">COUPON CODE</CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="item_name"
                  placeholder=""
                  required
                  value={promotion.coupon_code}
                  onChange={(e) =>
                    setPromotion({ ...promotion, coupon_code: e.target.value })
                  }
                  //onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            {/* Coupon rules */}
            <CRow>
              <CCol className="mt-3">
                <CFormLabel className="">COUPON RULES</CFormLabel>
                <CFormInput
                  className="simple-input"
                  type="text"
                  name="item_name"
                  placeholder=""
                  // required
                  value={promotion.coupon_type.coupon_description}
                  onChange={(e) =>
                    setPromotion({
                      ...promotion,
                      coupon_type: {
                        ...promotion.coupon_type,
                        coupon_description: e.target.value,
                      },
                    })
                  }
                  // onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            {/* ---------START DATE END DATE--------- */}
            <div className="flex gap-10x">
              <div>
                <CFormLabel>START DATE</CFormLabel>
                <DatePicker
                  selected={promotion.start_date}
                  onChange={(date) => handleSelectedDate("start_date", date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control w-100"
                />
              </div>
              <div>
                <CFormLabel>END DATE</CFormLabel>
                <DatePicker
                  selected={promotion.end_date}
                  onChange={(date) => handleSelectedDate("end_date", date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control w-100"
                />
              </div>
            </div>
            {/* Applicable packages */}
            <CRow>
              <CCol className=" mt-3">
                <CFormLabel>APPLICABLE PACKAGES</CFormLabel>

                <div className="px-10x py-10x border rounded">
                  {packages.map((pack) => (
                    <div key={pack.id}>
                      <CFormSwitch
                        size="lg"
                        label={`${pack.package_name} - ${pack.frequency} - ${pack.method}`}
                        //label="Label"
                        id="formSwitchCheckDefaultLg"
                        name="selected"
                        className="h6"
                        onChange={(e) =>
                          handleSelectedPackageChange(e, pack.id)
                        }
                        //checked={formData.veg ? true : false}
                        checked={pack.selected}
                        //onChange={(val) => console.log(val.target.checked)}
                      />
                    </div>
                  ))}
                </div>
              </CCol>
            </CRow>
            <div>
              <CFormSwitch
                label="Can be redeemed more than once by same user."
                id="formSwitchCheckDefault"
                checked={promotion.repeat_redemption === 1}
                onChange={() =>
                  setPromotion({
                    ...promotion,
                    repeat_redemption:
                      promotion.repeat_redemption === 1 ? 0 : 1,
                  })
                }
              />
            </div>
            <div className="flex justify-center">
              <CButton type="submit"> Save</CButton>
            </div>
          </CForm>
        </CCol>
        <CCol>
          <div>
            {/* ----------Active Promotions-------------*/}
            <div className="active-promotions">
              <h6 className="text-center font-bold"> ACTIVE PROMOTIONS</h6>
              {activePromotions.length > 0 &&
                activePromotions.map((promotion) => (
                  <div
                    key={promotion.id}
                    className="flex justify-between my-10x"
                  >
                    <div>
                      <p className="font-medium text-md ">
                        {promotion?.coupon_code} -&nbsp;
                        {promotion?.CouponType?.coupon_type} -&nbsp;
                        {
                          new Date(promotion?.start_date + "T00:00:00")
                            .toISOString()
                            .split("T")[0]
                        }{" "}
                        &nbsp;
                        <span className="text-gray text-nowrap">
                          (expires {formatDate(promotion.end_date)})
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-5x">
                      <div>
                        <CButton
                          color="secondary"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          {" "}
                          Edit
                        </CButton>
                      </div>
                      <div>
                        <CButton
                          color="danger"
                          className="text-white"
                          onClick={() => handleDeletePromotion(promotion.id)}
                        >
                          Delete
                        </CButton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* ----------In-active Promotions-------------*/}
            <div>
              <h6 className="text-center font-bold"> INACTIVE PROMOTIONS</h6>
              {inactivePromotions.length > 0 &&
                inactivePromotions.map((promotion) => (
                  <div key={promotion.id} className="flex justify-between ">
                    <div className="text-gray">
                      <p className="font-medium text-md">
                        {promotion?.coupon_code} -&nbsp;
                        {promotion?.CouponType?.coupon_type} &nbsp; (
                        {formatDate(promotion.start_date)} -{" "}
                        {promotion.end_date && formatDate(promotion.end_date)})
                      </p>
                    </div>
                    <div>
                      <div>
                        <CButton
                          color="secondary"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          {" "}
                          Edit
                        </CButton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CCol>
      </CRow>

      {/* ----------Popups---------------- */}
      {/* Delete promotion Popup*/}
      {popup?.show && (
        <div className="popupContainer">
          <div className="popup">
            <p>Are you sure you would like to delete this Promotion</p>
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
}
