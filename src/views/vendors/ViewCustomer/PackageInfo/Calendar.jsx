import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import DateCalendarServerRequest from "./Cal";

export default function CalendarDate({ info, start_date, end_date }) {
  // let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState([]);
  useEffect(() => {
    setFocusedDate(
      info.VendorPackage.CustomerOrders.map((item) => item.order_date)
    );
  }, []);

  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);
  const [previousMonthDays, setPreviousMonthDays] = useState([]);
  function getDayFromDate(dateString) {
    // Split the date string into an array [YYYY, MM, DD]
    const dateParts = dateString.split("-");

    // Return the day part (the third element in the array)
    return parseInt(dateParts[2]);
  }
  function getMonthFromDate(dateString) {
    // Split the date string into an array [YYYY, MM, DD]
    const dateParts = dateString.split("-");

    // Return the day part (the third element in the array)
    return parseInt(dateParts[1]);
  }
  function getYearFromDate(dateString) {
    // Split the date string into an array [YYYY, MM, DD]
    const dateParts = dateString.split("-");

    // Return the day part (the third element in the array)
    return parseInt(dateParts[0]);
  }
  function removeFirstDuplicate(arr) {
    const seen = new Set();
    for (let i = 0; i < arr.length; i++) {
      if (seen.has(arr[i])) {
        arr.splice(i, 1);
        return arr;
      }
      seen.add(arr[i]);
    }
    return arr; // Return the array unmodified if no duplicates are found
  }
  useEffect(() => {
    categorizeDates(focusedDate);
  }, [focusedDate]);
  useEffect(() => {}, [currentMonthDays]);

  const categorizeDates = (datesArray) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

    const currentDates = [];
    const previousDates = [];
    const nextDates = [];

    datesArray.forEach((dateString) => {
      const date = new Date(dateString);
      const dateMonth = getMonthFromDate(`${dateString}`);
      const dateYear = getYearFromDate(`${dateString}`);

      if (dateMonth == 5 && dateYear == currentYear) {
        currentDates.push(getDayFromDate(dateString));
      } else if (
        dateMonth === previousMonthDate.getMonth() &&
        dateYear === previousMonthDate.getFullYear()
      ) {
        previousDates.push(getDayFromDate(dateString));
      } else if (
        dateMonth === nextMonthDate.getMonth() &&
        dateYear === nextMonthDate.getFullYear()
      ) {
        nextDates.push(getDayFromDate(dateString));
      }
    });
    setCurrentMonthDays(removeFirstDuplicate(currentDates));
    setPreviousMonthDays(removeFirstDuplicate(previousDates));
    setNextMonthDays(removeFirstDuplicate(nextDates));
  };
  const getFirstDayOfPreviousMonth = (date) => {
    let firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDayPrevMonth = new Date(
      firstDayCurrentMonth.setMonth(firstDayCurrentMonth.getMonth() - 1)
    );
    return `${firstDayPrevMonth.getFullYear()}-${(
      firstDayPrevMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-01`;
  };

  const getFirstDayOfNextMonth = (date) => {
    let firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDayNextMonth = new Date(
      firstDayCurrentMonth.setMonth(firstDayCurrentMonth.getMonth() + 1)
    );
    return `${firstDayNextMonth.getFullYear()}-${(
      firstDayNextMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-01`;
  };
  return (
    <div className="flex flex-wrap ">
      <DateCalendarServerRequest
        dates={previousMonthDays}
        initialDate={dayjs(getFirstDayOfPreviousMonth(new Date()))}
      />
      <div className="border-black border " />
      <DateCalendarServerRequest
        dates={[...currentMonthDays]}
        initialDate={dayjs(new Date())}
      />
      <DateCalendarServerRequest
        dates={nextMonthDays}
        initialDate={dayjs(getFirstDayOfNextMonth(new Date()))}
      />
      {/* <Calendar
        aria-label="Date (Controlled Focused Value)"
        focusedValue={focusedDate}
        value={defaultDate}
        onFocusChange={setFocusedDate}
      /> */}

      {/* <CustomDatesCalendar dates={[5, 10, 15, 20, 25, 30]} /> */}
      {/* <DatePicker
        multiple
        // onChange={onChange}
        maxTagCount="responsive"
        inputReadOnly={true}
        defaultOpen
        // defaultValue={defaultValue}
        size="small"
      /> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem label="disabled">
            <DateCalendar defaultValue={dayjs("2022-04-17")} disabled />
          </DemoItem>
          <DemoItem label="readOnly">
            <DateCalendar
              multiple
              defaultValue={dayjs("2022-04-17")}
              readOnly
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider> */}
    </div>
  );
}
