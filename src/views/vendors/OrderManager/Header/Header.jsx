import React from "react";
import "./Header.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Select } from "antd";

const Header = ({
  selectedDate,
  setSelectedDate,
  setSelectedLocation,
  selectedLocation,
  locations,
}) => {
  const onChange = (value, value2) => {
    console.log(value2);
    localStorage.setItem("location", JSON.stringify(value2));
    setSelectedLocation(value2);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const getDateFormate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const newDate = new Date(selectedDate);
    const day = days[newDate.getDay()];
    const date = newDate.getDate().toString().padStart(2, "0");
    const month = months[newDate.getMonth()];
    const today = new Date();
    const isToday =
      newDate.getDate() === today.getDate() &&
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear();
    return `${day} ${date}-${month} ${isToday ? "(Today)" : ""}`;
  };

  return (
    <div className="headerContainer flex justify-between">
      <h6>{getDateFormate()}</h6>
      <div className="flex gap-2">
        <div>
          <Select
            showSearch
            className="h-[40px] w-[200px] placeholder:text-black"
            placeholder="Select Location"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            value={selectedLocation && selectedLocation.value}
            options={locations}
          />
        </div>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat={"YYYY-MM-dd"}
            className="w-[200px] h-[40px] "
          />

          {/* <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control w-100"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
