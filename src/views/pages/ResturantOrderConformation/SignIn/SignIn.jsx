import { CForm, CFormCheck, CFormInput, CFormLabel } from "@coreui/react";
import React from "react";
import "./SignIn.css";

const SignIn = ({ alreadyHaveAnAccount, setAlreadyHaveAnAccount }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlreadyHaveAnAccount({ ...alreadyHaveAnAccount, [name]: value });
  };
  return (
    <div className="box px-2 py-2 text-center mb-16x">
      <h5 className="text-blue"> SIGN IN TO YOUR MENUSCRIBE ACCOUNT </h5>
      <p>
        Customize your tiffin orders and manage your deliveries through your
        account
      </p>
      <CForm className="submitionForm">
        <div className="w-45">
          <CFormLabel> EMAIL </CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={alreadyHaveAnAccount.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> PASSWORD </CFormLabel>
          <CFormInput
            type="password"
            name="password"
            value={alreadyHaveAnAccount.password}
            onChange={handleInputChange}
          />
        </div>
      </CForm>
    </div>
  );
};

export default SignIn;
