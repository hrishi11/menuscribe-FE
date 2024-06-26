import { CFormCheck, CFormLabel } from "@coreui/react";
import "./SelectItem.css";
import VegIcon from "../../../../assets/icons/veg.png";
import NonVegIcon from "../../../../assets/icons/non-veg.png";

const SelectItem = ({ dItem, item_data, orderItems, setOrderItems }) => {
  const { item_name } = dItem;
  const selectedOrder = orderItems.find((item) => item.name === item_name);
  const handleMenuItemChange = (defaultItemName, menuItemId) => {
    console.log({ defaultItemName, menuItemId });
    setOrderItems(
      orderItems.map((item) =>
        item.name === defaultItemName
          ? { ...item, VendorpackageMenuItemsId: menuItemId }
          : item
      )
    );
  };
  return (
    <div className="flex items-center gap-5x">
      <CFormCheck
        type="radio"
        name={item_name}
        id={item_data ? item_data?.VendorMenuItem?.item_name : item_name}
        checked={
          item_data
            ? item_data.id === selectedOrder?.VendorpackageMenuItemsId
            : true
        }
        onChange={
          item_data
            ? () => handleMenuItemChange(item_name, item_data.id)
            : () => {}
        }
        className="m-0"
        // label="Masala Basmati Rice (Full)"
      />
      <CFormLabel
        htmlFor={item_data ? item_data?.VendorMenuItem?.item_name : item_name}
        className="m-0 flex items-center"
      >
        {item_data?.VendorMenuItem?.veg === 1 && (
          <img
            src={VegIcon}
            alt="Veg icon"
            className="select-package vegetarian-icon"
          />
        )}
        {item_data?.VendorMenuItem?.veg === 0 && (
          <img
            src={NonVegIcon}
            alt="Veg icon"
            className="select-package vegetarian-icon"
          />
        )}
        {item_data ? item_data?.VendorMenuItem?.item_name : item_name}
      </CFormLabel>
    </div>
  );
};

export default SelectItem;
