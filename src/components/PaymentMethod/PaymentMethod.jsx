import React, { useState } from "react";
import "./PaymentMethod.css";
import { CFormInput, CFormSwitch } from "@coreui/react";
import { useDispatch } from "react-redux";
import { setVendorPaymentMethods } from "../../actions/customerReducer/CustomerActions";

const PaymentMethod = ({ method, methods, setMethods }) => {
  const handleToggle = async (id) => {
    let updatedMethod = { ...method };
    if (updatedMethod.VendorPaymentMethod) {
      updatedMethod.VendorPaymentMethod.status =
        updatedMethod.VendorPaymentMethod.status === 1 ? 0 : 1;
      setMethods(
        methods.map((met) => (met.id === method.id ? updatedMethod : met))
      );
    } else {
      updatedMethod = { ...method, VendorPaymentMethod: { status: 1 } };
      setMethods(
        methods.map((met) => (met.id === method.id ? updatedMethod : met))
      );
    }
  };
  const handleInputChange = (e) => {
    const updatedMethod = { ...method };
    updatedMethod.VendorPaymentMethod.instructions = e.target.value;
    setMethods(
      methods.map((met) => (met.id === method.id ? updatedMethod : met))
    );
  };
  return (
    <div key={method.id} className="my-10x">
      <CFormSwitch
        label={method?.method_name}
        checked={method.VendorPaymentMethod?.status === 1}
        onChange={handleToggle}
        name={method?.method_name}
      />
      {method.VendorPaymentMethod?.status === 1 && (
        <CFormInput
          type="text"
          placeholder="Instruction"
          value={method.VendorPaymentMethod?.instructions}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default PaymentMethod;
