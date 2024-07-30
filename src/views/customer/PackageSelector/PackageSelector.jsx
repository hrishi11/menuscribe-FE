import React, { useEffect, useState } from "react";
import {
  getCustomerDeliveryLocations,
  getVendorPackageByLocation,
} from "../../../actions/customerReducer/CustomerActions";
import { useDispatch } from "react-redux";
import Package from "./Package/Package";
import SelectAnLocation from "./Select/SelectLocation";
import PaymentModal from "./Modal/PaymentModal";
import { useDisclosure } from "@nextui-org/react";

export default function PackageSelector() {
  const [packages, setPackages] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [date, setDate] = useState();
  const [formData, setFormData] = useState({
    cardNumber: "",
    firstName: "",
    lastName: "",
    expiry: "",
    cvv: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [allLocations, setAllLocations] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchVendorPackages();
  }, [selectedLocation]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resposne = await dispatch(getCustomerDeliveryLocations());
      const address = resposne.data.find((item) => item.default_address == 1);
      setSelectedLocation(address);
      setAllLocations(resposne.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendorPackages = async () => {
    const [packageResponse] = await Promise.all([
      dispatch(
        getVendorPackageByLocation({ vendor_location_id: selectedLocation?.id })
      ),
    ]);

    console.log("grouped", packageResponse.data);
    console.log("grouped2", groupByPrice(packageResponse.data));
    setPackages(groupByPrice(packageResponse.data));
  };
  function groupByPrice(products) {
    // Create a Map to group by price
    const groupedByPrice = new Map();

    // Iterate over products
    for (const product of products) {
      for (const detail of product.VendorPackagePrices) {
        if (detail.method === "delivery") {
          const price = detail.cost;
          if (!groupedByPrice.has(price)) {
            groupedByPrice.set(price, []);
          }
          groupedByPrice
            .get(price)
            .push({ ...product, VendorPackagePrices: [detail] });
        }
      }
    }

    // Convert the Map to an array of arrays
    return Array.from(groupedByPrice.values());
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e, onClose) => {
    e.preventDefault();
    setPopup({});
    setFormData({});
    onClose();
  };

  return (
    <div>
      <div>
        <div className="py-2 flex w-full justify-around items-center">
          <div className="w-[200px]"></div>
          <div className="flex flex-col text-center">
            <span className="font-semibold text-[32px]">SELECT A PACKAGE</span>
            <span className="text-[18px]">
              You can change this later at any time
            </span>
          </div>
          <div>
            <SelectAnLocation
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              allLocations={allLocations}
            />
          </div>
        </div>
        <div className="select-packages-container px-20 py-4 ">
          <div className="">
            {packages.map((item) => (
              <div className="flex flex-col gap-3 mt-5">
                <span className="text-[28px] font-semibold">
                  $
                  {item[0].VendorPackagePrices.find(
                    (i) => i.method === "delivery"
                  ).cost * 22}
                  /month Packages
                </span>
                <div className="flex gap-3">
                  {item.map((pack) => (
                    <Package
                      pack={pack}
                      key={pack.id}
                      onOpen={onOpen}
                      popup={popup}
                      setFormData={setFormData}
                      setPopup={setPopup}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {popup.show && (
          <PaymentModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            setDate={setDate}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            date={date}
            formData={formData}
            setFormData={setFormData}
            tableInfo={{
              tax: popup.package.tax_percent,
              package_name: popup.package.package_name,
              cost:
                popup.package.VendorPackagePrices.find(
                  (item) => item.method === "delivery"
                ).cost * 22,
            }}
          />
        )}
      </div>
    </div>
  );
}
