import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import {
  addDefaultItem,
  deleteDefaultItem,
  getAllDefaultItems,
  getCategories,
  getCities,
  getGlobalDefaultItems,
  getPackages,
  getServingMeasurements,
  getVendorSettings,
  updateVendorPackageDefaultItems,
} from "../../../actions/vendorReducers/VendorActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleUserRole } from "../../../utils/Helper";
import {
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react/dist";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "@coreui/coreui";
import DefaultItemCreator from "./DefaultItemCreator/DefaultItemCreator";
import { CardBody, useDisclosure } from "@nextui-org/react";
import LimitModal from "../../../components/Modals/LimitModal";
const Packages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [defItems, setDefItems] = useState([]);
  const [globalItems, setGlobalItems] = useState([]);
  const [itemValidated, setItemValidated] = useState(false);
  const [packagesData, setPackagesData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [showAddDef, setShowAddDef] = useState(false);
  const [itemData, setItemData] = useState({
    item_name: "",
    item_category: "",
    item_quantity: "",
    default_item_id: "",
    all_packages: 1,
  });
  const [categories, setCategories] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    // item: { item_name: "" },
    item_name: "",
    quantity: "",
    measurement: "",
    vendor_category: "",
  });
  const [popup2, setPopup2] = useState({
    show: false,
    name: "",
    item_image: "",
    file: {},
    vendor_category_id: "",
  });
  const [measurements, setMeasurements] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [limit, setLimit] = useState();
  useEffect(() => {
    handleUserRole(["Owner"]);
    getCategoriesData();
    fetchMeasurements();
  }, []);
  const fetchMeasurements = async (req, res) => {
    try {
      const res = await dispatch(getServingMeasurements());
      setMeasurements(res.data);
    } catch (error) {
      console.log("Error Fetching measurements");
    }
  };
  const handleItemData = (event) => {
    const { name, value } = event.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchDefaultItems();
    fetchData();
  }, [dispatch, updateTrigger]);

  const fetchData = async () => {
    try {
      const response = await dispatch(getPackages());
      setPackagesData(response.data);
      const getDefItems = await dispatch(getGlobalDefaultItems());
      setGlobalItems(getDefItems.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  const handlePackageNavigate = (id) => {
    navigate(`/manage/add-package/${id}`);
  };
  const handleAddPackage = async () => {
    const checkLimit = await dispatch(getVendorSettings());

    if (
      (checkLimit.data.no_of_packages || checkLimit.data.no_of_packages) &&
      packagesData.length >= checkLimit.data.no_of_packages
    ) {
      setLimit(checkLimit.data.no_of_packages);
      onOpen();
    } else {
      navigate(`/manage/add-package`);
    }
  };
  const fetchDefaultItems = async (req, res) => {
    try {
      const res = await dispatch(getAllDefaultItems());
      setDefItems(res.data);
    } catch (error) {
      console.log("Error Fetching measurements");
    }
  };

  const handleAddDefaultItem = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      const response = await dispatch(addDefaultItem(itemData));
      setUpdateTrigger((prev) => !prev);
      setItemData({
        item_name: "",
        item_category: "",
        item_quantity: "",
        all_packages: 1,
        default_item_id: "",
      });

      setVisible(false);
      if (response && response.success) {
        Toast({ message: "Default item added successfully.", type: "success" });
      }
    }
  };
  const getCategoriesData = async () => {
    try {
      const response = await dispatch(getCategories());
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledeleteDefaultItem = async (id) => {
    const response = await dispatch(deleteDefaultItem(id));
    setUpdateTrigger((prev) => !prev);

    if (response && response.success) {
      Toast({ message: "Item deleted successfully.", type: "success" });
    }
  };

  const handleItemClick = (item) => {
    console.log(item);
    setPopup({
      show: true,
      ...item,
      vendor_category: item.vendor_category_id,
    });
  };
  const handleItemInputChange = (e) => {
    setPopup({ ...popup, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await dispatch(updateVendorPackageDefaultItems(popup));
      setPopup({
        show: false,
        item_name: "",
        quantity: "",
        measurement: "",
        vendor_category: "",
      });
      fetchData();
    } catch (error) {
      console.log("Error saving default ite ");
    }
  };
  return (
    <CRow>
      <CCol className="flex flex-row-reverse gap-2">
        <LimitModal
          name={"packages"}
          limit={limit}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
          </CModalHeader>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={itemValidated}
            onSubmit={handleAddDefaultItem}
          >
            <CModalBody>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Default Item</CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="default_item_id"
                    required
                    value={itemData.default_item_id}
                    onChange={handleItemData}
                  >
                    <option>Select</option>
                    {defItems.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </CFormSelect>
                  <CFormLabel className="font-12">Item Name</CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="item_name"
                    required
                    value={itemData.item_name}
                    onChange={handleItemData}
                  />

                  <CFormLabel className="font-12">Quantity</CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="item_quantity"
                    required
                    value={itemData.item_quantity}
                    onChange={handleItemData}
                  />

                  <CFormLabel className="font-12">Category</CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    name="item_category"
                    required
                    value={itemData.item_category}
                    onChange={handleItemData}
                  >
                    <option>select</option>
                    {categories.map((item) => (
                      <option value={item.id}>
                        {item.Category.category_name_singular}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
        <div className=" w-[30%] flex flex-col gap-2">
          {/* Default Item Creator */}
          <CCard>
            <CCardHeader className="">
              <div className="d-flex justify-content-between ">
                <h3>Default Item Creator</h3>
                <CButton
                  className="float-end text-white"
                  color="info"
                  // onClick={() => setVisible(true)}
                  onClick={() => {
                    // setDefItems((pre) => [
                    //   ...pre,
                    //   { name: "", vendor_category_id: 0 },
                    // ]);
                    setPopup2({ name: "", vendor_category_id: 0, show: true });
                    setShowAddDef(true);
                  }}
                >
                  New Item
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <div>
                <DefaultItemCreator
                  defItems={defItems}
                  setPopup={setPopup2}
                  popup={popup2}
                  setDefItems={setDefItems}
                  categories={categories}
                  fetchDefaultItems={fetchDefaultItems}
                  setUpdateTrigger={setUpdateTrigger}
                />
              </div>
            </CCardBody>
          </CCard>

          {/* Global Item Creator */}

          <CCard className="mb-4 ">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <h3>Global Default Item</h3>
                <CButton
                  className="float-end text-white"
                  color="info"
                  onClick={() => setVisible(true)}
                >
                  New Item
                </CButton>
              </div>
            </CCardHeader>

            <CCardBody>
              <div>
                <div>
                  {globalItems.length > 0 &&
                    globalItems.map((item) => (
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
                            {item.item_name}{" "}
                            {item.VendorDefaultItem && (
                              <span>({item.VendorDefaultItem.name})</span>
                            )}
                          </CButton>
                        </div>

                        {/* ---------X Button----------------- */}

                        <div className="flex-0">
                          <>
                            <strong
                              className="text-danger cursor-pointer pr-3"
                              onClick={() => handledeleteDefaultItem(item.id)}
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

                      <div className="flex justify-between">
                        <h5> Modal title</h5>
                        <CButton
                          color="danger"
                          className="text-white"
                          onClick={() => setPopup({ ...popup, show: false })}
                        >
                          X
                        </CButton>
                      </div>
                      <CFormLabel className="font-12">Default Item</CFormLabel>
                      <CFormSelect
                        className="simple-input"
                        name="default_item_id"
                        required
                        value={popup.default_item_id}
                        onChange={handleItemInputChange}
                      >
                        <option>Select</option>
                        {defItems.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </CFormSelect>
                      {/*------------Item Name ----------------- */}
                      <CFormInput
                        className="simple-input mt-3"
                        type="text"
                        name="item_name"
                        required
                        value={popup.item_name}
                        onChange={handleItemInputChange}
                      />

                      {/* -------Quantity------- */}
                      <div>
                        <CFormLabel> Quantity </CFormLabel>
                        <div className="flex gap-10x">
                          <CFormInput
                            className="simple-input"
                            type="text"
                            name="quantity"
                            required
                            value={popup.quantity}
                            //disabled={packageDeactivated}
                            onChange={handleItemInputChange}
                          />
                          <CFormSelect
                            value={popup.measurement}
                            onChange={handleItemInputChange}
                            name="measurement"
                          >
                            <option value="">Select</option>
                            {measurements.map((measurement) => (
                              <option
                                key={measurement.id}
                                value={measurement.plural}
                              >
                                {measurement.plural}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </div>
                      {/* -------Category------- */}
                      <div>
                        <CFormLabel> Category </CFormLabel>

                        <CFormSelect
                          value={popup.vendor_category}
                          onChange={handleItemInputChange}
                          name="vendor_category"
                        >
                          <option value="">Select</option>
                          {categories.map((catogory) => (
                            <option key={catogory.id} value={catogory.id}>
                              {catogory.Category.category_plural}
                            </option>
                          ))}
                        </CFormSelect>
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
            </CCardBody>
          </CCard>
        </div>
        <CCard className="mb-4 w-[70%]">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <h3>Packages</h3>
              <CButton
                className="float-end text-white"
                color="info"
                onClick={handleAddPackage}
              >
                Add Package
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <table className="table striped">
              <thead>
                <th>Package</th>
                <th>Action</th>
              </thead>
              <tbody>
                {packagesData &&
                  packagesData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.package_name}</td>
                      <td
                        className="text-primary h6 cursor-pointer"
                        onClick={() => handlePackageNavigate(item.id)}
                      >
                        Edit
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Packages;
