import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import { useDispatch } from "react-redux";
import { Toast } from "../../../../../components/app/Toast";
import { updateCustomerPackageAddressByCustomer } from "../../../../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
const SelectAddressModal = ({
  isModalOpen,
  setIsModalOpen,
  addresses,
  setSelectedAddress,
  selectedAddress,
  setAddresses,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    try {
      const response = await dispatch(
        updateCustomerPackageAddressByCustomer({
          address_id: selectedAddress.address_id,
          id: selectedAddress.id,
        })
      );
      if (response.success) {
        Toast({ message: "Address updated successfully", type: "success" });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        style={{
          top: 200,
        }}
        title="Delivery"
        okText="Done"
        cancelText="No"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group
          onChange={(e) =>
            setSelectedAddress((pre) => ({
              ...pre,
              address_id: e.target.value,
            }))
          }
          value={selectedAddress.address_id}
          className="flex flex-col gap-2"
        >
          {addresses.data?.map((item) => (
            <Radio value={item.id}>
              {item.address}, {item.CitiesAll.city}, {item.CitiesAll.state}
            </Radio>
          ))}
          {addresses.notMatched?.map((item) => (
            <Radio disabled value={item.id}>
              {item.address}, {item.CitiesAll.city}, {item.CitiesAll.state}
            </Radio>
          ))}
        </Radio.Group>
        <div className="border-t mt-3 pt-2">
          <span
            onClick={() => navigate("/delivery-address")}
            className="text-blue-600 text-[20px]"
          >
            Manage Delivery Addresses
          </span>
        </div>
      </Modal>
    </>
  );
};
export default SelectAddressModal;
