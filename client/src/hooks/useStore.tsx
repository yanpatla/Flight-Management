import { rootStoreContext } from "@/store";
import { useContext } from "react";

if (process.env.NODE_ENV === "development") {
  const { enableLogging } = require("mobx-logger");
  enableLogging();
}

export const useStore = () => useContext(rootStoreContext);
