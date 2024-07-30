import React, { useEffect, useState } from "react";
import Section from "./Section/Section";

export default function EditableSection({ setTemplateData, templateData }) {
  const [order, setOrder] = useState({
    first: "logo",
    second: "about_us",
    third: "packages",
    forth: "daily_menu",
    fifth: "contact_us",
    sixth: "our_food",
  });

  useEffect(() => {
    console.log("templateData:", templateData);
  }, [templateData]);

  useEffect(() => {
    if (templateData) {
      setOrder({
        first: templateData.first,
        second: templateData.second,
        third: templateData.third,
        forth: templateData.forth,
        fifth: templateData.fifth,
        sixth: templateData.sixth,
      });
    } else {
      setOrder({
        first: "logo",
        second: "about_us",
        third: "packages",
        forth: "daily_menu",
        fifth: "contact_us",
        sixth: "our_food",
      });
    }
  }, [templateData]);

  // Split order into two columns
  const keys = Object.keys(order);
  const firstColumnKeys = keys.slice(0, Math.ceil(keys.length / 2));
  const secondColumnKeys = keys.slice(Math.ceil(keys.length / 2));

  return (
    <div className="flex space-x-4 justify-center w-full">
      <div className="flex flex-col space-y-4 ">
        {firstColumnKeys.map((key) => (
          <div key={key} className="">
            <Section
              checkedKey={key}
              setTemplateData={setTemplateData}
              templateData={templateData}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-4">
        {secondColumnKeys.map((key) => (
          <div key={key} className="">
            <Section
              checkedKey={key}
              setTemplateData={setTemplateData}
              templateData={templateData}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
