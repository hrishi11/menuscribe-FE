import { customerActions } from "./CustomerSlice";
import { Customer, GoogleAPI } from "../api/routes";
import { adjustData } from "../../utils/Helper";
import Item from "antd/es/list/Item";

export const getPackagesWithoutLoginByVendorId = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getPackagesWithoutLoginByVendorId(
        formData
      );
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getAllCustomerOrders = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getAllCustomerOrders(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getCustomerDeliveryLocations = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerDeliveryLocations();
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getVendorPackageByLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getVendorPackageByLocation(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const createUserFromOrderConformation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.createUserFromOrderConformation(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const createPackageRequensts = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.createPackageRequensts(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const checkEmail = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.checkEmail(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const getResturantDetails = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getResturantDetails(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const setVendorPaymentMethods = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setVendorPaymentMethods(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const checkExistingUser = (phone) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.checkExistingUser(phone);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const addCustomerLink = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.addCustomerLink(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};
export const saveExistingCustomer = (phone) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.saveExistingCustomer(phone);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const saveCustomer = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.saveCustomer(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const getOrdersByDate = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getOrdersByDate(formData);
      return data;
    } catch (error) {
      console.log("failed to get order creation Dates");
    }
  };
};
export const manageOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.manageOrder(formData);
      return data;
    } catch (error) {
      console.log("failed to get order creation Dates");
    }
  };
};

export const getOrderCreationDates = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getOrderCreationDates(formData);
      return data;
    } catch (error) {
      console.log("failed to get order creation Dates");
    }
  };
};
export const getOrderCancelationDates = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getOrderCancelationDates(formData);
      return data;
    } catch (error) {
      console.log("failed to get order creation Dates");
    }
  };
};
export const cancelCustomerPackage = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.cancelCustomerPackage(formData);
      return data;
    } catch (error) {
      console.log("failed to get order creation Dates");
    }
  };
};

export const setCustomerPackageRequest = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setCustomerPackageRequest(formData);
      return data;
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const setPackagesData = (selectedpackagesData) => {
  return async (dispatch) => {
    try {
      // const newData = adjustData(packageData);
      // const { data } = await Customer.savePackages(newData)
      dispatch(customerActions.selectedPackages(selectedpackagesData));
      //    return data
    } catch (error) {
      console.log("error", error);
      console.log("failed to save package");
    }
  };
};
export const setQrValue = (value) => {
  return async (dispatch) => {
    try {
      // const newData = adjustData(packageData);
      // const { data } = await Customer.savePackages(newData)
      dispatch(customerActions.setQrValue(value));
      //    return data
    } catch (error) {
      console.log("error", error);
      console.log("failed to save package");
    }
  };
};
export const setPageAccess = (value) => {
  return async (dispatch) => {
    try {
      dispatch(customerActions.setPageAccess(value));
    } catch (error) {
      console.log("error", error);
      console.log("failed to save package");
    }
  };
};

export const updateCustomerPackageFromCustomer = (selectedpackagesData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerPackageFromCustomer(
        selectedpackagesData
      );

      return data;
    } catch (error) {
      console.log("error", error);
      console.log("failed to save package");
    }
  };
};

export const savePackagesData = (selectedpackagesData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.savePackages(selectedpackagesData);
      // dispatch(customerActions.selectedPackages(selectedpackagesData))
      return data;
    } catch (error) {
      console.log("error", error);
      console.log("failed to save package");
    }
  };
};

export const getCustomer = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomer();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getCustomerOrderFromId = (id) => {
  // console.log(id);
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerOrderFromId(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const getCustomerWithAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerWithAddress(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const getCustomerByVC = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerByVC(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const updateCustomerPassword = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerPassword(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const checkVerificationPin = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.checkVerificationPin(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const updateCustomer = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomer(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const updateCustomerSubscription = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerSubscription(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const renewPckageSubscription = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.renewPckageSubscription(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const filterOrderDates = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.filterOrderDates(formData);
      return data;
    } catch (error) {
      console.log("failed to filter order dates");
    }
  };
};

export const getUserPackages = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getUserPackages({ ids: formData });
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const getCustomerPackages = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerPackages(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getVendorCustomerAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getVendorCustomerAddress(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getVendorCustomerOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getVendorCustomerOrders(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const getCustomerPackagess = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerPackagess(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getCustomerActivePackages = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerActivePackages(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const addCustomerPackage = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.addCustomerPackage(payload);
      return data;
    } catch (error) {
      console.log(error);
      console.log("failed to get customer");
    }
  };
};

export const updateCustomerPackage = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerPackage(payload);
      return data;
    } catch (error) {
      console.log(error);
      console.log("failed to get customer");
    }
  };
};

export const saveCustomerOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.saveCustomerOrder({ ids: formData });
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const setOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setOrder(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const cancelCustomerOrder = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.cancelCustomerOrder(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const getCustomerAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerAddress(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const validateEmployee = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.validateEmployee(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getSelectedCustomerPackage = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getSelectedCustomerPackage();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const customerPackageCancelByCustomer = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.customerPackageCancelByCustomer(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getCustomerPaymentMethod = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerPaymentMethod();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getCustomerDeliveryAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerDeliveryAddress(id);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const updateCustomerPackageAddressByCustomer = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerPackageAddressByCustomer(
        formData
      );
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getCustomerBillingInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerBillingInfo();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const updateCustomerPaymentMethod = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerPaymentMethod(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getEmployees = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getEmployees();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getVendorPackageByDate = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getVendorPackageByDate(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const setEmployee = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setEmployee(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const setEmployeeLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setEmployeeLocation(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const deleteEmployeeLocation = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.deleteEmployeeLocation(formData);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const getVendorLocations = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getVendorLocations();
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const updateCustomerProfile = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerProfile(item);
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const setCustomerAddress = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setCustomerAddress(formData);
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};
export const setOrderItemFromCustomerDashboard = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.setOrderItemFromCustomerDashboard(
        formData
      );
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};

export const updateCustomerAddressFromCustomerDashboard = (formData) => {
  return async (dispatch) => {
    try {
      const { data } =
        await Customer.updateCustomerAddressFromCustomerDashboard(formData);
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};
export const updateCustomerAddress = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.updateCustomerAddress(formData);
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};

export const deleteCustomerAddress = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.deleteCustomerAddress(id);
      return data;
    } catch (error) {
      console.log("failed to get address ");
    }
  };
};

export const saveAllCustomerOrders = (dataToSend) => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.saveAllCustomerOrders(dataToSend);
      return data;
    } catch (error) {
      console.log(error, "failed to get address ");
    }
  };
};

export const optimizeRoutes = (payload, headers) => {
  return async (dispatch) => {
    try {
      const { data } = await GoogleAPI.optimizeRoutes(payload, headers);
      return data;
    } catch (error) {
      console.log("error in route optimisations", error);
    }
  };
};

export const getCustomerActiveSubscriptions = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerActiveSubscriptions();
      return data;
    } catch (error) {
      console.log("failed to get active customer subscription");
    }
  };
};

export const getCustomerCustomerPackageRequest = () => {
  return async (dispatch) => {
    try {
      const { data } = await Customer.getCustomerCustomerPackageRequest();
      return data;
    } catch (error) {
      console.log("failed to get active customer subscription");
    }
  };
};
