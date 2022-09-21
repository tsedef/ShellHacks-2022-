import React from "react";
import { useFullContext } from "./hooks/useFullContext";

function Test() {
  const { events, authIsReady } = useFullContext();
  console.log(events);
  return <></>;
}

export default Test;
