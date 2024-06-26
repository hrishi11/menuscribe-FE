import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./Dates.css";
import SingleDate from "../Date/SingleDate";

const Dates = ({ selectedDate, setSelectedDate }) => {
  const [allDates, setAllDates] = useState([]);

  const getNext60Days = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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

    const next60Days = [];
    let currentDate = new Date();

    for (let i = 0; i < 60; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = days[nextDate.getDay()];
      const month = months[nextDate.getMonth()];
      const date = nextDate.getDate();

      const isToday =
        nextDate.toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0];

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

      const isTomorrow =
        nextDate.toISOString().split("T")[0] ===
        tomorrow.toISOString().split("T")[0];

      next60Days.push(
        isToday
          ? {
              id: uuid(),
              date: date,
              month: month,
              day: dayOfWeek,
              dateObject: nextDate, // Added property for date object
              dateStr: nextDate.toISOString().split("T")[0],
              isToday,
            }
          : isTomorrow
          ? {
              id: uuid(),
              date: date,
              month: month,
              day: dayOfWeek,
              dateObject: nextDate, // Added property for date object
              dateStr: nextDate.toISOString().split("T")[0],
              isTomorrow,
            }
          : {
              id: uuid(),
              date: date,
              month: month,
              day: dayOfWeek,
              dateObject: nextDate, // Added property for date object
              dateStr: nextDate.toISOString().split("T")[0],
            }
      );
    }

    setAllDates(next60Days);
  };

  useEffect(() => {
    getNext60Days();
  }, []);
  useEffect(() => {
    setSelectedDate(allDates[0]);
  }, [allDates]);
  return (
    <div className="allDatesContainer">
      {allDates?.map((date) => (
        <SingleDate
          key={date.id}
          data={date}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ))}
    </div>
  );
};

export default Dates;
