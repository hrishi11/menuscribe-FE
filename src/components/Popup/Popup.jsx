import React from "react";
import { CButton } from "@coreui/react";

const Popup = ({ handlePopupClick }) => {
  return (
    <div className="popupContainer ">
      <div className="popup w-300 text-center">
        <p>
          {" "}
          WARNING: This will change the delivery address for any package
          currently using this address. Are you sure?
        </p>
        <div className="flex justify-between gap-10x">
          <CButton className="col" onClick={() => handlePopupClick("yes")}>
            Yes
          </CButton>
          <CButton className="col" onClick={() => handlePopupClick("no")}>
            No
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default Popup;
