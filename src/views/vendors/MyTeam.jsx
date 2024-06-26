import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { MdOutlineWeb } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function MyTeam() {
  const [employee, setEmployee] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  const fetchEmployeeData = async () => {
    try {
      const response = await dispatch(getEmployees());
      console.log("emp", response.data);
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const date = formatDate(user.join_date);
    switch (columnKey) {
      case "date":
        return <p>{date}</p>;
      case "name":
        return (
          <p>
            {user.UserVendor.first_name} {user.UserVendor.last_name}
          </p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {user.VendorRole.role}
            </p>
            {/* <p className="text-bold text-sm capitalize text-default-400">
              {user.role}
            </p> */}
          </div>
        );
      case "location":
        return (
          <div className="flex flex-col">
            {/* {user.VendorEmployeeLocations?.map((item) => ( */}
            <span className="">
              {user.VendorEmployeeLocation?.VendorLocation?.location_name}
            </span>
            {/* ))} */}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(`/manage/team/${user.id}`)}
              >
                <MdOutlineWeb />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={employee}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
