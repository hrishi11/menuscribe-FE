import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, useRoutes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import PrivateRoute from './privateRoute'
// routes config
import routes from '../routes'
// <PrivateRoute
  // path="/customer"
  // component={CustomerComponent}
  // allowedRoles={['customer']}
  // userRole={user.role}
// />
const AppContent = () => {
  const storedAuthData = JSON.parse(localStorage.getItem('menuScribe'));
  // if (!localStorage.getItem('menuScribe')) {
  //   return;
  // }
  //const isAuthenticated = authData.length || storedAuthData && storedAuthData.token;
  const routing = useRoutes(routes.filter((route) =>{
    console.log(route, 'route')
    return route.allowRole?.includes(storedAuthData.type)}));

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <BrowserRouter>
          {/* {routes.map((route, idx) => {
            return (
              route.element && (

                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<PrivateRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={route.element}

                    allowedRoles={route?.allowRole}
                    userRole={storedAuthData.type}
                  />}
                />
              )
            )
          })} */}
          {routing}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </BrowserRouter>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

// Routes.js
import React from 'react'
import Delivery from './views/customer/Delivery'
import DeliveryManager from './src/views/vendors/DeliveryManager'

import { Settings } from './views/customer/Settings'

//menuScribe
const Customers = React.lazy(() => import('./views/customer/Customers'))
const CustomersEdit = React.lazy(() => import('./views/customer/CustomerEdit'))
const AddCustomer = React.lazy(() => import('./views/customer/AddCustomer'))
const CreateMenu = React.lazy(() => import('./views/vendors/CreateMenu'))
const ViewCustomer = React.lazy(() => import('./src/views/vendors/ViewCustomer/ViewCustomer'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Packages = React.lazy(() => import('./views/vendors/Packages'))
const AddPackage = React.lazy(() => import('./views/vendors/AddPackage'))
const CustomerOrders = React.lazy(() => import('./views/vendors/CustomerOrders'))
const OrderSummary = React.lazy(() => import('./views/vendors/OrderSummary'))

// Base
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/manage/dashboard', name: 'Dashboard', element: Dashboard, type: "private" },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  { path: '/customers', name: 'Customers', element: Customers, allowRole: ['Admin', "Manager", 'admin'] },
  { path: '/customers/:id', name: 'CustomersEdit', element: CustomersEdit, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/manege/add-customer', name: 'AddCustomer', element: AddCustomer, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/packages', name: 'Packages', element: Packages, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/create-menu', name: 'CreateMenu', element: CreateMenu, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/packages', name: 'Packages', element: Packages, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/package-requests', name: 'Package Requests', element: PackageRequest, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/add-package/:id', name: 'AddPackage', element: AddPackage, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/add-package', name: 'AddPackage', element: AddPackage, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/customer-orders', name: 'CustomerOrder', element: CustomerOrders, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/order-summary', name: 'OrderSummary', element: OrderSummary, type: "private",  allowRole: ['Admin', "Manager", 'admin']  },
  { path: '/delivery-manager', name: 'Delivery Manager', element: DeliveryManager, type: "private" ,  allowRole: ['Admin', "Manager", 'admin', "Rider"]},
  { path: '/delivery', name: 'Delivery', element: Delivery, type: "private" ,  allowRole: ['Admin', "Manager", 'admin', "Rider"]},
  { path: '/settings', name: 'Settings', element: Settings, type: "private" , allowRole: ['Admin', "Manager", 'admin'] },

]
// const adminRoutes = ['/dashboard','/customers', '/packages', '/create-menu', '/customer-orders', '/order-summary', '/delivery-manager','/delivery', '/settings']

export default routes
// Protected Routes
// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthData } from './actions/authReducer/AuthSlice';
  const adminRoutes = ['/manage/dashboard','/customers', '/packages', '/create-menu', '/customer-orders', '/order-summary','/delivery-manager', '/delivery', '/settings']
const ProtectedRoute = ({ element }) => {
  const authData = useSelector(selectAuthData);
  const storedAuthData = JSON.parse(localStorage.getItem('menuScribe'));
  // if (!localStorage.getItem('menuScribe')) {
  //   return;
  // }
  const isAuthenticated = authData.length || storedAuthData && storedAuthData.token;
  const handleRoute = (auth) => {
    console.log(element, auth, "Auth")
    if(auth.type=== 'admin') {

    }
    return true;
  }
  console.log("authdata", authData)
  return isAuthenticated && handleRoute(storedAuthData) ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
// Private Route
import { Route, Navigate } from 'react-router-dom';
import PackageRequest from './src/views/vendors/PackageRequest'

const PrivateRoute = ({ component: Component, allowedRoles, userRole, ...rest }) => <Route
    {...rest}
    render={(props) =>
      allowedRoles.includes(userRole) ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />

export default PrivateRoute;
