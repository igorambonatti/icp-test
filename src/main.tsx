import { Buffer } from "buffer";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./store";
(window as any).global = window;
(window as any).Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
