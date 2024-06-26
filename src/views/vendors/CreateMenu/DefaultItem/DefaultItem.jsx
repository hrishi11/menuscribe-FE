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
      item.VendorMenuItem.VendorMenuQuantities.length > 0
        ? `${item.VendorMenuItem.item_name}- ${item.VendorMenuQuantity.quantity} ${item.VendorMenuQuantity.measure}`
        : item.VendorMenuItem.item_name
    )
  );
  const [previousId, setPreviousId] = useState(
    ditem.itemRelated?.map((item) =>
      item.quantity_id ? item.quantity_id : item.VendorMenuItem.id
    )
  );

  useEffect(() => {
    // console.log("ditem", ditem);
  }, []);

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
      setChangeTrigger(true);
    }
    setPreviousId(currentIds);
  };
  return (
    <>
      <div className=" w-full">
        <CRow className=" w-full">
          {/* <div className="d-flex justify-content-between">
            <SelectComponent
              onChangeHandler={handleDefaultItemUpdate}
              options={getFilteredOptions(ditem, item)}
              defaultValue={{
                label: ditem?.VendorMenuItem
                  ? ditem?.VendorMenuItem.item_name
                  : ditem.item_name,
                value: ditem?.VendorMenuItem?.id || "",
              }}
              val={{
                label: ditem?.VendorMenuItem
                  ? ditem?.VendorMenuItem.item_name
                  : ditem.item_name,
                value: ditem?.VendorMenuItem?.id || "",
              }}
            />
            <SelectComponent
              onChangeHandler={handleDefaultItemQuantityUpdate}
              options={
                !ditem?.isDefault && ditem?.VendorMenuItem?.VendorMenuQuantities
                  ? ditem?.VendorMenuItem?.VendorMenuQuantities?.map((i) => {
                      return {
                        id: i.id,
                        value: i.id,
                        label: `${i.measure} - ${i.quantity}`,
                        menu_item_id: ditem.id,
                      };
                    }).filter((i) => {
                      return i.id != ditem?.VendorMenuQuantity?.id;
                    })
                  : []
              }
              className="mb-2 p-0 me-1"
              placeholder=""
              defaultValue={
                ditem?.VendorMenuQuantity
                  ? {
                      label: `${ditem?.VendorMenuQuantity?.measure} - ${ditem?.VendorMenuQuantity?.quantity}`,
                      value: ditem?.VendorMenuQuantity?.id,
                    }
                  : {
                      label: "0",
                      value: "",
                    }
              }
              val={
                ditem?.VendorMenuQuantity
                  ? {
                      label: `${ditem?.VendorMenuQuantity?.measure} - ${ditem?.VendorMenuQuantity?.quantity}`,
                      value: ditem?.VendorMenuQuantity?.id,
                    }
                  : {
                      label: "0",
                      value: "",
                    }
              }
            /> */}
          {/* <CFormInput
                                                    name="default_item"
                                                    className="simple-input mb-2 p-0 me-1"
                                                    placeholder=""
                                                    value={
                                                      ditem?.VendorMenuItem
                                                        ? `${ditem?.VendorMenuItem?.units} - ${ditem?.VendorMenuItem?.quantity}`
                                                        : "0"
                                                    }
                                                  /> */}
          {/* {!ditem.itemRelated && ( */}
          {/* <p
              className="font-12 text-info cursor-pointer ms-1"
              onClick={() => {
                setVisible(true);

                // handleAddNewItem(
                //   ditem.id,
                //   index,
                //   item.date,
                //   ditem?.is_default_linked,
                //   ditem?.isDefault ?? false,
                //   true
                // );
              }}
            >
              Add Or
            </p>
            <p
              className="font-12 text-info cursor-pointer ms-1"
              onClick={() => {
                return handleItemDeletion(ditem.id, ditem.isDefault, item.date);
              }}
            >
              <CTooltip content="Delete">
                <CLink>❌</CLink>
              </CTooltip>
            </p> */}
          {/* )} */}
          {/* </div> */}
        </CRow>
      </div>
      <div className=" w-full">
        {/* {(visible || ditem.itemRelated.length != 0) && ( */}
        <div className="pl-1 mt-2  flex justify-center flex-wrap-reverse ">
          <Select
            mode="multiple"
            className="w-full "
            placeholder={ditem.item_name}
            defaultValue={defaultValue}
            onChange={handleChange}
            options={initialDefItems}
          />
          {ditem.menuCheck && (
            <span className=" flex justify-end w-full gap-1">
              <TiDeleteOutline
                className="text-[25px] text-red-500"
                onClick={() => handleDeleteItemsBox(ditem.id)}
              />
            </span>
          )}
          {/* {ditem.itemRelated.length == 0 && (
              <p className="font-12 text-info cursor-pointer ms-1">
                <CTooltip content="Delete">
                  <CLink>❌</CLink>
                </CTooltip>
              </p>
            )} */}
        </div>
        {/* )} */}
        {/* {ditem.itemRelated &&
          ditem.itemRelated.length > 0 &&
          ditem.itemRelated.map((relatedItem, index) => {
            return (
              <CRow key={index}>
                <div className="me-1 d-flex justify-content-center">
                  <p className="m-1 font-12 text-danger">OR</p>
                </div>
                <div className="d-flex justify-content-between mx-1">
                  <SelectComponent
                    onChangeHandler={handleDefaultItemUpdate}
                    // options={{
                    //   ...getFilteredOptions(ditem, item),

                    // }}
                    options={getFilteredOptions(ditem, item, {
                      parentId: relatedItem.id, //default item id
                      is_default: false,
                      is_default_linked: true,
                    })}
                    defaultValue={{
                      label: relatedItem?.VendorMenuItem
                        ? relatedItem?.VendorMenuItem.item_name
                        : relatedItem.menu_item_name,
                      value: relatedItem.menu_item_id,
                    }}
                    val={{
                      label: relatedItem?.VendorMenuItem
                        ? relatedItem?.VendorMenuItem.item_name
                        : relatedItem.menu_item_name,
                      value: relatedItem.menu_item_id || "",
                    }}
                  />
                  <SelectComponent
                    onChangeHandler={handleDefaultItemQuantityUpdate}
                    options={
                      relatedItem?.VendorMenuItem?.VendorMenuQuantities
                        ? relatedItem?.VendorMenuItem?.VendorMenuQuantities?.map(
                            (i) => {
                              return {
                                id: i.id,
                                value: i.id,
                                label: `${i.measure} - ${i.quantity}`,
                                menu_item_id: relatedItem.id,
                              };
                            }
                          ).filter((i) => {
                            return i.id != relatedItem?.VendorMenuQuantity?.id;
                          })
                        : []
                    }
                    className="simple-input mb-2 p-0 me-1"
                    placeholder=""
                    defaultValue={
                      relatedItem?.VendorMenuQuantity
                        ? {
                            label: `${relatedItem?.VendorMenuQuantity?.measure} - ${relatedItem?.VendorMenuQuantity?.quantity}`,
                            value: relatedItem?.VendorMenuQuantity?.id,
                          }
                        : {
                            label: "0",
                            value: "",
                          }
                    }
                    val={
                      relatedItem?.VendorMenuQuantity
                        ? {
                            label: `${relatedItem?.VendorMenuQuantity?.measure} - ${relatedItem?.VendorMenuQuantity?.quantity}`,
                            value: relatedItem?.VendorMenuQuantity?.id,
                          }
                        : {
                            label: "0",
                            value: "",
                          }
                    }
                  /> */}
        {/* <CFormInput
                                                            name="default_item"
                                                            className="simple-input mb-2 p-0 me-1"
                                                            placeholder=""
                                                            value={
                                                              relatedItem.VendorMenuItem
                                                                ? `${relatedItem.VendorMenuItem?.units} - ${relatedItem.VendorMenuItem?.quantity}`
                                                                : "0"
                                                            }
                                                          />{" "}*/}

        {/* <p
                    className="font-12 text-info cursor-pointer ms-1"
                    onClick={() =>
                      handleItemDeletion(
                        relatedItem.id,
                        false,
                        relatedItem.menu_date
                      )
                    }
                  >
                    <CTooltip content="Delete">
                      <CLink>❌</CLink>
                    </CTooltip>
                  </p>
                </div>
              </CRow>
            );
          })} */}
      </div>
    </>
  );
};

export default DefaultItem;
