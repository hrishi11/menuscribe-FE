import { API } from "./index";
// Auth
export const checkExistingUser = async (phone) =>
  API.post(`check-existing-user`, phone);
export const addCustomerLink = async (data) =>
  API.post(`add-customer-link`, data);
export const saveCustomer = async (data) => API.post(`save-customer`, data);
export const saveExistingCustomer = async (data) =>
  API.post(`save-existing-customer`, data);
export const savePackages = async (data) => API.post(`save-packages`, data);
export const getCustomer = async () => API.get(`get-customer`);
export const getCustomerWithAddress = async (id) =>
  API.post(`get-customer-with-address?id=${id}`);
export const updateCustomerPassword = async (data) =>
  API.post(`update-customer-password`, data);
export const checkVerificationPin = async (data) =>
  API.post(`check-verification-pin`, data);
export const updateCustomer = async (data) => API.post(`update-customer`, data);
export const getUserPackages = async (data) =>
  API.post(`get-user-packages`, data);

export const getPackagesWithoutLoginByVendorId = async (data) =>
  API.get(`/get-packages-without-login-by-vendorid/${data.vendor_id}`);

export const getResturantDetails = async (data) =>
  API.post(`get-resturant-details`, data);

export const checkEmail = async (data) => API.post(`check-email`, data);

export const createUserFromOrderConformation = async (data) =>
  API.post(`create-user-from-order-conformation`, data);
export const createPackageRequensts = async (data) =>
  API.post(`create-package-request-from-order-conformation`, data);

export const getCustomerPackages = async (id) =>
  API.get(`get-customer-packages/${id}`);
export const getVendorCustomerAddress = async (id) =>
  API.get(`get-vendor-customer-address/${id}`);
export const getVendorCustomerOrders = async (formData) =>
  API.post(`get-vendor-customer-orders/${formData.id}`, formData.data);

export const getCustomerPackagess = async (id) =>
  API.get(`get-customer-packagess/${id}`);

export const setVendorPaymentMethods = async (data) =>
  API.post(`set-vendor-payment-methods`, data);

export const getCustomerActivePackages = async (id) =>
  API.get(`get-customer-active-packages/${id}`);
export const updateCustomerPackageFromCustomer = async (data) =>
  API.post("update-customer-package", data);

export const filterOrderDates = async (data) =>
  API.post("filter-order-dates", data);
export const updateCustomerSubscription = async (data) =>
  API.post("update-customer-subscription", data);
export const renewPckageSubscription = async (data) =>
  API.post("renew-package-subscription", data);
export const getCustomerOrderFromId = async (id) =>
  API.get(`get-customer-order-from-id/${id}`);

export const saveCustomerOrder = async (data) =>
  API.post(`save-customer-order`, data);

export const setOrderItemFromCustomerDashboard = async (data) =>
  API.post(`set-customer-order-item-from-customer-dashboard`, data);

export const setCustomerPackageRequest = async (data) =>
  API.post(`set-customer-package-request`, data);
export const getCustomerByVC = async (id) =>
  API.get(`get-customer-by-vc/${id}`);
export const cancelCustomerOrder = async (data) =>
  API.post(`cancel-customer-order`, data);
// export const getCustomerAddress = async (id) => API.get(`get-customer-address/${id}`)
export const getCustomerAddress = async (id) =>
  API.get(`get-customer-address?id=${id}`);
export const setCustomerAddress = async (data) =>
  API.post(`set-customer-address`, data);

export const updateCustomerAddressFromCustomerDashboard = async (data) =>
  API.patch(`set-customer-address`, data);

export const updateCustomerAddress = async (data) =>
  API.post(`update-customer-address`, data);
export const deleteCustomerAddress = async (id) =>
  API.delete(`delete-customer-address/${id}`);
export const addCustomerPackage = async (data) =>
  API.post(`add-customer-package-with-vendor`, data);
export const updateCustomerPackage = async (data) =>
  API.post(`update-customer-package-with-vendor`, data);
export const saveAllCustomerOrders = async (data) =>
  API.post(`save-all-customer-orders`, data);
export const setOrder = async (data) => API.post(`set-order`, data);

export const getOrderCreationDates = async (data) =>
  API.post(`get-order-creation-dates`, data);

export const getOrderCancelationDates = async (data) =>
  API.post(`get-order-cancelation-dates`, data);

export const cancelCustomerPackage = async (data) =>
  API.post(`cancel-customer-package`, data);

export const updateCustomerProfile = async (data) =>
  API.patch(`update-customer-profile`, data);

export const getCustomerActiveSubscriptions = async () =>
  API.get(`get-customer-active-subscriptions`);

export const getCustomerCustomerPackageRequest = async () =>
  API.get(`customer_package_requests`);

// ---------------------Team Settings------------
export const validateEmployee = async (data) =>
  API.post(`validate-employee`, data);
export const getEmployees = async () => API.get(`get-employees`);
export const getVendorLocations = async () => API.get(`get-vendor-locations`);
export const setEmployee = async (data) => API.patch(`set-employee`, data);
export const setEmployeeLocation = async (data) =>
  API.post(`employee-location`, data);
export const deleteEmployeeLocation = async (data) =>
  API.post(`delete-employee-location`, data);

export const getVendorPackageByDate = async (data) =>
  API.post(`get-vendor-package-by-date`, data);

// ----------Order manager---
export const getOrdersByDate = async (data) =>
  API.post(`get-orders-by-date`, data);
export const manageOrder = async (data) => API.post(`manage-order`, data);
