import { CButton, CForm } from "@coreui/react/dist";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewFrequency from "./NewFrequency/NewFrequency";
import { getPackagesWithoutLoginByVendorId } from "../../../../../actions/customerReducer/CustomerActions";
import Package from "./Package/Package";

export default function Packages() {
  const { customerSelectedPackages } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackages] = useState(
    customerSelectedPackages
  );
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetchPackages();
  }, []);
  const fetchPackages = async () => {
    try {
      const [packagesResponse] = await Promise.all([
        dispatch(
          getPackagesWithoutLoginByVendorId({
            vendor_id: null,
          })
        ),
      ]);
      console.log(packagesResponse);
      setPackages(packagesResponse ? packagesResponse.data : []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleAddPackage = async (id) => {
    const clickedPackage = packages.filter((pk) => pk.id === id);
    let pickup_delivery = 0;
    if (clickedPackage[0].pickup === 1 && clickedPackage[0].delivery === 0) {
      pickup_delivery = 1;
    } else if (
      clickedPackage[0].pickup === 0 &&
      clickedPackage[0].delivery === 1
    ) {
      pickup_delivery = 2;
    } else {
      pickup_delivery = 0;
    }
    setSelectedPackages([
      ...selectedPackages,
      {
        ...clickedPackage[0],
        user_package_name: "",
        frequency: { frequency: "" },
        start_date: getDateFromString(new Date()),
        quantity: "1",
        temp_id: uuid(),
        pickup_delivery,
        customer_delivery_address: { id: "" },
      },
    ]);
  };

  return (
    <div className="h-[600px] overflow-y-scroll border-2 p-2 rounded-lg">
      <p className="w-full flex justify-center font-semibold text-[32px]">
        Packages
      </p>
      <div className="flex flex-wrap gap-3 justify-center ">
        {packages.map((pkg, index) => (
          <Package
            key={pkg.id}
            item={pkg}
            handleAddPackage={handleAddPackage}
          />
        ))}
      </div>

      {/* <div className="step-2-container">
        hkljhkjh
        {selectedPackages.length > 0 && (
          <>
            <h6 className="my-20x">STEP 2</h6>
            <h5 className="text-red"> SELECT YOUR FREQUENCY</h5>
            <CForm onSubmit={handleSavePackages}>
              <div className="selectedPackagesContainer">
                {selectedPackages.map((pckg) => (
                  <NewFrequency
                    key={pckg.id}
                    product={pckg}
                    setDate={setDate}
                    removePackage={removePackage}
                    handlePickupCheck={handlePickupCheck}
                    handleDeliveryCheck={handleDeliveryCheck}
                    handleFrequencyChange={handleFrequencyChange}
                    handleTimeSlotChange={handleTimeSlotChange}
                    handleFrequencyInputChange={handleFrequencyInputChange}
                  />
                ))}
              </div>
              <div className="text-center my-10x">
                {selectedPackages.length > 0 && (
                  <CButton
                    className="px-5"
                    type="submit"
                    // onClick={handleSavePackages}
                  >
                    Next
                  </CButton>
                )}
              </div>
            </CForm>
          </>
        )}
      </div> */}
    </div>
  );
}
