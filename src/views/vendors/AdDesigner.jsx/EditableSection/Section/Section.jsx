import { CFormLabel, CFormSelect } from "@coreui/react/dist";
import React from "react";

export default function Section({ checkedKey, setTemplateData, templateData }) {
  console.log(checkedKey, templateData);
  return (
    <div className="h-[200px] flex flex-col justify-center items-center  bg-gray-300 rounded-md px-4">
      <div className="">
        <CFormLabel htmlFor="selectTamplate" className="font-semibold">
          {" "}
          What do you want to show here?
        </CFormLabel>
        <CFormSelect
          id="selectTamplate"
          className="selectTamplate  "
          value={templateData[checkedKey]}
          onChange={(e) =>
            setTemplateData((pre) => ({ ...pre, [checkedKey]: e.target.value }))
          }
        >
          <option value="null">Select</option>
          <option value={"logo"} key={1}>
            Logo
          </option>
          <option value={"packages"} key={2}>
            Packages
          </option>
          <option value={"contact_us"} key={3}>
            Contact us
          </option>
          <option value={"our_food"} key={4}>
            {" "}
            Our food
          </option>
          <option value={"daily_menu"} key={5}>
            Daily Menu
          </option>
          <option value={"about_us"} key={6}>
            About us
          </option>
          <option value={"service_area"} key={7}>
            Service area
          </option>
        </CFormSelect>
      </div>
    </div>
  );
}
