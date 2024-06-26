import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import {
  getCustomer,
  checkVerificationPin,
} from "../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toast } from "../../components/app/Toast";

const CustomerSetting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [pinValidated, setPinValidated] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
  });
  if (!id && id === "" && id === undefined) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse] = await Promise.all([dispatch(getCustomer())]);
        setUserData(userResponse.data);
        setFormData(userResponse.data);
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

  const handleUserPinSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setPinValidated(true);
    } else {
      const response = await dispatch(checkVerificationPin(formData));
      if (response && response.success) {
        navigate("/login");
      } else {
        Toast({ message: "Pin is ivalid.", type: "error" });
      }
    }
  };

  return (
    <div className="mb-3 d-flex justify-content-center">
      <div className="col-md-6 col-12 d-block box px-2 py-2">
        {userData && (
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomerSetting;
