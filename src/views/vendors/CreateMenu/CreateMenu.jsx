import { createRef, useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTooltip,
} from "@coreui/react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  addItem,
  getItems,
  getItem,
  updateItem,
  getPackages,
  getDefaultItems,
  getPackage,
  addItemToDay,
  updateVendorPackageItem,
  deleteVendorPackageItem,
  getCategories,
  updateVendorPackageItemQuantity,
  deleteMenuItemBox,
  getVendorSettings,
  deleteVendorMenuItem,
} from "../../../actions/vendorReducers/VendorActions";
import {
  arrayBufferToBase64,
  formatDate,
  getNextDatesOfWeek,
  scrollToTop,
} from "../../../utils/Helper";
import { Toast } from "../../../components/app/Toast";
import { SelectComponent } from "../../../components/SelectComponent";
import { handleUserRole } from "../../../utils/Helper";
import DefaultItem from "./DefaultItem/DefaultItem";
import { FaRegStopCircle } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../constants";
import greenIcon from "../../../assets/veg-icon-small.png";
import redIcon from "../../../assets/nonveg-icon-small.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LimitModal from "../../../components/Modals/LimitModal";
import DeleteModal from "../../../components/Modals/DeleteModal";

const CreateMenu = () => {
  const initialFormData = {
    vendor_id: "",
    item_name: "",
    quantity: "",
    units: "",
    item_category: "",
    veg: "",
    image: "",
    created_date: "",
    table_description: "",
    item_quantity: [[]],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [itemsData, setItemsData] = useState();
  const [packages, setPackages] = useState();
  const [validated, setValidated] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const fileInputRef = createRef();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState("");
  const [defaultItems, setDefaultItems] = useState();
  const [menuItems, setMenuItems] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [packageItemsData, setPackageItemsData] = useState();
  const [visible, setVisible] = useState(false);
  const [itemValidated, setItemValidated] = useState(false);
  const [categories, setCategories] = useState();
  const [changeTriger, setChangeTrigger] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const focusInput = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletedItem, setDeletedItem] = useState({
    item_name: "",
  });
  const {
    isOpen: isSecondOpen,
    onOpen: onSecondOpen,
    onOpenChange: onSecondOpenChange,
  } = useDisclosure();
  const {
    isOpen: isThirdOpen,
    onOpen: onThirdOpen,
    onOpenChange: onThirdOpenChange,
  } = useDisclosure();

  const [limit, setLimit] = useState();

  useEffect(() => {
    handleUserRole(["Owner", "Manager"]);
  }, []);

  const fetchData = async () => {
    try {
      const [itemResponse, packagesResponse, categoriesResponse] =
        await Promise.all([
          dispatch(getItems()),
          dispatch(getPackages()),
          dispatch(getCategories()),
        ]);
      setItemsData(itemResponse.data);
      setPackages(packagesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    uploadImages();
  }, [uploadedImage]);

  const uploadImages = async () => {
    try {
      // const response= await dispatch(uploadImage(imageFile))
      const resp = await axios.post(`${API_URL}/upload-file`, uploadedImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("resp", resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      setUploadedImage(formData);
      setImageFile(file);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(formData.item_quantity.length > 0)) {
      Toast({ message: "You need to add atleast 1 size", type: "error" });
      return;
    }
    if (!formData.id) {
      const checkLimit = await dispatch(getVendorSettings());

      if (
        (checkLimit.data.no_of_menu_items ||
          checkLimit.data.no_of_menu_items == 0) &&
        itemsData.length >= checkLimit.data.no_of_menu_items
      ) {
        setLimit(checkLimit.data.no_of_menu_items);

        onSecondOpen();
        // setIsOpen2(true);
        return;
      }
    }
    const form = event.currentTarget;
    if (form?.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      let response;
      // --------Update Item functionality--------
      if (formData.id) {
        response = await dispatch(updateItem(imageFile, formData));
        if (response && response.success) {
          Toast({ message: "Item updated successfully.", type: "success" });
          setFormData(initialFormData);
          setImageSrc(null);
        }
      }
      // ----------Add new Item functionality-------
      else {
        response = await dispatch(addItem(imageFile, formData));
        if (response && response.success) {
          Toast({ message: "Item added successfully.", type: "success" });
          setFormData(initialFormData);
          fetchData();
          setImageSrc(null);
        }
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputChangeQuantity = (event, index) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newQuantities = [...prevFormData.item_quantity];
      newQuantities[index] = value;
      return {
        ...prevFormData,
        item_quantity: newQuantities,
      };
    });
  };

  const handleAddInput = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      item_quantity: [...prevFormData.item_quantity, ""],
    }));
  };

  const handleRemoveInput = (index) => {
    setFormData((prevFormData) => {
      const newQuantities = [...prevFormData.item_quantity];
      newQuantities.splice(index, 1);
      return {
        ...prevFormData,
        item_quantity: newQuantities,
      };
    });
  };

  const handleItemEdit = async (id) => {
    const response = await dispatch(getItem(id));
    if (response.success === true) {
      // scrollToTop();
      setFormData({
        ...response.data,
        veg: response.data.veg == 1 ? "veg" : "non-veg",
      });
      setImageFile(response.data.image);
      if (response.data.image.data.length > 0) {
        const dataUrl = `data:image/jpeg;base64,${arrayBufferToBase64(
          response.data.image.data
        )}`;
        console.log("imageEnter", response.data.image.data);
        setImageSrc(dataUrl);
      } else {
        setImageSrc(null);
      }

      if (focusInput.current) {
        // Scroll to the input field
        focusInput.current.scrollIntoView({ behavior: "smooth" });
        // Focus on the input field
        focusInput.current.focus();
      }
      const newQuantities = [];
      response.data.VendorMenuQuantities.map((item, index) => {
        setFormData((prevFormData) => {
          newQuantities[index] = item.quantity;
          return {
            ...prevFormData,
            item_quantity: newQuantities,
          };
        });
      });
    }
  };

  const handleSelect = async (e) => {
    setSelectedPackage(e.target.value);
    if (e.target.value) {
      getPackageDetails(e.target.value);
    }
  };

  const getPackageDetails = async (id) => {
    // setDefaultItems([]);
    const [itemResponse, packageResponse] = await Promise.all([
      dispatch(getDefaultItems(id)),
      dispatch(getPackage(id)),
    ]);
    console.log("000rrrrr", itemResponse.data);
    console.log("pacak", packageResponse);
    setDefaultItems(itemResponse.data);
    setPackageItemsData((prevData) => ({
      ...prevData,
      package_id: packageResponse.data.id,
      package_name: packageResponse.data.package_name,
    }));
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
    console.log(id, sort, date);
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
  useEffect(() => {
    if (changeTriger) {
      handleNewItemAdd();
    }
  }, [changeTriger]);
  const handleAddItem = (event) => {
    const { name, value } = event.target;
    const item = itemsData.find((item) => item.id == value);

    setPackageItemsData((prevData) => ({
      ...prevData,
      [name]: value,
      quantity_id: item?.VendorMenuQuantities[0]?.id || "",
    }));
  };

  const handleItemForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setItemValidated(true);
    } else {
      const response = await dispatch(addItemToDay(packageItemsData));
      setVisible(false);
      getPackageDetails(selectedPackage);
      fetchData();
    }
  };

  const handleNewItemAdd = async () => {
    const response = await dispatch(addItemToDay(packageItemsData));
    setVisible(false);
    getPackageDetails(selectedPackage);
    setChangeTrigger(false);
    fetchData();
  };

  const handleDefaultItemUpdate = async (event) => {
    const response = await dispatch(updateVendorPackageItem(event));
    getPackageDetails(selectedPackage);
  };

  const handleDefaultItemQuantityUpdate = async (event) => {
    const response = await dispatch(updateVendorPackageItemQuantity(event));
    getPackageDetails(selectedPackage);
  };

  const handleItemDeletion = async (id, is_default, date, quantity_id) => {
    const response = await dispatch(
      deleteVendorPackageItem({ id, is_default, date, quantity_id })
    );
    fetchData();

    getPackageDetails(selectedPackage);
  };

  const getFilteredOptions = (ditem, item, customKeys = {}) => {
    const relatedItems = new Set();
    relatedItems.add(ditem?.VendorMenuItem?.id ?? 0);
    ditem.itemRelated &&
      ditem.itemRelated.forEach((i) => {
        relatedItems.add(i.VendorMenuItem.id);
      });
    const options = itemsData
      ? itemsData
          .filter((i) => !relatedItems.has(i.id))
          .map((i) => {
            const ret = {
              label: i.item_name, //item name
              value: i.id, //item id
              parentId: ditem.id, //default item id
              new_item_id: i.id, //item id
              package_id: ditem.package_id, //package id
              date: item.date, //date
              is_default: ditem.isDefault,
              replaced: ditem?.replaced ?? false,
              replace_id: ditem?.replace_id ?? "",
              quantity_id: i?.VendorMenuQuantities[0]?.id ?? "0",
            };

            return { ...ret, ...customKeys };
          })
      : [];
    return options;
  };

  const handleDeleteItemsBox = async (id) => {
    try {
      getPackageDetails(selectedPackage);
      const response = await dispatch(deleteMenuItemBox(id));

      // if (response.success) {
      //   setChangeTrigger(response);
      // }
    } catch (error) {
      console.log(error);
    }
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

  const handleDeleteItem = async () => {
    try {
      const response = await dispatch(deleteVendorMenuItem(formData.id));

      if (response.success) {
        Toast({ message: "Item deleted successfully", type: "success" });
        fetchData();
        formData({});
      } else {
        Toast({ message: "Item Delete Error", type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CRow>
      <LimitModal
        name={"menu items"}
        limit={limit}
        isOpen={isSecondOpen}
        onOpen={onSecondOpen}
        onOpenChange={onSecondOpenChange}
      />

      {/* {deletedItem && ( */}
      <DeleteModal
        label={deletedItem.item_name}
        isOpen={isThirdOpen}
        onOpen={onThirdOpen}
        onOpenChange={onThirdOpenChange}
        handleDeleteItem={handleDeleteItem}
      />
      {/* )} */}

      {/* <Modal isOpen={isSecondOpen} onOpenChange={onSecondOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Limit Exceed
              </ModalHeader>
              <ModalBody>
                <p>
                  You have reached the maximum number of menu items. Your
                  account only allows you to have {limit} menu items
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={setIsOpen2(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}

      <Modal
        size={"4xl"}
        className=" max-sm:h-[700px] lg:h-[700] mt-10 max-sm:overflow-y-scroll"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add and edit item section
              </ModalHeader>
              <ModalBody className=" overflow-y-scroll">
                <div className=" flex  max-sm:flex-col    ">
                  <CCol className=" lg:h-[500px]   mt-2">
                    <CCol className="mt-2 border-r-2 ">
                      <center>
                        <h3>My Menu</h3>
                      </center>
                      <table className="table">
                        <tbody>
                          {itemsData &&
                            itemsData.map((item, index) => (
                              <tr key={index}>
                                {item.veg == 0 ? (
                                  <td>
                                    <img
                                      className="w-[40px] h-[40px]"
                                      src={redIcon}
                                      alt=""
                                    />
                                  </td>
                                ) : (
                                  <td>
                                    <img
                                      className="w-[40px] h-[40px]"
                                      src={greenIcon}
                                      alt=""
                                    />
                                  </td>
                                )}

                                <td>{item.item_name}</td>
                                <td
                                  className="cursor-pointer text-primary h6"
                                  onClick={() => handleItemEdit(item.id)}
                                >
                                  Edit
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </CCol>
                  </CCol>
                  <CCol className="mt-3 lg:h-[500px] ml-3">
                    <center>
                      <h3>{formData.id ? "Edit Item" : "Add item"}</h3>
                    </center>
                    <CForm
                      className="row g-3 needs-validation"
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      {/* Product Name & Category */}
                      <CRow className="flex max-sm:flex-col">
                        <CCol>
                          <CFormLabel ref={focusInput} className="font-12">
                            Product Name
                          </CFormLabel>
                          <CFormInput
                            ref={focusInput}
                            className="simple-input"
                            type="text"
                            name="item_name"
                            placeholder=""
                            required
                            value={formData.item_name && formData.item_name}
                            onChange={handleInputChange}
                          />
                        </CCol>
                        <CCol>
                          <CFormLabel className="font-12">Category</CFormLabel>
                          <CFormSelect
                            className="simple-input"
                            name="item_category"
                            required
                            value={formData.item_category}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            {categories &&
                              categories.map((cat) => (
                                <option key={cat.id} value={cat.Category.id}>
                                  {cat.Category.category_plural}
                                </option>
                              ))}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      {/* Description */}
                      <CRow>
                        <CCol className="mt-3">
                          <CFormLabel className="font-12">
                            Description
                          </CFormLabel>
                          <CFormTextarea
                            name="table_description"
                            required
                            onChange={handleInputChange}
                            value={formData.table_description}
                          />
                        </CCol>
                      </CRow>
                      {/* Mesurment */}
                      <CRow>
                        <CCol className="d-flex mt-2 gap-2 justify-between">
                          <CFormLabel className=" mt-1 h6">VEG</CFormLabel>
                          <CFormSelect
                            className="simple-input "
                            style={{ width: "250px" }}
                            name="veg"
                            required
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                veg: e.target.value,
                              })
                            }
                            value={formData.veg}
                          >
                            <option value="">Select</option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      {/* Image upload */}
                      <CRow>
                        <CCol className="mt-2 mb-2">
                          <div className="row justify-content-center">
                            {/* {imageSrc && ( */}
                            <img
                              src={
                                formData && FormData.image
                                  ? FormData.image
                                  : imageSrc
                                  ? imageSrc
                                  : formData.id
                                  ? "https://agrimart.in/uploads/vendor_banner_image/default.jpg"
                                  : "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
                              } // Provide a placeholder image source
                              alt="Profile"
                              className="circular-image img-fluid"
                              width="200px"
                              height="130px"
                            />
                            {/* )} */}
                            <p
                              onClick={handleChooseFileClick}
                              className="text-primary cursor-pointer mt-2 text-center"
                            >
                              Change Picture
                            </p>
                            <input
                              type="file"
                              name="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              ref={fileInputRef}
                              style={{ display: "none" }}
                            />
                          </div>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol className="d-flex mt-3">
                          <div className="me-3">
                            <CFormLabel className="h6">Measurement</CFormLabel>
                          </div>
                          <div className="flex-grow-1 ">
                            <CFormSelect
                              className="simple-input "
                              // style={{ width: "250px" }}
                              name="units"
                              required
                              onChange={handleInputChange}
                              value={formData.units}
                            >
                              <option value="">Select</option>
                              <option value="piece">Piece</option>
                              <option value="pieces">Pieces</option>
                              <option value="grams">Grams</option>
                              <option value="oz">Ounces</option>
                              <option value="mL">Milliliters</option>
                              <option value="cup">Cup</option>
                            </CFormSelect>
                          </div>
                        </CCol>
                      </CRow>
                      {/* Item Size */}
                      <CRow className="justify-content-center pt-4">
                        <h6 className="text-center pb-2">Sizes</h6>
                        <CCol className="col-6">
                          <div>
                            {formData &&
                              formData.item_quantity &&
                              formData.item_quantity.map((value, index) => (
                                <div className="d-flex gap-5" key={index}>
                                  <span className="flex gap-2">
                                    <input
                                      key={index}
                                      min="0"
                                      className=" w-10  max-sm:w-[50px] mb-2 border-2"
                                      type="number"
                                      name="item_quantity"
                                      required
                                      value={value}
                                      onChange={(event) =>
                                        handleInputChangeQuantity(event, index)
                                      }
                                    />
                                    <p>{formData.units}</p>
                                  </span>
                                  <span className="flex ">
                                    <p
                                      className="cursor-pointer text-danger fw-bold ms-2 h5"
                                      onClick={() => handleRemoveInput(index)}
                                    >
                                      X
                                    </p>
                                  </span>
                                </div>
                              ))}
                          </div>
                        </CCol>
                        <CRow>
                          <p
                            onClick={handleAddInput}
                            className="cursor-pointer text-primary text-center fw-bold"
                          >
                            Add Size
                          </p>
                        </CRow>
                      </CRow>
                      {/* Buttons */}
                      <CRow className="justify-content-center flex flex-col">
                        <CCol className=" mb-2 flex justify-center gap-2">
                          {formData.id && (
                            <Button
                              onClick={() => {
                                setFormData({
                                  vendor_id: "",
                                  item_name: "",
                                  quantity: "",
                                  units: "",
                                  item_category: "",
                                  veg: "",
                                  image: "",
                                  created_date: "",
                                  table_description: "",
                                  item_quantity: [[]],
                                });
                                setImageSrc(null);
                              }}
                              className="px-5"
                            >
                              Cancel Edit
                            </Button>
                          )}

                          <Button
                            type="submit"
                            className="px-5"
                            variant="flat"
                            color="primary"
                          >
                            {formData.id ? "Update" : "Add"}
                          </Button>
                        </CCol>

                        <CCol className="w-full flex justify-center mt-3">
                          {formData.id && (
                            <Button
                              className=""
                              color="danger"
                              radius="sm"
                              onClick={() => {
                                setDeletedItem({ ...formData });
                                onThirdOpen();
                              }}
                              variant="bordered"
                            >
                              Delete Item
                            </Button>
                          )}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Create Menu</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3 ">
                <div className="flex   max-sm:flex-col">
                  <div className="w-full">
                    <div className=" ">
                      {/* -------Load Package select options-------- */}
                      <div className="flex max-sm:flex-col mb-2 justify-between items-center ">
                        <div className="mt-3 w-full flex gap-3 justify-center  max-sm:flex-col max-sm:items-center">
                          <div className="">
                            <h5>Load Package</h5>
                          </div>
                          <div className="max-sm:w-full w-[50%]">
                            <CFormSelect name="package" onChange={handleSelect}>
                              <option value="">Select</option>
                              {packages &&
                                packages.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.package_name}
                                  </option>
                                ))}
                            </CFormSelect>
                          </div>
                        </div>

                        <Button
                          className={"mr-3 mt-3"}
                          onPress={() => onOpen()}
                        >
                          Add/Edit Menu
                        </Button>
                      </div>

                      {/* -------------- Packages container-------------- */}
                      <div className="flex  max-sm:flex-col justify-center max-sm:items-center">
                        {/* <div className=""> */}
                        {defaultItems &&
                          defaultItems.length > 0 &&
                          defaultItems.map((item, index) => (
                            <div className=" w-[180px] px-0" key={index}>
                              <div className="border mx-1 my-3 menu-box">
                                <CRow>
                                  <h4 className="text-center">{item.day}</h4>
                                  <h5 className="text-center">
                                    {formatDate(item.date)}
                                  </h5>
                                  <p className="text-center">
                                    Add/Edit food items below
                                  </p>
                                </CRow>
                                <CRow>
                                  <CCol className="">
                                    <div
                                      className="d-flex justify-content-between"
                                      key={index}
                                    >
                                      <div className="me-1 w-full">
                                        {item.defaultItem &&
                                          item.defaultItem.map(
                                            (ditem, index) => (
                                              <DefaultItem
                                                index={index}
                                                defaultItem={
                                                  defaultItems && defaultItems
                                                }
                                                handleDeleteItemsBox={
                                                  handleDeleteItemsBox
                                                }
                                                key={index}
                                                item={item}
                                                setChangeTrigger={
                                                  setChangeTrigger
                                                }
                                                handleNewItemAdd={
                                                  handleNewItemAdd
                                                }
                                                setPackageItemsData={
                                                  setPackageItemsData
                                                }
                                                ditem={ditem}
                                                handleDefaultItemUpdate={
                                                  handleDefaultItemUpdate
                                                }
                                                itemsData={itemsData}
                                                packageItemsData={
                                                  packageItemsData
                                                }
                                                getFilteredOptions={
                                                  getFilteredOptions
                                                }
                                                handleDefaultItemQuantityUpdate={
                                                  handleDefaultItemQuantityUpdate
                                                }
                                                handleAddNewItem={
                                                  handleAddNewItem
                                                }
                                                handleItemDeletion={
                                                  handleItemDeletion
                                                }
                                              />
                                            )
                                          )}
                                      </div>
                                    </div>
                                    <div>
                                      <p
                                        className="cursor-pointer fw-bold h6 text-primary"
                                        onClick={() => {
                                          setDefaultItems((prev) => {
                                            return prev.map((item, idx) => {
                                              if (idx === index) {
                                                return {
                                                  ...item,
                                                  defaultItem: [
                                                    ...item.defaultItem,
                                                    {
                                                      id: generateRandomString(
                                                        5
                                                      ),
                                                      itemRelated: [],
                                                    },
                                                  ],
                                                };
                                              }
                                              return item;
                                            });
                                          });
                                          // handleAddNewItem(
                                          //   "",
                                          //   0,
                                          //   item.date ||
                                          //     item?.date_formatted?.ymdDate,
                                          //   false,
                                          //   false
                                          // );

                                          // setChangeTrigger(true);
                                        }}
                                      >
                                        Add Item
                                      </p>
                                    </div>
                                  </CCol>
                                </CRow>
                              </div>
                            </div>
                          ))}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                  {/* Add Items */}
                  {/* <div className="w-[50%] max-sm:w-full border">
                    <CCol className="mt-3">
                      <center>
                        <h3>Add item</h3>
                      </center>
                      <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <CRow className="flex max-sm:flex-col">
                          <CCol>
                            <CFormLabel className="font-12">
                              Product Name
                            </CFormLabel>
                            <CFormInput
                              className="simple-input"
                              type="text"
                              name="item_name"
                              placeholder=""
                              required
                              value={formData.item_name}
                              onChange={handleInputChange}
                            />
                          </CCol>
                          <CCol>
                            <CFormLabel className="font-12">
                              Category
                            </CFormLabel>
                            <CFormSelect
                              className="simple-input"
                              name="item_category"
                              required
                              value={formData.item_category}
                              onChange={handleInputChange}
                            >
                              <option value="">Select</option>
                              {categories &&
                                categories.map((cat) => (
                                  <option key={cat.id} value={cat.Category.id}>
                                    {cat.Category.category_plural}
                                  </option>
                                ))}
                            </CFormSelect>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol className="mt-3">
                            <CFormLabel className="font-12">
                              Description
                            </CFormLabel>
                            <CFormTextarea
                              name="table_description"
                              required
                              onChange={handleInputChange}
                              value={formData.table_description}
                            />
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol className="d-flex mt-2 gap-2 justify-between">
                            <CFormLabel className=" mt-1 h6">VEG</CFormLabel>
                            <CFormSelect
                              className="simple-input "
                              style={{ width: "250px" }}
                              name="veg"
                              required
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  veg: e.target.value,
                                })
                              }
                              value={formData.veg}
                            >
                              <option value="">Select</option>
                              <option value="veg">Veg</option>
                              <option value="non-veg">Non-Veg</option>
                            </CFormSelect>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol className="mt-2 mb-2">
                            <div className="row justify-content-center">
                              {imageSrc && (
                                <img
                                  src={
                                    formData && FormData.image
                                      ? "aaaa"
                                      : imageSrc || "placeholder-image.jpg"
                                  } // Upload Image
                                  alt="Profile"
                                  className="circular-image img-fluid"
                                  width="200px"
                                  height="130px"
                                />
                              )}
                              <p
                                onClick={handleChooseFileClick}
                                className="text-primary cursor-pointer mt-2 text-center"
                              >
                                Change Picture
                              </p>
                              <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                              />
                            </div>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol className="d-flex mt-3">
                            <div className="me-3">
                              <CFormLabel className="h6">
                                Measurement
                              </CFormLabel>
                            </div>
                            <div className="flex-grow-1 ">
                              <CFormSelect
                                className="simple-input "
                                name="units"
                                required
                                onChange={handleInputChange}
                                value={formData.units}
                              >
                                <option value="">Select</option>
                                <option value="piece">Piece</option>
                                <option value="pieces">Pieces</option>
                                <option value="grams">Grams</option>
                                <option value="oz">Ounces</option>
                                <option value="mL">Milliliters</option>
                                <option value="cup">Cup</option>
                              </CFormSelect>
                            </div>
                          </CCol>
                        </CRow>

                        <CRow className="justify-content-center pt-4">
                          <h6 className="text-center pb-2">Sizes</h6>
                          <CCol className="col-6">
                            <div>
                              {formData &&
                                formData.item_quantity &&
                                formData.item_quantity.map((value, index) => (
                                  <div className="d-flex gap-5" key={index}>
                                    <span className="flex gap-2">
                                      <input
                                        key={index}
                                        min="0"
                                        className=" w-10  max-sm:w-[50px] mb-2 border-2"
                                        type="number"
                                        name="item_quantity"
                                        required
                                        value={value}
                                        onChange={(event) =>
                                          handleInputChangeQuantity(
                                            event,
                                            index
                                          )
                                        }
                                      />
                                      <p>{formData.units}</p>
                                    </span>
                                    <span className="flex ">
                                      <p
                                        className="cursor-pointer text-danger fw-bold ms-2 h5"
                                        onClick={() => handleRemoveInput(index)}
                                      >
                                        X
                                      </p>
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </CCol>
                          <CRow>
                            <p
                              onClick={handleAddInput}
                              className="cursor-pointer text-primary text-center fw-bold"
                            >
                              Add Size
                            </p>
                          </CRow>
                        </CRow>
                        <CRow className="justify-content-center">
                          <CCol className="col-4 mb-2">
                            <CButton type="submit" className="px-5">
                              {formData.id ? "Update" : "Add"}
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCol>
                    <CCol className="border-top mt-2">
                      <CCol className="mt-2">
                        <center>
                          <h3>My Menu</h3>
                        </center>
                        <table className="table">
                          <tbody>
                            {itemsData &&
                              itemsData.map((item, index) => (
                                <tr key={index}>
                                  {item.veg == 0 ? (
                                    <td>
                                      <img
                                        className="w-[40px] h-[40px]"
                                        src={redIcon}
                                        alt=""
                                      />
                                    </td>
                                  ) : (
                                    <td>
                                      <img
                                        className="w-[40px] h-[40px]"
                                        src={greenIcon}
                                        alt=""
                                      />
                                    </td>
                                  )}

                                  <td>{item.item_name}</td>
                                  <td
                                    className="cursor-pointer text-primary h6"
                                    onClick={() => handleItemEdit(item.id)}
                                  >
                                    Edit
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </CCol>
                    </CCol>
                  </div> */}
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Add Item</CModalTitle>
          </CModalHeader>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={itemValidated}
            onSubmit={handleItemForm}
          >
            <CModalBody>
              <CRow>
                <CCol>
                  <div className="me-1 mt-2">
                    <CFormLabel>Items</CFormLabel>
                    <CFormSelect
                      name="item_selected"
                      className="simple-input"
                      placeholder=""
                      onChange={handleAddItem}
                    >
                      <option value="">Select</option>
                      {itemsData &&
                        itemsData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.item_name}
                          </option>
                        ))}
                    </CFormSelect>
                  </div>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CRow>
    </CRow>
  );
};

export default CreateMenu;
