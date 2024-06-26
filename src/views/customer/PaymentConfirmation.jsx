import { CButton, CCol, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPackages } from "../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
import { CustomerDashboardFooter } from "../../components/DashboardCustomerFooter";
import { CustomerDashboardHeaderWithoutNav } from "../../components/CustomerDashboardHeaderWithoutNav";

const PaymentConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMyAccount = () => {
    navigate("/");
  };
  return (
    <main className="flex flex-col justify-between min-h-screen">
      {/* <CustomerDashboardHeaderWithoutNav /> */}
      <div className="mb-3 d-flex justify-content-center">
        <div className="col-md-6 col-12 d-block box px-2 py-2">
          <h1 className="h4 fw-bold text-info text-center">Order Confirmed</h1>
          <p className="text-center">
            If you haven&apos;t made the payment yet, Please follow the provided
            payment instruction.
          </p>
          <CRow>
            <CCol className="mt-5">
              <h5 className="text-center fw-bold">Payment Instruction</h5>
              <p className="text-center">
                <b>Interac:</b> Please send e-Transfer to pay@tifinbox.com{" "}
                <br />
                Order marked as Paid once the payment is made.
              </p>
            </CCol>
            <div className="text-center mt-5">
              <CButton
                color="info"
                className="text-white px-5"
                onClick={handleMyAccount}
              >
                My Account
              </CButton>
            </div>
          </CRow>
        </div>
      </div>
      <CustomerDashboardFooter />
    </main>
  );
};

export default PaymentConfirmation;
