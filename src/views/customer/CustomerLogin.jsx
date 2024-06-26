import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { customerLogin } from "../../actions/authReducer/AuthActions";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [userData, setUserData] = useState();
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const [userResponse] = await Promise.all([
  //                 dispatch(getCustomer(3)),
  //             ]);
  //             setUserData(userResponse.data)
  //             setFormData(userResponse.data);
  //         } catch (error) {
  //             console.error("Error fetching packages:", error);
  //         }
  //     };
  //     fetchData();
  // }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const response = await dispatch(customerLogin(formData));
      if (response && response.success) {
        navigate("/");
      }
    }
  };

  const handleForgetPassword = () => {
    navigate("/forgot-password", { state: { role: "customer" } });
  };

  return (
    <div className="d-flex justify-content-center items-center min-w-screen min-h-screen">
      {/* -----------Left Login Form------------ */}
      <div className="loginFormContainer">
        {/* --------Logo------- */}
        <div className="logo-header">
          <div class="logo-header-inner">
            <h1 className="text-red">Menu</h1>
            <h1>scribe</h1>
          </div>
        </div>
        {/* ---------------Form------------- */}
        <div className="box px-10x py-10x loginFormContainer-form">
          <h4 className="text-center text-info fw-bold text-uppercase">
            Login
          </h4>
          <p className="h5 text-center">
            Please login using your account phone number or email address.
          </p>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow>
              <CCol className="mt-3">
                <CFormLabel>Email / Phone (without country Code)</CFormLabel>
                <CFormInput
                  name="email"
                  type="text"
                  placeholder="Email / Phone"
                  aria-label="email"
                  id="validationCustom01"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mt-3">
                <CFormLabel>Password</CFormLabel>
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
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton
                  type="submit"
                  className="mt-3 px-5 w-100 text-white"
                  color="info"
                >
                  Login
                </CButton>
                <div className="flex justify-center">
                  <button
                    onClick={handleForgetPassword}
                    className=" border-none outline-none bg-transparent text-blue font-medium text-center mx-auto"
                  >
                    RESET PASSWORD
                  </button>
                </div>
              </CCol>
            </CRow>
          </CForm>
        </div>
        {/* -------------Copy right text----------- */}
        <p className="text-center"> &copy;2024 Menuscribe</p>
      </div>
      {/* -----------Right banner------------ */}
      <div className="w-50 bannerDiv">
        <h1> Order Your Meal</h1>
        <p>
          Meals will be delivered from <br />
          your favourite restaurant
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
