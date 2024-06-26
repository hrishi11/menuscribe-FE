import React, { useEffect, useState } from "react";
const fullWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getOrderedWeekStartingFromToday() {
  const todayIndex = new Date().getDay(); // Get the current day index (0 for Sunday, 1 for Monday, etc.)
  return [...fullWeek.slice(todayIndex), ...fullWeek.slice(0, todayIndex)];
}

function checkAndDisplayDays(data) {
  // Extract day names from the array of objects
  const daysArray = data.data;
  const daysSet = new Set(daysArray.map((dayObj) => dayObj.day));

  // Get the ordered week starting from today
  const orderedWeek = getOrderedWeekStartingFromToday();

  // Create a result array with all days in sequence, marking missing days as "not available"
  const result = orderedWeek.map((day) => {
    if (daysSet.has(day)) {
      // Find the corresponding object for the available day
      const dayObj = daysArray.find((dayObj) => dayObj.day === day);
      return { status: true, ...dayObj };
    } else {
      return { day: day, status: false };
    }
  });

  return { packageName: data.packageName, data: result };
}
export const DisplayPackages = ({ scrollRef, allItems }) => {
  const [pack, setPack] = useState();
  useEffect(() => {
    console.log(allItems);
    setPack(checkAndDisplayDays(allItems));
  }, []);
  return (
    <div className="bg-white w-full p-2 flex flex-col justify-center items-center ">
      <div className="w-full flex flex-col items-center">
        <h4 className="w-full p-1 bg-gray-200">{allItems.packageName}</h4>
        <div ref={scrollRef} className="flex gap-2 overflow-x-scroll w-full">
          <div className="flex gap-2">
            {pack &&
              pack.data.length > 0 &&
              pack.data.map((item) => {
                return item.status ? (
                  <div className="w-[200px] my-2 border rounded-md  flex flex-col items-center py-3">
                    <div className="flex flex-col items-center text-[24px]">
                      <span className="font-semibold">{item.day}</span>
                      <p>{item.date}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      {item.defaultItem.map((dItem) => (
                        <div className="flex flex-col items-center ">
                          <span className="font-semibold">
                            {dItem.item_name
                              ? dItem.item_name
                              : "For All Packages"}
                            :
                          </span>
                          {dItem.itemRelated.map((relatedItem) => (
                            <span>{relatedItem.menu_item_name}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-[200px]  bg-gray-200 my-2 border rounded-md  flex flex-col justify-center items-center py-3">
                    <span>Not Available</span>
                    <span>{item.day}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
