import React from "react";

export default function PickupAddress({ info }) {
  function convertTimeTo12HourFormat(time) {
    // Split the time string into hours, minutes, and seconds
    const [hour, minute, second] = time.split(":").map(Number);

    // Determine the period (AM or PM)
    const period = hour >= 12 ? "PM" : "AM";

    // Convert hour from 24-hour format to 12-hour format
    const hour12 = hour % 12 || 12;

    // Return the formatted time
    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
  }
  return (
    <div className="box px-2 py-2 text-center mb-16x  flex flex-col items-center">
      <h4 className="text-blue-400">PICKUP DETAILS</h4>
      <h5 className="text-blue-400">Pickup Location</h5>
      <p>
        {info.VendorLocation.address}, {info.VendorLocation.CitiesAll.city},{" "}
        {info.VendorLocation.CitiesAll.state}
      </p>
      <h5 className="text-blue-400">Pickup Instructions</h5>
      <p>Knock on the door when you arrive</p>
      <h5 className="text-blue-400">Pickup Date</h5>
      <p>{info.start_date ? info.start_date : "N/A"}</p>
      <h5 className="text-blue-400">Pickup time slot</h5>
      <div className="w-fit">
        <div className="text-center">
          <span>
            {convertTimeTo12HourFormat(info.delivery_time_slot.start_time)} -{" "}
            {convertTimeTo12HourFormat(info.delivery_time_slot.end_time)}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
