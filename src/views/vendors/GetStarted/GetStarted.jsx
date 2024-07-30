import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countPackagesMenuItems } from "../../../actions/vendorReducers/VendorActions";
import { FaShoppingBag } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";

export default function GetStarted() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await dispatch(countPackagesMenuItems());
      setCount({
        packages: response.packagesCount?.length,
        menuItems: response.menuCount.length,
        customerLink: response.customerLink.length,
        paymentMethod: response.paymentMethod.length,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="text-gray-500 gap-3 flex flex-col items-center">
        <h1>Get Started</h1>
        <p>
          Welcome to Menuscribe. Follow the steps below to get started with
          managing your meal service.
        </p>

        {/* STEP 1 */}
        <div className="flex w-full lg:justify-between p-5 bg-white max-sm:flex-wrap max-sm:justify-center max-sm:gap-3">
          <div className="flex gap-5 max-sm:flex-wrap max-sm:justify-center max-sm:gap-2">
            <div className="flex flex-col items-center">
              <h4 className="text-blue-500">Step 1</h4>
              <div className="w-36 h-24 rounded-lg flex justify-center items-center bg-blue-500">
                <FaShoppingBag className="w-[70px] h-[70px] text-white" />
              </div>
            </div>
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
              <span className="flex flex-col max-sm:items-center">
                <h4>Add a meal package</h4>
                <p>Add a Meal package that you offer your customers</p>
              </span>
              {count.packages &&
                (count.packages > 0 ? (
                  <p className="text-green-600 font-semibold">
                    COMPLETED - You have {count.packages} meal packages
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    NOT COMPLETED - You don't have any packages yet! Add a
                    package to get started.
                  </p>
                ))}

              <button
                onClick={() => navigate("/manage/add-package")}
                className="px-12 py-2 bg-purple-600 text-white"
              >
                Add Packages
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <span className="font-semibold text-blue-500">Example</span>
            <div className="flex flex-col py-2 items-center px-4 w-[200px] text-gray-700 bg-[#FFFDD0] ">
              <span className="flex flex-col">
                <span className="font-semibold">Gold Package:</span>
                <span>- Curry - (8oz)</span>
                <span>- Daal - (8oz)</span>
                <span>- Rice - (1 bawl)</span>
                <span>- Roti - (6 pcs)</span>
              </span>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex w-full lg:justify-between p-5 bg-white max-sm:flex-wrap max-sm:justify-center  ">
          <div className="flex gap-5 max-sm:flex-wrap max-sm:justify-center max-sm:gap-2 ">
            <div className="flex flex-col items-center">
              <h4 className="text-blue-500">Step 2</h4>
              <div className="w-36 h-24 rounded-lg flex justify-center items-center bg-blue-500">
                <FaShoppingBag className="w-[70px] h-[70px] text-white" />
              </div>
            </div>
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
              <span className="flex flex-col max-sm:items-center">
                <h4>Add menu items</h4>
                <p>
                  Add food items that appear on your menu, and create a calendar
                  of days they are served.
                </p>
              </span>
              {count.menuItems &&
                (count.menuItems > 0 ? (
                  <p className="text-green-600 font-semibold">
                    COMPLETED - You have {count.menuItems} meal menu items
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    NOT COMPLETED - You don't have any menu items. Add a menu
                    item to get started.
                  </p>
                ))}
              <button
                onClick={() => navigate("/manage/create-menu")}
                className="px-12 py-2 bg-purple-600 text-white"
              >
                Add Menu Items
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <span className="font-semibold text-blue-500">Example</span>
            <div className="flex flex-col py-2 items-center text-gray-700 bg-[#FFFDD0] w-[200px]">
              <span className="flex flex-col">
                <span className="font-semibold">March 1st (Monday):</span>
                <span>- Bhindi Masala - (8oz)</span>
                <span>- Paneer Kadai - (8oz)</span>
                <span>- Rice - (1 bawl)</span>
                <span>- Roti - (6 pcs)</span>
              </span>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="flex w-full lg:justify-between p-5 bg-white max-sm:flex-wrap max-sm:justify-center  ">
          <div className="flex gap-5 max-sm:flex-wrap max-sm:justify-center max-sm:gap-2 ">
            <div className="flex flex-col items-center">
              <h4 className="text-blue-500">Step 3</h4>
              <div className="w-36 h-24 rounded-lg flex justify-center items-center bg-blue-500">
                <RiUserAddFill className="w-[70px] h-[70px] text-white" />
              </div>
            </div>
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
              <span className="flex flex-col max-sm:items-center">
                <h4>Add User</h4>
                <p>Add customers so you can start managing their orders.</p>
              </span>
              {count.customerLink &&
                (count.customerLink > 0 ? (
                  <p className="text-green-600 font-semibold">
                    COMPLETED - You have {count.customerLink} customers
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    NOT COMPLETED - You don't have any menu items. Add a
                    customer to get started.
                  </p>
                ))}
              <button
                onClick={() => navigate("/manage/add-customer")}
                className="px-12 py-2 bg-purple-600 text-white"
              >
                Add customer
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <span className="font-semibold text-blue-500">Example</span>
            <div className="flex flex-col py-2 items-center text-gray-700 bg-[#FFFDD0] w-[200px]">
              <span className="flex flex-col">
                <span className="font-semibold">John Smith</span>
                <span>- 450 Yonge Street</span>
                <span>- Toronto, Ontario</span>
                <span>- 17 orders</span>
              </span>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="flex w-full lg:justify-between p-5 bg-white max-sm:flex-wrap max-sm:justify-center  ">
          <div className="flex gap-5 max-sm:flex-wrap max-sm:justify-center max-sm:gap-2 ">
            <div className="flex flex-col items-center">
              <h4 className="text-blue-500">Step 4</h4>
              <div className="w-36 h-24 rounded-lg flex justify-center items-center bg-blue-500">
                <FaSackDollar className="w-[70px] h-[70px] text-white" />
              </div>
            </div>
            <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
              <span className="flex flex-col max-sm:items-center">
                <h4>Add Payment Instructions</h4>
                <p>
                  Add payment instructions so the customer can pay for their
                  package
                </p>
              </span>
              {count.paymentMethod &&
                (count.paymentMethod > 0 ? (
                  <p className="text-green-600 font-semibold">
                    COMPLETED - You have {count.paymentMethod} payment methods
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    NOT COMPLETED - You don't have any menu items. Add your
                    payment method to get started.
                  </p>
                ))}
              <button
                onClick={() => navigate("/manage/locations")}
                className="px-12 py-2 bg-purple-600 text-white"
              >
                Add Payment Method
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <span className="font-semibold text-blue-500">Example</span>
            <div className="flex flex-col py-2 items-center text-gray-700 bg-[#FFFDD0] w-[200px]">
              <span className="flex flex-col ">
                <span className="font-semibold text-center">Interac</span>
                <span className="px-5">
                  Hello, there, please send e-Transfer to pay@restaurant.com
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
