import React, { useState } from "react";
import BillingTable from "./BillingTable/BillingTable";
import { useDispatch } from "react-redux";

export default function Billing() {
  const [billingInfo, setBillingInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     fetchData();
  //   }, [page]);
  //   const fetchData = async () => {
  //     try {
  //       const response = await dispatch(
  //         getCustomerPaymentStatus({ page: page, pageSize: 10 })
  //       );

  //       setBillingInfo(response.data.data);

  //       setTotalPages(response.data.totalPages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div>
      <div>
        {/* <BillingTable
          billingInfo={billingInfo}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        /> */}
      </div>
    </div>
  );
}
