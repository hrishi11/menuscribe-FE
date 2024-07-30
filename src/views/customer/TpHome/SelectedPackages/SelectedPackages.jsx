import { Button, Dropdown, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import PackageCancelModal from "./Modals/CancelModal";
import {
  customerPackageCancelByCustomer,
  getCustomerDeliveryAddress,
  getCustomerPaymentMethod,
} from "../../../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import { Toast } from "../../../../components/app/Toast";
import ChangePaymentModal from "./Modals/ChangePaymentModal";
import SelectAddressModal from "./Modals/SelectAddressModal";

const items = [
  {
    label: "Change Delivery",
    key: "1",
    icon: <FaExchangeAlt />,
  },
  {
    label: "Switch Plan",
    key: "2",
    icon: <IoIosSwitch />,
  },
  {
    label: "Cancel Package",
    key: "3",
    icon: <TiCancel />,
  },
  {
    label: "Change Payment Method",
    key: "4",
    icon: <MdPayments />,
  },
];

export default function SelectedPackage({ pack, payment, fetchData }) {
  const [isCancelPack, setIsCancelPack] = useState(false);
  const [isChangePayment, setIsChangePayment] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});

  const [isDeliveryChange, setIsDeliveryChange] = useState(false);
  const dispatch = useDispatch();
  const fetchAddresses = async () => {
    try {
      const response = await dispatch(
        getCustomerDeliveryAddress(pack.VendorPackage.Vendor.id)
      );
      setSelectedAddress({
        address_id: pack.customer_delivery_address_id,
        id: pack.id,
      });
      setAddresses(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleMenuClick = (e) => {
    if (e.key == 1) {
      setIsDeliveryChange(true);
    } else if (e.key == 3) {
      setIsCancelPack(true);
    } else if (e.key == 4) {
      setIsChangePayment(true);
    }
  };
  const handleCancelPackage = async () => {
    try {
      const response = await dispatch(
        customerPackageCancelByCustomer({ customer_package_id: pack.id })
      );
      if (response.success) {
        setIsCancelPack(false);
        fetchData();
        Toast({
          message: "Cancel Customer Package Successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ boxShadow: "1px 1px 2px 0px rgb(220, 219, 219)" }}
      className="border"
    >
      <PackageCancelModal
        isModalOpen={isCancelPack}
        setIsModalOpen={setIsCancelPack}
        handleOk={handleCancelPackage}
      />
      <ChangePaymentModal
        isModalOpen={isChangePayment}
        setIsModalOpen={setIsChangePayment}
        payment={payment}
        fetchData={fetchData}
        formData={paymentInfo}
        setFormData={setPaymentInfo}
      />
      <SelectAddressModal
        isModalOpen={isDeliveryChange}
        setIsModalOpen={setIsDeliveryChange}
        addresses={addresses}
        setSelectedAddress={setSelectedAddress}
        selectedAddress={selectedAddress}
      />
      <div className="p-2 w-full bg-green-500 text-white ">
        <span className="">
          {pack.user_package_name
            ? pack.user_package_name
            : pack.UserCustomer.first_name + "'s Plan"}{" "}
        </span>
      </div>
      <div className="flex">
        <div
          style={{
            backgroundImage: `url('${
              pack.VendorPackage.image
                ? pack.VendorPackage.image
                : "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
            }')`,
          }}
          className="w-[450px] min-h-[150px] bg-cover "
        ></div>
        <div className="flex flex-col justify-between w-full ">
          <div className="text-[20px] gap-1 p-2  flex flex-wrap ">
            {pack.VendorPackage?.VendorPackageDefaultItems?.map(
              (item, index) => (
                <span>
                  {item.item_name}{" "}
                  {index !=
                    pack.VendorPackage?.VendorPackageDefaultItems?.length - 1 &&
                    " + "}
                </span>
              )
            )}
          </div>
          <div className="w-full p-2 ">
            <div className="w-full flex gap-2">
              {pack.pickup_delivery == 2 ? (
                <span className=" text-[14px] py-1 text-center flex justify-center items-center w-[100px] rounded-3xl bg-green-600 font-medium text-white">
                  DELIVERY
                </span>
              ) : (
                <span className="w-[100px] py-1 text-center flex justify-center text-[14px] rounded-3xl bg-orange-400 font-medium text-white">
                  PICKUP
                </span>
              )}
            </div>

            <div className="font-normal text-[20px] mt-2">
              Monthly - ${pack.VendorPackage.VendorPackagePrices[0].cost * 22}
              /month
            </div>
          </div>
        </div>
        <div className="w-[200px]">
          <div className="mt-3 mr-5 mb-2">
            <img
              src={pack.VendorPackage.Vendor.logo}
              alt=""
              className=" border w-[200px]"
            />
          </div>
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
          >
            <Button>
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
