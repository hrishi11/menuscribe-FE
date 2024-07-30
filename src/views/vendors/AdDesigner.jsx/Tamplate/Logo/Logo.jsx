import React from "react";

export default function Logo({ logo }) {
  return (
    <div className="h-[200px] flex  items-center justify-center ">
      <img src={logo} className="h-full" alt="" />
    </div>
  );
}
