import React, { useEffect, useState } from "react";
import { RangeCalendar } from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { getOrderCreationDates } from "../../../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import { addNewSubscriptionPackage } from "../../../../actions/vendorReducers/VendorActions";
import { Toast } from "../../../../components/app/Toast";
import { useNavigate } from "react-router-dom/dist";
import { setTimeFormat } from "../../../../utils/Helper";

export default function RenewCalendar({
  info,
  id,
  setUpdateTrigger,
  setSubscription,
}) {
  const [dates, setDates] = useState({
    show: false,
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],

    number_of_days: {
      status: false,
      value: "10",
    },
  });
  let { locale } = useLocale();
  const [getDates, setGetDates] = useState([]);

  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [nextMonthDates, setNextMonthDates] = useState([]);
  const [previousMonthDates, setPreviousMonthDates] = useState([]);
  const [dateDisabled, setDateDisabled] = useState([]);
  const [daysDisable, setDaysDisbale] = useState([]);
  let [focusedDate, setFocusedDate] = useState(() => {
    const dates = info.CustomerPackageSubscriptions.map(
      (item) => item.CustomerOrders
    ).flat();
    // return info.VendorPackage.CustomerOrders.map((item) => item.order_date);
    return dates.map((item) => item.order_date);
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMealsAfterCalculating(info.VendorPackage);
    console.log("info", info);
    console.log("focusedDate", focusedDate);

    if (focusedDate.length > 0) {
      categorizeDates(focusedDate);
    }
  }, [focusedDate]);
  const setMealsAfterCalculating = (VendorPackage) => {
    // const alldates = getDateMonthDayBetweenTwoDates(startDate, endDate);
    if (VendorPackage) {
      const PackageAvailableDays = [];
      if (VendorPackage.mon === 0) {
        PackageAvailableDays.push("mon");
      }
      if (VendorPackage.tue === 0) {
        PackageAvailableDays.push("tue");
      }
      if (VendorPackage.wed === 0) {
        PackageAvailableDays.push("wed");
      }
      if (VendorPackage.thu === 0) {
        PackageAvailableDays.push("thu");
      }
      if (VendorPackage.fri === 0) {
        PackageAvailableDays.push("fri");
      }
      if (VendorPackage.sat === 0) {
        PackageAvailableDays.push("sat");
      }
      if (VendorPackage.sun === 0) {
        PackageAvailableDays.push("sun");
      }

      setDaysDisbale(PackageAvailableDays);
    }
  };

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
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();

      if (dateMonth === currentMonth && dateYear === currentYear) {
        currentDates.push(dateString);
      } else if (
        dateMonth === previousMonthDate.getMonth() &&
        dateYear === previousMonthDate.getFullYear()
      ) {
        previousDates.push(dateString);
      } else {
        nextDates.push(dateString);
      }
    });
    setCurrentMonthDates(currentDates);
    setPreviousMonthDates(previousDates);
    setNextMonthDates(nextDates);
  };

  const isDateUnavailable = (date, currentDates) => {
    if (
      !date ||
      typeof date.year === "undefined" ||
      typeof date.month === "undefined" ||
      typeof date.day === "undefined"
    ) {
      return true;
    }

    const jsDate = new Date(date.year, date.month - 1, date.day);

    const dayName = jsDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();
    const isDayDisabled = daysDisable.includes(dayName);

    const isUnavailable =
      currentDates.length > 0 &&
      currentDates.some((item) => {
        const parsedDate = parseDate(item);
        if (
          !parsedDate ||
          typeof parsedDate.year === "undefined" ||
          typeof parsedDate.month === "undefined" ||
          typeof parsedDate.day === "undefined"
        ) {
          return false; // Skip if parsedDate or any of its properties are undefined
        }
        const startDate = new Date(
          parsedDate.year,
          parsedDate.month - 1,
          parsedDate.day
        );
        const endDate = new Date(
          parsedDate.year,
          parsedDate.month - 1,
          parsedDate.day
        );
        return jsDate >= startDate && jsDate <= endDate;
      });

    return isDayDisabled || isUnavailable;
  };

  // let isDateUnavailable = (date, currentDates) => {
  //   const jsDate = new Date(date.year, date.month - 1, date.day);

  //   const dayName = jsDate
  //     .toLocaleDateString("en-US", { weekday: "short" })
  //     .toLowerCase(); // Get day name (e.g., mon, tue)
  //   const isDayDisabled = daysDisable.includes(dayName);

  //   const isUnavailable =
  //     currentDates.length > 0 &&
  //     currentDates.some((item) => {
  //       const parsedDate = parseDate(item);
  //       const startDate = new Date(
  //         parsedDate.year,
  //         parsedDate.month - 1,
  //         parsedDate.day
  //       );
  //       const endDate = new Date(
  //         parsedDate.year,
  //         parsedDate.month - 1,
  //         parsedDate.day
  //       );
  //       return jsDate >= startDate && jsDate <= endDate;
  //     });

  //   return isDayDisabled || isUnavailable;
  // };
  const handleApprove = async (e) => {
    try {
      const start_date = formatDateToString(e.start);
      const end_date = formatDateToString(e.end);

      const res = await dispatch(
        getOrderCreationDates({
          customer_id: info.user_id,
          package_id: info.package_id,
          start_date: start_date,
          end_date: end_date,
        })
      );
      const dateArr = removeMatchingDates(res.data, [
        ...previousMonthDates,
        ...currentMonthDates,
        ...nextMonthDates,
      ]);

      setGetDates(dateArr);
    } catch (error) {
      console.log("Error handling approve");
    }
  };

  function convertDate(dateStr) {
    const dateObj = new Date(dateStr);

    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString("en-GB", { month: "short" });

    const formattedDate = `${day} ${month}`;

    return formattedDate;
  }

  const formatDateToString = (dateObject) => {
    console.log(dateObject);
    const { year, month, day } = dateObject;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dayString = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${monthString}-${dayString}`;
  };

  function convertToComparableDate(dateStr) {
    // Convert ISO date to a comparable format YYYY-MM-DD
    const dateObj = new Date(dateStr);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function removeMatchingDates(array1, array2) {
    // Convert all dates in array2 to comparable format
    const comparableArray2 = array2.map((date) =>
      convertToComparableDate(date)
    );

    // Filter out dates from array1 that exist in array2
    const resultArray = array1.filter((date) => {
      const comparableDate = convertToComparableDate(date);
      return !comparableArray2.includes(comparableDate);
    });

    return resultArray;
  }

  const handleCreateOrders = async () => {
    try {
      // const dateArr = removeMatchingDates(getDates, [
      //   ...previousMonthDates,
      //   ...currentMonthDates,
      // ]);
      const sortedDates = getDates.sort((a, b) => new Date(a) - new Date(b));
      console.log("info", info);

      const response = dispatch(
        addNewSubscriptionPackage({
          pkgInfo: {
            // ...info,
            customer_delivery_address_id: info.customer_delivery_address_id,
            user_id: info.user_id,
            package_id: info.package_id,
            vendor_location_id: info.vendor_location_id,
            id: info.id,

            start_date: sortedDates[0],
            end_date: sortedDates[sortedDates.length - 1],
          },
          dates: getDates,
        })
      );
      Toast({ message: "Create new orders", type: "success" });
      // navigate(`/manage/view-customers/${id}`);
      // setSubscription(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      // setUpdateTrigger(response);
    } catch (error) {}
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* {previousMonthDates && ( */}
      {info && (
        <RangeCalendar
          aria-label="Date (Visible Month)"
          allowsNonContiguousRanges
          minValue={today(getLocalTimeZone())}
          // maxValue={getNextMonthLastDate()}
          isDateUnavailable={(dates) =>
            isDateUnavailable(dates, [
              ...previousMonthDates,
              ...currentMonthDates,
              ...nextMonthDates,
            ])
          }
          visibleMonths={2}
          onChange={handleApprove}
          // defaultValue={{
          //   start:
          //     previousMonthDates.length > 0
          //       ? parseDate(previousMonthDates[0])
          //       : getPreviousMonthFirstDate(),
          //   end:
          //     previousMonthDates.length > 0
          //       ? parseDate(previousMonthDates[0])
          //       : getPreviousMonthFirstDate(),
          // }}
        />
      )}

      {/* )} */}
      {getDates.length > 0 && (
        <div className="w-full flex flex-col items-center ">
          <p className="font-semibold">
            {getDates.length} orders will be created:
          </p>
          <div className="flex flex-wrap w-[300px]  ">
            {getDates
              .sort((a, b) => new Date(a) - new Date(b))
              .map((item) => (
                <span className="w-[100px] flex justify-center">
                  {convertDate(item)}
                </span>
              ))}
          </div>
          <button
            onClick={handleCreateOrders}
            className="bg-blue-500 p-2 px-5 my-3 text-white"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}
