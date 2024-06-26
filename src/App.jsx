import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CustomerProtectedRoute from "./CustomerProtectedRoute";
import "./scss/style.scss";
import ResetForgetPassword from "./views/pages/forgetPassword/ResetForgetPassword";
import CustomerProfile from "./views/customer/CustomerProfile/CustomerProfile";
import ResturantDetails from "./views/pages/ResturantDetails/ResturantDetails";
import ResturantOrderConformation from "./views/pages/ResturantOrderConformation/ResturantOrderConformation";
import { NextUIProvider } from "@nextui-org/react";
import SelectPackage from "./views/customer/SelectPackage/SelectPackage";
import ManagerSignup from "./views/vendors/Manager Signup/ManagerSignup";
import DailyMenu from "./views/pages/DailyMenu/DailyMenu";
import CustomerSignup from "./views/customer/Customer Signup/CustomerSignup";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const AdminLogin = React.lazy(() => import("./views/pages/login/Login"));
const ResetPassword = React.lazy(() =>
  import("./views/pages/login/ResetPassword")
);
const ForgetPassword = React.lazy(() =>
  import("./views/pages/forgetPassword/ForgetPassword")
);
const CustomerLogin = React.lazy(() =>
  import("./views/customer/CustomerLogin")
);
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const AddPackage = React.lazy(() => import("./views/customer/AddPackage"));

const CustomerSetting = React.lazy(() =>
  import("./views/customer/CustomerSetting")
);
const CustomerOnboard = React.lazy(() =>
  import("./views/customer/CustomerOnboard")
);
const CustomerPinVerify = React.lazy(() =>
  import("./views/customer/CustomerPinVerify")
);
const OrderConfirmation = React.lazy(() =>
  import("./views/customer/OrderConfirmation")
);
const PaymentConfirmation = React.lazy(() =>
  import("./views/customer/PaymentConfirmation")
);
const DashboardCustomer = React.lazy(() =>
  import("./views/customer/DashboardCustomer")
);

class App extends Component {
  render() {
    return (
      <NextUIProvider>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={<CustomerLogin />}
              />
              <Route
                exact
                path="/vendor-signup"
                name="Manager Signup"
                element={<ManagerSignup />}
              />
              <Route
                exact
                path="/signup"
                name="Customer Signup"
                element={<CustomerSignup />}
              />
              <Route
                exact
                path="/forgot-password"
                name="Forget Password"
                element={<ForgetPassword />}
              />
              <Route
                exact
                path={`/reset/forgotpassword/:role/:code`}
                name="Reset Forget Password"
                element={<ResetForgetPassword />}
              />
              <Route
                exact
                path="/admin-login"
                name="Login Page"
                element={<AdminLogin />}
              />
              <Route
                exact
                path="/reset-password"
                name="Login Page"
                element={<ResetPassword />}
              />
              <Route
                path="/customer-onboard/:id"
                element={<CustomerOnboard />}
              />
              <Route
                path="/:resturantPublicUrl"
                element={<ResturantDetails />}
              />
              <Route
                path="/taj-mahal/order-confirmation"
                element={<ResturantOrderConformation />}
              />
              <Route
                path="/:resturantPublicUrl/daily-menu"
                element={<DailyMenu />}
              />

              <Route
                path="/customer-pin-verify/:id"
                element={<CustomerPinVerify />}
              />
              {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}

              <Route
                path="/customer-setting"
                element={
                  <ProtectedRoute
                    path="/customer-setting"
                    element={<CustomerSetting />}
                  />
                }
              />
              <Route
                path="/add-package"
                element={
                  <CustomerProtectedRoute
                    path="/add-package"
                    element={<AddPackage />}
                  />
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <CustomerProtectedRoute element={<OrderConfirmation />} />
                }
              />
              <Route
                path="/payment-confirmation"
                element={
                  <CustomerProtectedRoute element={<PaymentConfirmation />} />
                }
              />
              <Route
                path="/"
                element={
                  <CustomerProtectedRoute element={<DashboardCustomer />} />
                }
              />
              <Route
                path="/profile"
                element={
                  <CustomerProtectedRoute element={<CustomerProfile />} />
                }
              />
              <Route
                path="/select-package"
                element={<CustomerProtectedRoute element={<SelectPackage />} />}
              />

              <Route
                path="*"
                name="Home"
                element={<ProtectedRoute element={<DefaultLayout />} />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NextUIProvider>
    );
  }
}

export default App;
