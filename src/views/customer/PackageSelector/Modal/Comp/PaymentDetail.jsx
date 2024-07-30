import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { DatePicker } from "antd";
import CardNumberInput from "./CardInput";
import DateInput from "./DateInput";
import CVCInput from "./CVVInput";
import { TextField } from "@mui/material";

export default function PaymentDetail({
  formData,
  setFormData,
  onOpen,
  handleSubmit,
  onClose,
}) {
  const [focusIndex, setFocusIndex] = useState([]);

  const handleExpireDate = (e) => {
    setFormData({ ...formData, expiry: e });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg border-2 w-full flex flex-col gap-2 max-w-md">
        <div>
          <CardNumberInput
            leaveFieldCallback={0}
            focus={focusIndex[0]}
            tabIndex={0}
            setFormData={setFormData}
          />
          {/* <Input
            type="number"
            // label="Credit Card Number"
            placeholder="Credit Card Number"
            name="cardNumber"
            variant="bordered"
            radius="sm"
            labelPlacement="outside"
            value={formData.cardNumber}
            onChange={handleChange}
            isRequired={true}
            startContent={
              <FaCreditCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          /> */}
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-full">
            <DateInput
              leaveFieldCallback={0}
              focus={focusIndex[1]}
              tabIndex={1}
              setFormData={setFormData}
            />
          </div>
          <div className="w-full">
            <CVCInput focus={focusIndex[2]} tabIndex={2} />
            {/* <Input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              variant="bordered"
              value={formData.cvv}
              onChange={handleChange}
              className="mt-1 block w-full py-2 shadow-none border-gray-300 rounded-md"
              IsRequired
            /> */}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <TextField
              name="first_name"
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              //   autoFocus={focus}
              required
            />
            {/* <Input
              type="text"
              id="firstName"
              name="firstName"
              variant="bordered"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full py-2 shadow-none border-gray-300 rounded-md"
              isRequired={true}
            /> */}
          </div>
          <div className="w-full">
            <TextField
              name="last_name"
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              //   autoFocus={focus}
              required
            />
            {/* <Input
              type="text"
              id="lastName"
              name="lastName"
              variant="bordered"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full py-2 shadow-none border-gray-300 rounded-md"
              isRequired={true}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
