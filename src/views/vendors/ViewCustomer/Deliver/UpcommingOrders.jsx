import React from "react";
import "./UpcommingOrders.css";
import { CAccordion } from "@coreui/react";
import UpcommingItems from "./UpcommingItems/UpcommingItems";

const UpcommingOrders = ({ orders, setOrders, fetchOrders }) => {
  return (
    <div className="deliverContainer orContainer">
      <p className="text-white bg-orange text-center py-2 m-0">
        {" "}
        Upcoming Orders
      </p>
      <CAccordion flush>
        {orders && orders.length > 0 ? (
          orders.map((item) => (
            <UpcommingItems
              key={item.id}
              itemKey={item.id}
              item={item}
              fetchOrders={fetchOrders}
            />
          ))
        ) : (
          <p className="m-0 text-center bg-white px-2 py-2">
            No deliveries yet
          </p>
        )}
      </CAccordion>
    </div>
  );
};

export default UpcommingOrders;
