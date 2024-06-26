import { authActions } from "../authReducer/AuthSlice";
import { Auth } from "../api/routes";

export const signInAction = (loginData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.signIn(loginData);
      if (data.status === "failed") {
        dispatch(authActions.setErrors(data.errors));
      } else {
        dispatch(authActions.signIn(data));
        return data;
      }
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const logoutAction = (user) => {
  return async (dispatch) => {
    try {
      await Auth.logOut(user);
      dispatch(authActions.logOut());
      return { logout: true };
    } catch (error) {
      dispatch(authActions.logOut());
      console.log("failed to logout user");
    }
  };
};
export const signInCustomer = (loginData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.signIn(loginData);
      if (data.status === "failed") {
        dispatch(authActions.setErrors(data.errors));
      } else {
        dispatch(authActions.signIn(data));
        return data;
      }
    } catch (error) {
      console.log("failed to signin");
    }
  };
};

export const logoutCustomer = (user) => {
  return async (dispatch) => {
    try {
      await Auth.logOut(user);
      dispatch(authActions.logOut());
      return { logout: true };
    } catch (error) {
      dispatch(authActions.logOut());
      console.log("failed to logout user");
    }
  };
};

export const customerLogin = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.customerLogin(formData);
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const sendForgetPasswordMsg = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.sendForgetPasswordMsg(formData);
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
export const verifyLink = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.verifyLink(formData);
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const resetForgetPassword = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.resetForgetPassword(formData);
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};

export const customerLogout = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await Auth.customerLogout(formData);
      dispatch(authActions.signIn(data));
      return data;
    } catch (error) {
      console.log("failed to get customer");
    }
  };
};
