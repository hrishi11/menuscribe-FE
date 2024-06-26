import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import React, { useState } from "react";
import {
  addVendorDefaultItem,
  deleteDefaultItemImage,
  deleteVendorDefaultItem,
} from "../../../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../../constants";
import axios from "axios";
import { Toast } from "../../../../components/app/Toast";

export default function DefaultItemCreator({
  defItems,
  setDefItems,
  popup,
  setPopup,
  categories,
  setUpdateTrigger,

  fetchDefaultItems,
}) {
  //   const [popup, setPopup] = useState({
  //     show: false,
  //     name: "",
  //     item_image: "",
  //     file: {},
  //     vendor_category_id: "",
  //   });
  const dispatch = useDispatch();
  console.log(defItems);

  const handleItemInputChange = (e) => {
    setPopup({ ...popup, [e.target.name]: e.target.value });
  };

  const handleItemClick = (item) => {
    console.log(item);
    setPopup({
      show: true,
      ...item,
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("image", popup.file);

      if (popup.id) {
        formData.append("id", popup.id);
      }
      formData.append("name", popup.name);
      formData.append("vendor_category_id", popup.vendor_category_id);
      formData.append("item_image", popup.item_image);

      const res = await dispatch(addVendorDefaultItem(formData));
      if (res.success) {
        setPopup({
          show: false,
          name: "",
          item_image: "",
          file: {},
          vendor_category_id: "",
        });
        Toast({ message: "Item save successfully", type: "success" });
        setUpdateTrigger((pre) => !pre);
        // fetchDefaultItems();
      }
    } catch (error) {
      console.log("Error saving default items", error);
    }
  };

  const handleChangeImage = async (e) => {
    try {
      const file = e.target.files[0];

      if (file) {
        setPopup((pre) => ({ ...pre, file: file }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await dispatch(deleteVendorDefaultItem(id));
      setUpdateTrigger((pre) => !pre);

      //   fetchDefaultItems();
      Toast({ message: "Item deleted successfully", type: "success" });
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
      const key = extractFilename(popup.item_image);
      const response = dispatch(
        deleteDefaultItemImage({ key: key, id: popup.id })
      );
      Toast({ message: "Image deleted successfully", type: "success" });
      setPopup((pre) => ({ ...pre, item_image: "" }));
      setUpdateTrigger((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {defItems.length > 0 &&
          defItems.map((item) => (
            <div
              // key={item.id}
              className="flex justify-between w-full items-center"
            >
              {/* ------Item Name ----------*/}
              <div>
                <CButton
                  className="bg-transparent text-black border-none outline-none"
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}{" "}
                </CButton>
              </div>

              {/* ---------X Button----------------- */}

              <div className="flex-0">
                <>
                  <strong
                    className="text-danger cursor-pointer pr-3"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    X
                  </strong>
                </>
              </div>
            </div>
          ))}
      </div>
      <div>
        {popup.show && (
          <CCol className="mt-3">
            {/*------------Title and Close Btn ----------------- */}

            <div className="flex justify-between bg-gray-200 p-2 items-center">
              <h5> Add/Edit Default Items</h5>
              <CButton
                color="danger"
                className="text-white"
                onClick={() => setPopup({ ...popup, show: false })}
              >
                X
              </CButton>
            </div>

            {/*------------Item Name ----------------- */}
            <CFormInput
              className="simple-input mt-3"
              type="text"
              name="name"
              required
              value={popup.name}
              onChange={handleItemInputChange}
            />

            {/* -------Category------- */}
            <div>
              <CFormLabel> Category </CFormLabel>

              <CFormSelect
                value={popup.vendor_category_id}
                onChange={handleItemInputChange}
                name="vendor_category_id"
              >
                <option value="">Select</option>
                {categories.map((catogory) => (
                  <option key={catogory.id} value={catogory.id}>
                    {catogory.Category.category_plural}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="flex gap-2 justify-between p-2">
              <div className="d-flex flex-col  w-fit">
                <div className="me-2">
                  <CFormLabel className="font-12">Item Image</CFormLabel>
                </div>
                <div className="flex-grow-1 flex flex-col">
                  <input
                    type="file"
                    name="file"
                    id="file-input"
                    onChange={handleChangeImage}
                    className="hidden"
                  />
                  <label
                    for="file-input"
                    class="cursor-pointer bg-gray-100 text-black  px-10  py-2 rounded-md shadow-md border-dashed border-2 border-gray-400"
                  >
                    Select Image
                  </label>
                </div>
              </div>
              {popup.item_image && (
                <div className="flex flex-col justify-center items-end">
                  <img
                    src={popup.item_image}
                    className="rounded-lg w-[60px] h-[60px] "
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
            </div>
            <div className="text-gray-700 ">
              {popup.file ? popup.file?.name : popup.item_image}
            </div>
            {/* -------Action Buttons------- */}
            <div className="flex justify-end gap-10x mt-3">
              <CButton
                color="secondary"
                onClick={() => setPopup({ ...popup, show: false })}
              >
                Close
              </CButton>
              <CButton onClick={handleSave}> Save Changes</CButton>
            </div>
          </CCol>
        )}
      </div>
    </div>
  );
}
