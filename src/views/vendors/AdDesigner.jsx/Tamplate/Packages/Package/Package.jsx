import React from "react";
import { CButton } from "@coreui/react";
import "./Package.css";
import VegIcon from "../../../../../../assets/icons/veg.png";
import NonVegIcon from "../../../../../../assets/icons/non-veg.png";

const Package = ({ item, handleAddPackage }) => {
  const getPrices = (prices) => {
    const sortedPrices = [];
    prices.forEach((price) => {
      if (price.frequency === "daily") {
        sortedPrices[0] = price;
      } else if (price.frequency === "weekly") {
        sortedPrices[1] = price;
      } else if (price.frequency === "monthly") {
        sortedPrices[2] = price;
      }
    });

    return (
      sortedPrices.length > 0 &&
      sortedPrices.map((price) => (
        <span className="text-right" key={price.id}>
          ${price.cost}/{price.frequency === "daily" ? "meal" : price.frequency}
        </span>
      ))
    );
  };

  console.log("items", item);

  const getDays = (packge) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days.map((day, i) => {
      if (packge[day] === 1) {
        const firstLetter = day.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = day.slice(1);
        return (
          <span key={i} className="package-day-name">
            {" "}
            {firstLetterCap + remainingLetters}{" "}
          </span>
        );
      }
    });
  };

  return (
    <div className="relative package-container">
      {/* ---Image Container-------- */}
      <div className="package-image-container">
        <img
          src={
            item.image
              ? item.image
              : "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"
          }
          alt=""
        />
      </div>

      <div className="flex justify-between text-left p-1">
        {/* -------Package Name and Items----- */}
        <div className="">
          <h5 className="flex items-center text-[14px]  text-nowrap">
            <img
              src={item.veg === 1 ? VegIcon : NonVegIcon}
              alt="Veg icon"
              className="vegetarian-icon"
            />
            {item.package_name}
          </h5>
          <div className="items-container">
            {item.VendorPackageDefaultItems.map((ditem, index) => (
              <span className="d-block" key={index}>
                - {ditem.item_name} - {ditem.quantity}
              </span>
            ))}
          </div>
        </div>

        {/* ---------Meals, Price and days */}
        <div className="">
          {/* ------Prices container------- */}
          <div className="prices-container">
            {getPrices(item.VendorPackagePrices)}
          </div>
        </div>
      </div>
      {/* ------------Deivery, pickup and days container */}
      <div className="flex flex-col  justify-end bottom-container">
        <div className="delivery-pickup">
          {item.pickup === 1 && <span className="pickup">PICKUP</span>}
          {item.delivery === 1 && <span className="delivery">DELIVERY</span>}
        </div>
        <div className="package-day-name-container">{getDays(item)}</div>
      </div>

      <CButton
        className="fixed-button"
        color="success"
        onClick={() => handleAddPackage(item.id)}
      >
        <strong>ADD</strong>
      </CButton>
    </div>
  );
};

export default Package;
