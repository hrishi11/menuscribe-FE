import { Tag } from "antd/es";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { getCustomerSubscriptionOrders } from "../../../actions/vendorReducers/VendorActions";
import { useParams } from "react-router-dom/dist";
import PackageInfo from "./PackageInfo/PackageInfo";

export default function PackageDetail() {
  const [packages, setPackages] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState([]);
  const [inactiveCustomer, setInactiveCustomer] = useState([]);
  const [show, setShow] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await dispatch(getCustomerSubscriptionOrders(id));
      console.log(response.data);
      setPackages({ ...response.data });
      console.log(response.data);
      setActiveCustomer(
        response.data.CustomerPackages.filter((item) =>
          item.CustomerOrders.some(
            (check) =>
              new Date(check.order_date) > new Date().getHours(0, 0, 0, 0)
          )
        )
      );

      setInactiveCustomer(
        response.data.CustomerPackages.filter((item) => {
          const check = item.CustomerOrders.filter(
            (check) =>
              new Date(check.order_date) > new Date().getHours(0, 0, 0, 0)
          );
          return check.length > 0 ? false : true;
        })
      );
      console.log(
        "inacvtive",
        response.data.CustomerPackages.filter((item) => {
          const check = item.CustomerOrders.filter(
            (check) =>
              new Date(check.order_date) > new Date().getHours(0, 0, 0, 0)
          );
          return check.length > 0 ? false : true;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formateDate = (date) => {
    const convertDate = new Date(date);
    const options = { day: "2-digit", month: "short" };
    const formatedDate = convertDate.toLocaleDateString("en-US", options);
    return formatedDate === "Invalid Date" ? "N/A" : formatedDate;
  };
  return (
    <div>
      <div className="w-full flex gap-3">
        <div className="w-[70%] bg-white border-r py-4 flex flex-col gap-2 px-3">
          <div>
            <PackageInfo packageData={packages} />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-[20px]">Customer List</span>
            <span className="flex flex-col ">
              <Tag className="bg-green-600 text-white">
                {activeCustomer.length} Active Customers
              </Tag>
              <Tag className="bg-yellow-500 text-white ">
                {inactiveCustomer.length} Inactive Customers
              </Tag>
            </span>
          </div>

          <div>
            <div
              className={` bg-gray-400 border-2 w-full p-0  flex  items-center`}
            >
              <div
                onClick={() => setShow(0)}
                className={` ${
                  show == 0 ? "bg-blue-400" : "bg-gray-400"
                } px-3 h-full py-2 cursor-pointer font-bold text-white`}
              >
                Active Customers
              </div>
              <div className="h-full border bg-white" />
              <div
                onClick={() => setShow(1)}
                className={` ${
                  show == 1 ? "bg-blue-400" : "bg-gray-400"
                } px-3 h-full  py-2 cursor-pointer font-bold text-white`}
              >
                Inactive Customers
              </div>
            </div>
            <div>
              {show == 0 ? (
                <>
                  <Table
                    removeWrapper
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>CREATED ON</TableColumn>
                      <TableColumn>SUBSCRIPTION START</TableColumn>
                      <TableColumn>FIRST ORDER</TableColumn>
                      <TableColumn>LAST ORDER</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {activeCustomer &&
                        activeCustomer.map((item, index) => (
                          <TableRow key="1">
                            <TableCell>
                              {item.UserCustomer?.first_name}{" "}
                              {item.UserCustomer?.last_name}
                            </TableCell>
                            <TableCell>
                              {item.CustomerOrders.length} Orders (
                              {item.CustomerPackageSubscriptions.length}{" "}
                              Subscription)
                            </TableCell>
                            <TableCell>
                              {formateDate(
                                item.CustomerOrders.sort(
                                  (a, b) =>
                                    new Date(a.order_date) -
                                    new Date(b.order_date)
                                )[0].order_date
                              )}
                            </TableCell>
                            <TableCell>
                              {formateDate(
                                item.CustomerOrders.sort(
                                  (a, b) =>
                                    new Date(b.order_date) -
                                    new Date(a.order_date)
                                )[0].order_date
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <>
                  <Table
                    removeWrapper
                    aria-label="Example static collection table"
                  >
                    <TableHeader>
                      <TableColumn>CREATED ON</TableColumn>
                      <TableColumn>SUBSCRIPTION START</TableColumn>
                      <TableColumn>FIRST ORDER</TableColumn>
                      <TableColumn>LAST ORDER</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {inactiveCustomer &&
                        inactiveCustomer.map((item, index) => (
                          <TableRow key="1">
                            <TableCell>
                              {item.UserCustomer?.first_name}{" "}
                              {item.UserCustomer?.last_name}
                            </TableCell>
                            <TableCell>
                              {item.CustomerOrders.length} Orders (
                              {item.CustomerPackageSubscriptions.length}{" "}
                              Subscription)
                            </TableCell>
                            <TableCell>
                              {formateDate(
                                item.CustomerOrders.sort(
                                  (a, b) =>
                                    new Date(a.order_date) -
                                    new Date(b.order_date)
                                )[0]?.order_date
                              )}
                            </TableCell>
                            <TableCell>
                              {formateDate(
                                item.CustomerOrders.sort(
                                  (a, b) =>
                                    new Date(b.order_date) -
                                    new Date(a.order_date)
                                )[0]?.order_date
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-[30%] bg-white"></div>
      </div>
    </div>
  );
}
