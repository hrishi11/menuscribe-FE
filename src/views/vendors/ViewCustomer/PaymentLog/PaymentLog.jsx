import React from "react";
// import "./../Deliver/UpcommingOrders.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function PaymentLog({ paymentLog }) {
  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);

    const day = String(dateObj.getUTCDate()).padStart(2, "0"); // Get day and pad with zero if needed
    const month = dateObj.toLocaleString("default", { month: "long" }); // Get the full month name

    return `${day} ${month}`;
  }
  return (
    <div>
      <Table aria-label="" radius="none" className="rounded-none ">
        <TableHeader className="rounded-none">
          <TableColumn>Date</TableColumn>
          <TableColumn>Package Name</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Total</TableColumn>
        </TableHeader>
        <TableBody>
          {paymentLog.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(item.created_at)}</TableCell>
              <TableCell>
                {item.CustomerPackage?.VendorPackage ? (
                  <p className="flex flex-col">
                    <span>
                      {item.CustomerPackage?.VendorPackage?.package_name} (
                      {item.CustomerPackage?.VendorPackagePrice?.frequency})
                    </span>
                    <span>
                      {item?.CustomerPackage?.id}-
                      {item?.customer_package_subscription_id}
                    </span>
                  </p>
                ) : (
                  item.description
                )}
              </TableCell>
              <TableCell>${item?.amount}</TableCell>
              <TableCell>${item?.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
