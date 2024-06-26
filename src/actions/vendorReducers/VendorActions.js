import { Vendor } from "../api/routes";

export const getPackages = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPackages();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getGlobalDefaultItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getGlobalDefaultItems();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorPackages = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPackages(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setHolidays = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setHolidays(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getHolidays = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getHolidays();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const deleteHolidays = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deleteHolidays(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const updateDeliveryStatus = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updateDeliveryStatus(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getPackage = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPackage(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCategories();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getPackagesWithFrequency = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPackagesWithFrequency();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const addItem = (file, formData) => {
  return async (dispatch) => {
    try {
      const newData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        newData.append(key, value);
      });
      newData.append("file", file);
      // console.log(newData)
      const { data } = await Vendor.addItem(newData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const updateItem = (file, formData) => {
  return async (dispatch) => {
    try {
      const newData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        newData.append(key, value);
      });
      newData.append("file", file);
      const { data } = await Vendor.updateItem(newData, formData.id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getItems();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getAllPackagesDefaultItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getAllPackagesDefaultItems();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getMultipleMenuItems = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getMultipleMenuItems(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getServingMeasurements = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getServingMeasurements();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorCategories();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getAllDefaultItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getAllDefaultItems();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const uploadImage = (file) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.uploadImage(file);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getPackageTimeSlots = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPackageTimeSlots(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const sendMessageChangeSlot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.sendMessageChangeSlot(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const updatePkgSlot = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updatePkgSlot(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const updatePkgAddress = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updatePkgAddress(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const checkVendorPostalRegion = (postal) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.checkVendorPostalRegion(postal);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getCouponTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCouponTypes();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getActivePromotions = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getActivePromotions();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getInactivePromotions = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getInactivePromotions();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setPromotions = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setPromotions(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const packageRequestApprove = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.packageRequestApprove(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const addNewSubscriptionPackage = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addNewSubscriptionPackage(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const packageRequestRemove = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.packageRequestRemove(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const packageRequestReject = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.packageRequestReject(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorEmployeesWithEmail = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorEmployeesWithEmail(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const confirmPaymentRequest = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.confirmPaymentRequest(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const deletePromotion = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deletePromotion(id);
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};
export const getVendorPackageFrequency = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPackageFrequency();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const deleteVendorPackageCity = (id) => {
  console.log("dataca");
  return async (dispatch) => {
    try {
      console.log("datacasda", id);
      const { data } = await Vendor.deleteVendorPackageCity(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const updateVendorPackageDefaultItems = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updateVendorPackageDefaultItems(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getVendorEmployee = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorEmployee(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getItem(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getCustomerPackageRequests = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerPackageRequests();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getCustomerPackageRequestOne = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerPackageRequestOne();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getUpcomingOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getUpcomingOrders(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const checkVendorEmail = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.checkVendorEmail(form);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const customerSignup = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.customerSignup(form);
      return data;
    } catch (error) {
      console.log("failed to signin2vsdf", error);
      return error;
    }
  };
};

export const updateCustomerPhone = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updateCustomerPhone(form);
      return data;
    } catch (error) {
      console.log("failed to signin2vsdf", error);
      return error;
    }
  };
};
export const updateCustomerInfo = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updateCustomerInfo(form);
      return data;
    } catch (error) {
      console.log("failed to signin2vsdf", error);
      return error;
    }
  };
};
export const addCustomerAddress = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addCustomerAddress(form);
      return data;
    } catch (error) {
      console.log("failed to signin2vsdf", error);
      return error;
    }
  };
};

export const getVendorPackageForCustomer = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPackageForCustomer(id);
      return data;
    } catch (error) {
      console.log("failed to signin2vsdf", error);
      return error;
    }
  };
};
export const setInitCustomerPackageRequest = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setInitCustomerPackageRequest(id);
      return data;
    } catch (error) {
      console.log("failed to signin", error);
      return error;
    }
  };
};
export const submintManager = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.submintManager(form);
      return data;
    } catch (error) {
      console.log("failed to signin2");
      return error;
    }
  };
};
export const setVendorStoreInfo = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setVendorStoreInfo(form);
      return data;
    } catch (error) {
      console.log("failed to signin2");
      return error;
    }
  };
};
export const countPackagesMenuItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.countPackagesMenuItems();
      return data;
    } catch (error) {
      console.log("failed to signin2");
      return error;
    }
  };
};
export const resendCustomerOtp = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.resendCustomerOtp(form);
      return data;
    } catch (error) {
      console.log("failed to signin");
      return error;
    }
  };
};
export const verifyCustomerOtp = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.verifyCustomerOtp(form);
      return data;
    } catch (error) {
      console.log("failed to signin");
      return error;
    }
  };
};
export const verifyManagerOtp = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.verifyManagerOtp(form);
      return data;
    } catch (error) {
      console.log("failed to signin");
      return error;
    }
  };
};
export const getSubscriptions = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getSubscriptions(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getCustomerSubscriptionOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerSubscriptionOrders(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getCustomerPaymentLog = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerPaymentLog(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setCustomerPaymentMethod = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setCustomerPaymentMethod(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorTax = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorTax();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorPaymentInstruction = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPaymentInstruction();
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const addDefaultItem = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addDefaultItem(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const savePackageDays = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.savePackageDays(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorWebsiteSetting = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorWebsiteSetting();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setVendorWebsiteSetting = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setVendorWebsiteSetting(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const deleteVendorWebsiteSetting = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deleteVendorWebsiteSetting(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setUserCustomersByVendor = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setUserCustomersByVendor(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getVendorPackagesForVendor = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPackagesForVendor();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const sendMsgForPickupOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.sendMsgForPickupOrder(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setCustomerOrderStatus = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setCustomerOrderStatus(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const addDefaultItemToDay = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addDefaultItemToDay(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const deleteDefaultItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deleteDefaultItem(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getCities = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCities();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorCities = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorCities();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const addDriver = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addDriver(item);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const addPackageCity = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addPackageCity(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getPostalRegions = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPostalRegions();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const handledeleteCity = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.handledeleteCity(id);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const savePackage = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.savePackage(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const deletePackageTimeSlot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deletePackageTimeSlot(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const checkDeletedTimeSlots = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.checkDeletedTimeSlots(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const setCustomerOrderItem = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setCustomerOrderItem(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getDefaultItems = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getDefaultItems(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const deleteMenuItemBox = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deleteMenuItemBox(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const addItemToDay = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.addItemToDay(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getCustomers = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomers(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getCustomerOrders = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerOrders(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const getVendorOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorOrders();
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const getPopularItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPopularItems();
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getVendorMenuItems = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorMenuItems();
      return data;
    } catch (error) {
      console.log("failed to get customer order");
    }
  };
};

export const getCustomerOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomerOrder(id);
      return data;
    } catch (error) {
      console.log("failed to get customer order");
    }
  };
};
export const cencelCustomerOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.cencelCustomerOrder(id);
      return data;
    } catch (error) {
      console.log("failed to get customer order");
    }
  };
};

export const setConfrimOrderPickup = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setConfrimOrderPickup(id);
      return data;
    } catch (error) {
      console.log("failed to get customer order");
    }
  };
};
export const setNonConfrimOrderPickup = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setNonConfrimOrderPickup(id);
      return data;
    } catch (error) {
      console.log("failed to get customer order");
    }
  };
};

export const getCustomersByOrderDate = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getCustomersByOrderDate(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const updateCustomerOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.updateOrder(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const getVendorDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorDrivers();
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getDeliveriesByCreatedDate = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getDeliveriesByCreatedDate(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const setCustomerOrderDelivery = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setCustomerOrderDelivery(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};

export const getVendor = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendor();
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const setVendorReducer = (formData) => {
  return async (dispatch) => {
    // console.log("vendorActions")
    try {
      const { data } = await Vendor.setVendor(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const getProvince = () => {
  return async (dispatch) => {
    // console.log("vendorActions")
    try {
      const { data } = await Vendor.getProvince();
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const getSettingInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getSettingInfo();
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};

export const getSettingsInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getSettingsInfo();
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const setVendorSettingInfo = (formData) => {
  return async (dispatch) => {
    // console.log("vendorActions")
    try {
      const { data } = await Vendor.setVendorSettingInfo(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const saveVendorSettingTax = (formData) => {
  return async (dispatch) => {
    // console.log("vendorActions")
    try {
      const { data } = await Vendor.saveVendorSettingTax(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};
export const getVendorSetting = () => {
  return async (dispatch) => {
    // console.log("vendorActions")
    try {
      const { data } = await Vendor.getVendorSetting();
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};

export const setVendorLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setVendorLocation(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};

export const setNewVendorLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setNewVendorLocation(formData);
      return data;
    } catch (error) {
      console.log("Error from VendorActions");
    }
  };
};

export const getOrderSummary = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getOrderSummary(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getPackageOrderSummary = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getPackageOrderSummary(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const deactivatePackage = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deactivatePackage(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const activatePackage = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.activatePackage(id);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const setPaymentStatus = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setPaymentStatus(formData);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const getSubscriptionInfo = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getSubscriptionInfo(item);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};
export const sendRenewPackageMsg = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.sendRenewPackageMsg(item);
      return data;
    } catch (error) {
      console.log("failed to save package");
    }
  };
};

export const getVendorPackagesForVendorLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.getVendorPackagesForVendorLocation(
        formData
      );
      return data;
    } catch (error) {
      console.log("Failed to update package item", error);
    }
  };
};
export const setOrderIsDelivered = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.setOrderIsDelivered(formData);
      return data;
    } catch (error) {
      console.log("Failed to update package item", error);
    }
  };
};

export const deleteLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Vendor.deleteLocation(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const updateVendorPackageItem = (data) => {
  return async (disptach) => {
    try {
      const { response } = await Vendor.updateVendorPackageItem(data);
      return response;
    } catch (error) {
      console.log("Failed to update package item", error);
    }
  };
};

export const updateVendorPackageItemQuantity = (data) => {
  return async (disptach) => {
    try {
      const { response } = await Vendor.updateVendorPackageItemQuantity(data);
      return response;
    } catch (error) {
      console.log("Failed to update package item", error);
    }
  };
};

export const deleteVendorPackageItem = (data) => {
  return async (disptach) => {
    try {
      const { response } = await Vendor.deleteVendorPackageItem(data);
      return response;
    } catch (error) {
      console.log("Failed to update package item", error);
    }
  };
};

export const uploadDeliveryImage = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.uploadDeliveryImage(formData);
      return response;
    } catch (error) {
      console.log("Error while attempting to upload delivery image", error);
    }
  };
};
export const addVendorDefaultItem = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.addVendorDefaultItem(formData);
      return response;
    } catch (error) {
      console.log("Error while attempting to upload delivery image", error);
    }
  };
};

export const deleteVendorDefaultItem = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.deleteVendorDefaultItem(formData);
      return response;
    } catch (error) {
      console.log("Error while attempting to upload delivery image", error);
    }
  };
};
export const deletePackageImage = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.deletePackageImage(formData);
      return response;
    } catch (error) {
      console.log("Error while attempting to upload delivery image", error);
    }
  };
};
export const deleteDefaultItemImage = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.deleteDefaultItemImage(formData);

      return response;
    } catch (error) {
      console.log("Error while attempting to upload delivery image", error);
    }
  };
};
export const getCustomerPaymentStatus = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Vendor.getCustomerPaymentStatus(formData);

      return response;
    } catch (error) {
      console.log("Error", error);
    }
  };
};
