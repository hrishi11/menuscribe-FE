import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CForm,
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
import { useDispatch } from "react-redux";
import { Autocomplete as TextAuto } from "@mui/material";
import TextField from "@mui/material/TextField";

import { LoadScript, Autocomplete } from "@react-google-maps/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  getCustomerAddress,
  setCustomerAddress,
} from "../../../../actions/customerReducer/CustomerActions";
import { Toast } from "../../../../components/app/Toast";
import { GOOGLE_MAPS_API_KEY } from "../../../../constants";
import { getCities } from "../../../../actions/vendorReducers/VendorActions";

const libraries = ["places"];

const CustomerAddress = ({
  showAddressModal,
  setShowAddressModal,
  setUpdateTrigger,
  customerId,
  addressId,
}) => {
  const [itemValidated, setItemValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [cities, setCities] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [type, setType] = useState();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const handleFormData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceSelect = (place) => {
    const address = place.name;

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
    setFormData((prevData) => ({
      ...prevData,
      address,
      postal: postal ? postal : "",
      city,
      city_id: city_id,
      latitude: lat,
      longitude: lng,
      unit_number: unit_number?.short_name,
    }));
  };

  useEffect(() => {
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
        setFormData(addressId !== 0 ? AddressResponse.data : {});
        setFormData((prevData) => ({
          ...prevData,
          customer_id: customerId,
        }));
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchData();
  }, [dispatch, addressId, customerId]);

  const handleCustomerAddress = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      const response = await dispatch(
        setCustomerAddress({ ...formData, vendor_added: 1 })
      );
      if (response.message === "double-address_type") {
        setType(response.type);
        setShowAddressModal(false);
        onOpen();
        return;
      }
      setShowAddressModal(false);
      if (response && response.success) {
        Toast({ message: "Address updated successfully.", type: "success" });
      }
      setUpdateTrigger((prev) => !prev);
    }
  };

  return (
    <CRow>
      <div className="z-0">
        <CModal
          visible={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setShowAddressModal(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Add Address</CModalTitle>
          </CModalHeader>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={itemValidated}
            onSubmit={handleCustomerAddress}
          >
            <CModalBody>
              <CRow>
                <CCol>
                  <CFormLabel className="text-red-600 font-12">
                    Address
                  </CFormLabel>
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
                      options={{
                        componentRestrictions: { country: "ca" },
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
                        value={formData.address || ""}
                      />
                    </Autocomplete>
                  </LoadScript>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Postal</CFormLabel>
                  <CFormInput
                    // className="simple-input"
                    type="text"
                    name="postal"
                    placeholder="Enter your address"
                    disabled
                    required
                    onChange={handleFormData}
                    value={formData.postal || ""}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormLabel className="font-12">Unit Number</CFormLabel>
                  <CFormInput
                    className="w-full"
                    // style={{ width: "full" }}
                    type="text"
                    name="unit_number"
                    placeholder="Enter Unit Number"
                    value={formData.unit_number || ""}
                    onChange={handleFormData}
                    // value={user.address.address ? user.address.address : ""}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol className="flex flex-col">
                  <CFormLabel className="font-12">City</CFormLabel>

                  <TextAuto
                    disablePortal
                    id="combo-box-demo"
                    options={cities}
                    value={formData.city || ""}
                    sx={{
                      display: "inline-block",
                      "& input": {
                        height: 5,
                      },
                    }}
                    onChange={(e, val) =>
                      setFormData({ ...formData, city: val })
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select City" />
                    )}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol className="flex flex-col">
                  <div>
                    <CFormLabel className="font-20  w-full text-start">
                      Type of Address
                    </CFormLabel>

                    <TextAuto
                      disablePortal
                      id="combo-box-demo"
                      className="w-full"
                      options={["HOME", "WORK", "OTHER"]}
                      sx={{
                        // width: 300,
                        display: "inline-block",
                        "& input": {
                          height: 5,
                        },
                      }}
                      onChange={(e, val) =>
                        setFormData({ ...formData, address_type: val })
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Home or Work" />
                      )}
                    />
                  </div>
                </CCol>
              </CRow>
              {/* <CRow>
              <CCol>
                <CFormLabel className="font-12">City</CFormLabel>
                <CFormSelect
                  className="simple-input"
                  type="text"
                  name="city_id"
                  required
                  onChange={handleFormData}
                  value={formData.city_id || ""}
                >
                  <option value="">Select</option>
                  {cities &&
                    cities.map((city) => (
                      <option
                        key={city.id}
                        value={city.id}
                      >{`${city.city} ${city.state}`}</option>
                    ))}
                </CFormSelect>
              </CCol>
            </CRow> */}
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
                    value={formData.delivery_instructions}
                  />
                </CCol>
              </CRow>
            </CModalBody>
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
      </div>
      <Modal className="z-20" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Address not added
              </ModalHeader>
              <ModalBody>
                <p>You can only have one {type} address</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </CRow>
  );
};

export default CustomerAddress;
