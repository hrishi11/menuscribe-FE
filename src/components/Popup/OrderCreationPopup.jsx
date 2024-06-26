import React from "react";
import { CButton } from "@coreui/react";

const Popup = ({ handlePopupClick, dates, customer_name }) => {
  if (dates.length > 0) {
    const allDates = dates.map((date) =>
      date.split("T")[0].split("-").reverse().join("-")
    );

    return (
      <div className="popupContainer ">
        <div className="popup w-300 text-center">
          <p>
            This will create the following {allDates.length} orders for{" "}
            {customer_name}
          </p>
          <ul className="orders list-none p-0 max-h-300 overflow-y-scroll">
            {allDates.reverse().map((date) => (
              <li className="font-semibold text-center">{date}</li>
            ))}
          </ul>
          <div className="flex justify-between gap-10x">
            <CButton className="col" onClick={() => handlePopupClick("Cencel")}>
              Cancel
            </CButton>
            <CButton
              className="col"
              onClick={() => handlePopupClick("Confirm")}
            >
              Confirm
            </CButton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="popupContainer ">
        <div className="popup w-300 text-center">
          <p>
            No new orders to create. All the orders are created for this date.
          </p>

          <div className="flex justify-between gap-10x">
            <CButton className="col" onClick={() => handlePopupClick("Cencel")}>
              Cencel
            </CButton>
          </div>
        </div>
      </div>
    );
  }
};

export default Popup;
