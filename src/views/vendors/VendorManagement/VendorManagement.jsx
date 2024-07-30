import React, { useEffect, useState } from "react";
import {
  createVendorSettings,
  getAllUserVendors,
  getVendorSettingsById,
  getVendorSettingsByVendorId,
  setVendorSettings,
} from "../../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import SelectedVendorSettings from "./SelectedVendorSettings/SelectedVendorSettings";
import { CFormLabel, CFormSelect } from "@coreui/react/dist";
import { Toast } from "../../../components/app/Toast";
import Controls from "./Controls/Controls";
import LimitWarningModal from "../../../components/Modals/LimitWarningModal";
import { useDisclosure } from "@nextui-org/react";

export default function VendorManagement() {
  const dispatch = useDispatch();
  const [vendors, setVendors] = useState([]);
  const [vendorSetting, setVendorSetting] = useState();
  const [selectedVendor, setSelectedVendor] = useState();
  const [controlChange, setControlChange] = useState();
  const [vendorInfo, setVendorInfo] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getVendors = await dispatch(getAllUserVendors());
      setVendors(getVendors.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVendorChange = async (val) => {
    const vend = vendors.find((vendor) => vendor.id == val);
    const response = await dispatch(getVendorSettingsByVendorId(val));

    setVendorSetting(response.data);
    setVendorInfo(response);
    setSelectedVendor(vend);
  };

  const handleCreateSetting = async () => {
    const response = await dispatch(
      createVendorSettings({
        vendor_id: selectedVendor.id,
        vendor_name: selectedVendor.vendor_name,
      })
    );
    setVendorSetting([]);

    handleVendorChange(selectedVendor.id);
    Toast({ message: "Vendor setting created successfully", type: "success" });
  };

  const handleSwitch = async (e) => {
    const { name, checked } = e.target;
    const newSettings = { ...vendorSetting };
    checked ? (newSettings[name] = 0) : (newSettings[name] = null);

    await dispatch(
      setVendorSettings({
        page_name: name,
        vendor_id: selectedVendor.id,
        value: newSettings[name],
      })
    );
    setVendorSetting(newSettings);
    // setVendorInfo(newSettings);
  };

  const handleChange = async (e) => {
    try {
      const { name, value } = e.target;
      setControlChange({
        page_name: name,
        vendor_id: selectedVendor.id,
        value: value,
      });
      setVendorSetting((pre) => ({ ...pre, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocusChange = async () => {
    try {
      console.log("ada0000000", controlChange.page_name, vendorInfo);
      if (vendorInfo[controlChange.page_name] > controlChange.value) {
        onOpen();
      } else {
        handleChangeLimit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLimit = async () => {
    try {
      const response = await dispatch(
        setVendorSettings({
          ...controlChange,
        })
      );
      setVendorSetting(response.data);
      // setVendorInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {controlChange && (
        <LimitWarningModal
          name={controlChange?.page_name}
          limit={vendorInfo[controlChange?.page_name]}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          handleChangeLimit={handleChangeLimit}
        />
      )}
      <div className="flex flex-col gap-4">
        <div>
          <h4>Vendor Management</h4>
          <div className="flex gap-2 items-end">
            <div className="">
              <CFormLabel htmlFor="selectAnEmployee">
                Select an vendor
              </CFormLabel>
              <CFormSelect
                name="selectedVendor"
                className="selectAnEmployee"
                value={selectedVendor?.id}
                onChange={(e) => handleVendorChange(e.target.value)}
              >
                <option value="0">Select</option>
                {vendors.map((vendor) => (
                  <option value={vendor.id} key={vendor.id}>
                    {vendor.vendor_name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            {selectedVendor && !vendorSetting && (
              <button
                onClick={handleCreateSetting}
                className="px-2 py-1 h-fit rounded-md bg-red-500 text-white"
              >
                Create setting
              </button>
            )}
          </div>
        </div>

        {vendorSetting && (
          <div className="flex flex-col gap-4">
            <SelectedVendorSettings
              selectedVendor={selectedVendor}
              setVendorSetting={setVendorSetting}
              vendorSetting={vendorSetting}
            />

            <Controls
              handleFocusChange={handleFocusChange}
              vendorSetting={vendorSetting}
              handleSwitch={handleSwitch}
              handleChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
