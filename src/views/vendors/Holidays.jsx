import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "../../components/app/Toast";
import {
  deleteHolidays,
  getHolidays,
  setHolidays,
} from "../../actions/vendorReducers/VendorActions";

export default function Holidays() {
  const [pickDate, setPickDate] = useState();
  const [holidaysData, setHolidaysData] = useState([]);
  const dispatch = useDispatch();
  const onChange = (date, dateString) => {
    setPickDate(dateString);
  };
  useEffect(() => {
    fetchHolidays();
  }, []);
  const fetchHolidays = async () => {
    try {
      const holidays = await dispatch(getHolidays());
      setHolidaysData(holidays.data);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    return `${day} ${month} ${year} (${dayName})`;
  }
  const handleSaveHolidays = async () => {
    try {
      const response = await dispatch(setHolidays({ date: pickDate }));
      fetchHolidays();
      if (response.message === "Date already exist") {
        Toast({ message: "Date already exist.", type: "error" });
        return;
      } else {
        Toast({ message: "Date save successfully.", type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHoliday = async (id) => {
    try {
      await dispatch(deleteHolidays(id));
      fetchHolidays();
      Toast({ message: "Date delete successfully.", type: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="">
        <h3>HOLIDAYS</h3>
        <p>
          Specify when you are closed for business. This will prevent customer
          orders from being added for that day.
        </p>
        <div className="flex gap-2">
          <DatePicker onChange={onChange} />
          <button
            onClick={handleSaveHolidays}
            className="bg-blue-500 text-white px-2 py-1 rounded-md "
          >
            save
          </button>
        </div>

        <div className="p-3">
          {holidaysData.length > 0 &&
            holidaysData.map((item) => (
              <div className="flex gap-2">
                <span
                  onClick={() => handleDeleteHoliday(item.id)}
                  className="text-red-700 cursor-pointer"
                >
                  x
                </span>
                <span>{formatDate(item.date)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
