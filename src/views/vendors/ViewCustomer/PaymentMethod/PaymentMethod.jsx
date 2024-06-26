import React, { useEffect, useState } from "react";
import { Input, Button, DatePicker } from "@nextui-org/react";
import {
  getVendorTax,
  setCustomerPaymentMethod,
} from "../../../../actions/vendorReducers/VendorActions";
import { useDispatch } from "react-redux";
import { Toast } from "../../../../components/app/Toast";
import { CFormInput, CFormLabel, CFormSelect } from "@coreui/react/dist";
import { parseDate } from "@internationalized/date";

export default function PaymentMethod({ id, paymentData, setPaymentData }) {
  const dispatch = useDispatch();
  const [tax, setTax] = useState([]);

  useEffect(() => {
    console.log(new Date());
    fetchVendorTax();
  }, []);
  useEffect(() => {
    const tax =
      (parseFloat(paymentData.tax) / 100) * parseFloat(paymentData.amount);
    const total = (tax + parseFloat(paymentData.amount)).toFixed(2);
    setPaymentData((pre) => ({
      ...pre,
      total: total,
    }));
  }, [paymentData.amount, paymentData.tax]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(
        setCustomerPaymentMethod({
          id: id,
          ...paymentData,
          created_at: formatDateObj(paymentData.created_at),
        })
      );
      setPaymentData({});
      Toast({ message: "Payment method submit successfully", type: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchVendorTax = async () => {
    try {
      const response = await dispatch(getVendorTax());
      setTax(response.data);
    } catch (error) {}
  };

  const handleChangeValue = (e) => {
    setPaymentData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  function convertDateString(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatDateObj(dateObj) {
    const { year, month, day } = dateObj;

    // Ensure month and day are two digits
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const handleDateChange = (date) => {
    const d = formatDateObj(date);
    setPaymentData((pre) => ({
      ...pre,
      created_at: date,
    }));
  };
  return (
    <div className="w-full p-2 bg-gray-300 flex flex-col gap-2 py-4 rounded-bl-lg rounded-br-lg">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-1">
          <div className="flex flex-col w-full">
            <CFormLabel className="font-12 text-black">Account</CFormLabel>

            <CFormInput
              type="number"
              isRequired
              placeholder="0.00"
              labelPlacement="outside"
              name="amount"
              className="h-10"
              onChange={handleChangeValue}
              value={paymentData?.amount ? paymentData?.amount : ""}
            />
          </div>

          <div className="flex flex-col w-full">
            <CFormLabel className="font-12 text-black">Tax</CFormLabel>

            <CFormSelect
              className="h-10 w-[70px]"
              name="tax"
              required
              value={paymentData?.tax_percent}
              defaultValue={"0"}
              onChange={handleChangeValue}
            >
              <option value={"0"}>0%</option>
              {tax.map((item) => (
                <option value={item.tax_percent}>{item.tax_percent}%</option>
              ))}
            </CFormSelect>
          </div>

          <div className="flex flex-col w-full">
            <CFormLabel className="font-12 text-black">Total</CFormLabel>

            <CFormInput
              type="number"
              name="total"
              // className="w-[25%]"
              value={paymentData?.total}
              onChange={handleChangeValue}
              isReadOnly
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
        </div>
        <div className="flex gap-1">
          <Input
            type="text"
            label="Description"
            name="description"
            placeholder="Description"
            value={paymentData?.description ? paymentData?.description : ""}
            onChange={handleChangeValue}
            labelPlacement="outside"
            className="w-[50%]"
          />
          {/* <Input
            type="date"
            label="Date"
            placeholder="0.00"
            name="created_at"
            value={paymentData?.created_at ? paymentData?.created_at : ""}
            onChange={handleChangeValue}
            className="w-[50%]"
            labelPlacement="outside"
          /> */}
          <DatePicker
            label={"Date"}
            name="created_at"
            labelPlacement="outside"
            value={
              paymentData?.created_at
                ? paymentData?.created_at
                : parseDate(convertDateString(new Date()))
            }
            onChange={(val) => handleDateChange(val)}
            className="w-[50%]"
          />
        </div>
        <div className="w-full flex justify-end  ">
          <Button type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
