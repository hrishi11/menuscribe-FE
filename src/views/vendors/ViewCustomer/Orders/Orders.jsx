import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { IoCameraSharp } from "react-icons/io5";
import { Image } from "antd/es";

export default function Orders({ orders, formatDate }) {
  const [visible, setVisible] = useState({ show: false });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  console.log(orders);
  const pages = Math.ceil(orders.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders.slice(start, end);
  }, [page, orders]);
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = `${hours}:${minutesStr}${ampm}`;
    return `${day}-${month} (${formattedTime})`;
  };
  const pagenation = () => {};
  return (
    <div>
      <Table
        // color={selectedColor}
        // selectionMode="single"
        // defaultSelectedKeys={["2"]}
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Order Date</TableColumn>
          <TableColumn>Pickup/Delivery Address</TableColumn>
          <TableColumn>Pickup/Delivery Time</TableColumn>
          <TableColumn>Delivered By</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key="1"
              //   className="cursor-pointer"
              onClick={() => console.log("eh")}
            >
              <TableCell>{formatDate(item.order_date)}</TableCell>
              <TableCell>
                {item.pickup_delivery == 1 ? (
                  item.CustomerPackage?.VendorPackage?.VendorLocation ? (
                    <>
                      {
                        item.CustomerPackage?.VendorPackage?.VendorLocation
                          ?.address
                      }{" "}
                      {
                        item.CustomerPackage?.VendorPackage?.VendorLocation
                          ?.CitiesAll?.city
                      }
                    </>
                  ) : (
                    "N/A"
                  )
                ) : item.pickup_delivery == 2 ? (
                  item.CustomerDeliveryAddress ? (
                    <>
                      {item.CustomerDeliveryAddress?.address}{" "}
                      {item.CustomerDeliveryAddress?.CitiesAll?.city}
                    </>
                  ) : (
                    "N/A"
                  )
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {item.delivered_time ? (
                  <span className="flex gap-2  items-center">
                    {formatDateAndTime(item.delivered_time)}{" "}
                    {item.delivery_img && (
                      <span className="flex items-center">
                        <IoCameraSharp
                          className="text-[20px] "
                          onClick={() =>
                            setVisible({
                              index,
                              img: item.delivery_img,
                              show: true,
                            })
                          }
                        />
                        <Image
                          //   width={100}
                          style={{ display: "none" }}
                          src={visible.img}
                          preview={{
                            visible: visible.show,
                            src: visible.img,
                            onVisibleChange: (value) => {
                              setVisible({ show: value });
                            },
                          }}
                        />
                      </span>
                    )}
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
              <TableCell>
                {item.VendorEmployee ? (
                  <>
                    {item.VendorEmployee?.UserVendor?.first_name}{" "}
                    {item.VendorEmployee?.UserVendor?.last_name}
                  </>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
