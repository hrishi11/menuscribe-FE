import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "../assets/brand/logo-negative";
import { sygnet } from "../assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { appActions } from "../actions/appReducers/AppSlice";
import logo from "../assets/menuscribe-logo.png";
// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const { sidebarShow, unfoldable } = useSelector((state) => state.app);
  console.log("appSIdebar", unfoldable);
  const [width, setWidth] = useState();

  const backgroundRef = useRef(null);
  const [visible, setVisible] = useState(sidebarShow);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setVisible(sidebarShow);
  }, [sidebarShow]);

  useEffect(() => {
    if (width) {
      width < 800 ? setVisible(true) : setVisible(false);
    }
  }, [width]);
  return (
    // <>
    //   {width && (
    <CSidebar position="fixed" visible={visible} style={{ zIndex: "1" }}>
      <CSidebarBrand className="d-none d-md-flex" to="/manage/dashboard">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <div className="w-190">
          <img src={logo} alt="" />
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        onClick={() => dispatch(appActions.sidebarUnfoldable(false)) }
      /> */}
    </CSidebar>
    //   )}
    // </>
  );
};

export default React.memo(AppSidebar);
