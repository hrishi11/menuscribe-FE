import React, { useEffect, useState } from "react";
import DailyMenuSection from "./DailyMenu/DailyMenu";
import Logo from "./Logo/Logo";
import ContactUs from "./ContactUs/ContactUs";
import Packages from "./Packages/Packages";
import OurFood from "./OurFood/OurFood";
import AboutUs from "./AboutUs/AboutUs";
import ServiceArea from "./ServiceArea/ServiceArea";

export default function Template({
  setTemplateData,
  templateData,
  templateInfo,
}) {
  const [orderedData, setOrderedData] = useState([]);

  useEffect(() => {
    if (templateData) {
      let components = [];
      Object.values(templateData).forEach((item) => {
        if (item === "logo") {
          return components.push(
            <Logo key={item} logo={templateInfo.data.Vendor.logo} />
          );
        } else if (item === "contact_us") {
          return components.push(
            <ContactUs
              contectInfo={{
                email: templateInfo.data.Vendor.email,
                phone: templateInfo.data.Vendor.phone,
              }}
              key={item}
            />
          );
        } else if (item === "about_us") {
          return components.push(
            <AboutUs
              key={item}
              aboutUs={templateInfo.data.WebSettings.find(
                (item) => item.title === "About Us"
              )}
            />
          );
        } else if (item === "service_area") {
          return components.push(
            <ServiceArea
              serviceArea={templateInfo.data.WebSettings.find(
                (item) => item.title === "Our Service Areas"
              )}
            />
          );
        } else if (item === "daily_menu") {
          return components.push(<DailyMenuSection key={item} />);
        } else if (item === "packages") {
          return components.push(<Packages key={item} />);
        } else if (item === "our_food") {
          return components.push(
            <div className="h-[200px]">
              <OurFood
                key={item}
                ourFood={templateInfo.data.WebSettings.find(
                  (item) => item.title === "Our Foods"
                )}
              />
            </div>
          );
        }
      });
      setOrderedData(components);
    }
  }, [templateData]);
  const firstColumn = orderedData.slice(0, Math.ceil(orderedData.length / 2));
  const secondColumn = orderedData.slice(Math.ceil(orderedData.length / 2));

  return (
    <div className="flex  w-full   bg-white p-3 gap-3">
      <div className="flex flex-col gap-3 space-y-4 w-1/2">
        {firstColumn.map((Component, index) => (
          <div key={index} className="">
            {Component}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3  space-y-4 w-1/2">
        {secondColumn.map((Component, index) => (
          <div key={index} className="">
            {Component}
          </div>
        ))}
      </div>
    </div>
  );
}
