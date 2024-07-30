import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { customerLogout } from "../actions/authReducer/AuthActions";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/menuscribe-logo.png";

export const CustomerDashboardHeader = ({ activeKey, setActiveKey }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(customerLogout());
    navigate("/login");
  };
  return (
    <header>
      <div className="nav-container px-20x py-20x border-b">
        {/* -----Left----- */}
        <div className="left ">
          {/* -----Dextop Logo----- */}
          <div className="logo-header">
            {/* <div className="logo-header-inner">
              <h1 className="text-red">Menu</h1>
              <h1>scribe</h1>
            </div> */}
            <img src={logo} alt="" width={200} />
          </div>
          {/* ------Navigations----- */}
          <CNav className="navigation">
            {/* <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 1}
                component="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 2}
                component="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Profile
              </CNavLink>
            </CNavItem>
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 3}
                component="button"
                role="tab"
                aria-controls="contact-tab-pane"
                aria-selected={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Add Packages
              </CNavLink>
            </CNavItem> */}
            <CNavItem className=" flex gap-40x">
              <NavLink to="/" className="customer-nav-link">
                Home
              </NavLink>
              <NavLink to="/profile" className="customer-nav-link">
                Profile
              </NavLink>
              <NavLink to="/add-package" className="customer-nav-link">
                Add Packages
              </NavLink>
              <NavLink to="/orders" className="customer-nav-link">
                Orders
              </NavLink>
              <NavLink to="/package-selector" className="customer-nav-link">
                Package Selector
              </NavLink>
              <NavLink to="/tp-home" className="customer-nav-link">
                TP Home
              </NavLink>
              <NavLink to="/billing" className="customer-nav-link">
                Billing
              </NavLink>
            </CNavItem>

            {/* <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 4}
                component="button"
                role="tab"
                aria-controls="disabled-tab-pane"
                aria-selected={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Disabled
              </CNavLink>
            </CNavItem> */}
          </CNav>

          {/* --------Logout------- */}
          <div className="right">
            <CButton
              className="font-medium border-none outline-none"
              color=""
              onClick={handleLogout}
            >
              Logout
            </CButton>
          </div>
          {/* ---Hambargar menu */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="customer-dashboard-hamburgur-menu border-none outline-none bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* --------Menubar Popup--------- */}
      <div
        className="CustomerDashboardMenuPopup"
        style={{ display: showMobileMenu ? "block" : "none" }}
        onClick={() => setShowMobileMenu(false)}
      >
        <CNav className="navigation-popup">
          <CNavItem>
            {/* -----mobile Logo----- */}
            <div className="logo-header">
              <div className="logo-header-inner">
                <h1 className="text-red">Menu</h1>
                <h1>scribe</h1>
              </div>
            </div>
          </CNavItem>
          <CNavItem className=" flex flex-col gap-40x  items-center">
            <NavLink to="/" className="customer-nav-link text-white">
              Home
            </NavLink>
            <NavLink to="/profile" className="customer-nav-link text-white">
              Profile
            </NavLink>
            <NavLink to="/add-package" className="customer-nav-link text-white">
              Add packages
            </NavLink>
          </CNavItem>
        </CNav>
      </div>
    </header>
  );
};
