import { CCol, CRow } from "@coreui/react/dist";
import React, { useEffect, useRef, useState } from "react";
import DefaultItem from "./DefaultItems/DefaultItems";
import { useDispatch } from "react-redux";
import {
  addDefaultItemToDay,
  deleteVendorPackageItem,
  getAllPackagesDefaultItems,
  getItem,
  getItems,
  getMultipleMenuItems,
  getPackages,
} from "../../../actions/vendorReducers/VendorActions";
import { formatDate } from "../../../utils/Helper";
import { DisplayPackages } from "./DisplayPackages/DisplayPackages";

export default function MultiMenuEditor() {
  const [defaultItems, setDefaultItems] = useState();
  const [itemsData, setItemsData] = useState([]);
  const [packageItemsData, setPackageItemsData] = useState([]);
  const [allPackagesItems, setAllPackagesItems] = useState([]);
  const [changeTriger, setChangeTrigger] = useState(false);
  const dispatch = useDispatch();
  const scrollRef = useRef([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (changeTriger) {
      handleNewItemAdd();
      fetchData();
      setChangeTrigger(false);
    }
  }, [changeTriger]);

  const fetchData = async () => {
    try {
      setAllPackagesItems([]);
      const [dataItem, defPackageItems, packages] = await Promise.all([
        dispatch(getItems()),
        dispatch(getAllPackagesDefaultItems()),
        dispatch(getPackages()),
      ]);

      let pkg = [];

      if (packages?.data?.length > 0) {
        const packagePromises = packages.data.map(async (item) => {
          console.log(item.package_name);
          const data = await dispatch(getMultipleMenuItems(item.id));
          pkg.push({ packageName: item.package_name, data: data.data });
        });

        await Promise.all(packagePromises);
      }
      scrollRef.current = pkg.map(
        (_, i) => scrollRef.current[i] ?? React.createRef()
      );

      setAllPackagesItems(pkg);
      setDefaultItems(defPackageItems.data);
      setItemsData(dataItem.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemDeletion = async (id, is_default, date, quantity_id) => {
    const response = await dispatch(
      deleteVendorPackageItem({ id, is_default, date, quantity_id })
    );
    fetchData();

    // getPackageDetails(selectedPackage);
  };
  const handleAddNewItem = (
    id,
    sort,
    date,
    is_default_linked,
    isDefault,
    menuCheck,
    visible,
    item_selected = "",
    quantity_id = ""
  ) => {
    setPackageItemsData((prevData) => ({
      ...prevData,
      adOrid: id,
      sort: sort,
      date: date,
      is_default_linked: is_default_linked ?? true,
      isDefault: isDefault,
      menuCheck: menuCheck,
      isVisible: visible,
      item_selected: item_selected,
      quantity_id: quantity_id,
    }));
    // setVisible(true);
  };

  const handleNewItemAdd = async () => {
    const response = await dispatch(addDefaultItemToDay(packageItemsData));

    getPackageDetails(selectedPackage);
    setChangeTrigger(false);
    await fetchData();
  };
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };
  useEffect(() => {
    const handleScroll = (sourceIndex) => {
      return () => {
        const source = scrollRef.current[sourceIndex].current;
        if (source) {
          scrollRef.current.forEach((ref, index) => {
            allPackagesItems;
            if (index !== sourceIndex && ref.current) {
              ref.current.scrollTop = source.scrollTop;
              ref.current.scrollLeft = source.scrollLeft;
            }
          });
        }
      };
    };

    const eventListeners = [];

    // Add event listeners to each div
    scrollRef.current.forEach((ref, index) => {
      const div = ref.current;
      if (div) {
        const listener = handleScroll(index);
        div.addEventListener("scroll", listener);
        eventListeners.push({ ref, listener });
      }
    });

    // Cleanup event listeners on unmount
    return () => {
      eventListeners.forEach(({ ref, listener }) => {
        if (ref.current) {
          ref.current.removeEventListener("scroll", listener);
        }
      });
    };
  }, [allPackagesItems]);
  return (
    <div className="w-full ">
      <div className="bg-white p-2 flex flex-col items-center">
        <h4>Edit Multiple Menu</h4>
        <div className="flex lg:flex-nowrap md:flex-wrap   w-full overflow-scroll">
          {defaultItems &&
            defaultItems.length > 0 &&
            defaultItems.map((item, index) => (
              <div className=" w-[200px] px-0">
                <div className="border mx-1 my-3 menu-box">
                  <CRow>
                    <h4 className="text-center">{item.day}</h4>
                    <h5 className="text-center">{formatDate(item.date)}</h5>
                    <p className="text-center">Add/Edit food items below</p>
                  </CRow>
                  <CRow>
                    <CCol className="">
                      <div className="d-flex justify-content-between">
                        <div className="me-1 w-full">
                          {item.defaultItem &&
                            item.defaultItem.map((ditem, index) => (
                              <DefaultItem
                                item={item}
                                index={index}
                                ditem={ditem}
                                itemsData={itemsData}
                                handleItemDeletion={handleItemDeletion}
                                handleAddNewItem={handleAddNewItem}
                                setChangeTrigger={setChangeTrigger}
                                // handleDeleteItemsBox={handleAddNewItem}
                              />
                            ))}
                        </div>
                      </div>
                      <div>
                        <p
                          onClick={() => {
                            setDefaultItems((prev) => {
                              return prev.map((item, idx) => {
                                if (idx === index) {
                                  return {
                                    ...item,
                                    defaultItem: [
                                      ...item.defaultItem,
                                      {
                                        id: generateRandomString(10),
                                        itemRelated: [],
                                      },
                                    ],
                                  };
                                }
                                return item;
                              });
                            });
                          }}
                          className="cursor-pointer fw-bold h6 text-primary"
                        >
                          Add Item
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-white flex flex-col p-2 items-center w-full ">
        <h4 className="font-semibold w-full flex justify-center">
          All Packages Menu
        </h4>
        {allPackagesItems.map((allItems, index) => (
          <DisplayPackages
            scrollRef={scrollRef.current[index]}
            allItems={allItems}
          />
        ))}
      </div>
    </div>
  );
}
