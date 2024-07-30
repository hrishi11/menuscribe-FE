import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInAction } from "../../../actions/authReducer/AuthActions";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { Toast } from "../../../components/app/Toast";
import { ToastContainer } from "react-toastify";
import { getVendorEmployeesWithEmail } from "../../../actions/vendorReducers/VendorActions";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    vendorEmployeeId: 0,
  });
  const [multipleResturant, setMultipleResturant] = useState({
    status: false,
    vendorEmployees: [],
  });

  const fetchVendorEmployeeWithEmail = async () => {
    try {
      const res = await dispatch(
        getVendorEmployeesWithEmail({ email: formData.email })
      );
      if (res?.data?.length > 1) {
        setMultipleResturant({ status: true, vendorEmployees: res.data });
        setFormData({ ...formData, vendorEmployeeId: res.data[0].id });
      } else {
        setMultipleResturant({
          status: false,
          vendorEmployees: [],
        });
        setFormData({ ...formData, vendorEmployeeId: res.data[0].id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    formData.email.length > 0 && fetchVendorEmployeeWithEmail();
  }, [formData.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else if (formData.vendorEmployeeId === 0) {
      Toast({
        message:
          "You currently don't have access. Please contact your manager for assistance.",
        type: "error",
      });
      return;
    } else {
      const response = await dispatch(signInAction(formData));

      if (response && response.status === "success") {
        localStorage.setItem("VendorEmployeeId", formData.vendorEmployeeId);
        Toast({ message: "Login successfull", type: "success" });
        if (response.type === "Owner") {
          navigate("/manage/dashboard");
        } else if (response.type === "Rider") {
          navigate("/manage/delivery");
        } else {
          navigate("/manage/create-menu");
        }
      } else {
        Toast({ message: "Invalid email or password.", type: "error" });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = () => {
    navigate("/forgot-password", { state: { role: "vendor" } });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-center items-center min-w-screen min-h-screen">
        {/* -----------Left banner------------ */}
        <div className="w-50 bannerDiv">
          <h1> Order Your Meal</h1>
          <p>
            Meals will be delivered from <br />
            your favourite restaurant
          </p>
        </div>
        {/* -----------Right Login Form------------ */}
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
              Admin Login
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
              {/* -----------Select Resturant----------- */}
              {multipleResturant.status && (
                <CRow>
                  <CCol className="mt-3">
                    <CFormLabel>Select Resturant</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      value={formData.vendorEmployeeId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vendorEmployeeId: e.target.value,
                        })
                      }
                      required
                    >
                      {multipleResturant.vendorEmployees.map((em) => (
                        <option key={em.id} value={em.id}>
                          {em.Vendor.vendor_name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              )}
              {/* -----------Login BTN-------- */}
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
                      onClick={handleResetPassword}
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
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
