import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const setTimeFormat = (date) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export const convertToAmPm = (timeString) => {
  // Parse the time string
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Convert hours to 12-hour format
  let hours12 = hours % 12 || 12;

  // Determine if it's AM or PM
  const meridiem = hours < 12 ? "AM" : "PM";

  // Format minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Construct the AM/PM time string
  const amPmTime = `${String(hours12).padStart(
    2,
    "0"
  )}:${formattedMinutes} ${meridiem}`;

  return amPmTime;
};
export const getTimeSlot = (customerPack, VendorPack) => {
  if (!customerPack || !VendorPack) {
    return "NULL";
  }
  if (customerPack.pickup_delivery === 1) {
    return `${convertToAmPm(VendorPack.pickup_schedule_start)} -
      ${convertToAmPm(VendorPack.pickup_schedule_end)}`;
  }
  if (customerPack.pickup_delivery === 2) {
    return `${convertToAmPm(VendorPack.delivery_schedule_start)} -
    ${convertToAmPm(VendorPack.delivery_schedule_end)}`;
  }
};

export const getNextDatesOfWeek = (daysArray) => {
  let currentDate = new Date();
  let nextDays = [];
  for (let i = 0; i < 30; i++) {
    if (nextDays.length >= 7) {
      continue;
    }
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayName = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    //console.log();
    if (daysArray.includes(dayName)) {
      nextDays.push({ Date: formattedDate, Day: dayName });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return nextDays;
};

export const addDaysToDate = (dateString, daysToAdd) => {
  // Parse the input date string
  const date = new Date(dateString);

  // Add the specified number of days
  date.setDate(date.getDate() + parseInt(daysToAdd));

  // Format the result as yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getTime = (dateString) => {
  var date = new Date(dateString);

  // Get hours and minutes
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Convert hours to AM/PM format
  var ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the time string
  var timeString = hours + ":" + minutes + " " + ampm;

  return timeString;
  // console.log(timeString);
};

export const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short" };
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", options);
};
export const getCurrentWeekDays = () => {
  return Array.from(Array(7).keys()).map((idx) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + idx);
    return d;
  });
};
export const getDateFromString2 = (inputString) => {
  // Create a new Date object using the input string
  const dateObject = new Date(inputString.split("T")[0] + "T00:00:00");

  // Extract the individual components of the date
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Assemble the date in the "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
export const getDateFromString = (inputString) => {
  // Create a new Date object using the input string
  const dateObject = new Date(inputString);

  // Extract the individual components of the date
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Assemble the date in the "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const getCurrentDate = (dateObj) => {
  if (dateObj) {
    // Create a new Date object for the current date
    const currentDate = new Date(dateObj);

    // Extract the individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Assemble the date in the "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  } else {
    // Create a new Date object for the current date
    const currentDate = new Date();

    // Extract the individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Assemble the date in the "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
};

export const getDateMonthDayBetweenTwoDates = (date1, date2) => {
  let startDate = new Date(date1 + "T00:00:00");
  let endDate = new Date(date2 + "T00:00:00");
  let dateArray = [];

  // Ensure startDate is earlier than endDate
  if (startDate > endDate) {
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  // Loop through dates and populate dateArray
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const day = currentDate
      .toLocaleString("en-us", { weekday: "short" })
      .toLowerCase();
    const date = currentDate.getDate();
    const month = currentDate.toLocaleString("en-us", { month: "long" });

    if (date < 10) {
      const temp = new Date(currentDate);
      // console.log(currentDate, temp);
      // temp.setDate(currentDate.getDate() - 1);
      dateArray.push({
        day,
        date,
        month,
        fullDate: temp,
        dateString: new Date(currentDate).toLocaleDateString(),
      });
    } else {
      dateArray.push({
        day,
        date,
        month,
        fullDate: new Date(currentDate),
        dateString: new Date(currentDate).toLocaleDateString(),
      });
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

export const adjustData = (inputData) => {
  const resultObject = {};
  for (const key in inputData) {
    if (inputData.hasOwnProperty(key)) {
      const [property, id] = key.split("_");
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        if (!resultObject.hasOwnProperty(parsedId)) {
          resultObject[parsedId] = {};
        }
        resultObject[parsedId][property] = inputData[key];
      }
    }
  }

  const resultArray = Object.keys(resultObject).map((id) => ({
    id: parseInt(id),
    ...resultObject[id],
  }));

  return resultArray;
};

export const formatTime = (timeString) => {
  const timeArray = timeString.split(":");
  const formattedTime = `${timeArray[0]}:${timeArray[1]}`;
  return formattedTime;
};

export const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
export const handleUserRole = (role) => {
  const newRole = ["Owner", "Manager", "Rider"];
  const storedAuthData = JSON.parse(localStorage.getItem("menuScribe"));
  if (newRole.includes(storedAuthData.type)) {
    return true;
  } else {
    if (storedAuthData.type === "Rider") {
      window.location.href = "/manage/delivery";
    } else if (storedAuthData.type === "Rider") {
      window.location.href = "/manage/create-menu";
    } else {
      window.location.href = "/";
    }
  }
};

export const globalSearch = (array, keyword) => {
  const lowerKeyword = keyword.toLowerCase();

  const searchObject = (obj) => {
    return Object.values(obj).some((value) => {
      if (typeof value === "object" && value !== null) {
        return searchObject(value);
      }
      return String(value).toLowerCase().includes(lowerKeyword);
    });
  };

  return array.filter((item) => searchObject(item));
};
