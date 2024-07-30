import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "../routes";
import { useDispatch } from "react-redux";
import {
  getVendorEmployee,
  getVendorSettingsById,
} from "../actions/vendorReducers/VendorActions";
import Page404 from "../views/pages/page404/Page404";

const AppContent = () => {
  const [finalRoutes, setFinalRoutes] = useState([]);
  const dispatch = useDispatch();
  const fetchVendorEmployee = async () => {
    try {
      const VendorEmployeeId = localStorage.getItem("VendorEmployeeId");
      const Vendor = JSON.parse(localStorage.getItem("menuScribe"));

      if (Vendor.type === "Owner") {
        const res = await dispatch(getVendorSettingsById(Vendor.id));

        if (res.data) {
          const FinalRoutes = [];

          // res.vendor.website_admin == 1 && FinalRoutes.push("website_admin");
          routes.forEach((item) =>
            res.data[item.pageAcc] === 1
              ? FinalRoutes.push(item)
              : res.vendor.website_admin == 1 &&
                item.pageAcc == "website_admin" &&
                FinalRoutes.push(item)
          );

          setFinalRoutes(FinalRoutes);
        }
      } else {
        const res = await dispatch(getVendorEmployee({ VendorEmployeeId }));
        if (res.data) {
          const FinalRoutes = [];
          console.log('res.data["add_customer_page"]', VendorEmployeeId);

          // res.vendor.website_admin == 1 && FinalRoutes.push("website_admin");

          routes.forEach((item) =>
            res.data[item.pageAcc] === 1
              ? FinalRoutes.push(item)
              : res.vendor.website_admin == 1 &&
                item.pageAcc == "website_admin" &&
                FinalRoutes.push(item)
          );

          setFinalRoutes(FinalRoutes);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorEmployee();
  }, []);
  return (
    <CContainer lg>
      <Suspense>
        <Routes>
          {finalRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
