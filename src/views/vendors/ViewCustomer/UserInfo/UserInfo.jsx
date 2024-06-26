import { Avatar } from "@nextui-org/react";
import { Tag } from "antd";
import React from "react";

export default function UserInfo({
  userInfo,
  selectedColor,
  complete,
  pending,
  firstOrder,
  lastOrder,
}) {
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
    <div className="w-full lg:m-3 max-sm:m-0 p-3 border-3 bg-white">
      <div className="">
        <div className="flex justify-between p-2 w-full">
          <span className="flex gap-2 font-semibold text-[24px] items-center">
            <Avatar
              className={`${selectedColor} text-white font-semibold text-[20px]`}
              name={combineFirstLetters(
                `${userInfo.first_name} ${userInfo.last_name}`
              )}
            />{" "}
            {userInfo.first_name} {userInfo.last_name}
          </span>
          <span className="flex flex-col ">
            <Tag className="bg-green-600 text-white">
              {complete} Orders is completed
            </Tag>
            <Tag className="bg-yellow-500 text-white ">
              {pending} Orders is pending
            </Tag>
          </span>
        </div>
        <div className="w-full flex max-sm:flex-wrap">
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">CUSTOMER SINCE</span>
            <span className="text-[20px]">
              {formatDate(
                userInfo.VendorCustomerLink?.created_at.split("T")[0]
              )}
            </span>
          </div>
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">FIRST ORDER</span>
            <span className="text-[20px]">{formatDate(firstOrder)}</span>
          </div>
          <div className="w-full py-4 px-4 flex flex-col border-2">
            <span className="text-[14px] font-bold">LAST SINCE</span>
            <span className="text-[20px]">{formatDate(lastOrder)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
