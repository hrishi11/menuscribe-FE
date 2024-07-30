import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createVendorTamplateDesigner,
  getVendorTamplateDesigner,
  getVendorTamplateInfo,
} from "../../../actions/vendorReducers/VendorActions";
import EditableSection from "./EditableSection/EditableSection";
import Tamplate from "./Tamplate/Tamplate";

export default function AdDesigner() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState({ edit: false });
  const [templateInfo, setTemplateInfo] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const [getTemplateDesigner, getTemplateInfo] = await Promise.all([
        dispatch(getVendorTamplateDesigner()),
        dispatch(getVendorTamplateInfo()),
      ]);

      setTemplateInfo(getTemplateInfo);

      if (getTemplateDesigner.data) {
        setTemplateData({ edit: false, ...getTemplateDesigner.data });
      } else {
        setTemplateData({ edit: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTamplate = async () => {
    try {
      const response = dispatch(createVendorTamplateDesigner(templateData));
      setTemplateData((pre) => ({ ...pre, edit: false }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTamplate = async () => {
    try {
      console.log("edit", templateData);
      setTemplateData((pre) => ({ ...pre, edit: true }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      {templateData.edit ? (
        <EditableSection
          templateData={templateData}
          setTemplateData={setTemplateData}
        />
      ) : (
        <>
          {templateData && (
            <Tamplate
              templateData={templateData}
              setTemplateData={setTemplateData}
              templateInfo={templateInfo}
            />
          )}
        </>
      )}

      {templateData.edit ? (
        <button
          onClick={handleCreateTamplate}
          className="py-2 px-4 rounded-md bg-blue-500 text-white"
        >
          Create Tamplate
        </button>
      ) : (
        <button
          onClick={handleEditTamplate}
          className="py-2 px-4 rounded-md bg-blue-500 text-white"
        >
          Edit Tamplate
        </button>
      )}
    </div>
  );
}
