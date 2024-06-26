import axios from "axios";
import { API_URL } from "../../constants";

const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "https://menuscribe.com/",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

// Add a response interceptor to handle errors globally
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Example: handle token expiration by refreshing the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refreshToken()
        .then((token) => {
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch((refreshError) => {
          // Handle token refresh error, redirect to login, etc.
          console.error("Token refresh failed:", refreshError);
          // You might want to redirect to the login page or show an error message
          throw refreshError;
        });
    }

    // Handle other error cases here...

    return Promise.reject(error);
  }
);

// Token refresh function (replace with your actual implementation)
const refreshToken = async () => {
  // Implement your token refresh logic here and return the new token
  // For example, make a request to the server to refresh the token
  let newToken;
  if (localStorage.getItem("menuScribe")) {
    const response = await axios.post(`${API_URL}refresh-token`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    newToken = response.data.token;
    localStorage.setItem("menuScribe", JSON.stringify({ token: newToken }));
  }

  return newToken;
};

// Add request interceptor for attaching the authorization header
apiInstance.interceptors.request.use((req) => {
  // req.headers.AccessControlAllowOrigin = '*'; // Your origin
  // req.setHeader('Access-Control-Allow-Origin','*');

  if (localStorage.getItem("menuScribe")) {
    const menuScribeToken = JSON.parse(
      localStorage.getItem("menuScribe")
    )?.token;
    if (menuScribeToken) {
      req.headers.Authorization = `Bearer ${menuScribeToken}`;
      // document.cookie = `jwt=${menuScribeToken}; path=/`;
    }
  }
  return req;
});

const uploadImageWithData = async (endpoint, formData) => {
  // Get the authorization token from localStorage
  const menuScribeToken = JSON.parse(localStorage.getItem("menuScribe"))?.token;

  // Configure headers for multipart/form-data
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  if (menuScribeToken) {
    headers.Authorization = `Bearer ${menuScribeToken}`;
  }

  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, formData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const UploadImageAPI = uploadImageWithData;

export const API = apiInstance;
