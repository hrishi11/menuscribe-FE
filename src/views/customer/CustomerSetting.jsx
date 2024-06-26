import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import {
  getCustomer,
  updateCustomerPassword,
  checkVerificationPin,
  updateCustomer,
} from "../../actions/customerReducer/CustomerActions";
import { getCities } from "../../actions/vendorReducers/VendorActions";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerSetting = () => {
  const [userData, setUserData] = useState();
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [pinValidated, setPinValidated] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [citiesData, setCitiesData] = useState();
  const [userPin, setUserPin] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, citiesResponse] = await Promise.all([
          dispatch(getCustomer()),
          dispatch(getCities()),
        ]);
        setUserData(userResponse.data);
        setCitiesData(citiesResponse.data);

        setFormData(userResponse.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPasswordValidated(true);
    } else {
      const response = await dispatch(updateCustomerPassword(formData));
      if (response && response.status === "success") {
        //    navigate('/manage/dashboard')
      }
    }
  };
  const handleUserPinSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPinValidated(true);
    } else {
      const response = await dispatch(checkVerificationPin(formData));
      if (response && response.status === "success") {
        //    navigate('/manage/dashboard')
      }
    }
  };
  const handleUserFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPinValidated(true);
    } else {
      const response = await dispatch(updateCustomer(formData));
      if (response && response.success) {
        console.log(response);
        navigate("/customer");
      }
    }
  };

  return (
    <div className="mb-3 d-flex justify-content-center">
      <div className="col-md-6 col-12 d-block box px-2 py-2">
        {userData && userData.status === 0 && (
          <div>
            <h4 className="mt-5 text-center text-info fw-bold">
              Welcome to flex
            </h4>
            <p className="h5 text-center">
              Enter your details below to get started.
            </p>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={passwordValidated}
              onSubmit={handlePasswordSubmit}
            >
              <CRow>
                <CCol>
                  <h5>Phone</h5>
                  <p>If you received the message enter the phone below.</p>
                  <div className="d-flex">
                    <div className="me-2">
                      <h4>+1</h4>
                    </div>
                    <div className="w-100">
                      <CFormInput
                        type="number"
                        name="phone"
                        placeholder="12345678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol className="mt-3">
                  <CFormLabel>Create Password</CFormLabel>
                  <CFormInput
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    id="validationCustom01"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol className="mt-3">
                  <CFormLabel>Retype Password</CFormLabel>
                  <CFormInput
                    name="retype_password"
                    placeholder="Password"
                    aria-label="Password"
                    id="validationCustom01"
                    value={formData.retype_password}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    type="submit"
                    className="mt-3 px-5 w-100 text-white"
                    color="info"
                  >
                    Next
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </div>
        )}
        {userData && userData.status === 2 && (
          <div>
            <h4 className="mt-5 text-center text-info fw-bold">
              Welcome to flex
            </h4>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={pinValidated}
              onSubmit={handleUserPinSubmit}
            >
              <CRow>
                <CCol>
                  <h5>Phone</h5>
                  <p>+{userData.phone}</p>
                  <p>Enter your pin</p>
                  <small>
                    Please check your text message for the verification code and
                    enter it below.
                  </small>
                  <div className="d-flex">
                    <div className="w-100">
                      <CFormInput
                        type="number"
                        name="pin"
                        placeholder=""
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    type="submit"
                    className="mt-3 px-5 w-100 text-white"
                    color="info"
                  >
                    Next
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </div>
        )}
        {userData && userData.status === 3 && (
          <div>
            <h4 className="mt-5 text-center text-info fw-bold">
              Welcome to flex
            </h4>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={formValidated}
              onSubmit={handleUserFormSubmit}
            >
              <CRow>
                <div className="mt-3 mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="First Name">First Name</CFormLabel>
                      <CFormInput
                        name="first_name"
                        placeholder="First name"
                        aria-label="First name"
                        id="validationCustom01"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="Last Name">Last Name</CFormLabel>
                      <CFormInput
                        name="last_name"
                        placeholder="Last name"
                        aria-label="Last name"
                        id="validationCustom02"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-3">
                  <CCol xs>
                    <CFormLabel htmlFor="Email">Email</CFormLabel>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      aria-label="Email"
                      id="validationCustom03"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs>
                    <CFormLabel htmlFor="Address">Address (Line 1)</CFormLabel>
                    <CFormInput
                      name="address_1"
                      placeholder="Address"
                      aria-label="Address"
                      id="validationCustom04"
                      value={formData.address_1}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs>
                    <CFormLabel htmlFor="delivery_instruction">
                      Delivery Instructions (optional)
                    </CFormLabel>
                    <CFormInput
                      name="delivery_instruction"
                      placeholder="mike.jones@hotmail.com"
                      aria-label="delivery_instruction"
                      id="validationCustom05"
                      value={formData.delivery_instruction}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs>
                    <CFormLabel htmlFor="postal_code">Postal Code</CFormLabel>
                    <CFormInput
                      name="postal_code"
                      placeholder="LSS 2H6"
                      aria-label="postal_code"
                      id="validationCustom06"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </div>
                <div className="mb-3">
                  <CCol xs>
                    <CFormLabel htmlFor="city">City</CFormLabel>
                    <CFormSelect
                      name="city"
                      aria-label="Default select example"
                      id="validationCustom07"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    >
                      {citiesData &&
                        citiesData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.city_name}
                          </option>
                        ))}
                    </CFormSelect>
                  </CCol>
                </div>
              </CRow>
              <CRow>
                <CCol>
                  <CButton
                    type="submit"
                    className="mt-3 px-5 w-100 text-white"
                    color="info"
                  >
                    Next
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSetting;
