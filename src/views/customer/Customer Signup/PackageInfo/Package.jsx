import React from "react";
import { Tag } from "antd";

export default function Package({ info, checked }) {
  return (
    <div
      className={`w-full ${
        checked
          ? "bg-green-500 border-green-500"
          : "bg-gray-300 border-gray-300"
      }    cursor-pointer border-3   rounded-lg`}
    >
      <div className="flex bg-white    p-3 px-5">
        <div
          className="w-full relative  rounded-lg flex bg-cover py-2 pl-2"
          style={{ backgroundImage: `url('${info.image}')` }}
        >
          {info.image ? (
            <>
              {info.VendorPackagePrices.method === "delivery" ? (
                <Tag className="bg-yellow-500  text-white h-fit">Delivery</Tag>
              ) : (
                <Tag className="bg-green-500 text-white h-fit">Pickup</Tag>
              )}
              {/* <img src={info.image} alt="" className="max-h-[200px]" /> */}
            </>
          ) : (
            <span className="relative w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
              {info.VendorPackagePrices.method === "delivery" ? (
                <Tag className="absolute top-3 left-3 bg-yellow-500  text-white h-fit">
                  Delivery
                </Tag>
              ) : (
                <Tag className="absolute top-3 left-3 bg-green-500 text-white h-fit">
                  Pickup
                </Tag>
              )}{" "}
              No image found
            </span>
          )}
        </div>
        <div className="w-full text-right flex flex-col items-end">
          <img className="h-[50px]" src={info?.Vendor?.logo} alt="" />
          <span className="font-semibold">{info.Vendor?.vendor_name}</span>
          {/* <span>3 Vagetables</span> */}
          <ul>
            {info.VendorPackageDefaultItems.map((item) => (
              <li className="list-disc">{item.item_name}</li>
            ))}
          </ul>
          {/* {info.VendorPackagePrices.map((item) => ( */}
          <div className="w-full py-2 flex gap-3 justify-end pl-2">
            <span
              className={`font-semibold ${
                info.VendorPackagePrices.method === "delivery"
                  ? "text-yellow-500"
                  : "text-green-600"
              } text-start w-[100px] `}
            >
              {info.VendorPackagePrices.method.toUpperCase()}:{" "}
            </span>
            <span>${info.VendorPackagePrices.cost}/month</span>
          </div>
          {/* ))} */}

          <div>
            <div className="flex gap-1">
              {info.mon == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Mon
                </span>
              )}
              {info.tue == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Tue
                </span>
              )}
              {info.wed == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Wed
                </span>
              )}
              {info.thu == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Thu
                </span>
              )}
              {info.fri == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Fri
                </span>
              )}
              {info.sat == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Sat
                </span>
              )}
              {info.sun == 1 && (
                <span className="p-1 font-semibold bg-gray-300 rounded-md">
                  Sun
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`flex justify-center py-1  text-white`}>SELECTED</div>
    </div>
  );
}
