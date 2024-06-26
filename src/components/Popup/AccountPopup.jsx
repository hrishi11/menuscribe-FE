import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";

const Popup = ({ handlePopupClick }) => {
  return (
    <div className="popupContainer ">
      <div className="popup w-300 text-center">
        <p>You already have an account</p>
        <div className="flex justify-between gap-10x">
          <CButton className="col" onClick={handlePopupClick}>
            OK
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default Popup;
