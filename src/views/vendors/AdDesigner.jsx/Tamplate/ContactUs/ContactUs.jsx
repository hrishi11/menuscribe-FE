import React from "react";

export default function ContactUs({ contectInfo }) {
  return (
    <div className="h-[200px]">
      <div className="flex border-2 flex-col items-center justify-center w-full h-full rounded-2xl bg-gray-100">
        <h5>Contact Us</h5>
        <span>Phone: {contectInfo.phone}</span>
        <span>Email: {contectInfo.email}</span>
      </div>
    </div>
  );
}
