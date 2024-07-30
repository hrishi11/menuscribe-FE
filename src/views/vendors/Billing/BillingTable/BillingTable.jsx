import React from "react";
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

export default function BillingTable({
  billingInfo,
  totalPages,
  page,
  setPage,
}) {
  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Split the date string into components
    const [year, month, day] = dateString.split("-");

    // Construct the formatted date
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  }
  return (
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
            onChange={(page, size) => {
              setPage(page);
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
        <TableColumn>PAYMENT DATE</TableColumn>
        <TableColumn>PAYMENT DUE</TableColumn>
        <TableColumn className="">PLAN</TableColumn>
        <TableColumn>PAYMENT STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {billingInfo.map((item) => (
          <TableRow key="1">
            <TableCell>
              {formatDate(item?.payment_date.split("T")[0])}
            </TableCell>
            <TableCell>{formatDate(item?.payment_due)} </TableCell>
            <TableCell>{item.Plan?.package_name}</TableCell>
            <TableCell>
              {item.status == 1 ? (
                <span className="">
                  {" "}
                  <span className="flex gap-2 items-center  font-semibold">
                    <MdVerified className="text-blue-400 text-[20px]" /> Paid
                  </span>
                </span>
              ) : (
                <span className="">
                  {" "}
                  <span className="flex gap-2 items-center font-semibold">
                    <GoUnverified className="text-yellow-600 text-[20px]" />{" "}
                    Unpaid
                  </span>
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
