import React from "react";
import "./PackageItem.css";

const PackageItem = ({ day, selectedPackage }) => {
  console.log(day, selectedPackage);

  const getVendorPackageMenuItems = (date, VendorPackageDefaultItem) => {
    console.log("h----------------------------------");
    const currentDate = new Date(date.initialDate);
    const dateStr = currentDate.toISOString().split("T")[0];
    const { VendorPackageMenuItems } = VendorPackageDefaultItem;

    // Comparing dates and finalizing the menu items
    const SelectedMenuItems = [];
    VendorPackageMenuItems.map((item) => {
      if (item.menu_date === dateStr) {
        SelectedMenuItems.push(item);
      }
    });

    // If any of the menu items date is matched than return there names including / . otherwise return default itemname
    if (SelectedMenuItems.length > 0) {
      console.log(SelectedMenuItems);

      return (
        <div className="">
          {/* Set the header for the list */}
          <span className="font-medium">
            {VendorPackageDefaultItem.item_name}
          </span>{" "}
          {/* Assuming VendorPackageDefaultItem has a name property */}
          {/* Render the list of menu items */}
          {/* <ul key={VendorPackageDefaultItem.id}> */}
          {SelectedMenuItems.map((itm, i) => (
            <div className="" key={i}>
              -
              {`${itm.menu_item_name}${
                SelectedMenuItems.length - 1 !== i ? " / " : ""
              }`}
            </div>
          ))}
          {/* </ul> */}
        </div>
      );
    } else {
      return (
        <ul className="font-medium" key={VendorPackageDefaultItem.id}>
          {VendorPackageDefaultItem.item_name}
        </ul>
      );
    }
  };

  return (
    <div className="itemContainer">
      <div className="date text-center">
        <span className="font-semibold text-lg ">{day.dayName}</span>

        <span className="text-2xl">
          {day.monthName} {day.date}
        </span>
      </div>
      {/* <ul className="items">
        {selectedPackage.VendorPackageDefaultItems.map((item) => {
          if (item.CustomerOrderItem) {
            return (
              <li key={item.id}>
                {item.CustomerOrderItem.VendorPackageMenuItem?.menu_item_name}
              </li>
            );
          } else if (item.VendorPackageMenuItems.length > 1) {
            return (
              <div className="multiple-items-container" key={item.id}>
                {item.VendorPackageMenuItems.map((mi, i) => (
                  <span key={mi.id} className="text-gray">
                    {mi.menu_item_name}
                    {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                  </span>
                ))}
              </div>
            );
          } else if (item.VendorPackageMenuItems.length > 0) {
            return (
              <div className="multiple-items-container" key={item.id}>
                {item.VendorPackageMenuItems.map((mi, i) => (
                  <span key={mi.id}>
                    {mi.menu_item_name}
                    {i !== item.VendorPackageMenuItems.length - 1 && "/"}
                  </span>
                ))}
              </div>
            );
          } else {
            return <li key={item.id}> {item.item_name}</li>;
          }
        })}
      </ul> */}
      <ul className="items">
        {selectedPackage?.VendorPackageDefaultItems?.map((item) => {
          if (item.VendorPackageMenuItems) {
            return getVendorPackageMenuItems(day, item);
          } else {
            return <span key={item.id}>{item.item_name}</span>;
          }
        })}
      </ul>
    </div>
  );
};

export default PackageItem;
