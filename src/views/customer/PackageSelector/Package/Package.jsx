import { CButton } from "@coreui/react";
import "./Package.css";
import { Chip } from "@nextui-org/react";
const Package = ({ popup, setPopup, pack, onOpen, setFormData }) => {
  const {
    image,
    pickup,
    delivery,
    VendorPackageDefaultItems,
    VendorPackagePrices,
  } = pack;
  return (
    <div className="selectPackageContainer">
      {/* --------Image--- */}
      <div className="SelectPackageimageContainer relative">
        <img
          src={
            image
              ? image
              : "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"
          }
          alt=""
          className="h-full w-full object-cover"
        />

        <span className="absolute bottom-2 right-2 bg-yellow-500  font-medium p-2 rounded-md">
          $
          {VendorPackagePrices.find((item) => item.method === "delivery").cost *
            22}
          - 22 Meals
        </span>
      </div>
      {/* --------Pickup & Delivery---- */}
      <div>
        <p className="m-0 py-20x text-center font-semibold px-10x">
          {VendorPackageDefaultItems.map(
            (item, i) =>
              `${item.item_name} - ${item.quantity} ${
                i !== VendorPackageDefaultItems.length - 1 ? "+" : ""
              } `
          )}
        </p>
        <div className="select-delivery-pickup justify-center">
          {pickup === 1 ? <span className="pickup">PICKUP</span> : ""}
          {delivery == 1 ? <span className="delivery">DELIVERY</span> : ""}
        </div>
      </div>

      <CButton
        color="secondary"
        variant="ghost"
        style={{
          backgroundColor: popup.package?.id == pack?.id ? "green" : "#e0e0e0",
          color: popup.package?.id == pack?.id ? "white" : "",
        }}
        className={`SelectPackageButton ${
          popup.package?.id == pack?.id ? "bg-green-500" : "bg-[#e0e0e0]"
        }`}
        onClick={() => {
          setPopup({ show: true, package: pack });
          setFormData({});
          onOpen();
        }}
      >
        {popup.package?.id == pack?.id ? "Selected" : "Select"}
      </CButton>
    </div>
  );
};

export default Package;
