import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  //   Pagination,
} from "@nextui-org/react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { getAllCustomerOrders } from "../../../actions/customerReducer/CustomerActions";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
export default function Orders() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState([]);
  const [type, setType] = useState("pre");
  const [alignment, setAlignment] = React.useState("pre");

  const handleChange = (event, newAlignment) => {
    setPage(1);
    setAlignment(newAlignment);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [page, alignment]);

  function formatDate(dateString) {
    // Split the date string to get the components
    const [year, month, day] = dateString.split("-");

    // Create a new Date object with the provided date components
    const date = new Date(year, month - 1, day);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Format the date using Intl.DateTimeFormat
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  }
  const fetchData = async () => {
    const fetchOrders = await dispatch(
      getAllCustomerOrders({ type: alignment, page: page, pageSize: 10 })
    );
    console.log("orders", fetchOrders);
    setOrders(fetchOrders.data);
    setTotalPages(fetchOrders.totalPages);
  };
  return (
    <div className="flex justify-center">
      <div className="w-3/4 flex flex-col items-center gap-4">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="pre">Past</ToggleButton>
          <ToggleButton value="next">Future</ToggleButton>
        </ToggleButtonGroup>

        <Table
          aria-label="Example static collection table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                defaultCurrent={1}
                total={totalPages * 10}
                pageSize={10}
                showSizeChanger={false}
                // pageSizeOptions={[10, 20, 30, 50, 100]}
                current={page}
                onChange={(pages, size) => {
                  console.log(pages);
                  setPage(pages);
                  //   setPageSize(size);
                }}
              />
              {/* <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          /> */}
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn>ORDER DATE</TableColumn>
            <TableColumn>DELIVERY ADDRESS</TableColumn>
            <TableColumn className="">PLAN</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((item) => (
              <TableRow key="1">
                <TableCell>
                  {item.id}- {formatDate(item.order_date)}
                </TableCell>
                <TableCell>
                  {item.CustomerDeliveryAddress ? (
                    <>
                      {item.CustomerDeliveryAddress?.address},{" "}
                      {item.CustomerDeliveryAddress?.CitiesAll.city}
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{item.Plan?.package_name}</TableCell>
                <TableCell>
                  {item.is_delivered == 1 ? (
                    <span className="">
                      {" "}
                      <span className="flex gap-2 items-center  font-semibold">
                        Delivered{" "}
                        <MdVerified className="text-blue-400 text-[20px]" />
                      </span>
                    </span>
                  ) : (
                    <span className="">
                      {" "}
                      <span className="flex gap-2 items-center font-semibold">
                        {/* <GoUnverified className="text-yellow-600 text-[20px]" />{" "}
                        Unpaid */}
                        -
                      </span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
