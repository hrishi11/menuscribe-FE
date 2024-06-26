import { Avatar } from "@nextui-org/react";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
];
export default function PackageInfo({ packageData }) {
  const [customer, setCustomers] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const [orders, setOrders] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    setSelectedColor(color);
    setCustomers(packageData.CustomerPackages?.length);
    setSubscription(
      packageData.CustomerPackages?.reduce(
        (acc, cur) => acc + cur.CustomerPackageSubscriptions.length,
        0
      )
    );
    setOrders(
      packageData.CustomerPackages?.reduce(
        (acc, cur) => acc + cur.CustomerOrders.length,
        0
      )
    );
  }, [packageData]);
  function formatDate(dateString) {
    const [year, month, day] = `${dateString}`.split("-");

    const date = new Date(year, month - 1, day);

    const options = { month: "long", day: "numeric", year: "numeric" };

    return date.toLocaleDateString("en-US", options);
  }
  function combineFirstLetters(words) {
    // Split the words into an array
    const wordArray = words.split(" ");

    // Extract the first letter of each word and join them together
    const combinedLetters = wordArray.map((word) => word[0]).join("");

    return combinedLetters;
  }
  return (
    <div className="w-full lg:m-3 max-sm:m-0 p-3  bg-white">
      <div className="">
        <div className="flex justify-between p-2 w-full">
          <span className="flex gap-2 font-semibold text-[24px] items-center">
            <Avatar
              className={`${selectedColor} text-white font-semibold text-[20px]`}
              name={combineFirstLetters(`${packageData.package_name}`)}
            />{" "}
            {packageData.package_name}
          </span>
          {/* <span className="flex flex-col ">
            <Tag className="bg-green-600 text-white">Orders is completed</Tag>
            <Tag className="bg-yellow-500 text-white ">Orders is pending</Tag>
          </span> */}
        </div>
        <div className="w-full flex max-sm:flex-wrap">
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">CUSTOMER DATE</span>
            <span className="text-[20px]">
              {formatDate(packageData.created_date?.split("T")[0])}
            </span>
          </div>
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">CUSTOMERS</span>
            <div className="text-[20px]">{customer} Customers</div>
            <div className="text-[20px]">{subscription} Subscriptions</div>
          </div>
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">ORDERS</span>
            <span className="text-[20px]">{orders} Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
