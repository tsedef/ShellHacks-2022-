import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { FullContextProvider } from "./context/FullContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FullContextProvider>
    <App />
  </FullContextProvider>
);
