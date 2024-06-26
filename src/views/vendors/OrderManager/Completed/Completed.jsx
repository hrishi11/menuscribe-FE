import React from "react";
import "./Completed.css";
import { CAccordion } from "@coreui/react";
import CompletedItem from "./CompletedItem/CompletedItem";

const Completed = ({ completed, setCompleted, fetchOrders }) => {
  return (
    <div className="completedContainer orContainer">
      <p className="text-white bg-green text-center py-2 m-0"> COMPLETED</p>
      <CAccordion flush>
        {completed.length > 0 ? (
          completed.map((item) => (
            <CompletedItem
              key={item.id}
              itemKey={item.id}
              item={item}
              fetchOrders={fetchOrders}
            />
          ))
        ) : (
          <p className="m-0 text-center bg-white px-2 py-2">
            Nothing completed yet
          </p>
        )}
      </CAccordion>
    </div>
  );
};

export default Completed;
