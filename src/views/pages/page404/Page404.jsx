import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import { Spinner } from "@nextui-org/react";

const Page404 = () => {
  const [pageLoad, setPageLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPageLoad(false);
    }, 2000);
  }, []);
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {pageLoad ? (
        <div className=" flex justify-center w-full">
          <Spinner size="lg" className="pt-[100px]" />
        </div>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <div className="clearfix">
                <h1 className="float-start display-3 me-4">404</h1>
                <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                <p className="text-medium-emphasis float-start">
                  The page you are looking for was not found.
                </p>
              </div>
              <CInputGroup className="input-prepend">
                <CInputGroupText>
                  <CIcon icon={cilMagnifyingGlass} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="What are you looking for?"
                />
                <CButton color="info">Search</CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
};

export default Page404;
