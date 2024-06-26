import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "../routes";
import { useDispatch } from "react-redux";
import { getVendorEmployee } from "../actions/vendorReducers/VendorActions";
import Page404 from "../views/pages/page404/Page404";

const AppContent = () => {
  const [finalRoutes, setFinalRoutes] = useState([]);
  const dispatch = useDispatch();
  const fetchVendorEmployee = async () => {
    try {
      const VendorEmployeeId = localStorage.getItem("VendorEmployeeId");
      const res = await dispatch(getVendorEmployee({ VendorEmployeeId }));
      if (res.data) {
        const FinalRoutes = [];
        // console.log(res.data["add_customer_page"]);
        routes.forEach(
          (item) => res.data[item.pageAcc] === 1 && FinalRoutes.push(item)
        );
        setFinalRoutes(FinalRoutes);
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
