import React from "react";
import "./Detail.css";
const Detail = ({ title, desc }) => {
  return (
    <div className="detailsContainer">
      <h6 className="text-red"> {title}</h6>
      <p>{desc}</p>
    </div>
  );
};

export default Detail;
