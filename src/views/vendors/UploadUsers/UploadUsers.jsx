import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import {
  getCities,
  getVendorPackagesForVendor,
  setUserCustomersByVendor,
} from "../../../actions/vendorReducers/VendorActions";
import { CCol, CFormLabel, CFormSelect } from "@coreui/react";
import { Select } from "antd";

const columnMapping = {
  "First Name": "first_name",
  "Last Name": "last_name",
  Age: "phone",
  Email: "email",
  "Address 1": "address_1",
  "Address 2": "address_2",
  "Delivery Instructions": "delivery_instructions",
  "Postal Code": "postal_code",
  "City Name": "city_name",
  "Created Date": "created_date",
  "Package Name": "package_name",
};

const requiredColumns = Object.keys(columnMapping);

const UploadUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const fetchData = async () => {
    try {
      const [fetchPackages, fetchCities] = await Promise.all([
        dispatch(getVendorPackagesForVendor()),
        dispatch(getCities()),
      ]);
      const citiesData = fetchCities.data.map((item) => ({
        label: item.city,
        value: item.city,
        id: item.id,
      }));

      const packagesData = fetchPackages.data.map((item) => ({
        label: item.package_name,
        id: item.id,
        value: item.pacakge_name,
      }));
      console.log("pacakgesData", data);

      setPackages(packagesData);
      setCities(citiesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(requiredColumns);

      // Check for required columns
      const columns = Object.keys(jsonData[0]);
      const missingColumns = requiredColumns.filter(
        (col) => !columns.includes(columnMapping[col])
      );

      if (missingColumns.length > 0) {
        setError(`Missing required columns: ${missingColumns.join(", ")}`);
        setData([]);
      } else {
        setError("");
        setData(jsonData);
      }
    };

    reader.readAsBinaryString(file);
  };

  const onChange = (value, rowIndex, column) => {
    const updatedData = [...data];
    updatedData[rowIndex][column] = value;
    setData(updatedData);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSubmit = () => {
    try {
      const response = dispatch(setUserCustomersByVendor(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="file_input"
      >
        Upload Excel File
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file_input"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V8m0 0l4-4m-4 4l-4-4m13 4v8m0 0l4-4m-4 4l-4-4M3 20h18"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">.xlsx or .xls (MAX. 5MB)</p>
          </div>
          <input
            id="file_input"
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div className="mt-4 overflow-x-auto">
        {data.length > 0 && (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {requiredColumns.map((key, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {requiredColumns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"
                      >
                        {col === "City Name" ? (
                          <>
                            <Select
                              showSearch
                              placeholder="Select a person"
                              optionFilterProp="label"
                              onChange={(e) =>
                                onChange(e, rowIndex, columnMapping[col])
                              }
                              value={cities.find(
                                (item) =>
                                  `${item.label}`.toUpperCase() ===
                                  `${row[columnMapping[col]]}`.toUpperCase()
                              )}
                              onSearch={onSearch}
                              options={cities}
                            />
                          </>
                        ) : col === "Package Name" ? (
                          <>
                            <Select
                              showSearch
                              placeholder="Select a person"
                              optionFilterProp="label"
                              onChange={(e) =>
                                onChange(e, rowIndex, columnMapping[col])
                              }
                              value={packages.find(
                                (item) =>
                                  `${item.label}`.toUpperCase() ===
                                  `${row[columnMapping[col]]}`.toUpperCase()
                              )}
                              onSearch={onSearch}
                              options={packages}
                            />
                          </>
                        ) : (
                          row[columnMapping[col]]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {data.length > 0 && (
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-blue-400 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadUsers;
