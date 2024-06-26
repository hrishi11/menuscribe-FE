import React, { useEffect, useState } from "react";
import PaymentTable from "./PaymentTable/PaymentTable";
import { useDispatch } from "react-redux";
import { getCustomerPaymentStatus } from "../../../actions/vendorReducers/VendorActions";

export default function Payments() {
  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  const fetchData = async () => {
    try {
      const response = await dispatch(
        getCustomerPaymentStatus({ page: page, pageSize: pageSize })
      );

      console.log(response);
      setCustomerSubscriptions(response.data.data);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <PaymentTable
          customerSubscriptions={customerSubscriptions}
          totalPages={totalPages}
          page={page}
          setPageSize={setPageSize}
          pageSize={pageSize}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
