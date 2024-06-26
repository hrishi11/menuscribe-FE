import { CForm, CFormCheck, CFormInput, CFormLabel } from "@coreui/react";
import React from "react";
import "./CreateAccount.css";

const CreateAccount = ({ user, setUser, subscriptionRef }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="box px-2 py-2 text-center mb-16x">
      <h5 className="text-blue"> CREATE YOUR MENUSCRIBE ACCOUNT </h5>
      <p>
        Customize your tiffin orders and manage your deliveries through your
        account
      </p>
      <CForm className="submitionForm">
        <div className="w-45">
          <CFormLabel> FIRST NAME </CFormLabel>
          <CFormInput
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> LAST NAME </CFormLabel>
          <CFormInput
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> EMAIL </CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> PHONE </CFormLabel>
          <CFormInput
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> PASSWORD </CFormLabel>
          <CFormInput
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-45">
          <CFormLabel> CONFIRM PASSWORD </CFormLabel>
          <CFormInput
            type="password"
            name="confirm_password"
            value={user.confirm_password}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-left w-full my-20x px-10x">
          <CFormCheck
            id="flexCheckDefault"
            className="w-full"
            label="Receive order notifications and other communications from Menuscribe via text and/or email "
            ref={subscriptionRef}
          />
        </div>
      </CForm>
    </div>
  );
};

export default CreateAccount;
