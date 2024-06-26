import { CListGroupItem, CFormCheck } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setOrderItemFromCustomerDashboard } from "../../actions/customerReducer/CustomerActions";

const OrderItem = ({ item, order }) => {
  const [check, setCheck] = useState({});
  const { VendorPackageMenuItems, id, CustomerOrderItem } = item;
  const { order_date } = order;
  const uName = id + "_" + order_date + uuid();
  const dispatch = useDispatch();

  useEffect(() => {
    let initialState = {};
    if (!VendorPackageMenuItems.length > 0) {
      initialState = {
        [item.item_name]: true,
      };
    } else {
      VendorPackageMenuItems.forEach((menuI) => {
        initialState[menuI?.menu_item_name || ""] = false;
      });
    }
    if (CustomerOrderItem) {
      const selectedItem = VendorPackageMenuItems.find(
        (it) => it.id === CustomerOrderItem.item_id
      );
      initialState[selectedItem?.menu_item_name] = true;
    }
    setCheck(initialState);
  }, []);

  const handleCheckChange = async (e) => {
    try {
      const clickedItem = VendorPackageMenuItems.find(
        (it) => it.id == e.target.id
      );
      const reqObj = {
        order_id: order.id,
        item_id: clickedItem.id,
        menu_default_group_id: item.id,
      };

      const res = await dispatch(setOrderItemFromCustomerDashboard(reqObj));

      const newState = {};
      VendorPackageMenuItems.forEach((menuI) => {
        newState[menuI.menu_item_name] = false;
      });
      newState[clickedItem.menu_item_name] = true;
      setCheck(newState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CListGroupItem>
      {!VendorPackageMenuItems.length > 0 && (
        // <CFormCheck
        //   type="radio"
        //   name={uName}
        //   id={item.item_name}
        //   label={item.item_name}
        //   checked={check[item.item_name]}
        //   onChange={handleCheckChange}
        // />
        <span> {item.item_name}</span>
      )}

      {VendorPackageMenuItems.length > 1 ? (
        VendorPackageMenuItems.map((menuI) => (
          <CFormCheck
            key={menuI.id}
            type="radio"
            name={uName}
            id={String(menuI.id)}
            label={menuI.menu_item_name || ""}
            checked={check[menuI.menu_item_name]}
            onChange={handleCheckChange}
          />
        ))
      ) : VendorPackageMenuItems.length === 0 ? (
        ""
      ) : (
        <span> {VendorPackageMenuItems[0].menu_item_name}</span>
      )}
    </CListGroupItem>
  );
};

export default OrderItem;
