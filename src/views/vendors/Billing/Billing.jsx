import React, { useEffect, useState } from "react";
import BillingTable from "./BillingTable/BillingTable";
import { useDispatch } from "react-redux";
import { getVendorBillingInfo } from "../../../actions/vendorReducers/VendorActions";
import { Input } from "@nextui-org/react";
import { globalSearch } from "../../../utils/Helper";

export default function Billing() {
  const [billingInfo, setBillingInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = React.useState(1);
  const [completeInfo, setCompleteInfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      const response = await dispatch(
        getVendorBillingInfo({ page: page, pageSize: 10 })
      );
      setCompleteInfo(response.data.data);
      setBillingInfo(response.data.data);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("bi", billingInfo);
  }, [billingInfo]);
  // function globalSearch(array, keyword, keys) {
  //   const lowerKeyword = keyword.toLowerCase();

  //   const searchObject = (obj) => {
  //     return keys.some(key => {
  //       const value = key.split('.').reduce((o, k) => (o || {})[k], obj);
  //       if (typeof value === 'object' && value !== null) {
  //         return searchObject(value);
  //       }
  //       return String(value).toLowerCase().includes(lowerKeyword);
  //     });
  //   };

  //   return array.filter(item => searchObject(item));
  // }
  return (
    <div>
      <div>
        <div className="w-full flex justify-end my-2">
          <Input
            type="text"
            variant="bordered"
            className="w-[400px] bg-white rounded-xl "
            label="Search"
            onChange={(event) => {
              if (event.target.value) {
                setBillingInfo(globalSearch(completeInfo, event.target.value));
              } else {
                setBillingInfo(completeInfo);
              }
            }}
          />
        </div>
        <BillingTable
          billingInfo={billingInfo}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
