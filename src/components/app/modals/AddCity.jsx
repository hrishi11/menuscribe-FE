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
import { useEffect, useState } from "react";
//import { getPackages, addDefaultItem, deleteDefaultItem } from '../../actions/vendorReducers/VendorActions'
import { useDispatch } from "react-redux";
import {
  getCities,
  addPackageCity,
} from "../../../actions/vendorReducers/VendorActions";
import { Toast } from "../Toast";
import {
  Autocomplete,
  AutocompleteItem,
  NextUIProvider,
} from "@nextui-org/react";
import { animals } from "./data";

const AddCity = ({
  showCityModal,
  setShowCityModal,
  packagesData,
  setUpdateTrigger,
  package_id,
}) => {
  const [itemValidated, setItemValidated] = useState(false);
  const dispatch = useDispatch();
  const [cities, setCities] = useState();
  const [cityData, setCityData] = useState({
    city_id: "",
  });
  const handleCityData = (event) => {
    console.log("event", event);
    // const { name, value } = event.target;
    setCityData((prevData) => ({
      ...prevData,
      city_id: event,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getCities());
        setCities(response.data);
        setCityData((prevData) => ({
          ...prevData,
          package_id: package_id,
        }));
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch, package_id]);

  const handleAddCity = async (event) => {
    console.log("form data", cityData);
    const check = packagesData.VendorPackageCities.find(
      (item) => item.city_id == cityData.city_id
    );
    if (check) {
      // alert("Duplicate City") I think it's good
      setShowCityModal(false);
      return;
    }
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      const response = await dispatch(addPackageCity(cityData));
      setUpdateTrigger((prev) => !prev);
      setShowCityModal(false);
      if (response && response.success) {
        Toast({ message: "City added successfully.", type: "success" });
      }
    }
  };

  return (
    <NextUIProvider>
      <CRow>
        <CModal
          visible={showCityModal}
          onClose={() => setShowCityModal(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => showCityModal(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Add City</CModalTitle>
          </CModalHeader>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={itemValidated}
            onSubmit={handleAddCity}
          >
            <CModalBody>
              <CRow>
                <CCol>
                  {/* <CFormLabel className="font-12">Item Name</CFormLabel> */}
                  <Autocomplete
                    label="Select City"
                    className=" bg-white w-full"
                    // style={{ width: "100%" }}
                    onSelectionChange={handleCityData}
                  >
                    {cities &&
                      cities.map((city) => (
                        <AutocompleteItem
                          key={city.id}
                          value={city.city.toLowerCase()}
                        >
                          {`${city.state}-${city.city}`}
                        </AutocompleteItem>
                      ))}
                  </Autocomplete>
                  {/* <CFormSelect
                  className="simple-input"
                  type="text"
                  name="city_id"
                  required
                  onChange={handleCityData}
                >
                  <option value="">Select</option>
                  {cities &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.state}-{city.city}
                      </option>
                    ))}
                </CFormSelect> */}
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => setShowCityModal(false)}
              >
                Close
              </CButton>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CRow>
    </NextUIProvider>
  );
};

export default AddCity;
