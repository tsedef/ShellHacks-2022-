import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", function () {
  createRoot(document.body.appendChild(document.createElement("div"))).render(
    <App />
  );
});
