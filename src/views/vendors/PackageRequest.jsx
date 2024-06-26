import React, { useEffect, useState } from "react";
import DeliverComp from "../../components/VendorPackageRequests/DeliverComponant/DeliverComp";
import PickupComp from "../../components/VendorPackageRequests/PickupComponant/PickupComp";
import { useDispatch } from "react-redux";
import {
  getCustomerPackageRequests,
  getVendorPaymentInstruction,
} from "../../actions/vendorReducers/VendorActions";

const PackageRequest = () => {
  const [allRequests, setAllRequests] = useState([]);

  const dispatch = useDispatch();
  const fetchCustomerPackageRequests = async () => {
    try {
      const res = await dispatch(getCustomerPackageRequests());
      // console.log("payment", payment);

      setAllRequests(res.data);
      //   console.log(res);
    } catch (error) {
      console.log("Error Fetching custpmer package requests");
    }
  };

  useEffect(() => {
    fetchCustomerPackageRequests();
  }, []);
  return (
    <div>
      <h5> NEW REQUESTS</h5>
      {allRequests.map((req) =>
        req.pickup_delivery === 2 ? (
          <DeliverComp data={req} key={req.id} />
        ) : (
          <PickupComp data={req} key={req.id} />
        )
      )}
    </div>
  );
};

export default PackageRequest;
