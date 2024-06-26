import "react-app-polyfill/stable";
import "core-js";

import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </NextUIProvider>
);
