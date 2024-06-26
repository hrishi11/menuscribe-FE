import React from "react";
import "./Prepare.css";
import { CAccordion } from "@coreui/react";
import PrepareItem from "./PrepareItem/PrepareItem";
import { cilPrint } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Prepare = ({ prepare, setPrepare, fetchOrders, exportToExcel }) => {
  console.log(prepare);
  return (
    <div className="prepareContainer orContainer">
      <div className="sectionBarContainer text-white bg-blue text-center py-2 m-0">
        <p className="m-0"> PREPARE</p>
        <div className="printIcon">
          <button onClick={exportToExcel}>
            <CIcon icon={cilPrint} size="lg" />
          </button>
        </div>
      </div>
      <CAccordion flush>
        {prepare.length > 0 ? (
          prepare.map((item) => (
            <PrepareItem
              key={item.id}
              itemKey={item.id}
              item={item}
              fetchOrders={fetchOrders}
            />
          ))
        ) : (
          <p className="m-0 text-center bg-white px-2 py-2">
            No orders for today
          </p>
        )}
      </CAccordion>
    </div>
  );
};

export default Prepare;
