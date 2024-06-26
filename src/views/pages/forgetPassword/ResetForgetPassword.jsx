import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetForgetPassword,
  verifyLink,
} from "../../../actions/authReducer/AuthActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";

export default function ResetForgetPassword() {
  const [retypePassword, setRetypePassword] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState("");
  const [expire, setExpire] = useState(false);
  const dispatch = useDispatch();
  const { code, role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    verifyResetLink(code);
  }, [code]);

  const verifyResetLink = async (code) => {
    try {
      console.log(role);
      const res = await dispatch(
        verifyLink({ verification_code: code, role: role })
      );
      console.log(res);
      if (!res) {
        setExpire(true);
      } else {
        setExpire(false);
      }
    } catch (error) {
      console.log("error", error);
      setExpire(true);
    }
  };

  const handleLogin = () => {
    try {
      if (role === "customer") {
        navigate("/login");
      } else {
        navigate("/manage");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function isValidPassword(password) {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
      return false;
    }

    // All criteria met
    return true;
  }
  const handleResetPassword = async () => {
    if (!password || !retypePassword) {
      setError("Both fields are required");
    } else {
      if (password !== retypePassword) {
        setError("Passwords do not match");
        return;
      } else if (
        !isValidPassword(password) ||
        !isValidPassword(retypePassword)
      ) {
        setError(
          "Password must be at least 8 characters long and should contain numbers and alphabets"
        );
        return;
      }
      // Logic to handle forget password
      const res = await dispatch(
        resetForgetPassword({ verification_code: code, password, role: role })
      );
      console.log(res);
      if (res.status === "success") {
        setMessage("Your Password has been reset");
        // alert("Your Password has been reset");
        setError("");
      }
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#e0e0e0" }}
    >
      <div
        className="card p-4 d-flex justify-content-center "
        style={{ width: "40%", height: "40%" }}
      >
        {expire ? (
          <>This Link is expired or some internal server error</>
        ) : (
          <>
            {message ? (
              <div className="d-flex flex-col align-items-center">
                <p className="text-xl ">{message}</p>
                <CButton
                  color="primary"
                  className="px-4"
                  style={{ width: "fit-content" }}
                  onClick={handleLogin}
                >
                  Login
                </CButton>{" "}
              </div>
            ) : (
              <>
                <h2 className=" mb-4">Reset Password</h2>

                <div className="form-group" style={{ width: "100%" }}>
                  {/* <label>New Password</label> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="New Password"
                      name="password"
                      type="password"
                      feedbackInvalid="Please provide a password"
                      id="validationCustom01"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  {/* <input
    type="password"
    className="form-control"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  /> */}
                  {/* <label>Retype Password</label> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Retype Password"
                      type="password"
                      name="password"
                      feedbackInvalid="Please provide a valid email or phone."
                      id="validationCustom01"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  {/* <input
    type="password"
    className="form-control"
    value={retypePassword}
    onChange={(e) => setRetypePassword(e.target.value)}
  /> */}
                  {error && <p className="text-danger mt-2">{error}</p>}
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </CButton>
                  {/* <button
    className="btn btn-block mt-3 "
    style={{
      width: "100%",
      backgroundColor: "#43b7fa",
      color: "white",
    }}
    onClick={handleResetPassword}
  >
    Reset Password
  </button> */}
                  {/* <button
    className="btn btn-block mt-3 font-weight-bold"
    style={{
      width: "100%",
      backgroundColor: "white",
      color: "#43b7fa",
    }}
  >
    Forget Password
  </button> */}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
