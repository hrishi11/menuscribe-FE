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
import { Input } from "@nextui-org/react";

import { useEffect, useRef, useState } from "react";
import { getVendorLocations } from "../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import { Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../constants";
import { deletePackageImage } from "../../actions/vendorReducers/VendorActions";
import { Toast } from "../app/Toast";
const props = {
  name: "file",
  action: "http://localhost:5001/api/upload-package-image",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const PacakgeNameDetail = ({
  formData,
  setUpdateTrigger,
  handleInputChange,
  packageDeactivated,
  setFormData,
}) => {
  const [options, setOptions] = useState([]);
  const [getLocation, setGetLocation] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    getVendorLocation();
  }, []);

  const getVendorLocation = async () => {
    try {
      const response = await dispatch(getVendorLocations());
      const data = response.data.map((item) => {
        return {
          id: item.id,
          value: item.location_name,
          label: item.location_name,
        };
      });
      setGetLocation(data);
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value, val2) => {
    if (val2) {
      setFormData((prevState) => ({
        ...prevState,
        package_location: val2,
      }));
    } else {
      alert("Location should not be null");
      // setFormData((prevState) => ({
      //   ...prevState,
      //   package_location: { label: "", value: "", id: 0 },
      // }));
    }
  };

  const handleChangeImage = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        setFormData((pre) => ({ ...pre, file: file }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const extractFilename = (url) => {
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
      return filename;
    } catch (error) {
      console.error("Invalid URL:", url);
      throw error;
    }
  };
  const handleDeleteImage = async (e) => {
    try {
      const key = extractFilename(formData.image);
      const response = dispatch(
        deletePackageImage({ key: key, package_id: formData.id })
      );
      Toast({ message: "Image deleted successfully", type: "success" });
      setUpdateTrigger((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-3">
      <CRow className="flex-col-package background px-0">
        <CCol className="flex gap-3 max-sm:flex-wrap">
          {/*------------ Package Name---------- */}

          <div className="d-flex flex-col w-72 ">
            <div className="me-2 ">
              <CFormLabel className="font-12">Package Name</CFormLabel>
            </div>
            <div>
              <CFormInput
                className="simple-input"
                type="text"
                name="package_name"
                value={formData.package_name}
                onChange={handleInputChange}
                required
                disabled={packageDeactivated}
              />
            </div>
          </div>
          {/*------------ Package Details---------- */}

          <div className="d-flex w-72 flex-col">
            <div className="me-2">
              <CFormLabel className="font-12">Package Details</CFormLabel>
            </div>
            <div className="flex-grow-1">
              <CFormInput
                className="simple-input"
                type="text"
                name="package_details"
                value={formData.package_details}
                required
                onChange={handleInputChange}
                disabled={packageDeactivated}
              />
            </div>
          </div>

          {/*------------ Package Location---------- */}

          <div className="d-flex w-72 flex-col">
            <div className="me-2">
              <CFormLabel className="font-12">Package Location</CFormLabel>
            </div>
            <div className="flex-grow-1">
              {formData.package_location && (
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={formData.package_location.label}
                  onChange={handleChange}
                  options={getLocation}
                />
              )}
            </div>
          </div>

          {/*------------ Package Tax ---------- */}

          <div className="d-flex w-72 flex-col">
            <div className="me-2">
              <CFormLabel className="font-12">Package Tax (%)</CFormLabel>
            </div>
            <div className="flex-grow-1 flex ">
              <Input
                type="number"
                // label="Tax"
                placeholder="0.00"
                labelPlacement="outside"
                value={formData.tax_percent}
                onChange={(e) =>
                  setFormData((pre) => ({
                    ...pre,
                    tax_percent: e.target.value,
                  }))
                }
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">%</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="d-flex w-fit flex-col">
            <div className="me-2">
              <CFormLabel className="font-12">Package Image</CFormLabel>
            </div>
            <div className="flex-grow-1 flex flex-col">
              {/* <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
              {/* <img src={"setUploadedImage"} alt="" /> */}
              <input
                type="file"
                name="file"
                id="file-input"
                onChange={handleChangeImage}
                className="hidden"
                // style={{ display: "none" }}
              />
              <label
                for="file-input"
                class="cursor-pointer bg-gray-100 w-fit text-black px-12 py-2 rounded-md shadow-md border-dashed border-2 border-gray-400"
              >
                Select Image
              </label>
              <div className="text-gray-700 w-[200px]">
                {formData.file ? formData.file?.name : "Select Image here"}
              </div>
            </div>
          </div>
          {formData.image && (
            <div className="flex flex-col gap-1">
              <img
                src={formData.image}
                className="rounded-lg min-w-[100px] h-20"
                alt=""
              />
              <span
                className="text-red-500 text-[12px] w-full text-center cursor-pointer"
                onClick={handleDeleteImage}
              >
                Delete
              </span>
            </div>
          )}
        </CCol>

        {/*------------ Action Buttons---------- */}
        {/* <CCol className="">
          <CRow className="float-end flex gap-2 mt-4">
            <CCol className="col-4 mx-2">
              {formData.deactivate == 0 ? (
                <CButton
                  type="button"
                  className="mb-3 simple-button"
                  color="secondary"
                  onClick={() => handleDeactivate()}
                >
                  DEACTIVATE
                </CButton>
              ) : (
                <CButton
                  type="button"
                  className="mb-3 simple-button"
                  color="success"
                  onClick={() => handleActivate()}
                >
                  ACTIVATE
                </CButton>
              )}
            </CCol>
            <CCol className="col-4 mx-2">
              <CButton
                type="submit"
                className="mb-3 simple-button"
                color="primary"
                disabled={packageDeactivated}
              >
                SAVE
              </CButton>
            </CCol>
          </CRow>
        </CCol> */}
      </CRow>
    </div>
  );
};

export default PacakgeNameDetail;
