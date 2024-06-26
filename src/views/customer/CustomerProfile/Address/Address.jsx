import React from "react";
import "./Address.css";

const Address = ({ address, handleDeleteAddress, handleEditAddress }) => {
  return (
    <div className="relative  address-container">
      <h6 className="text-bold"> {address?.address_type} </h6>
      <span> {address?.address}</span> <br />
      <span>
        {" "}
        {address?.CitiesAll?.city}, {address?.CitiesAll?.state}
      </span>
      <br />
      <span> {address?.postal}</span>
      <br />
      <br />
      <em>
        <q>{address?.delivery_instructions}</q>
      </em>
      <div className="absolute bottom-3 right-3 items-end flex gap-2 w-full justify-end">
        <button
          onClick={() => handleEditAddress(address)}
          className="bg-blue-500 text-white p-1 px-2"
        >
          EDIT
        </button>
        <button
          onClick={() => handleDeleteAddress(address.id)}
          className="bg-blue-500 text-white p-1 px-2"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Address;
