import { API, UploadImageAPI } from "./index";
// Auth
export const getPackages = async () => API.get(`get-packages`);
export const getGlobalDefaultItems = async () =>
  API.get(`get-global-default-items`);
export const getVendorPackages = async (id) =>
  API.get(`get-vendor-pakcages/${id}`);
export const getPackage = async (id) => API.get(`get-package/${id}`);
export const getPackagesWithFrequency = async () =>
  API.post(`/get-package-frequency`);
export const addItem = async (data) => API.post(`add-item`, data);
export const getItems = async () => API.get(`get-items`);
export const getAllPackagesDefaultItems = async () =>
  API.get(`get-all-packages-default-items`);
export const getMultipleMenuItems = async (id) =>
  API.get(`get-multiple-menu-items/${id}`);
export const getItem = async (id) => API.get(`get-item/${id}`);
export const updateItem = async (data, id) =>
  API.post(`update-item/${id}`, data);
export const addDefaultItem = async (data) =>
  API.post(`add-default-item`, data);
export const savePackageDays = async (data) =>
  API.post(`save-package-days`, data);
export const getVendorWebsiteSetting = async () =>
  API.get(`get-vendor-website-setting`);
export const setVendorWebsiteSetting = async (data) =>
  API.post(`set-vendor-website-setting`, data);
export const deleteVendorWebsiteSetting = async (id) =>
  API.delete(`delete-vendor-website-setting/${id}`);
export const setUserCustomersByVendor = async (data) =>
  API.post(`set-user-customers-by-vendor`, data);
export const getVendorPackagesForVendor = async () =>
  API.get(`get-vendor-packages-for-vendor`);
export const sendMsgForPickupOrder = async (data) =>
  API.post(`send-msg-for-pickup-order`, data);
export const setCustomerOrderStatus = async (data) =>
  API.post(`set-customer-order-status`, data);
export const deleteDefaultItem = async (id) =>
  API.delete(`delete-default-item/${id}`);
export const getCities = async () => API.get(`get-cities`);
export const getVendorCities = async () => API.get(`get-vendor-cities`);
export const addDriver = async (data) => API.post(`add-driver`, data);
export const addPackageCity = async (data) =>
  API.post(`add-package-city`, data);
export const handledeleteCity = async (id) =>
  API.delete(`handle-delete-city/${id}`);
export const savePackage = async (data) => API.post(`save-package`, data);
export const getDefaultItems = async (id) => API.get(`get-default-items/${id}`);
export const deleteMenuItemBox = async (id) =>
  API.delete(`delete-menu-item/${id}`);
export const addItemToDay = async (data) => API.post(`add-item-to-day`, data);
export const getCustomers = async () => API.get(`get-customers`);
export const getCustomerOrders = async (data) =>
  API.post(`get-customers-orders`, data);

export const getCustomerOrderFromId = async (id) =>
  API.get(`get-customer-order-from-id/${id}`);

export const getVendorMenuItems = async (id) =>
  API.get(`get-vendor-menu-items`);

export const getCustomerOrder = async (id) =>
  API.get(`get-customers-order/${id}`);

export const cencelCustomerOrder = async (id) =>
  API.post(`cencel-customers-order/${id}`);

export const setConfrimOrderPickup = async (id) =>
  API.post(`set-confrim-order-pickup/${id}`);
export const setNonConfrimOrderPickup = async (id) =>
  API.post(`set-non-confrim-order-pickup/${id}`);

export const getCustomersByOrderDate = async (data) =>
  API.post(`get-customers-by-order-date`, data);

export const setCustomerOrderItem = async (data) =>
  API.post("set-customer-order-item", data);

export const updateOrder = async (data) =>
  API.patch(`update-customer-order`, data);
export const getVendorDrivers = async (data) => API.get(`get-vendor-drivers`);

export const getDeliveriesByCreatedDate = async (data) =>
  API.post("get-deliveries", data);
export const addDefaultItemToDay = async (data) =>
  API.post("/add-items-to-all-day", data);

export const changeCustomerPackage = async (data) =>
  API.post("/change-customer-package", data);
export const deleteVendorMenuItem = async (id) =>
  API.delete(`/delete-vendor-menu-item/${id}`);

export const setCustomerOrderDelivery = async (data) =>
  API.post("set-delivered", data);
export const getVendor = async () => API.get("get-vendor");
export const setVendor = async (data) => API.post("set-vendor", data);
export const getProvince = async () => API.get("get-province");
export const getSettingInfo = async () => API.get("get-vendor-setting-info");
export const getSettingsInfo = async () => API.get("get-vendor-settings-info");
export const setVendorSettingInfo = async (data) =>
  API.post("/save-vendor-setting-info", data);
export const saveVendorSettingTax = async (data) =>
  API.post("/save-vendor-setting-tax", data);
export const getVendorSetting = async (data) => API.get("/get-vendor-setting");
export const setVendorLocation = async (data) =>
  API.post("set-vendor-location", data);

export const setNewVendorLocation = async (data) =>
  API.post("set-new-vendor-location", data);

export const getCategories = async () => API.get("get-categories");
export const getVendorPackageFrequency = async () =>
  API.get("get-vendor-package-frequency");

export const getVendorEmployeesWithEmail = async (data) =>
  API.post(`get-vendor-employes-with-email`, data);

export const getOrderSummary = async (data) =>
  API.post(`get-order-summary`, data);
export const getPackageOrderSummary = async (data) =>
  API.post(`count-packages-order-items`, data);

export const deactivatePackage = async (id) =>
  API.get(`deactivate-package/${id}`);
export const activatePackage = async (id) => API.get(`activate-package/${id}`);
export const setPaymentStatus = async (data) =>
  API.post(`set-payment-status`, data);

export const updateVendorPackageItem = async (data) =>
  API.post(`update-vendor-package-items`, data);
export const deleteVendorPackageItem = async (data) =>
  API.post(`delete-vendor-package-items`, data);
export const updateVendorPackageItemQuantity = async (data) =>
  API.post(`update-vendor-package-items-quantity`, data);

export const uploadDeliveryImage = async (data) =>
  API.post(`upload-delivery-image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getServingMeasurements = async () =>
  API.get("get-serving-measurements");
export const getVendorCategories = async () => API.get("get-vendor-categories");
export const getAllDefaultItems = async () => API.get("get-all-default-items");
export const uploadImage = async (file) =>
  API.post("upload-file", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getPackageTimeSlots = async (id) =>
  API.get(`get-package-timeslots/${id}`);
export const deletePackageTimeSlot = async (id) =>
  API.delete(`delete-package-timeslots/${id}`);
export const checkDeletedTimeSlots = async (id) =>
  API.get(`check-deleted-time-slots/${id}`);

// Coupon
export const getCouponTypes = async () => API.get("get-coupon-types");
export const getActivePromotions = async () => API.get("get-active-promotions");
export const getInactivePromotions = async () =>
  API.get("get-inactive-promotions");
export const setPromotions = async (data) => API.post("set-promotions", data);
export const deletePromotion = async (id) =>
  API.delete(`delete-promotion/${id}`);

// Vendor package default Items
export const updateVendorPackageDefaultItems = async (data) =>
  API.post("update-vendor-package-default-items", data);

export const getVendorEmployee = async (data) =>
  API.post("get-vendor-employee", data);

export const setVendorSettings = async (data) =>
  API.post("set-vendor-settings", data);
export const getVendorSettings = async () => API.get("get-vendor-settings");

export const getVendorSettingsById = async (id) =>
  API.get(`get-vendor-setting-by-id/${id}`);
export const getVendorSettingsByVendorId = async (id) =>
  API.get(`get-vendor-settings-by-vendor-id/${id}`);
export const getAllVendorPackages = async () =>
  API.get(`get-all-vendor-packages`);
export const getAllUserVendors = async () => API.get(`get-all-user-vendors`);
export const createVendorSettings = async (data) =>
  API.post(`create-vendor-settings`, data);
export const createVendorTamplateDesigner = async (data) =>
  API.post(`create-vendor-tamplate-designer`, data);
export const getVendorTamplateDesigner = async () =>
  API.get(`get-vendor-tamplate-designer`);
export const getVendorTamplateInfo = async () =>
  API.get(`get-vendor-tamplate-info`);
// Customer package Requests
export const getCustomerPackageRequests = async () =>
  API.get("get-customer-package-requests");

export const getCustomerPackageRequestOne = async () =>
  API.get("get-customer-package-request-one");
export const getUpcomingOrders = async (id) =>
  API.get(`get-upcomming-orders/${id}`);
export const getSubscriptions = async (id) =>
  API.get(`get-current-subscription/${id}`);
export const getCustomerSubscriptionOrders = async (id) =>
  API.get(`get-customer-subscription-orders/${id}`);
export const getCustomerPaymentLog = async (id) =>
  API.get(`get-customer-payment-log/${id}`);
export const setCustomerPaymentMethod = async (formData) =>
  API.post(`set-customer-payment-method`, formData);
export const getVendorTax = async () => API.get(`get-vendor-tax`);
export const packageRequestApprove = async (data) =>
  API.post("package-request-approve", data);
export const addNewSubscriptionPackage = async (data) =>
  API.post("add-new-subscription-package", data);
export const packageRequestRemove = async (data) =>
  API.post("package-request-remove", data);
export const packageRequestReject = async (data) =>
  API.post("package-request-reject", data);
export const confirmPaymentRequest = async (data) =>
  API.post("confirm-payment-request", data);

export const getVendorPaymentInstruction = async (data) =>
  API.get(`get-vendor-payment-method`);
export const getVendorOrders = async () => API.get(`get-vendor-order`);
export const getPopularItems = async () => API.get(`get-popular-items`);
export const deleteVendorPackageCity = async (data) =>
  API.delete(
    `delete-vendor-package-city/${data.id}?packageId=${data.packageId}`
  );

export const getSubscriptionInfo = async (data) =>
  API.post(`get-subscription-info`, data);
export const checkVendorPostalRegion = async (data) =>
  API.post(`check-vendor-postal-region`, data);

export const sendRenewPackageMsg = async (data) =>
  API.post(`send-renew-package-msg`, data);

export const setOrderIsDelivered = async (data) =>
  API.post(`set-order-is-delivered`, data);

export const getVendorPackagesForVendorLocation = async (data) =>
  API.post(`get-vendor-packages-for-vendor-location`, data);

export const deleteLocation = async (data) =>
  API.delete(`delete-vendor-location/${data.id}`);

export const getPostalRegions = async () => API.get(`get-postal-regions`);
export const updateDeliveryStatus = async (formData) =>
  API.patch(`update-pickup-delivery-status/${formData.id}`, formData.data);

export const updatePkgSlot = async (formData) =>
  API.patch(`update-customer-package-slot/${formData.id}`, {
    customer_package_id: formData.customer_package_id,
  });
export const updatePkgAddress = async (formData) =>
  API.patch(`update-customer-package-address/${formData.id}`, {
    customer_delivery_address_id: formData.customer_delivery_address_id,
  });
export const sendMessageChangeSlot = async (formData) =>
  API.post(`send-message-slot-change`, formData);
export const setHolidays = async (formData) =>
  API.post(`set-holidays`, formData);
export const getHolidays = async () => API.get(`get-holidays`);
export const deleteHolidays = async (id) => API.delete(`delete-holidays/${id}`);

export const checkVendorEmail = async (data) =>
  API.post(`check-vendor-email`, data);
export const submintManager = async (data) => API.post(`manager-signup`, data);
export const verifyManagerOtp = async (data) =>
  API.post(`verify-manager-otp`, data);

export const verifyCustomerOtp = async (data) =>
  API.post(`verify-customer-otp`, data);
export const resendCustomerOtp = async (data) =>
  API.post(`resend-customer-otp`, data);

export const setVendorStoreInfo = async (data) =>
  API.post(`set-store-info`, data);
export const getVendorRoles = async () => API.get(`get-vendor-roles`);

export const customerSignup = async (data) => API.post(`customer-signup`, data);
export const updateCustomerPhone = async (data) =>
  API.post(`update-customer-phone`, data);
export const updateCustomerInfo = async (data) =>
  API.post(`update-customer-info`, data);

export const addCustomerAddress = async (data) =>
  API.post(`add-customer-address`, data);

export const countPackagesMenuItems = async () =>
  API.get(`count-packages-menu-items`);
export const getVendorPackageForCustomer = async (id) =>
  API.get(`get-vendor-package-for-customer/${id}`);
export const setInitCustomerPackageRequest = async (formData) =>
  API.post(`set-init-customer-package-request`, formData);
export const addVendorDefaultItem = async (formData) =>
  UploadImageAPI(`add-vendor-default-item`, formData);
export const deleteVendorDefaultItem = async (id) =>
  API.delete(`delete-vendor-default-item/${id}`);
export const deletePackageImage = async (formData) =>
  API.post(`delete-package-image`, formData);
export const getVendorBillingInfo = async (formData) =>
  API.get(
    `get-vendor-billing-info?page=${formData.page}&pageSize=${formData.pageSize}`
  );
