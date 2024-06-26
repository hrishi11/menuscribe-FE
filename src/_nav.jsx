import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilFastfood,
  cilStar,
  cilUser,
  cilTruck,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

// Create Menu, Customer Orders, and Order Summary
//here you've to add routes

const _nav = {
  Rider: [
    {
      component: CNavItem,
      name: "Delivery",
      to: "/manage/delivery",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Delivery Manage",
      to: "/delivery-manage",
      icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
  ],
  Manager: [
    {
      component: CNavItem,
      name: "Create Menu",
      to: "/manage/create-menu",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Customer Orders",
      to: "/manage/customer-orders",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Get started",
      to: "/manage/get-started",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Order Summary",
      to: "/manage/order-summary",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
  ],
  Admin: [
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/manage/dashboard",
      pageAcc: "homepage",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: "info",
        text: "NEW",
      },
    },
    {
      component: CNavItem,
      name: "Get started",
      to: "/manage/get-started",
      pageAcc: "homepage",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Customers",
      to: "/manage/customers",
      pageAcc: "customers_page",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Packages",
      to: "/manage/packages",
      pageAcc: "packages_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Package Requests",
      to: "/manage/pacakge-requests",
      pageAcc: "package_requests_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Upload Users",
      to: "/manage/upload-users",
      pageAcc: "package_requests_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Pickups",
      to: "/manage/pickups",
      pageAcc: "pickups_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Create Menu",
      to: "/manage/create-menu",
      pageAcc: "menu_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Multiple Menu Editor",
      to: "/manage/multi-menu-editor",
      pageAcc: "menu_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Customer Orders",
      to: "/manage/customer-orders",
      pageAcc: "customer_orders_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },

    {
      component: CNavItem,
      name: "Website Setting",
      to: "/manage/website-settings",
      pageAcc: "package_requests_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Payments",
      to: "/manage/payments",
      pageAcc: "order_summary_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Billing",
      to: "/manage/billing",
      pageAcc: "order_summary_page",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Order Summary",
      to: "/manage/order-summary",
      pageAcc: "order_summary_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Order Manager",
      to: "/manage/order-manager",
      pageAcc: "order_manager_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Delivery Manager",
      to: "/manage/delivery-manager",
      pageAcc: "delivery_management_page",
      icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Delivery",
      to: "/manage/delivery",
      pageAcc: "delivery_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "My Team",
      to: "/manage/my-team",
      pageAcc: "team_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "All Subscription",
      to: "/manage/all-subscription",
      pageAcc: "all_subscriptions_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Team Settings",
      to: "/manage/team",
      pageAcc: "team_settings_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Locations",
      to: "/manage/locations",
      pageAcc: "locations_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Promotions",
      to: "/manage/promotions",
      pageAcc: "promotions_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
    {
      component: CNavItem,
      name: "Settings",
      to: "/manage/settings",
      pageAcc: "settings_page",
      icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
      badge: {
        color: "info",
      },
    },
  ],
};

export default _nav;

//   component: CNavTitle,
//   name: 'Theme',
// },
// {
//   component: CNavItem,
//   name: 'Colors',
//   to: '/theme/colors',
//   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
// },
// {
//   component: CNavItem,
//   name: 'Typography',
//   to: '/theme/typography',
//   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
// },
// {
//   component: CNavTitle,
//   name: 'Components',
// },
// {
//   component: CNavGroup,
//   name: 'Base',
//   to: '/base',
//   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Accordion',
//       to: '/base/accordion',
//     },
//     {
//       component: CNavItem,
//       name: 'Breadcrumb',
//       to: '/base/breadcrumbs',
//     },
//     {
//       component: CNavItem,
//       name: 'Cards',
//       to: '/base/cards',
//     },
//     {
//       component: CNavItem,
//       name: 'Carousel',
//       to: '/base/carousels',
//     },
//     {
//       component: CNavItem,
//       name: 'Collapse',
//       to: '/base/collapses',
//     },
//     {
//       component: CNavItem,
//       name: 'List group',
//       to: '/base/list-groups',
//     },
//     {
//       component: CNavItem,
//       name: 'Navs & Tabs',
//       to: '/base/navs',
//     },
//     {
//       component: CNavItem,
//       name: 'Pagination',
//       to: '/base/paginations',
//     },
//     {
//       component: CNavItem,
//       name: 'Placeholders',
//       to: '/base/placeholders',
//     },
//     {
//       component: CNavItem,
//       name: 'Popovers',
//       to: '/base/popovers',
//     },
//     {
//       component: CNavItem,
//       name: 'Progress',
//       to: '/base/progress',
//     },
//     {
//       component: CNavItem,
//       name: 'Spinners',
//       to: '/base/spinners',
//     },
//     {
//       component: CNavItem,
//       name: 'Tables',
//       to: '/base/tables',
//     },
//     {
//       component: CNavItem,
//       name: 'Tooltips',
//       to: '/base/tooltips',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Buttons',
//   to: '/buttons',
//   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Buttons',
//       to: '/buttons/buttons',
//     },
//     {
//       component: CNavItem,
//       name: 'Buttons groups',
//       to: '/buttons/button-groups',
//     },
//     {
//       component: CNavItem,
//       name: 'Dropdowns',
//       to: '/buttons/dropdowns',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Forms',
//   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Form Control',
//       to: '/forms/form-control',
//     },
//     {
//       component: CNavItem,
//       name: 'Select',
//       to: '/forms/select',
//     },
//     {
//       component: CNavItem,
//       name: 'Checks & Radios',
//       to: '/forms/checks-radios',
//     },
//     {
//       component: CNavItem,
//       name: 'Range',
//       to: '/forms/range',
//     },
//     {
//       component: CNavItem,
//       name: 'Input Group',
//       to: '/forms/input-group',
//     },
//     {
//       component: CNavItem,
//       name: 'Floating Labels',
//       to: '/forms/floating-labels',
//     },
//     {
//       component: CNavItem,
//       name: 'Layout',
//       to: '/forms/layout',
//     },
//     {
//       component: CNavItem,
//       name: 'Validation',
//       to: '/forms/validation',
//     },
//   ],
// },
// {
//   component: CNavItem,
//   name: 'Charts',
//   to: '/charts',
//   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
// },
// {
//   component: CNavGroup,
//   name: 'Icons',
//   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'CoreUI Free',
//       to: '/icons/coreui-icons',
//       badge: {
//         color: 'success',
//         text: 'NEW',
//       },
//     },
//     {
//       component: CNavItem,
//       name: 'CoreUI Flags',
//       to: '/icons/flags',
//     },
//     {
//       component: CNavItem,
//       name: 'CoreUI Brands',
//       to: '/icons/brands',
//     },
//   ],
// },
// {
//   component: CNavGroup,
//   name: 'Notifications',
//   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Alerts',
//       to: '/notifications/alerts',
//     },
//     {
//       component: CNavItem,
//       name: 'Badges',
//       to: '/notifications/badges',
//     },
//     {
//       component: CNavItem,
//       name: 'Modal',
//       to: '/notifications/modals',
//     },
//     {
//       component: CNavItem,
//       name: 'Toasts',
//       to: '/notifications/toasts',
//     },
//   ],
// },
// {
//   component: CNavItem,
//   name: 'Widgets',
//   to: '/widgets',
//   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//   badge: {
//     color: 'info',
//     text: 'NEW',
//   },
// },
// {
//   component: CNavTitle,
//   name: 'Extras',
// },
// {
//   component: CNavGroup,
//   name: 'Pages',
//   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Login',
//       to: '/admin-login',
//     },
//     {
//       component: CNavItem,
//       name: 'Register',
//       to: '/register',
//     },
//     {
//       component: CNavItem,
//       name: 'Error 404',
//       to: '/404',
//     },
//     {
//       component: CNavItem,
//       name: 'Error 500',
//       to: '/500',
//     },
//   ],
// },
// {
//   component: CNavItem,
//   name: 'Docs',
//   href: 'https://coreui.io/react/docs/templates/installation/',
//   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
// },
