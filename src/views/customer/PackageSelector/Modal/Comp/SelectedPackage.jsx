import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function SelectedPackage({ info }) {
  return (
    <div className="">
      <Table
        hideHeader
        className=" w-full border-1 rounded-xl cursor-text hover:text-gray-500"
      >
        <TableHeader className="">
          <TableColumn className="text-[18px] cursor-text">
            {info.package_name}
          </TableColumn>
          <TableColumn className="text-[18px]">$185</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b-1  cursor-text" key="1">
            <TableCell className="text-[18px] text-gray-700">
              {info.package_name}
            </TableCell>
            <TableCell className="text-[18px] text-gray-700">
              ${info.cost}
            </TableCell>
          </TableRow>
          <TableRow key="2" className=" cursor-text">
            <TableCell className="text-[18px]">Tax ({info.tax}%)</TableCell>
            <TableCell className="text-[18px]">
              ${(info.tax * info.cost) / 100}
            </TableCell>
          </TableRow>
          <TableRow key="3" className=" cursor-text bg-gray-100 rounded-md">
            <TableCell className="text-[18px] text-gray-600  font-medium">
              Subtotal
            </TableCell>
            <TableCell className="text-[18px] text-gray-600  font-medium">
              ${info.cost + (info.tax * info.cost) / 100}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
