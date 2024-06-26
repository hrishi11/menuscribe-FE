import React, { useEffect, useState } from "react";
import { CRow, CTooltip, CLink } from "@coreui/react";
import { SelectComponent } from "../../../../components/SelectComponent";
import { Select } from "antd";
import { TiDeleteOutline } from "react-icons/ti";

const DefaultItem = ({
  item,
  ditem,

  handleAddNewItem,
  handleItemDeletion,
  itemsData,
  setChangeTrigger,
  handleDeleteItemsBox,
  index,
}) => {
  const initialDefItems = [];

  itemsData.forEach((unit) => {
    if (unit.VendorMenuQuantities && unit.VendorMenuQuantities.length > 0) {
      unit.VendorMenuQuantities.forEach((data) => {
        initialDefItems.push({
          id: unit.id,
          quantity_id: data.id,
          value: `${unit.item_name}- ${data.quantity} ${data.measure}`,
          label: `${unit.item_name}- ${data.quantity} ${data.measure}`,
        });
      });
    } else {
      initialDefItems.push({
        id: unit.id,
        quantity_id: unit.id,
        value: unit.item_name,
        label: unit.item_name,
      });
    }
  });
  const [defaultValue, setDefaultValue] = useState(
    ditem.itemRelated?.map((item) =>
      item.VendorMenuItem?.VendorMenuQuantities?.length > 0
        ? `${item.VendorMenuItem?.item_name}- ${item.VendorMenuQuantity?.quantity} ${item.VendorMenuQuantity?.measure}`
        : item.VendorMenuItem.item_name
    )
  );
  const [previousId, setPreviousId] = useState(
    ditem.itemRelated?.map((item) =>
      item.quantity_id ? item.quantity_id : item.VendorDefaultItem?.id
    )
  );

  const handleChange = (value, val2) => {
    const currentIds = val2.map((obj) => obj.quantity_id);
    const idsToRemove = previousId.find((id) => !currentIds.includes(id));
    const idsToAdd = currentIds.find((id) => !previousId.includes(id));

    if (idsToRemove) {
      const findValue = ditem.itemRelated.find((d) =>
        d.quantity_id
          ? idsToRemove == d.quantity_id
          : d.menu_item_id == idsToRemove
      );

      handleItemDeletion(
        findValue.id,
        false,
        findValue.menu_date,
        findValue.quantity_id
      );
    }
    if (idsToAdd) {
      const findValue = val2.find((d) => d.quantity_id == idsToAdd);

      const itemData = itemsData.find((item) => item.id == findValue.id);

      let quantity_id = "";

      quantity_id = itemData.VendorMenuQuantities.find(
        (data) => data.id === findValue.quantity_id
      );

      handleAddNewItem(
        ditem.id,
        index,
        item.date,
        ditem?.is_default_linked,
        ditem?.isDefault ?? false,
        ditem?.menuCheck ?? false,
        false,
        findValue.id,
        quantity_id?.id || 0
      );
      setChangeTrigger((pre) => !pre);
    }
    setPreviousId(currentIds);
  };
  return (
    <>
      <div className=" w-full">
        <div className="pl-1 mt-2  flex justify-center flex-wrap-reverse ">
          <Select
            mode="multiple"
            className="w-full "
            placeholder={ditem.item_name}
            defaultValue={defaultValue}
            onChange={handleChange}
            options={initialDefItems}
          />
        </div>
      </div>
    </>
  );
};

export default DefaultItem;
