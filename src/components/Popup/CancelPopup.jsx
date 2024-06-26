import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";

const Popup = ({ handlePopupClick, dates, customer_name }) => {
  const [reason, setReason] = useState("");

  if (dates.length > 0) {
    const allDates = dates.map((date) =>
      date.split("T")[0].split("-").reverse().join("-")
    );

    return (
      <div className="popupContainer ">
        <div className="popup w-300 text-center">
          <p>This will delete the following {allDates.length} orders</p>
          <ul className="orders list-none p-0 max-h-300 overflow-y-scroll">
            {allDates.reverse().map((date) => (
              <li className="font-semibold text-center">{date}</li>
            ))}
          </ul>
          <ul>
            <textarea
              name="cancel"
              id=""
              cols="30"
              className="border-2 p-2 "
              placeholder="Cancelation Reason (Optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
            ></textarea>
          </ul>
          <div className="flex justify-between gap-10x">
            <CButton className="col" onClick={() => handlePopupClick("Cencel")}>
              Cancel
            </CButton>
            <CButton
              className="col"
              onClick={(e) => handlePopupClick("Confirm", reason, allDates)}
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
          <p>There is no orders delete</p>
          <div className="flex justify-between gap-10x">
            <CButton className="col" onClick={() => handlePopupClick("Cencel")}>
              Cancel
            </CButton>
          </div>
        </div>
      </div>
    );
  }
};

export default Popup;
