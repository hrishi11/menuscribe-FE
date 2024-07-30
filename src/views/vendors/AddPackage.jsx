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

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getPackage,
  addDefaultItem,
  deleteDefaultItem,
  handledeleteCity,
  savePackage,
  deactivatePackage,
  getCities,
  activatePackage,
  getPackageTimeSlots,
  getCategories,
  getAllDefaultItems,
} from "../../actions/vendorReducers/VendorActions";
import DatePicker from "react-datepicker";
import { setTimeFormat } from "../../utils/Helper";
import "react-datepicker/dist/react-datepicker.css";
import AddCity from "../../components/app/modals/AddCity";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../components/app/Toast";
import { handleUserRole } from "../../utils/Helper";
import PacakgeNameDetail from "../../components/VendorAddPakages/PacakgeNameDetail";
import DefaultItem from "../../components/VendorAddPakages/DefaultItem";
import { Select, SelectItem } from "@nextui-org/react";
import { API_URL } from "../../constants";
import axios from "axios";

const AddPackage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packagesData, setPackagesData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(false);
  const [pickUpDisabled, setPickUpDisabled] = useState(false);
  const [validated, setValidated] = useState(false);
  const [itemValidated, setItemValidated] = useState(false);
  const [vendorPackagePrice, setVendorPackagePrice] = useState([]);
  const [formData, setFormData] = useState({
    package_name: "",
    package_details: "",
    package_location: {},
    pickup_from: "",
    pickup_until: "",
    delivery_from: "",
    delivery_until: "",
    pickup_daily: "",
    pickup_weekly: "",
    pickup_monthly: "",
    delivery_daily: "",
    delivery_weekly: "",
    delivery_monthly: "",
    image: "",
    deactivate: 0,
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });
  const [dates, setDates] = useState([]);
  const getDates = (value) => {
    setDates(value);
  };
  const [itemData, setItemData] = useState({
    item_name: "",
    item_category: "",
    item_quantity: "",
    default_item_id: "",
  });
  const [visible, setVisible] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [packageDeactivated, setPackageDeactivated] = useState(false);
  const [cities, setCities] = useState();
  const [categories, setCategories] = useState([]);
  const [defItems, setDefItems] = useState([]);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [getCustomers, setGetCustomers] = useState([]);

  useEffect(() => {
    handleUserRole(["Owner"]);

    fetchTimeSlots();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCities());
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  const fetchTimeSlots = async () => {
    try {
      const response = await dispatch(getPackageTimeSlots(id));
      setDates(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleItemData = (event) => {
    const { name, value } = event.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      if (id) {
        const response = await dispatch(getPackage(id));
        console.log("locationNa", response?.data);
        setPackagesData(response.data);
        setVendorPackagePrice(response.data.VendorPackagePrices);
        // console.log("res444", resposne.data);
        setFormData((prevData) => ({
          ...prevData,
          id: response?.data?.id,
          package_name: response?.data?.package_name,
          image: response?.data?.image,
          package_details: response?.data?.package_description,
          package_location: response?.data?.VendorLocation
            ? {
                label: response?.data?.VendorLocation?.location_name
                  ? response?.data?.VendorLocation?.location_name
                  : "",
                value: response?.data?.VendorLocation?.location_name
                  ? response?.data?.VendorLocation?.location_name
                  : "",
                id:
                  response?.data?.VendorLocation?.id &&
                  response?.data?.VendorLocation?.id,
              }
            : { label: "", value: "" },
          tax_percent: response?.data.tax_percent,
          deactivate: response?.data?.pause,
          pickup: response?.data?.pickup,
          pickup_from: response?.data?.pickup_schedule_start,
          pickup_until: response?.data?.pickup_schedule_end,
          delivery: response?.data?.delivery,
          delivery_from: response?.data?.delivery_schedule_end,
          delivery_until: response?.data?.delivery_schedule_start,
          mon: response?.data?.mon,
          tue: response?.data?.tue,
          wed: response?.data?.wed,
          thu: response?.data?.thu,
          fri: response?.data?.fri,
          sat: response?.data?.sat,
          sun: response?.data?.sun,
        }));
        response.data.VendorPackagePrices &&
          response.data.VendorPackagePrices.forEach((item) => {
            setFormData((prevData) => ({
              ...prevData,
              [`${item.method}_${item.frequency}`]: item.cost,
            }));
          });
        setItemData((prevData) => ({
          ...prevData,
          package_id: id,
        }));
        if (response.data.pickup === 0) {
          setPickUpDisabled(true);
        }
        if (response.data.delivery === 0) {
          setDeliveryDisabled(true);
        }
        if (response.data.pause === 1) {
          setPackageDeactivated(true);
        } else {
          setPackageDeactivated(false);
        }
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDefaultItems();
    getCategoriesData();
    fetchTimeSlots();
  }, [dispatch, updateTrigger, id]);

  const handleTime = (name, time) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: setTimeFormat(time),
    }));
  };
  const handleAddDefaultItem = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!itemData.default_item_id) {
      Toast({ message: "Default item is required", type: "error" });
      return;
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      const response = await dispatch(addDefaultItem(itemData));
      setUpdateTrigger((prev) => !prev);
      setItemData({ item_name: "", item_category: "", item_quantity: "" });
      setVisible(false);
      if (response && response.success) {
        Toast({ message: "Default item added successfully.", type: "success" });
      }
    }
  };
  const handledeleteDefaultItem = async (id) => {
    const response = await dispatch(deleteDefaultItem(id));
    setUpdateTrigger((prev) => !prev);
    setVisible(false);
    if (response && response.success) {
      Toast({ message: "Item deleted successfully.", type: "success" });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getCategoriesData = async () => {
    try {
      const response = await dispatch(getCategories());
      setCategories(response.data);
    } catch (error) {
      console.log(error);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dates.length <= 0 && id) {
      Toast({ message: "Add atleast 1 Delivery slot.", type: "error" });
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const response = await dispatch(
        savePackage({ formData: formData, timeSlots: dates })
      );
      if (response.message === `can't change this timeslot`) {
        // Toast({ message: "Can't change timeslot ", type: "success" });
        setIsSlotModalOpen(true);
        // setGetCustomers(response.data);
      }
      if (response && response.success) {
        const form = new FormData();
        form.append("image", formData.file);
        form.append("id", response.data.id);

        const resp = await axios.post(`${API_URL}/upload-package-image`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchData();
        navigate(`/manage/add-package/${response.data.id}`);
        Toast({ message: "Package saved successfully.", type: "success" });
      }
    }
  };

  const handlePickUp = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      pickup: e.target.checked,
    }));
    if (!e.target.checked) {
      setPickUpDisabled(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        pickup_from: "",
        pickup_until: "",
      }));
    } else {
      setPickUpDisabled(false);
    }
  };
  const handleDelivery = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      delivery: e.target.checked,
    }));
    if (!e.target.checked) {
      setDeliveryDisabled(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        delivery_from: "",
        delivery_until: "",
      }));
    } else {
      setDeliveryDisabled(false);
    }
  };

  const handleDeactivate = async () => {
    const response = await dispatch(deactivatePackage(id));
    if (response && response.success) {
      fetchData();
      navigate(`/manage/add-package/${response.data.id}`);
      Toast({ message: "Package deactivated successfully.", type: "success" });
    }
  };
  const handleActivate = async () => {
    const response = await dispatch(activatePackage(id));
    if (response && response.success) {
      fetchData();
      navigate(`/manage/add-package/${response.data.id}`);
      Toast({ message: "Package activated successfully.", type: "success" });
    }
  };

  const showCity = (item) => {
    return cities?.find((itemss) => item.city_id == itemss.id)?.city;
  };

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4 card-custome">
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {/* Package Name, Package Details, Action Buttons */}
              <PacakgeNameDetail
                formData={formData}
                handleInputChange={handleInputChange}
                packageDeactivated={packageDeactivated}
                setUpdateTrigger={setUpdateTrigger}
                setFormData={setFormData}
                handleDeactivate={handleDeactivate}
                handleActivate={handleActivate}
              />
              {/* {id && ( */}
              <DefaultItem
                packageId={id}
                setDates={getDates}
                defItems={defItems}
                dates={dates}
                vendorPackagePrice={vendorPackagePrice}
                packagesData={packagesData}
                packageDeactivated={packageDeactivated}
                pickUpDisabled={pickUpDisabled}
                deliveryDisabled={deliveryDisabled}
                visible={visible}
                setVisible={setVisible}
                formData={formData}
                handlePickUp={handlePickUp}
                setShowCityModal={setShowCityModal}
                //FormData={FormData}
                // handleInputChange={handleInputChange}
                setFormData={setFormData}
                handledeleteDefaultItem={handledeleteDefaultItem}
                handleDelivery={handleDelivery}
                handleTime={handleTime}
                showCity={showCity}
                fetchData={fetchData}
                setUpdateTrigger={setUpdateTrigger}
                isSlotModalOpen={isSlotModalOpen}
                setIsSlotModalOpen={setIsSlotModalOpen}
              />
              {/* )} */}
              <CCol className="">
                <CRow className="float-end flex gap-2 mt-4">
                  <CCol className="col-4 mx-2">
                    {id && formData.deactivate == 0 ? (
                      <CButton
                        type="button"
                        className="mb-3 simple-button"
                        color="secondary"
                        onClick={() => handleDeactivate()}
                      >
                        DEACTIVATE
                      </CButton>
                    ) : (
                      id && (
                        <CButton
                          type="button"
                          className="mb-3 simple-button"
                          color="success"
                          onClick={() => handleActivate()}
                        >
                          ACTIVATE
                        </CButton>
                      )
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
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CRow>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">
              Add Default Item
            </CModalTitle>
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
                  {/* <CFormSelect
                    className="simple-input"
                    name="item_quantity"
                    required
                    value={itemData.item_quantity}
                    onChange={handleItemData}
                  >
                    <option>Select</option>
                    <option value="1">9oz</option>
                    <option value="2">10oz</option>
                    <option value="3">11oz</option>
                  </CFormSelect> */}

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
      </CRow>
      <CRow>
        <AddCity
          showCityModal={showCityModal}
          packagesData={packagesData}
          setShowCityModal={setShowCityModal}
          setUpdateTrigger={setUpdateTrigger}
          package_id={id}
        />
      </CRow>
    </CRow>
  );
};

export default AddPackage;
