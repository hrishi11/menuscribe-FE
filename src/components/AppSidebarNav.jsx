import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";
import { useDispatch } from "react-redux";
import { getVendorEmployee } from "../actions/vendorReducers/VendorActions";

export const AppSidebarNav = ({ items }) => {
  const storedAuthData = JSON.parse(localStorage.getItem("menuScribe"));
  const [navItems, setNavItems] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchVendorEmployee = async () => {
    try {
      const VendorEmployeeId = localStorage.getItem("VendorEmployeeId");

      const res = await dispatch(getVendorEmployee({ VendorEmployeeId }));
      if (res.data) {
        const FinalNavItems = [];
        // console.log(res.data["add_customer_page"]);
        items["Admin"]?.forEach(
          (item) => res.data[item.pageAcc] === 1 && FinalNavItems.push(item)
        );
        setNavItems(FinalNavItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorEmployee();
  }, []);

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <>
        <Component
          {...(rest.to &&
            !rest.items && {
              component: NavLink,
            })}
          key={index}
          {...rest}
        >
          {navLink(name, icon, badge)}
        </Component>
      </>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {navItems.length > 0 &&
        navItems.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
