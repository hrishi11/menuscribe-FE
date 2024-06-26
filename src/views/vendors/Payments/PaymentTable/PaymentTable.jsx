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
import { MdCancel, MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { Pagination } from "antd";

export default function PaymentTable({
  customerSubscriptions,
  totalPages,
  setPageSize,
  pageSize,
  page,
  setPage,
}) {
  console.log("customerP", customerSubscriptions);

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

    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date

    const formattedDay = date.getDate();
    const formattedMonth = months[date.getMonth()];
    const formattedYear = date.getFullYear();

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
  }
  function capitalizeFirstLetter(string) {
    if (!string) return ""; // handle empty string or null input
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            defaultCurrent={1}
            total={totalPages * 10}
            pageSize={pageSize}
            showSizeChanger={false}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            onChange={(page, size) => {
              setPage(page);
              setPageSize(size);
            }}
          />
          {/* <Pagination
            // isCompact
            showControls
            // showShadow
            key={"secondary"}
            // color="secondary"
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
        <TableColumn>NAME</TableColumn>
        <TableColumn>LAST ORDER</TableColumn>
        <TableColumn className="flex flex-col text-center">
          <span className="">PACKAGE</span>
          <span>Customer Package ID - Subscription ID</span>
        </TableColumn>
        <TableColumn className="text-center">Payment Status</TableColumn>
      </TableHeader>
      <TableBody>
        {customerSubscriptions.map(
          (item) =>
            item.payment_date && (
              <TableRow key="1">
                <TableCell>
                  {item.CustomerPackage.UserCustomer ? (
                    <>
                      {item.CustomerPackage.UserCustomer?.first_name}{" "}
                      {item.CustomerPackage.UserCustomer?.last_name}
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  {item.CustomerOrders?.length > 0
                    ? formatDate(
                        item.CustomerOrders.sort(
                          (a, b) =>
                            new Date(b.order_date) - new Date(a.order_date)
                        )[0].order_date
                      )
                    : "N/A"}
                </TableCell>
                <TableCell className="flex flex-col text-center">
                  <span>
                    {item.CustomerPackage.VendorPackagePrice ? (
                      <>
                        {" "}
                        {capitalizeFirstLetter(
                          item.CustomerPackage.VendorPackagePrice?.frequency
                        )}
                        -
                        {capitalizeFirstLetter(
                          item.CustomerPackage.VendorPackagePrice?.method
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </span>
                  <span>
                    {item.CustomerPackage?.id}- {item.id}
                  </span>
                </TableCell>
                <TableCell>
                  {item.payment_date ? (
                    <span className="flex flex-col items-center ">
                      {" "}
                      <span className="flex gap-2 items-center  font-semibold">
                        <MdVerified className="text-blue-400 text-[20px]" />{" "}
                        Paid - {item.PaymentMethod.method_name}
                      </span>
                      {formatDate(item.payment_date.split("T")[0])}
                    </span>
                  ) : (
                    <span className="flex flex-col gap-2 items-center">
                      {" "}
                      <span className="flex gap-2 items-center font-semibold">
                        <MdCancel className="text-yellow-600 text-[20px]" />{" "}
                        Unpaid - {item.PaymentMethod?.method_name}
                      </span>
                      {/* {formatDate(item.payment_date.split("T")[0])} */}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
}
