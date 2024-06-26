import React, { useState } from "react";
import "./PaymentMethods.css";
import { CButton, CCol } from "@coreui/react";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import { useDispatch } from "react-redux";
import { setVendorPaymentMethods } from "../../actions/customerReducer/CustomerActions";

const PaymentMethods = ({ VendorPaymentMethods, locationId }) => {
  const [methods, setMethods] = useState(VendorPaymentMethods);
  const dispatch = useDispatch();
  const handlePaymentMethodSave = async () => {
    try {
      const res = await dispatch(
        setVendorPaymentMethods({
          methods: [...methods],
          locationId: locationId,
        })
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CCol className="my-10x h-fit paymentMethodsContainer">
      <h6 className="text-center">Payment Methods</h6>

      {methods &&
        methods.map((method) => (
          <PaymentMethod
            // key={PaymentMethod.id}
            method={method}
            methods={methods}
            setMethods={setMethods}
          />
        ))}
      {methods && methods.length > 0 && (
        <div className="flex justify-center my-20x">
          <CButton onClick={handlePaymentMethodSave}> Save</CButton>
        </div>
      )}
    </CCol>
  );
};

export default PaymentMethods;
