import React from "react";
import Delivery from "./views/customer/Delivery";
import { Settings } from "./views/vendors/Settings/Settings";
import Pickups from "./views/vendors/Pickups";
import QrReader from "./views/vendors/QrScanner/QrReader";
import DeliveryManager from "./views/vendors/DeliveryManager";
import TeamSettings from "./views/vendors/TeamSettings/TeamSettings";
import TeamEmployee from "./views/vendors/TeamEmployee/TeamEmployee";
import OrderManager from "./views/vendors/OrderManager/OrderManager";
import MyTeam from "./views/vendors/MyTeam";
import AllSubscription from "./views/vendors/AllSubscription";
import Temp from "./views/vendors/Temp";
import Location from "./views/vendors/Location";
import CreatePromotions from "./views/vendors/CreatePromotions";
import GetStarted from "./views/vendors/GetStarted/GetStarted";
import MultiMenuEditor from "./views/vendors/MultiMenuEditor/MultiMenuEditor";
import PackageDetail from "./views/vendors/PackageDetail/PackageDetail";
import UploadUsers from "./views/vendors/UploadUsers/UploadUsers";
import WebsiteSettings from "./views/vendors/WebsiteSetting/WebsiteSetting";
import Payments from "./views/vendors/Payments/Payments";
import Billing from "./views/vendors/Billing/Billing";
// import ViewCustomer from "./views/vendors/ViewCustomer";

//menuScribe
const Customers = React.lazy(() => import("./views/customer/Customers"));
const CustomersEdit = React.lazy(() => import("./views/customer/CustomerEdit"));
const AddCustomer = React.lazy(() => import("./views/customer/AddCustomer"));
const CreateMenu = React.lazy(() =>
  import("./views/vendors/CreateMenu/CreateMenu")
);
const ViewCustomer = React.lazy(() =>
  import("./views/vendors/ViewCustomer/ViewCustomer")
);
const Holidays = React.lazy(() => import("./views/vendors/Holidays"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Packages = React.lazy(() => import("./views/vendors/Packages/Packages"));
const PackageRequest = React.lazy(() =>
  import("./views/vendors/PackageRequest")
);
const AddPackage = React.lazy(() => import("./views/vendors/AddPackage"));
const CustomerOrders = React.lazy(() =>
  import("./views/vendors/CustomerOrders")
);
const OrderSummary = React.lazy(() => import("./views/vendors/OrderSummary"));

// Base
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Paginations")
);
const Placeholders = React.lazy(() =>
  import("./views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(() =>
  import("./views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(() =>
  import("./views/forms/validation/Validation")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const unknownRoutes = [
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    element: ButtonGroups,
  },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    element: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    element: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    element: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },
];

const routes = [
  {
    path: "/manage/dashboard",
    name: "Dashboard",
    element: Dashboard,
    pageAcc: "homepage",
    type: "private",
  },
  {
    path: "/manage/customers",
    name: "Customers",
    element: Customers,
    pageAcc: "customers_page",
    allowRole: ["Admin", "Manager", "admin"],
  },

  {
    path: "/manage/customers/:id",
    name: "CustomersEdit",
    element: CustomersEdit,
    pageAcc: "customers_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/add-customer",
    name: "AddCustomer",
    element: AddCustomer,
    pageAcc: "add_customer_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/view-customers/:id",
    name: "AddCustomer",
    element: ViewCustomer,
    pageAcc: "add_customer_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/package/detail/:id",
    name: "Package Detail",
    element: PackageDetail,
    pageAcc: "packages_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/holidays",
    name: "Holidays",
    element: Holidays,
    pageAcc: "add_customer_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },

  {
    path: "/manage/create-menu",
    name: "CreateMenu",
    element: CreateMenu,
    pageAcc: "menu_page",
    // element: Temp,
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/payments",
    name: "Payments",
    element: Payments,
    pageAcc: "menu_page",
    // element: Temp,
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/billing",
    name: "Billing",
    element: Billing,
    pageAcc: "menu_page",
    // element: Temp,
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/multi-menu-editor",
    name: "Multiple Menu Editor",
    element: MultiMenuEditor,
    pageAcc: "menu_page",
    // element: Temp,
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/get-started",
    name: "Get started",
    element: GetStarted,
    pageAcc: "menu_page",
    // element: Temp,
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },

  {
    path: "/manage/packages",
    name: "Packages",
    element: Packages,
    pageAcc: "packages_page",
    type: "private",
    // allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/pacakge-requests",
    name: "Package Requests",
    element: PackageRequest,
    pageAcc: "package_requests_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/website-settings",
    name: "Website Setting",
    element: WebsiteSettings,
    pageAcc: "package_requests_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/upload-users",
    name: "Upload Users",
    element: UploadUsers,
    pageAcc: "package_requests_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/pickups",
    name: "Pickups",
    element: Pickups,
    pageAcc: "pickups_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/add-package",
    name: "AddPackage",
    element: AddPackage,
    pageAcc: "add_package_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },

  {
    path: "/manage/add-package/:id",
    name: "AddPackage",
    element: AddPackage,
    pageAcc: "add_package_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/customer-orders",
    name: "CustomerOrder",
    element: CustomerOrders,
    pageAcc: "customer_orders_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/order-summary",
    name: "OrderSummary",
    element: OrderSummary,
    pageAcc: "order_summary_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/order-manager",
    name: "Order Manager",
    element: OrderManager,
    pageAcc: "order_manager_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/delivery",
    name: "Delivery",
    element: Delivery,
    pageAcc: "delivery_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin", "Rider"],
  },
  {
    path: "/manage/delivery-manager",
    name: "Delivery Manager",
    element: DeliveryManager,
    pageAcc: "delivery_management_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin", "Rider"],
  },
  // ----------No column found
  {
    path: "/manage/qr-scanner",
    name: "Qr Scanner",
    element: QrReader,
    pageAcc: "customers_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin", "Rider"],
  },
  {
    path: "/manage/my-team",
    name: "My Team",
    element: MyTeam,
    pageAcc: "team_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin", "Rider"],
  },
  {
    path: "/manage/all-subscription",
    name: "All Subscription",
    element: AllSubscription,
    pageAcc: "all_subscriptions_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin", "Rider"],
  },
  {
    path: "/manage/team",
    name: "Team Settings",
    element: TeamSettings,
    pageAcc: "team_settings_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/team/:id",
    name: "Team Settings",
    element: TeamEmployee,
    pageAcc: "team_settings_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/settings",
    name: "Settings",
    element: Settings,
    pageAcc: "settings_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/locations",
    name: "Location",
    element: Location,
    pageAcc: "locations_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
  {
    path: "/manage/promotions",
    name: "Promotions",
    element: CreatePromotions,
    pageAcc: "promotions_page",
    type: "private",
    allowRole: ["Admin", "Manager", "admin"],
  },
];

export default routes;
