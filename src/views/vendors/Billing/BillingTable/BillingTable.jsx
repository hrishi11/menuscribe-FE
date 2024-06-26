import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

export default function BillingTable({
  billingInfo,
  totalPages,
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

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
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
        <TableColumn>Payment Status</TableColumn>
      </TableHeader>
      <TableBody>
        {customerSubscriptions.map((item) => (
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
              {item.CustomerPackage.CustomerOrders.length > 0
                ? formatDate(
                    item.CustomerPackage.CustomerOrders.sort(
                      (a, b) => new Date(a.order_date) - new Date(b.order_date)
                    )[0].order_date
                  )
                : "N/A"}
            </TableCell>
            <TableCell className="flex flex-col text-center">
              <span>
                {item.CustomerPackage.VendorPackagePrice ? (
                  <>
                    {" "}
                    {item.CustomerPackage.VendorPackagePrice?.frequency}-
                    {item.CustomerPackage.VendorPackagePrice?.method}
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
              {item.status == 1 ? (
                <span className="flex flex-col items-center ">
                  {" "}
                  <span className="flex gap-2 items-center  font-semibold">
                    <MdVerified className="text-blue-400 text-[20px]" /> Paid -{" "}
                    {item.PaymentMethod.method_name}
                  </span>
                  {formatDate(item.payment_date.split("T")[0])}
                </span>
              ) : (
                <span className="flex flex-col gap-2 items-center">
                  {" "}
                  <span className="flex gap-2 items-center font-semibold">
                    <GoUnverified className="text-yellow-600 text-[20px]" />{" "}
                    Unpaid - {item.PaymentMethod?.method_name}
                  </span>
                  {formatDate(item.payment_date.split("T")[0])}
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
