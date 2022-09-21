import { useContext } from "react";
import { FullContext } from "../context/FullContext";

export const useFullContext = () => {
  const context = useContext(FullContext);

  if (!context) {
    throw Error("useFullContext must be called inside DemoApp.js");
  }

  return context;
};
