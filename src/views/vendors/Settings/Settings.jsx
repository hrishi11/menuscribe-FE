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
import { Input } from "@nextui-org/react";

import {
  deleteLocation,
  deletePromotion,
  getActivePromotions,
  getCouponTypes,
  getInactivePromotions,
  getPackages,
  getProvince,
  getSettingInfo,
  getVendor,
  getVendorSetting,
  saveVendorSettingTax,
  setPromotions,
  setVendorReducer,
  setVendorSettingInfo,
} from "../../../actions/vendorReducers/VendorActions";
import "./Settings.css";
import { Toast } from "../../../components/app/Toast";
import { handleUserRole } from "../../../utils/Helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Select } from "antd";
import Item from "antd/es/list/Item";
import moment from "moment-timezone";
export const Settings = () => {
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState(null);
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [defaultTax, setDefaultTax] = useState();
  const [locaitonInfo, setLocationInfo] = useState({
    province_id: "",
    time_zone: "",
  });
  const [timezones, setTimezones] = useState([]);

  // -------------Delete Popups-------------

  useEffect(() => {
    handleUserRole("Owner");
    fetchVendorSetting();
  }, []);

  const handleNameInputChange = (e, id) => {
    setVendor({ ...vendor, vendor_name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDafault();
  };

  const handleSaveVendor = async (vendorId) => {
    try {
      const res = await dispatch(setVendorReducer(vendor));
      Toast({ message: "User updated successfully", type: "success" });
    } catch (error) {
      console.log("error on setting vendor data", error);
    }
  };

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

  useEffect(() => {
    fetchVendor();
    fetchProvice();
    fetchSettingInfo();
    const allTimezones = moment.tz.names().map((timezone) => {
      const zoneName = moment.tz(timezone);
      const offset = zoneName.format("Z");
      const abbreviation = zoneName.format("z");
      const fullName = `${timezone} (${abbreviation} UTC${offset})`;
      return fullName;
    });
    setTimezones(
      allTimezones.map((item, index) => ({ value: item, label: item }))
    );
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChangeProvince = (value) => {
    console.log(value);
    setLocationInfo((pre) => ({ ...pre, province_id: value }));
    console.log("view", locaitonInfo);
    e;
  };
  const onChangeTimeZone = (value) => {
    setLocationInfo((pre) => ({ ...pre, time_zone: value }));
  };

  const onSearch = (value) => {
    // setLocationInfo();
  };
  const fetchProvice = async () => {
    try {
      const response = await dispatch(getProvince());
      const organizeData = response.data.map((item) => ({
        value: item.id,
        label: item.province_name,
      }));

      setProvince(organizeData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSettingInfo = async () => {
    try {
      const response = await dispatch(getSettingInfo());
      console.log(response.data);
      if (response.data) {
        setLocationInfo((pre) => ({
          province_id: response.data.province_id,
          time_zone: response.data.time_zone,
          id: response.data.id,
        }));
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProvinceSave = async () => {
    try {
      if (locaitonInfo) {
        const response = await dispatch(setVendorSettingInfo(locaitonInfo));
        if (response) {
          Toast({ message: "Location save successfully", type: "success" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchVendorSetting = async () => {
    try {
      const response = await dispatch(getVendorSetting());
      console.log(response.data);
      setDefaultTax(response.data.tax_default);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveTax = async () => {
    try {
      const response = await dispatch(
        saveVendorSettingTax({ default_tax: defaultTax })
      );
      if (response.message === "Successfull") {
        Toast({ message: "Default Tax Save Successfully", type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <h3> Settings</h3>
      {/* ------Create PROMOTIONS-------- */}

      {vendor && (
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* ---------General Settings------------- */}
          <div className="bg-white p-16 my-10x">
            <p> GENERAL SETTINGS</p>
            <CFormLabel htmlFor="company_name"> COMPANY NAME</CFormLabel> <br />
            <CFormInput
              type="text"
              placeholder="Company Name"
              id="company_name"
              name="company_name"
              className="px-5x py-5x max-w-300x"
              value={vendor.vendor_name}
              onChange={(e) => handleNameInputChange(e)}
            />
            <CButton
              className="my-10x"
              onClick={() => handleSaveVendor(vendor.id)}
            >
              SAVE
            </CButton>
          </div>
        </form>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* ---------General Settings------------- */}
        <div className="bg-white p-16 my-10x">
          <p> GENERAL SETTINGS</p>
          <CFormLabel htmlFor="company_name"> COMPANY NAME</CFormLabel> <br />
          <div className="flex gap-2">
            {/* {locaitonInfo.province_id && ( */}
            <Select
              showSearch
              placeholder="Select Province"
              optionFilterProp="children"
              className="w-[300px]"
              onChange={onChangeProvince}
              value={
                locaitonInfo?.province_id ? locaitonInfo?.province_id : null
              }
              onSearch={onSearch}
              filterOption={filterOption}
              options={province}
            />
            {/* )} */}

            {/* {locaitonInfo.time_zone && ( */}
            <Select
              showSearch
              placeholder="Select Time Zone"
              optionFilterProp="children"
              className="w-[300px]"
              onChange={onChangeTimeZone}
              onSearch={onSearch}
              value={locaitonInfo?.time_zone ? locaitonInfo?.time_zone : null}
              filterOption={filterOption}
              options={timezones}
            />
            {/* )} */}
          </div>
          <CButton
            className="my-10x w-fit"
            onClick={() => handleProvinceSave()}
          >
            SAVE
          </CButton>
        </div>
      </form>

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* ---------General Settings------------- */}
        <div className="bg-white p-16 my-10x">
          <p> PAYMENT SETTINGS</p>
          <CFormLabel htmlFor="company_name">
            {" "}
            Default Tax Percentage (%)
          </CFormLabel>{" "}
          <br />
          <Input
            type="number"
            label="Tax"
            placeholder="0.00"
            labelPlacement="outside"
            className="w-fit"
            value={defaultTax}
            onChange={(e) => setDefaultTax(e.target.value)}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">%</span>
              </div>
            }
          />
          {/* <CFormInput
            type="text"
            placeholder="Tax"
            id="percent_tax"
            name="percent_tax"
            className="px-5x py-5x max-w-300x"
            value={defaultTax}
            onChange={(e) => setDefaultTax(e.target.value)}
          /> */}
          <CButton className="my-10x" onClick={() => handleSaveTax()}>
            SAVE
          </CButton>
        </div>
      </form>
    </div>
  );
};
