import { CButton } from "@coreui/react";
import "./Package.css";
const Package = ({ popup, setPopup, pack }) => {
  const { image, pickup, delivery, VendorPackageDefaultItems } = pack;
  return (
    <div className="selectPackageContainer">
      {/* --------Image--- */}
      <div className="SelectPackageimageContainer">
        <img
          src={
            image
              ? image
              : "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"
          }
          alt=""
          className="h-full w-full object-cover"
        />
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
        className="SelectPackageButton"
        onClick={() => setPopup({ show: true, packageId: pack.id })}
      >
        Select
      </CButton>
    </div>
  );
};

export default Package;
