import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import {
  getCustomerByVC,
  updateCustomerPassword,
} from "../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { customerLogin } from "../../actions/authReducer/AuthActions";

const CustomerOnboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [tempPassword, setTempPassword] = useState("");
  const [tempSuccess, setTempSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
  });
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };

  if (!id && id === "" && id === undefined) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse] = await Promise.all([
          dispatch(getCustomerByVC(id)),
        ]);
        console.log(userResponse);
        if (userResponse.data) {
          setUserData(userResponse.data);
          setFormData({
            phone: userResponse.data.phone,
            id: userResponse.data.id,
          });
        } else {
          setInvalidId(true);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validatePassword = (password) => {
    const numberRegex = /\d/;

    if (password.length < 8 || !numberRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one number."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleTempPassword = async (e) => {
    e.preventDefault();
    if (tempPassword === "") {
      setErrorMessage("Temparary Password must required");
      return;
    }

    try {
      const response = await dispatch(
        customerLogin({ email: userData.email, password: tempPassword })
      );
      console.log(response);
      if (response) {
        setTempSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!validatePassword(formData.password)) {
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPasswordValidated(true);
    } else {
      if (formData.password !== formData.retype_password) {
        setPasswordsMatch(false);
        return;
      }
      const response = await dispatch(updateCustomerPassword(formData));
      if (response && response.success) {
        navigate(`/customer-pin-verify/${response.data.id}`);
      }
    }
  };

  const handleAgree = (val) => {
    setAgree(val);
  };

  return (
    <div className="mb-3 d-flex justify-content-center">
      <div className="col-md-6 col-12 d-block box px-2 py-2">
        {userData &&
          userData.status === 0 &&
          (!tempSuccess ? (
            <div className="">
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
                onSubmit={handleTempPassword}
              >
                <CRow>
                  <CCol>
                    <h5 className="mt-4">Phone</h5>
                    <p>If you received the message enter the phone below.</p>
                    <div className="d-flex">
                      <div className="me-2 d-flex">
                        <h4 className="d-flex flex-row"> +{formData.phone}</h4>
                      </div>
                      <div className="w-100">
                        {/* <CFormInput
                        type="number"
                        name="phone"
                        placeholder="12345678"
                        value={}
                        onChange={handleInputChange}
                        required
                      /> */}
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mt-3">
                    <CFormLabel className="fw-bold">
                      Temprary Password
                    </CFormLabel>
                    <p>
                      Enter the temprary password you received via text message
                    </p>
                    <CFormInput
                      name="temp_password"
                      type="password"
                      placeholder="Temprary Password"
                      aria-label="temp_password"
                      id="validationCustom01"
                      value={tempPassword}
                      onChange={(e) => setTempPassword(e.target.value)}
                      required
                    />
                    {errorMessage !== "" && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
                  </CCol>
                </CRow>
                {/* <CRow>
                  <CCol className="mt-3">
                    <CFormLabel>Retype Password</CFormLabel>
                    <CFormInput
                      name="retype_password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      id="validationCustom01"
                      value={formData.retype_password}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </CRow> */}
                <CRow>
                  <CCol>
                    {/* {errorMessage && (
                      <p className="my-2" style={{ color: "red" }}>
                        Incorrect temp password
                      </p>
                    )} */}
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
          ) : (
            <>
              <div className="">
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
                      <h5 className="mt-4">Phone</h5>
                      <p>If you received the message enter the phone below.</p>
                      <div className="d-flex">
                        <div class="me-2 d-flex">
                          <h4 className="d-flex flex-row">
                            {" "}
                            +{formData.phone}
                          </h4>
                        </div>
                        <div className="w-100">
                          {/* <CFormInput
                        type="number"
                        name="phone"
                        placeholder="12345678"
                        value={}
                        onChange={handleInputChange}
                        required
                      /> */}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-3">
                      <CFormLabel>Create Password</CFormLabel>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        id="validationCustom01"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      {errorMessage !== "" && (
                        <p className="text-danger">{errorMessage}</p>
                      )}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-3">
                      <CFormLabel>Retype Password</CFormLabel>
                      <CFormInput
                        name="retype_password"
                        type="password"
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
                    <CCol className="mt-3">
                      <CFormLabel>
                        I agree to the Terms & Conditions and Privacy Policy
                      </CFormLabel>
                      <CFormCheck
                        className="order-check"
                        id="flexCheckDefault"
                        onChange={(e) => handleAgree(e.target.checked)}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      {!passwordsMatch && (
                        <p className="my-2" style={{ color: "red" }}>
                          Passwords do not match
                        </p>
                      )}

                      <CButton
                        type="submit"
                        className="mt-3 px-5 w-100 text-white"
                        color="info"
                        disabled={agree ? false : true}
                      >
                        Next
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </div>
            </>
          ))}
        {invalidId && (
          <>
            <h5>Expired Link</h5>
            <p>
              The link you are trying to access is expired please contact your
              vendor to generate invite link again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerOnboard;
