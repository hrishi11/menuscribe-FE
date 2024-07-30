import React, { useEffect, useState } from "react";
import SelectedPackage from "./SelectedPackages/SelectedPackages";
import { useDispatch } from "react-redux";
import {
  getCustomerDeliveryAddress,
  getCustomerPaymentMethod,
  getSelectedCustomerPackage,
} from "../../../actions/customerReducer/CustomerActions";

export default function TpHome() {
  const [customerPackages, setCustomerPackages] = useState([]);
  const [payment, setPayment] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const [responsePackages, responsePayment] = await Promise.all([
        dispatch(getSelectedCustomerPackage()),
        dispatch(getCustomerPaymentMethod()),
      ]);

      setPayment(responsePayment.data);
      setCustomerPackages(responsePackages.data);
      //   setSelectedAddress(responseAddress.selectedAddress);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="flex gap-2 p-3  w-[80%]">
        <div className="w-[70%] ">
          <div className="flex flex-col gap-2">
            {customerPackages.map((pack) => (
              <SelectedPackage
                pack={pack}
                fetchData={fetchData}
                payment={payment}
              />
            ))}
          </div>
        </div>
        <div className="w-[30%] border-2"></div>
      </div>
    </div>
  );
}
