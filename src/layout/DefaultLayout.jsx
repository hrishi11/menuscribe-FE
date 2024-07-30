import { useNavigate } from "react-router-dom";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { ToastContainer } from "react-toastify";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const vendorData = JSON.parse(localStorage.getItem("menuScribe"));
  const VendorRouters = ["Owner", "Manager", "Rider"];
  console.log(vendorData.type, VendorRouters.includes(vendorData.type));
  if (!VendorRouters.includes(vendorData.type)) {
    navigate("/");
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-0">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DefaultLayout;
