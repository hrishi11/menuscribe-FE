import React from "react";

export default function OurFood({ ourFood }) {
  return (
    <div className="h-[200px]">
      <div className="flex flex-col border-2 items-center justify-center w-full h-full rounded-2xl bg-gray-100">
        <h5>{ourFood.title}</h5>
        <span className="w-2/3 text-center"> {ourFood.description}</span>
        {/* <span>Email: {contectInfo.email}</span> */}
      </div>
    </div>
  );
}
