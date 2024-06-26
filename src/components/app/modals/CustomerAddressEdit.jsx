import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCustomerAddress,
  setCustomerAddress,
  updateCustomerAddress,
  updateCustomerAddressFromCustomerDashboard,
} from "../../../actions/customerReducer/CustomerActions";
import { getCities } from "../../../actions/vendorReducers/VendorActions";
import { Toast } from "../Toast";
import Popup from "../../Popup/Popup";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../../constants";

const CustomerAddressEdit = ({
  showAddressModal,
  setShowAddressModal,
  setUpdateTrigger,
  customerId,
  addressId,
  setAddressId,
}) => {
  const [itemValidated, setItemValidated] = useState(false);
  const [formData, setFormData] = useState({ addressId });
  const [cities, setCities] = useState();
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const libraries = ["places"];
  const [autocomplete, setAutocomplete] = useState(null);

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setAddressId((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const fetchData = async () => {
  //   try {
  //     const [CitiesResponse, AddressResponse] = await Promise.all([
  //       dispatch(getCities()),
  //       // addressId && addressId !== 0 && dispatch(getCustomerAddress(addressId)),
  //       dispatch(getCustomerAddress()),
  //     ]);
  //     setCities(CitiesResponse.data);
  //     // setFormData(addressId !== 0 ? AddressResponse.data : []);
  //     // setFormData((prevData) => ({
  //     //   ...prevData,
  //     //   customer_id: customerId,
  //     //   ...addressId,
  //     // }));
  //     // console.log(res);
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const [CitiesResponse, AddressResponse] = await Promise.all([
        dispatch(getCities()),
        dispatch(getCustomerAddress()),
      ]);

      const data = CitiesResponse.data.map((item) => ({
        label: `${item.city}`,
        id: item.id,
      }));
      setCities(data);
      // setFormData(addressId !== 0 ? AddressResponse.data : {});
      // setFormData((prevData) => ({
      //   ...prevData,
      //   customer_id: customerId,
      // }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, addressId, customerId]);

  const handleCustomerAddress = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      setShowAddressModal(false);
      setPopup(true);
    }
  };
  const handlePopupClick = async (str) => {
    if (str === "yes") {
      const response = await dispatch(
        updateCustomerAddressFromCustomerDashboard(addressId)
      );
      setShowAddressModal(false);
      console.log(response);
      if (response && response.success) {
        Toast({ message: "Address updated successfully.", type: "success" });
      }
      setUpdateTrigger((prev) => !prev);
      setPopup(false);
    } else {
      setPopup(false);
    }
  };
  const handlePlaceSelect = (place) => {
    const address = place.formatted_address;

    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const postal = postalCodeComponent?.short_name
      ? postalCodeComponent.short_name
      : "";
    const city = cityComponent ? cityComponent.long_name : "";
    const city_id = cities.find(
      (item) => item.label.toLowerCase() === city.toLowerCase()
    );
    const unit_number = place.address_components.find(
      (item) => item.types[0] === "subpremise"
    );
    setAddressId((prevData) => ({
      ...prevData,
      address,
      postal: postal ? postal : "",
      city,
      city_id: city_id.id,
      latitude: lat,
      longitude: lng,
      unit_number: unit_number?.short_name ? unit_number?.short_name : null,
    }));
  };

  return (
    <CRow>
      <CModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setShowAddressModal(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Update Address</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={itemValidated}
          onSubmit={handleCustomerAddress}
        >
          {formData && (
            <CModalBody>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Address Type</CFormLabel>
                  <div className="flex gap-10x">
                    <CFormCheck
                      type="radio"
                      name="address_type"
                      id="address_type"
                      label="HOME"
                      value="HOME"
                      checked={addressId.address_type === "HOME"}
                      onChange={handleFormData}
                    />
                    <CFormCheck
                      type="radio"
                      name="address_type"
                      id="address_type"
                      label="WORK"
                      value="WORK"
                      checked={addressId.address_type === "WORK"}
                      onChange={handleFormData}
                    />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Address</CFormLabel>

                  <LoadScript
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                    libraries={libraries}
                    loadingElement={<div>Loading...</div>}
                    id="google-maps-script"
                  >
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        setAutocomplete(autocomplete);
                      }}
                      onPlaceChanged={() => {
                        autocomplete?.getPlace() &&
                          handlePlaceSelect(autocomplete.getPlace());
                      }}
                    >
                      <CFormInput
                        // className="simple-input"
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        required
                        onChange={handleFormData}
                        value={addressId.address || ""}
                      />
                    </Autocomplete>
                  </LoadScript>
                </CCol>
              </CRow>
              <CCol>
                <CFormLabel className="font-12">Unit Number</CFormLabel>
                <CFormInput
                  className="w-full"
                  type="text"
                  name="unit_number"
                  placeholder="Enter Unit Number"
                  value={addressId.unit_number}
                  onChange={handleFormData}
                />
              </CCol>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Postal</CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="postal"
                    required
                    onChange={handleFormData}
                    value={addressId.postal}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">City</CFormLabel>
                  <CFormSelect
                    className="simple-input"
                    type="text"
                    name="city_id"
                    required
                    onChange={handleFormData}
                    value={addressId.city_id}
                  >
                    <option value="">Select</option>
                    {cities &&
                      cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.label}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">
                    Delivery Instructions
                  </CFormLabel>
                  <CFormInput
                    className="simple-input"
                    type="text"
                    name="delivery_instructions"
                    required
                    onChange={handleFormData}
                    value={addressId.delivery_instructions}
                  />
                </CCol>
              </CRow>
            </CModalBody>
          )}

          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setShowAddressModal(false)}
            >
              Close
            </CButton>
            <CButton type="submit" color="primary">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      {popup && <Popup handlePopupClick={handlePopupClick} />}
    </CRow>
  );
};

export default CustomerAddressEdit;
