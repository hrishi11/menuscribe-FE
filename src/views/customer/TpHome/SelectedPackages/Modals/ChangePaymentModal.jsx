import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import CardNumberInput from "../../../PackageSelector/Modal/Comp/CardInput";
import { TextField } from "@mui/material";
import DateInput from "../../../PackageSelector/Modal/Comp/DateInput";
import CVCInput from "../../../PackageSelector/Modal/Comp/CVVInput";
import { updateCustomerPaymentMethod } from "../../../../../actions/customerReducer/CustomerActions";

import { useDispatch } from "react-redux";
import { Toast } from "../../../../../components/app/Toast";
const ChangePaymentModal = ({
  isModalOpen,
  setIsModalOpen,
  payment,
  fetchData,
  formData,
  setFormData,
}) => {
  const [focusIndex, setFocusIndex] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setFormData({});
    setIsChange(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
  const handleUpdatePayment = async () => {
    try {
      console.log("forn", formData);
      const response = await dispatch(
        updateCustomerPaymentMethod({ ...formData, id: payment.id })
      );
      if (response.success) {
        setFormData({});
        fetchData();
        setIsChange(false);
        Toast({
          message: "Payment method updated successfully",
          type: "success",
        });
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
        title="CHANGE PAYMENT METHOD"
        // okText="Done"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <div className="my-4 flex gap-2 items-center font-medium text-[16px]">
              <Radio className="" checked>
                {payment.first_name} {payment.last_name} - *{payment.cardNumber}{" "}
                <span
                  onClick={() => setIsChange(true)}
                  className="text-blue-500 ml-4 cursor-pointer"
                >
                  Change
                </span>
              </Radio>
            </div>
          </div>
          {isChange && (
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-100">
              <CardNumberInput
                leaveFieldCallback={0}
                focus={focusIndex[0]}
                tabIndex={0}
                setFormData={setFormData}
                formData={formData}
              />
              <div className="flex gap-2 ">
                <DateInput
                  leaveFieldCallback={0}
                  focus={focusIndex[1]}
                  tabIndex={2}
                  setFormData={setFormData}
                />
                <CVCInput
                  leaveFieldCallback={0}
                  focus={focusIndex[2]}
                  tabIndex={3}
                  setFormData={setFormData}
                />
              </div>
              <div className="flex gap-2 ">
                <TextField
                  id="outlined-basic"
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  className="w-full"
                  onChange={handleInputChange}
                />
                <TextField
                  id="outlined-basic"
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setFormData({});
                    setIsChange(false);
                  }}
                  className="p-1 px-2 rounded-md  border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePayment}
                  className="p-1 px-2 rounded-md bg-blue-500 text-white"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ChangePaymentModal;
