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
  Input,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { MdOutlineWeb } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../actions/customerReducer/CustomerActions";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { globalSearch } from "../../utils/Helper";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function MyTeam() {
  const [employee, setEmployee] = useState([]);
  const [info, setInfo] = useState([]);
  const [vendorSettings, setVendorSettings] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeData();
  }, []);
  const fetchEmployeeData = async () => {
    try {
      const response = await dispatch(getEmployees());
      setVendorSettings(response.settings);
      setEmployee(response.data);
      setInfo(response.data);
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
            {user.UserVendor?.first_name} {user.UserVendor?.last_name}
          </p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {user.VendorRole?.role}
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
              {user.VendorEmployeeLocations[0]?.VendorLocation?.location_name}
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

  const handleAddEmployee = async () => {
    try {
      if (
        vendorSettings.no_of_employees &&
        employee.length > vendorSettings.no_of_employees
      ) {
        onOpen();
      } else {
        navigate("/manage/add-team");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>
                  You have reached the maximum number of employees. Your account
                  only allows you to have {vendorSettings.no_of_employees}{" "}
                  employees
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex w-full  justify-between items-center my-3">
        <div className=" flex ">
          <button
            onClick={handleAddEmployee}
            className="px-4 py-2  bg-blue-500 rounded-lg text-white m-2 "
          >
            Add Employee
          </button>
        </div>
        <Input
          type="text"
          variant="bordered"
          className="w-[400px] bg-white rounded-xl "
          label="Search"
          onChange={(event) => {
            if (event.target.value) {
              setEmployee(globalSearch(info, event.target.value));
            } else {
              setEmployee(info);
            }
          }}
        />
      </div>

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
          {employee &&
            employee.map((item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
