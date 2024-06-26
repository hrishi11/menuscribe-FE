import React from "react";
import "./Deliver.css";
import { CAccordion } from "@coreui/react";
import DeliveryItem from "./DeliveryItem/DeliveryItem";

const Deliver = ({ deliver, setDeliver, fetchOrders }) => {
  return (
    <div className="deliverContainer orContainer ">
      <p className="text-white bg-orange text-center py-2 m-0"> DELIVER</p>
      <CAccordion flush>
        {deliver.length > 0 ? (
          deliver.map((item) => (
            <DeliveryItem
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

export default Deliver;
