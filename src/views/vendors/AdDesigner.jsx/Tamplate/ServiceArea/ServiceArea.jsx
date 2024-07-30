import React from "react";

export default function ServiceArea({ serviceArea }) {
  return (
    <div className="h-[200px]">
      <div className="flex flex-col items-center border-2 justify-center w-full h-full rounded-2xl bg-gray-100">
        <h5>{serviceArea.title}</h5>
        <span className="w-2/3 text-center"> {serviceArea.description}</span>
        {/* <span>Email: {contectInfo.email}</span> */}
      </div>
    </div>
  );
}
