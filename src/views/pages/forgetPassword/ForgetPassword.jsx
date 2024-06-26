import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendForgetPasswordMsg } from "../../../actions/authReducer/AuthActions";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import { useLocation, useParams } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = location.state;
  const { role } = params;
  useEffect(() => {
    console.log("role", params);
  }, [role]);
  const handleForgetPassword = async () => {
    if (!email) {
      setError("Email is required");
    } else {
      try {
        // Logic to handle forget password
        const res = await dispatch(sendForgetPasswordMsg({ email, role }));
        if (res) {
          console.log(res);
          setError("");
          setSuccess(res.success);
        } else {
          setError("Email not found");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#e0e0e0" }}
    >
      <div
        className="card p-4 d-flex justify-content-center"
        style={{ width: "40%", height: "40%" }}
      >
        <h2 className="text-center mb-4">Forgot Your Password?</h2>
        {success ? (
          <div className="text-center">
            We have sent you an email with the reset password link
          </div>
        ) : (
          <>
            <p>
              Please enter you email address. We will send you an email with the
              password reset link.
            </p>
            <div className="form-group" style={{ width: "100%" }}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Email / Phone"
                  name="email"
                  feedbackInvalid="Please provide a valid email or phone."
                  id="validationCustom01"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </CInputGroup>
              {/* <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
              {error && <p className="text-danger mt-2">{error}</p>}
              {/* <button
            className="btn btn-block mt-3 "
            style={{
              width: "100%",
              backgroundColor: "#43b7fa",
              color: "white",
            }}
            onClick={handleForgetPassword}
          >
            Send Email
          </button> */}
              <CButton
                color="primary"
                className="px-4"
                onClick={handleForgetPassword}
              >
                Send Email
              </CButton>
              {/* <button
            className="btn btn-block mt-3 font-weight-bold"
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "#43b7fa",
            }}
          >
            Login
          </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
